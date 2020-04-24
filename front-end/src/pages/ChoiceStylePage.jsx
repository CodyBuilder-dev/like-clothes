import React, { PureComponent } from 'react';
import { Card, GridList, GridListTile, CardHeader, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { searchClothesFunc } from '../module/searchClothesFunc';

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
const searchState = {
  tags: '',
  name: '',
  majors: [],
  middles: [],
  minors: [],
  brands: '',
  searchKeyward: '',
}
const numItemsPerColumn = 5;

export default class ChoiceStylePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgTags: [],
      choicedCount: 0,
    }
  }

  setSearchState = (searchDataList) => {
    new Promise((resolve, reject) => {
      if (searchDataList.length > 0) {
        let imgList = searchDataList.map((searchData, index) => {
          return (
            <div key={ index }>
              <img src = { searchData.img } id={searchData.id} alt='' width="300" height="300"></img>
            </div>
          )
        });
        resolve(imgList);
      }
      else reject('error : 검색 결과가 없습니다.');
    }).then((res) => {
      this.setState({
        imgTags: res,
      });
    }).catch((err) => {alert(err)});
  };

  componentDidMount() {
    // 스타일 설정을 위한 이미지 받아오는 API로 차후 변경 필수
    searchClothesFunc(searchState, this.setSearchState);
  }

  render() {
    // const styles = styleSet();
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
          <button >좋아욧</button>
        </div>
      </div>
    );
  };
}