import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../css/Carousel.css';
 
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      itemsInSlide: 1,
      responsive: { 0: { items: 4 } },
      imgList: this.props.imgList,
      carouselList: [],
    };
  }
 
  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide
    this.setState({ currentIndex })
  }
 
  slideNextPage = () => {
    const {
      itemsInSlide,
      galleryItems: { length },
    } = this.state
    let currentIndex = this.state.currentIndex + itemsInSlide
    if (currentIndex > length) currentIndex = length
    this.setState({ currentIndex })
  }
 
  handleOnSlideChange = (event) => {
    const { itemsInSlide, item } = event
    this.setState({ itemsInSlide, currentIndex: item })
  }

  handleImgDelete = (e, i) => {
    console.log(i,'i?');
  }

  componentDidMount() {
    this.getImgList()
  }

  getImgList = () => {
    this.state.imgList.length > 0 && this.setState({ carouselList: this.state.imgList.map((item, i) => {
      let widthVal = '90%'
      return (
        <div>
          {/* <Link to={`/clothesdetail/?clothes_item_id=${item.clothes_item_id}`}> */}
            <div key={i} className="imgDiv" style={{width: widthVal}}>
              <img alt="" className="imgCard" src={item.img} height="300px" />
              <button className="imgDeleteBtn" onClick={(e) => this.handleImgDelete(e, i)}>삭제버튼</button>
            </div>
          {/* </Link> */}
        </div>
      );
    })})
  }
 
  render() {
    const { currentIndex, responsive } = this.state
    // const subscribeList = this.props.imgList;
    // let imgList = (this.state.imgList.length > 0) ? this.state.imgList.map((item, i) => {
    //   let widthVal = '90%'
      // if (subscribeList.length === 1) {
      //   widthVal = '22.5%'
      // } else if (subscribeList.length === 2) {
      //   widthVal = '45%'
      // } else if (subscribeList.length === 3) {
      //   widthVal = '67.5%'
      // }

    return (
      <div>
        <AliceCarousel
          items={this.state.carouselList}
          slideToIndex={currentIndex}
          responsive={responsive}
          onInitialized={this.handleOnSlideChange}
          onSlideChanged={this.handleOnSlideChange}
          onResized={this.handleOnSlideChange}
          dotsDisabled={false}
          mouseTrackingEnabled={true}
          fadeOutAnimation={true}
        />
      </div>
    )
  }
}

export default Carousel;