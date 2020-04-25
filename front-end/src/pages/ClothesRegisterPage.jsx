import React, { useState } from 'react';
import '../css/ClothesRegisterPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SearchClothes from '../components/SearchClothes';
import SearchInput from '../components/SearchInput';
import MultipleSelect from '../components/MultipleSelect';
import { searchClothesFunc } from '../module/searchClothesFunc';


// 유저가 직접 업로드하는 사진 로드
function ClothesRegister() {
  const [ previewURL, setPreviewURL ] = useState([]);
  const [ fileState, setFileState ] = useState([]);

  const handleFileInput = e => {
    let file = e.target.files;
    let fileindex = Object.keys(file);

    fileindex.map((i) => {
      let reader = new FileReader();
      reader.readAsDataURL(file[i])
      setFileState(fileState => [...fileState, file[i]])

      reader.onloadend = () => {
        const base64 = reader.result;
        setPreviewURL(previewURL => [...previewURL, base64.toString()]);
      }
    })
  }

  const lenfile = fileState.length;
  let lenList = []
  for (let i = 0; i < lenfile; i++) {
    lenList.push(i.toString());
  }
  
  // 유저가 업로드한 옷 사진 미리보기
  const imagesPreview = lenList.map((i) => {
    return (
      <div className="imagesPreviewDiv">
        <img className="imagesPreview" 
          src={previewURL[i]} width="150px" height="150px">
        </img>
          <button className="imageDeleteButton" 
            onClick={(e) => handleImageDelete(e, i)}>삭제버튼</button>
      </div>
    )
  });

  // 유저가 업로드한 옷 삭제 - 미완성!!! 삭제 이상함 ㅠ ㅠ
  const handleImageDelete = (e, i) => {
    console.log(i,'i는?')
    const calc = (i) => {
      let filterFile = [];
      for (let key=0; key<fileState.length; key++) {
        if (key != i) filterFile.push(fileState[key]);
      }
      return filterFile
    }
    setFileState(calc)
    // setFileState(fileState.filter((i) => (i !== key)))
    setPreviewURL(previewURL.splice(i, 1))
  }

  // 페이지 제출 시 참고하려고 가져왔던 코드
  // const handlePost = async () => {
  //   const formData = new FormData();
  //   formData.append('file', fileState.selectedFile)

  //   const res = await axios.post("/api/upload", formData);
  //   console.log(res);
  // }

  // 검색필터 가져와서 따라해보기
  // 검색할 목록을 가지고 있을 변수
  let searchState = {
    tags: '',
    name: '',
    majors: [],
    middles: [],
    minors: [],
    brands: ''
  }
  // 검색된 결과를 업데이트할 usestate
  const [ searchDataList, setSearchDataList ] = useState([]);
  // 각 타입에서 검색할 목록이 선택된 필터 리스트를 검색할 목록 변수에 저장
  const setSearchFilter = ({type, filterList}) => {
    searchState[type] = filterList
  }
  // 검색할 목록 변수를 가지고 실제 검색해온 데이터 결과를 업데이트
  const setSearchState = (searchDataList) => {
    if (searchDataList.length > 0) {
      setSearchDataList(searchDataList)
    } else alert('검색 결과가 없네욧!');
  };

  // 응답으로 온 데이터 중 한 가지를 선택하고, 그 옷 정보 받아오기
  const [ selectData, setSelectData ] = useState({
    name: '',
    brand: '',
    season: ''
  });
  const searchDataSelect = (e) => {
    new Promise((resolve, reject) => {
      setSearchDataList([searchDataList[e.target.name]])
      resolve(searchDataList[e.target.name])
    }).then((res) => {
      const data = res
      setSelectData({name: data.code_name, brand: data.brand, season: data.season})
    })
  }

  return (
    <div className="WriteClothes" style={{backgroundColor:'white'}}>
      <div className="section">
        <MultipleSelect type="대분류" setSearchFilter={setSearchFilter} />
        <MultipleSelect type="중분류" setSearchFilter={setSearchFilter} />
        <SearchInput type="태그" setSearchFilter={setSearchFilter} />
        <SearchInput type="상품 이름" setSearchFilter={setSearchFilter} />
        <SearchInput type="브랜드" setSearchFilter={setSearchFilter} />
        <button onClick={() => searchClothesFunc(searchState, setSearchState)}>제출</button>
      </div>
      <div className="section">
        {!!searchDataList ? searchDataList.map((searchData, i) => (
          <div key={i} style={{display:'inline', width:"100px", height:'100px'}}>
            <img src={searchData.img} width='70px' height='70px' name={i} onClick={searchDataSelect} />
          </div>
        )) : null}
        {console.log(selectData, '셀렉데이터')}
      </div>
      <div className="section">
        <p className="title imageTitle">이미지 등록</p>
        <input 
          style={{display:"block"}}
          type="file" multiple 
          name="file" 
          onChange={handleFileInput} />
        <div className="imagesPreviewContainer">
          {imagesPreview}
        </div>
      </div>
      <div className="section">
        <p className="title">제품명</p>
        {selectData.name === '' ? <input></input> : <div>{selectData.name}</div> }
      </div>
      <div className="section">
        <p className="title">브랜드명</p>
        {selectData.brand === '' ? <input></input> : <div>{selectData.brand}</div> }
      </div>
      <div className="section">
        <p className="title">제품 소개</p>
        <textarea></textarea>
      </div>
      <div className="section">
        <p className="title">제품 상세 정보</p>
        <table className="tablestyle">
          <thead>
            <tr>
              <th>사이즈</th>
              <th>총장</th>
              <th>어깨</th>
              <th>허리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><input className="tableinput"></input></th>
              <th><input className="tableinput"></input></th>
              <th><input className="tableinput"></input></th>
              <th><input className="tableinput"></input></th>
            </tr>
          </tbody>
        </table>
        <div>
          색상 : 
          {/* checkbox에서 name:전달될 값의 이름 value:전달될 값 */}
          <label><input className="colorDetail" type="checkbox" id="white" value="white" />white</label>
          <label><input className="colorDetail" type="checkbox" id="black" value="black" />black</label>
          <label><input className="colorDetail" type="checkbox" id="red" value="red" />red</label>
          <label><input className="colorDetail" type="checkbox" id="blue" value="blue" />blue</label>
        </div>
        <div>
          계절 : {selectData.season === '' ? <input type='text'></input> : <span>{selectData.season}</span> }
        </div>
      </div>
      <div className="submitButton">
        <Link to="/closet">제출</Link>
      </div>
    </div>
  );
}

export default ClothesRegister;