import React, { PureComponent } from "react";
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
  constructor(props) {
    super(props);
    this.state = {
      test: 'help..',
    };
  }

  componentDidMount() {
    getImage();
  }


  render() {
    const { setUser } = this.props;
    return (
      <div>
        { imagePathList.length && showImages }
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