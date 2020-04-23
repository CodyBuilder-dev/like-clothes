import React, { PureComponent } from "react";
import ClothesInfo from "./ClothesInfo";
import ClassificationDropdown from '../components/ClassificationDropdown';
import MultipleSelect from '../components/MultipleSelect';
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
      searchState: {
        majors: [],
        middles: [],
        minors: [],
      },
    };
  }

  componentDidMount() {
    getImage();
  }

  setSearchState = (type, optionList) => {
    if (type === '대분류') 
      this.setState(
        {...this.state,
          searchState: {
            ...this.state.searchState,
            majors: optionList,
          }
        }
      );
    else if (type === '중분류')
      this.setState(
        {...this.state,
          searchState: {
            ...this.state.searchState,
            middles: optionList,
          }
        }
      );
    else if (type === '소분류')
      this.setState(
        {...this.state,
          searchState: {
            ...this.state.searchState,
            minors: optionList,
          }
        }
      );
    else alert('타입 선택 에러');
  };

  render() {
    const { setUser } = this.props;

    return (
      <div>
        { imagePathList.length && showImages }
        <ClothesInfo></ClothesInfo>
        {console.log(this.state)}
        <div style={{ display: "flex", }}>
          <ClassificationDropdown type="대분류" setSearchState={this.setSearchState}/>
          <ClassificationDropdown type="중분류" setSearchState={this.setSearchState}/>
          <MultipleSelect />
          
        </div>

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