import React, { PureComponent } from "react";
import { Card } from '@material-ui/core'
import MultipleSelect from '../components/MultipleSelect';
import { searchClothesFunc } from '../module/searchClothesFunc';
import InfiniteScrollContainer from '../components/InfiniteScrollContainer';

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

  nextPage = () => {
    this.setState({
      ...this.state,
      page: this.state.page + 1,
    })
  }

  render() {
    // const { setUser } = this.props;

    return (
      <Card variant="outlined" style={{padding: 10}}>
        {console.log(this.state)}
        <div style={{ display: "flex", }}>
          <MultipleSelect type="대분류" setSearchFilter={this.setSearchFilter} />
          <MultipleSelect type="중분류" setSearchFilter={this.setSearchFilter} />
          <button onClick={() => searchClothesFunc(this.state, this.setSearchState)}>제출</button>
        </div>

        {this.state.searchDataList.length > 0 &&
          <InfiniteScrollContainer dataList={this.state.searchDataList} initPage={this.state.page} nextPage={this.nextPage} />
        }
      </Card>
    )
  };
};

export default MainPage;