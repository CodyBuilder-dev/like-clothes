import React, { PureComponent } from "react";
import { Card, Button, AppBar, Toolbar, Typography, Divider } from '@material-ui/core'
import { pink } from '@material-ui/core/colors'
import MultipleSelect from '../components/MultipleSelect';
import { searchClothesFunc } from '../module/searchClothesFunc';
import InfiniteScrollContainer from '../components/InfiniteScrollContainer';
import SearchInput from '../components/SearchInput';

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
      searchDataList: [],
      page: 0,
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

  setSearchFilter = ({type, filterList}) => {
    this.setState({
      ...this.state,
      [type]: filterList,
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
        {console.log(this.state)}
        <AppBar position="static" style={{ backgroundImage: `url(${Background})` }}>
          <Toolbar style={{height: 100}}>
            <Typography variant="h6" noWrap>
              찾아욧
            </Typography>
            <div style={{ display: "flex", }}>
              <MultipleSelect type="대분류" style={{}} setSearchFilter={this.setSearchFilter} />
              <MultipleSelect type="중분류" setSearchFilter={this.setSearchFilter} />
              <SearchInput type="태그" setSearchFilter={this.setSearchFilter} />
              <SearchInput type="상품 이름" setSearchFilter={this.setSearchFilter} />
              <SearchInput type="브랜드" setSearchFilter={this.setSearchFilter} />
              <button onClick={() => searchClothesFunc(this.state, this.setSearchState)}>제출</button>
            </div>
          </Toolbar>
        </AppBar>
        { this.state.searchDataList.length > 0 &&
          <InfiniteScrollContainer dataList={this.state.searchDataList} initPage={this.state.page} nextPage={this.nextPage} setChoicedImgId={this.setChoicedImgId}/>
        }
      </div>
    )
  };
};

export default MainPage;