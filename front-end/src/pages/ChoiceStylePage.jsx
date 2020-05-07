import React, { Component } from 'react';
import { Box, Card, GridList, GridListTile, Modal, Container, Button } from '@material-ui/core';
import { searchClothesRandom } from '../module/searchClothesRandom';
import { withStyles } from '@material-ui/core/styles';
import { FavoriteRounded, DoneOutlineRounded, ReplayRounded } from '@material-ui/icons'
import { choicestylejsx } from '../css/useStyles';
import axios from 'axios';
import '../css/InfiniteScrollContainer.css';
import QueueArim from 'rc-queue-anim';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const numItemsPerColumn = 4, maxNumOfChoicedImage = 3, maxNumOfDepth = 3;
let numOfChoicedImage = 0, numOfDepth = 0;

class ChoiceStylePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgTags: [],
      choicedItemObject: {},
      canPush: false,
      isSuccess: false,
      open: false,
    }
  }

  setSearchState = (searchDataList) => {
    new Promise((resolve, reject) => {
      if (searchDataList.length > 0) {
        let imgList = searchDataList.map((searchData, index) => {
          return (
            <img alt="" key={index} src={searchData.img} id={searchData.id}
              className={this.props.classes.image} style={{ width: "100%", height: "100%", }} />
          )
        });
        resolve(imgList);
      }
      else reject('error : 검색 결과가 없습니다.');
    }).then((res) => {
      this.setState({
        ...this.state,
        imgTags: res,
      });
    }).catch((err) => { alert(err) });
  };
  handleChoicedClothesId = (img_id) => {
    const nextChoicedItemObject = this.state.choicedItemObject;
    if (!!this.state.choicedItemObject[img_id]) {
      numOfChoicedImage--;
      delete nextChoicedItemObject[img_id];

      this.setState({ choicedItemObject: nextChoicedItemObject, canPush: numOfChoicedImage >= 1, });
    }
    else if (numOfChoicedImage < maxNumOfChoicedImage) {
      numOfChoicedImage++;
      nextChoicedItemObject[img_id] = true;

      this.setState({ choicedItemObject: nextChoicedItemObject, canPush: true, });
    }
    else {
      alert(`한 번에 ${maxNumOfChoicedImage}개의 이미지만 선택할 수 있습니다`);
    }
  }
  handleChoice = () => {
    const url = `${process.env.REACT_APP_URL}/clothes/record-user-clothes`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token,
      },
    };

    const params = {
      clothes_id: Object.keys(this.state.choicedItemObject).map((key) => (
        key
      ))
    }

    axios.post(url, params, config)
      .then(res => {
      })
      .catch(err => {
      });

    if (++numOfDepth === maxNumOfDepth) {
      this.setState({ open: true, });
    }
    else {
      numOfChoicedImage = 0;
      this.setState({ choicedItemObject: {}, });
      // 백엔드로 골라진 이미지 보내기 API 추가.

      searchClothesRandom(this.setSearchState);
    }
  }
  handleDisabled = () => {
    return numOfChoicedImage;
  }
  handleClose = () => {
    this.setState({ open: false, });
    this.props.history.replace('/');
  }
  componentDidMount() {
    searchClothesRandom(this.setSearchState);
  }

  render() {
    return (
      <div>
        <QueueArim type={['right', 'left']} interval={[200, 300]}
          delay={[0, 1000]} duration={[3000, 5000]}
          ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
        <Card key='1' styles={{ flexGrow: 1, padding: 16, paddingTop: 0 }}>

          <Box border={2} borderRadius={5} style={{
            padding: 24, textAlign: 'center',
            color: 'rgb(128, 128, 128)',
          }}>

            <p style={{ fontSize: 35, marginTop: 10, marginLeft: 10 }}>내 스타일 고르기</p>
            <Box border={2} borderRadius={5} style={{
              padding: 24, textAlign: 'center',
              color: 'rgb(128, 128, 128)',
              marginLeft: 30, marginRight: 30
            }}>
              <span>이 페이지는 옷 추천을 받기 전에 사용자의 취향을 알아보기 위한 페이지입니다.</span>
              <p>
                <span>보여지는 이미지 중에서 </span>
                <span style={{ color: 'red' }}><FavoriteRounded style={{ width: 20, height: 20 }} />취향저격</span>
                <span> 에 성공한 옷을 최대 {maxNumOfChoicedImage}개 골라 주세요!!</span>
              </p>
            </Box>
            <Box border={2} borderRadius={5} style={{
              textAlign: 'center',
              color: 'rgb(128, 128, 128)',
              margin: 30
            }}>
              <Container className={this.props.classes.imagecontainer}>
                <GridList cols={numItemsPerColumn}>
                  {this.state.imgTags.map((img, index) => (
                    <GridListTile className='container' style={{ paddingLeft: "0px", textAlign: "center", }} key={index} cols={img.cols || 1}>
                      <div style={{ overflow: "hidden", justifyContent: "center", alignItems: "center", }}>
                        {img}
                        <div class={!!this.state.choicedItemObject[img.props.id] ? "choiced" : "overlay"}
                          onClick={() => this.handleChoicedClothesId(img.props.id)} />
                      </div>
                    </GridListTile>
                  ))}
                </GridList>
              </Container>
            </Box>
            <div style={{ textAlign: "center", paddingBottom: "3%" }}>
              <Button
                variant="contained" color="secondary"
                disabled={!this.state.canPush} onClick={this.handleChoice}
                size="large">
                <DoneOutlineRounded style={{ marginRight: 20 }} />
                다 골랐어요 !!
            </Button>
            </div>
          </Box>
        </Card>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ textAlign: "center", }}
        >
          <div style={getModalStyle()} className={this.props.classes.paper}>
            <h2 id="simple-modal-title">선호 스타일 선택이 완료되었습니다.</h2>
            <Button
              variant="contained" color="secondary"
              disabled={!this.state.canPush} onClick={() => { this.props.history.replace("/"); }}
              style={{ align: "center" }}>
              <ReplayRounded style={{ marginRight: 20 }} />
              메인으로
          </Button>
          </div>
        </Modal>
        </QueueArim>
      </div>
    );
  };
}

export default withStyles(choicestylejsx)(ChoiceStylePage);