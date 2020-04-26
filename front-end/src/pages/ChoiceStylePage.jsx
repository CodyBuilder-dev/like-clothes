import React, { PureComponent } from 'react';
import { Card, GridList, GridListTile, CardHeader, CardContent, Modal, Paper, Container, Button } from '@material-ui/core';
import { searchClothesRandom } from '../module/searchClothesRandom';
import { withStyles } from '@material-ui/core/styles';
import { choicestylejsx } from '../css/useStyles';
import '../css/InfiniteScrollContainer.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const nickname = localStorage.nickname;

const numItemsPerColumn = 3, maxNumOfChoicedImage = 5, maxNumOfDepth = 1;
let numOfChoicedImage = 0, numOfDepth = 0;

class ChoiceStylePage extends PureComponent {
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
            <div key={ index }>
              <img src = { searchData.img } id={searchData.id} className={this.props.classes.image} ></img>
              <div class='overlay' onClick={() => this.handleChoicedClothesId(searchData.id)}></div>
            </div>
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
      nextChoicedItemObject[img_id] = img_id;

      this.setState({ choicedItemObject: nextChoicedItemObject, canPush: true, });
    }
    else {
      alert('너무 많이 골랐쪄 뿌잉');
    }
  }
  handleChoice = () => {
    // backend에 고른 옷 인덱스 보내는 api 구현
    if (++numOfDepth == maxNumOfDepth) {
      this.setState({ open: true, });
    }
    else {
      numOfChoicedImage = 0;
      this.setState({ choicedItemObject: {}, });
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
                    {img}
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
        >
          <div style={getModalStyle()} className={this.props.classes.paper}>
            <h2 id="simple-modal-title">잘했어욧! 모두 골랐어욧!</h2>
            <p id="simple-modal-description">
              Main 페이지로 이동합니다.
            </p>
          </div>
        </Modal>
      </div>
    );
  };
}

export default withStyles(choicestylejsx)(ChoiceStylePage);