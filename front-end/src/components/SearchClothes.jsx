import React, { Component } from 'react';
// import '../css/ClothesResisterPage.css';
// import Search from 'react-search'
const axios = require('axios');


class SearchClothes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      tags: '',
      name: '',
      majors: '',
      middles: '',
      minors: '',
      brands: 'DOLDOL,EASE',
      searchData: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleInputChange(e) {
    const tgname = e.target.name;
    this.setState({
      [tgname]: e.target.value
    });
  }

  handleSearchClick () {
    let url = `http://i02a401.p.ssafy.io:8000/clothes/search-clothes?brands=${this.state.brands}`;
    let options = {
      method: "GET",
      url: url,
      // data: {
      //   tags: this.state.tags,
      //   name: this.state.name,
      //   majors: this.state.majors,
      //   middles: this.state.middles,
      //   minors: this.state.minors,
      //   brands: this.state.brands
      // }
    };
    axios(options)
      .then((res) => {
        let responseOK = res && res.status === 200 && res.statusText === 'OK';
        if (responseOK) {
          this.setState({
            searchData: res.data
          })
        }
      });
  }

  render() {
    console.log(this.state.searchData)
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
          {/* {this.state.searchData.length && searchData.map(() <img src={this.state.searchData[0].img}></img>} */}
        </div>

        {/* <Search items={this.state.repos}
                multiple={true}
                getItemsAsync={this.getItemsAsync.bind(this)}
                onItemsChanged={this.HiItems.bind(this)}
        ></Search> */}
      </div>
    )
  }
}

export default SearchClothes;