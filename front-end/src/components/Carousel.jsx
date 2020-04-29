import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
 
class Gallery extends React.Component {
  state = {
    currentIndex: 0,
    itemsInSlide: 1,
    responsive: { 0: { items: 4 } },
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
 
  render() {
    const { currentIndex, responsive } = this.state
    const subscribeList = this.props.imgList;
    const imgList = subscribeList.map((item) => {
      let widthVal = '90%'
      if (subscribeList.length === 1) {
        widthVal = '22.5%'
      } else if (subscribeList.length === 2) {
        widthVal = '45%'
      } else if (subscribeList.length === 3) {
        widthVal = '67.5%'
      }
      return (<img src={item.img} height="300px" width={widthVal} />);
    });

    return (
      <div>
        <AliceCarousel
          items={imgList}
          slideToIndex={currentIndex}
          responsive={responsive}
          onInitialized={this.handleOnSlideChange}
          onSlideChanged={this.handleOnSlideChange}
          onResized={this.handleOnSlideChange}
          dotsDisabled='false'
          mouseTrackingEnabled='true'
          fadeOutAnimation='true'
        />
      </div>
    )
  }
}

export default Gallery;