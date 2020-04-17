import React from 'react';
import '../css/ClothesResisterPage.css';
import { Link } from 'react-router-dom';

function ClothesResister() {
    return (
      <div className="WriteClothes">
        <div className="section">
          <p className="title imageTitle">이미지 등록</p>
          <button className="addImageButton">추가</button>
          <div className="images">
            이미지 추가욤
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