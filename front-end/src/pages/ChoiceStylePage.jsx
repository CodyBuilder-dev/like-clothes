import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
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

export default class ChoiceStylePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgTags: [],
    }
  }

  setSearchState = (searchDataList) => {
    new Promise((resolve, reject) => {
      if (searchDataList.length > 0) {
        let imgList = searchDataList.map((searchData, index) => {
          return (
            <div key={ index }>
              <img src = { searchData.img } alt='' width="300" height="300"></img>
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
        <Card >
          <Grid container spacing={1}>
            <Grid container spacing={3}>
              {this.state.imgTags.length > 0 && this.state.imgTags}
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  };
}