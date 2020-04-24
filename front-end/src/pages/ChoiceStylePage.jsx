import React, { PureComponent } from 'react';
import { Card, GridList, GridListTile, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { Redirect, Link } from 'react-router-dom';
import { searchClothesRandom } from '../module/searchClothesRandom';

const styleSet = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 400,
  },
  button: {
    minWidth: 200,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const nickname = localStorage.nickname;

const numItemsPerColumn = 5, maxNumOfChoicedImage = 5, maxNumOfDepth = 1;
let numOfChoicedImage = 0, numOfDepth = 0;

export default class ChoiceStylePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgTags: [],
      choicedItemObject: {},
      canPush: false,
      isSuccess: false,
    }
  }

  setSearchState = (searchDataList) => {
    new Promise((resolve, reject) => {
      if (searchDataList.length > 0) {
        let imgList = searchDataList.map((searchData, index) => {
          return (
            <div key={ index }>
              <img src = { searchData.img } id={searchData.id} alt='' width="300" height="300" onClick={() => this.handleChoicedClothesId(searchData.id)}></img>
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
      console.log(this.state);
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
      this.setState({ isSuccess: true, });
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
  
  goMainPage = () => {
    alert('모두 선택하셨어욧! Main 페이지로 이동합니다.');
    return (
      <Redirect to="/" />
    );
  }

  componentDidMount() {
    // 스타일 설정을 위한 이미지 받아오는 API로 차후 변경 필수
    searchClothesRandom(this.setSearchState);
  }
  shouldComponentUpdate(newProps, newState) {
    return this.state !== newState;
  }
  render() {
    let success = this.state.isSuccess;
    return (
      <div>
        <div>
          {nickname}님께서 입고 싶은 옷을 선택해주세요!
          <br/>
          이후에 저희 서비스에서 {nickname}님께서 좋아하실 만한 옷을 추천해드리겠습니다~
        </div>
        <Card>
          <CardHeader>
            Choice Your Style
          </CardHeader>
          <CardContent>
            <GridList cols={numItemsPerColumn}>
              {this.state.imgTags.map((img, index) => (
                <GridListTile key={index} cols={img.cols || 1}>
                  {img}
                </GridListTile>
              ))}
            </GridList>
          </CardContent>
        </Card>
        <div>
          <button disabled={!this.state.canPush} onClick={this.handleChoice}>좋아욧</button>
        </div>
        
        { success && this.goMainPage() }
      </div>
    );
  };
}