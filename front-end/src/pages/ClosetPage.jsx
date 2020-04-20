import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

import '../css/ClosetPage.css';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function Closet() {
  const [ routeTarget, setRouteTarget ] = useState('closet');
  const [ followerRes, setFollowerRes ] = useState([]);
  
  useEffect(() => {
    let url = `http://i02a401.p.ssafy.io:8000/user/follower-user`;
    axios.get(url, {'headers': {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE1ODczOTc0MTksImV4cCI6MTU4NzQwNDYxOX0.W_5Ljqjd-wNKTdqaD_erKv57LXxZB2Aa2BkNecHfBmM'}})
      .then((res) => {
        const followerList = res.data;
        followerList.forEach((follower) => {
          const followerKey = follower.follower_email;
          const followerImage = follower.profile_img;
          const followerNickname = follower.nickname;
          let data = { key: followerKey, value: followerKey, flag: followerImage, text: followerNickname }
          setFollowerRes(followerRes => [...followerRes, data])
        });
      });
  }, []);

  const Options = followerRes

  const DropdownOnClick = (e) => {
    let target = e.target.innerText;
    setRouteTarget(target);
  }

  const ProfileNameEdit = (e) => {
    
  }

  return (
    <div className="myCloset">
      <div className="myInfo">
        <div className="myProfile">
          <span className="profileName">Yulim</span>
          <input type="text"></input>
          <button onClick={ProfileNameEdit}>수정버튼</button>
          <span>환영한다</span>
          <button>수정버튼</button>
        </div>
        <div className="follow">
          <span className="followTag">Follower</span>
          <span className="followerCnt">35</span>
          <span className="followerList">
            <span className="followerBtn">얍</span>
            <div className="followerDrop">
              <Link to="/">swim</Link>
              <Link to="/">jhj</Link>
              <Link to="/">kim</Link>
            </div>
          </span>
        </div>
        <div className="follow">
          <span className="followTag">Following</span>
          <span className="followingCnt">35</span>
        </div>
      </div>
      <Dropdown
        scrolling={true}
        search
        selection
        options={Options}
        onChange={DropdownOnClick}
      ></Dropdown>

      {routeTarget !== 'closet' && <Redirect to={routeTarget}></Redirect>}

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