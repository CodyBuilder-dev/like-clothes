import React, { Component } from 'react';
import search from '../module/searchClothesFunc'
const axios = require('axios');

class SearchClothes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: '',
      name: '',
      majors: '남',
      middles: '상의',
      minors: '',
      brands: '',
      searchDataList: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  // 검색하는 input 값의 변화를 setState
  handleInputChange(e) {
    const tgname = e.target.name;
    this.setState({
      [tgname]: e.target.value
    });
  }

  // 옷의 정보를 쿼리로 요청해서 DB데이터를 검색
  handleSearchClick() {
    console.log(this.state.majors, this.state.middles, this.state.minors)
    let url = `http://i02a401.p.ssafy.io:8000/clothes/search-clothes?tags=${this.state.tags}&code_names=${this.state.name}&majors=${this.state.majors}&minors=${this.state.minors}&middles=${this.state.middles}&brands=${this.state.brands}`;
    console.log(url,'url')
    let options = {
      method: "GET",
      url: url
    };
    axios(options)
      .then((res) => {
        let responseOK = res && res.status === 200 && res.statusText === 'OK';
        if (responseOK) {
          this.setState({
            searchDataList: res.data
          })
        }
      });
  }

  // 응답으로 온 이미지 중 한 가지를 선택
  searchDataSelect = (e) => {
    let searchDataList = this.state.searchDataList
    for (let i=0; i<searchDataList.length; i++) {
      let tmp = 'http:' + searchDataList[i].img
      if (tmp === e.target.src) {
        this.setState({
          searchDataList: [searchDataList[i]]
        })
      }
    }
  }


  render() {
    return (
      <div>
        <div className="searchTags">
          Tags : <input className="searchTags" 
                  value={this.state.tags} name="tags"
                  onChange={this.handleInputChange}></input>
        </div>
        <div className="searchName">
          Name : <input className="searchName"
                  value={this.state.name} name="name"
                  onChange={this.handleInputChange}></input>
        </div>
        <div className="searchMajors">
          Majors : <input className="searchMajors"
                    value={this.state.majors} name="majors"
                    onChange={this.handleInputChange}></input>
        </div>
        <div className="searchMiddles">
          Middles : <input className="searchMiddles"
                      value={this.state.middles} name="middles"
                      onChange={this.handleInputChange}></input>
        </div>
        <div className="searchMinors">
          Minors : <input className="searchMinors"
                    value={this.state.minors} name="minors"
                    onChange={this.handleInputChange}></input>
        </div>
        <div className="searchBrands">
          Brands : <input className="searchBrands"
                    value={this.state.brands} name="brands"
                    onChange={this.handleInputChange}></input>
        </div>
        <button type="submit" onClick={this.handleSearchClick}>검색</button>

        <div className="searchResultPreview">
          {this.state.searchDataList.length ? this.state.searchDataList.map((searchData, i) => (
            <div key={i}>
              <div>제품명:{searchData.code_name}</div>
              <div>대분류:{searchData.major}</div>
              <div>중분류:{searchData.middle}</div>
              <div>소분류:{searchData.minor}</div>
              <img src={searchData.img} width="150px" height="150px" onClick={this.searchDataSelect}></img>
            </div>
          )) : null}
        </div>
      </div>
    )
  }
}

export default SearchClothes;