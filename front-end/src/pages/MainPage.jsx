import React, { PureComponent } from "react";
import ClothesInfo from "./ClothesInfo";
// import axios from 'axios';

let imagePathList = [
    { id: 1, path: '/assets/images/my_photo.jpg' }
    , { id: 2, path: 'assets/images/my_photo.jpg' }
    , { id: 3, path: 'assets/images/my_photo.jpg' }
  ];

const getImage = () => {
  // 서버로부터 이미지 받아오기


}
const showImages = imagePathList.map((imageObj, index) => {
  console.log(imageObj);
  return (
    <div key={ index }>
      <img src = { imageObj.path } alt='' width="100" height="100"></img>
    </div>
  )
});

class MainPage extends PureComponent {

  componentDidMount() {
    getImage();
  }

  render() {
    return (
      <div>
        { imagePathList.length && showImages }
        <ClothesInfo></ClothesInfo>
      </div>
    )
  };

};

export default MainPage;