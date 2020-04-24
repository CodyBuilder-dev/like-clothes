import React, { PureComponent } from "react";
import { Card, Button, AppBar, Toolbar, Typography, Divider } from '@material-ui/core'
import { pink } from '@material-ui/core/colors'
import MultipleSelect from '../components/MultipleSelect';
import { searchClothesFunc } from '../module/searchClothesFunc';
import InfiniteScrollContainer from '../components/InfiniteScrollContainer';
import { Redirect } from 'react-router-dom';

const Background = require('../components/Background.jpg')

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      name: '',
      majors: [],
      middles: [],
      minors: [],
      brands: '',
      searchKeyward: '',
      searchDataList: [],
      page: 0,
      choicedImgId: -1,
    };
  }

  componentDidMount() {
    searchClothesFunc(this.state, this.setSearchState);
  }

  setSearchState = (searchDataList) => {
    console.log(this.state);
    if (searchDataList.length > 0)
      this.setState({
        ...this.state,
        searchDataList: searchDataList,
        page: 0,
      });
    else alert('검색 결과가 없습니다.');
  };

  setSearchFilter = (type, filterList) => {
    switch (type) {
      case '대분류':
        this.setState({
          ...this.state,
          majors: filterList,
        });
        break;
      case '중분류':
        this.setState({
          ...this.state,
          middles: filterList,
        });
        break;
      case '소분류':
        this.setState({
          ...this.state,
          minors: filterList,
        });
        break;
      default:
        alert('타입 선택 에러!');
    }
  }

  setChoicedImgId = (clothes_id) => {
    this.setState({
      ...this.state,
      choicedImgId: clothes_id,
    });
  }

  nextPage = () => {
    this.setState({
      ...this.state,
      page: this.state.page + 1,
    })
  }

  render() {
    // const { setUser } = this.props;

    return (
      // <Card variant="outlined" style={{padding: 10}}>
      <div>
        <AppBar position="static" style={{ backgroundImage: `url(${Background})` }}>
          <Toolbar style={{height: 100}}>
            <Typography variant="h6" noWrap>
              찾아욧
            </Typography>
            {console.log(this.state)}
            <div style={{ display: "flex", }}>
              <MultipleSelect type="대분류" style={{}} setSearchFilter={this.setSearchFilter} />
              <MultipleSelect type="중분류" setSearchFilter={this.setSearchFilter} />
              <button onClick={() => searchClothesFunc(this.state, this.setSearchState)}>제출</button>
            </div>
          </Toolbar>
        </AppBar>
        { this.state.searchDataList.length > 0 &&
          <InfiniteScrollContainer dataList={this.state.searchDataList} initPage={this.state.page} nextPage={this.nextPage} setChoicedImgId={this.setChoicedImgId}/>
        }
        {/* 선택된 이미지 누르면 id를 전달함과 함께  */}
        {this.state.choicedImgId !== -1 && <Redirect to={`clothesdetail/?clothes_id=${this.state.choicedImgId}`}/>}
      </div>
    )
  };
};

export default MainPage;