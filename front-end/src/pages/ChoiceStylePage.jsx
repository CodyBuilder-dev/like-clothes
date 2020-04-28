import React, { Component } from 'react';
import { Card, GridList, GridListTile, Modal, Paper, Container, Button } from '@material-ui/core';
import { searchClothesRandom } from '../module/searchClothesRandom';
import { withStyles } from '@material-ui/core/styles';
import { choicestylejsx } from '../css/useStyles';
import axios from 'axios';
import '../css/InfiniteScrollContainer.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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
const numItemsPerColumn = 3, maxNumOfChoicedImage = 5, maxNumOfDepth = 3;
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
            <img key={index} src = { searchData.img } id={searchData.id}
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
    }).catch((err) => {alert(err)});
  };
  handleChoicedClothesId = (img_id) => {
    const nextChoicedItemObject = this.state.choicedItemObject;
    if (!!this.state.choicedItemObject[img_id]) {
      numOfChoicedImage--;
      delete nextChoicedItemObject[img_id];
      
      this.setState({ choicedItemObject: nextChoicedItemObject, canPush: numOfChoicedImage >= 1, });
    }
    else if (numOfChoicedImage < maxNumOfChoicedImage ) {
      numOfChoicedImage++;
      nextChoicedItemObject[img_id] = true;

      this.setState({ choicedItemObject: nextChoicedItemObject, canPush: true, });
    }
    else {
      alert('너무 많이 골랐쪄 뿌잉');
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
      console.log('누른 데이터 전달:', res);
    })
    .catch(err => {
      console.log(err);
    });

    if (++numOfDepth == maxNumOfDepth) {
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
    this.setState({ open: false, } );
    this.props.history.replace('/');
  }
  componentDidMount() {
    searchClothesRandom(this.setSearchState);
  }

  render() {
    return (
      <div style={{margin: "-30px auto 0px"}}>
        <Paper variant="outlined" className={this.props.classes.titlearea}>
          <span className={this.props.classes.title}>선호 스타일 선택</span>
        </Paper>
        <Paper>
          <span className={this.props.classes.cardheader}> Choice Your Style!</span>
          <Card style={{ marginTop: "4px" }}>
            <Container className={this.props.classes.imagecontainer}>
              <GridList style={{height:"500px", alignContent: "space-around", }} cols={numItemsPerColumn}>
                {this.state.imgTags.map((img, index) => (
                  <GridListTile className='container' style={{paddingLeft: "0px", textAlign:"center", }} key={index} cols={img.cols || 1}>
                    <div style={{ overflow: "hidden", justifyContent: "center", alignItems: "center", }}>
                      {img}
                      <div class={!!this.state.choicedItemObject[img.props.id] ? "choiced" : "overlay"}
                      onClick={() => this.handleChoicedClothesId(img.props.id)} />
                    </div>
                  </GridListTile>
                ))}
              </GridList>
            </Container>
            <div style={{textAlign: "center", paddingBottom: "3%"}}>
            <Button
            variant="contained" color="secondary"
            disabled={!this.state.canPush} onClick={this.handleChoice}>
              좋아욧
            </Button>
            </div>
          </Card>
        </Paper>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          style={{ textAlign: "center", }}
        >
          <div style={getModalStyle()} className={this.props.classes.paper}>
            <h2 id="simple-modal-title">잘했어욧! 모두 골랐어욧!</h2>              
            <Button
            variant="contained" color="secondary"
            disabled={!this.state.canPush} onClick={() => { this.props.history.replace("/"); }}
            style={{ align: "center", }}>
              Main페이지 이동
          </Button>
          </div>
        </Modal>
      </div>
    );
  };
}

export default withStyles(choicestylejsx)(ChoiceStylePage);