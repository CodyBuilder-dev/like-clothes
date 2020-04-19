import React, { useState } from 'react';
import '../css/ClothesResisterPage.css';
import { Link } from 'react-router-dom';
// import axios from 'axios';

import SearchClothes from '../components/SearchClothes';


function ClothesResister() {
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

  // console.log(fileState, previewURL, 'state체크')
  
  // const handlePost = async () => {
  //   const formData = new FormData();
  //   formData.append('file', fileState.selectedFile)

  //   const res = await axios.post("/api/upload", formData);
  //   console.log(res);
  // }

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

  return (
    <div className="WriteClothes">
      <div className="section">
        <SearchClothes></SearchClothes>
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
          계절 : 
          <label><input className="colorDetail" type="checkbox" id="spring" value="spring" />spring</label>
          <label><input className="colorDetail" type="checkbox" id="summer" value="summer" />summer</label>
          <label><input className="colorDetail" type="checkbox" id="fall" value="fall" />fall</label>
          <label><input className="colorDetail" type="checkbox" id="winter" value="winter" />winter</label>
        </div>
      </div>
      <div className="submitButton">
        <Link to="/closet">제출</Link>
      </div>
    </div>
  );
}
  

export default ClothesResister;