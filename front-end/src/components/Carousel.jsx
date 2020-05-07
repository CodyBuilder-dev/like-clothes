import React from 'react';
import { NavLink } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel';
import DeleteIcon from '@material-ui/icons/Delete';
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

  componentDidMount() {
    this.getImgList()
  }

  getImgList = () => {
    this.state.imgList.length > 0 && this.setState({ carouselList: this.state.imgList.map((item, i) => {
      let widthVal = '90%'
      if (this.state.imgList.length === 1) {
        widthVal = '22.5%'
      } else if (this.state.imgList.length === 2) {
        widthVal = '45%'
      } else if (this.state.imgList.length === 3) {
        widthVal = '67.5%'
      }
      return (
        <div>
            <div key={i} className="imgDiv" style={{width: widthVal}}>
              <NavLink to={`/clothesdetail/?clothes_item_id=${item.clothes_item_id}`}>
                <img alt="" className="imgCard" src={item.img} height="300px" />
              </NavLink>
              { this.props.type === 'delete' &&
              <span className="imgDeleteBtn" onClick={() => this.props.deleteBtn(i)}>
                <DeleteIcon></DeleteIcon></span> }
            </div>
        </div>
      );
    })})
  }
 
  render() {
    const { currentIndex, responsive } = this.state
    return (
      <div>
        <AliceCarousel
          items={this.state.carouselList}
          slideToIndex={currentIndex}
          responsive={responsive}
          onInitialized={this.handleOnSlideChange}
          onSlideChanged={this.handleOnSlideChange}
          onResized={this.handleOnSlideChange}
          dotsDisabled='false'
          fadeOutAnimation={true}
          infinite={false}
        />
      </div>
    )
  }
}

export default Carousel;