import React from 'react';
import { PureComponent } from 'react';
import { NavLink } from 'react-router-dom'
import { GridList, GridListTile, CardContent } from '@material-ui/core';
import '../css/InfiniteScrollContainer.css'

let numOfAPage = 40, page, numItemsPerColumn = 6, tempList = [];
let cols = [3, 1, 2, 1, 1, 2, 1, 1, 2, 1, 3];

export default class InfiniteScrollContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      imageList: [],
    }
  }

  handleScroll = () => {
    if (this.state.isLoading) return;
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
    if (scrollHeight - innerHeight - scrollTop < 100 && !this.state.isLoading) {
      console.log("Almost Bottom Of This Browser");
      this.setState({ ...this.state, isLoading: true, imageList: tempList.slice(0, numOfAPage * ++page) });
      setTimeout(() => { this.setState({ ...this.state, isLoading: false, }) }, 500);
    }
  };

  initPage = () => {
    page = 0;
    console.log(this.props.dataList)
    tempList = this.props.dataList.map((data, index) => {
      return (
        <NavLink key={index} to={`clothesdetail/?clothes_item_id=${data.clothes_item_id}`}>
          <img alt="" src={data.img} width="100%" style={{ minHeight: 225 }} />
          <div class='overlay'></div>
          <p class="containerTitle">{data.code_name}</p>
          <button className='containerBtn' style={{position:'absolute'}}>상세봐욧</button>
        </NavLink>
      )
    });
    this.setState({ ...this.state, isLoading: false, imageList: tempList.slice(0, numOfAPage * ++page) });
    this.props.nextPage();
  }

  componentDidMount() {
    // 스크롤링 이벤트 추가
    window.addEventListener("scroll", this.handleScroll);

  }
  componentWillUnmount() {
    // 언마운트 될때에, 스크롤링 이벤트 제거
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div>
        {this.props.initPage === 0 ? this.initPage() : null}
        <CardContent>
          <GridList cellHeight={225} cols={numItemsPerColumn} style={{}}>
            {this.state.imageList.map((image, index) => (
              <GridListTile className='container' key={index} cols={cols[index % 11]}>
                {image}
              </GridListTile>
            ))}
          </GridList>
        </CardContent>
      </div>
    );
  };
}