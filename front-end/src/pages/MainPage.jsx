import React, { PureComponent } from "react";
import { Grid, Button, AppBar, Toolbar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
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
      <div>
        {console.log(this.state)}
        <AppBar position="fixed" style={{ backgroundImage: `url(${Background})`, paddingLeft:'256px', width:'100%'}}>
          <Toolbar style={{height: 100}}>
            <Grid style={{width:'10%'}} container justify='center'>
              <div><h2>검색해욧</h2></div>
            </Grid>
            <Grid style={{width:'80%'}} container justify="space-evenly" alignItems="center">
              <MultipleSelect type="대분류" setSearchFilter={this.setSearchFilter} />
              <MultipleSelect type="중분류" setSearchFilter={this.setSearchFilter} />              
              <SearchInput type="태그" setSearchFilter={this.setSearchFilter} />
              <SearchInput type="상품 이름" setSearchFilter={this.setSearchFilter} />
              <SearchInput type="브랜드" setSearchFilter={this.setSearchFilter} />
            </Grid> 
            <Grid style={{width:'10%'}} container justify='center'>
              <Button onClick={() => searchClothesFunc(this.state, this.setSearchState)}>
                <SearchIcon style={{color:'white', width:'50px', height:'50px'}}></SearchIcon>
              </Button>
            </Grid>
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