import React from 'react';
import '../css/ClosetPage.css';
import { Link } from 'react-router-dom';


function Closet() {
  return (
    <div className="myCloset">
      <div className="myInfo">
        <div className="myProfile">
          <span className="profileName">Yulim</span>
        </div>
        <div className="follow">
          <span>Follower</span>
          <span className="followCnt">35</span>
        </div>
        <div className="follow">
          <span>Following</span>
          <span className="followCnt">35</span>
        </div>
      </div>

      <div className="closet">
        <div className="dropMajorDiv">
          <button className="dropMajorBtn">Major</button>
          <div className="dropMajorContent">
            <Link to="/closet">여성</Link>
            <Link to="/closet">남성</Link>
            <Link to="/closet">아동</Link>
          </div>
        </div>
        <div className="dropMiddleDiv">
          <button className="dropMiddleBtn">Middle</button>
          <div className="dropMiddleContent">
            <Link to="/closet">상의</Link>
            <Link to="/closet">하의</Link>
            <Link to="/closet">신발</Link>
          </div>
        </div>
        <div className="dropMinorDiv">
          <button className="dropMinorBtn">Minor</button>
          <div className="dropMinorContent">
            <Link to="/closet">티셔츠</Link>
            <Link to="/closet">니트</Link>
            <Link to="/closet">셔츠</Link>
          </div>
        </div>
        <div className="clothesWrite">
          <Link to="/clothesresister"><button>새 옷</button></Link>
        </div>
      </div>

      <div className="clothesImage">
        <Link to={`/detail/1`}>
          <img src="./logo192.png"></img>
          <p>클릭시 상세페이지로 이동</p>
        </Link>
      </div>
    </div>
  )
}

export default Closet;