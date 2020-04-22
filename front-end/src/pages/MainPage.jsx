import React, { PureComponent } from "react";
import MultipleSelect from '../components/MultipleSelect';
import { searchClothesFunc } from '../module/searchClothesFunc';

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
    };
  }

  setSearchState = (searchDataList) => {
    if (searchDataList.length > 0)
      this.setState({
          ...this.state,
          searchDataList: searchDataList,
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

  render() {
    const { setUser } = this.props;
    const searchState = {
      tags: this.state.tags,
      name: this.state.name,
      majors: this.state.majors,
      middles: this.state.middles,
      minors: this.state.minors,
      brands: this.state.brands,
    };

    return (
      <div>
        <div style={{ display: "flex", }}>
          <MultipleSelect type="대분류" setSearchFilter={this.setSearchFilter} />
          <MultipleSelect type="중분류" setSearchFilter={this.setSearchFilter} />
          <button onClick={() => searchClothesFunc(searchState, this.setSearchState)}>제출</button>        
        </div>

        { this.state.searchDataList.length > 0 && this.state.searchDataList.map((searchData, index) => {
            return (
              <div key={ index }>
                <img src = { searchData.img } alt='' width="100" height="100"></img>
              </div>
            )
          }) }


        <button onClick={() => setUser('hyeoncheol', 'suppergrammer@gmail.com')}>김현철 추가 버튼</button>
        <br/>
        내 이름: {this.props.userName}
        <br/>
        내 이메일: {this.props.userEmail}
        <br/>
        
      </div>
    )
  };

};

export default MainPage;