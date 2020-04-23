import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

// semantic-ui-react Dropdown Css
import '../css/ClosetPage.css';
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


function Closet() {
  // 유저의 팔로 리스트 서버에서 받아오기
  const [ routeTarget, setRouteTarget ] = useState('closet');
  const [ followerRes, setFollowerRes ] = useState([]);
  const [ followingRes, setFollowingRes ] = useState([]);
  
  useEffect(() => {
    let follow = ['follower-user', 'following-user', 'follower_edmail', 'following_email']
    for (let i=0; i<2; i++){
      let url = `http://i02a401.p.ssafy.io:8000/user/${follow[i]}`;
      axios.get(url, {'headers': {'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE1ODc0NTQ3NzMsImV4cCI6MTU4NzQ2MTk3M30.uqORKirVsgHeosmtdGJoCwScgxiPjXeB6ceZAjfXK8g'}})
      .then((res) => {
        const followList = res.data;
        // const followList = [{ key: 1, value: 2, flag: 3, text: 4 }, { key: 1, value: 2, flag: 3, text: 4 }];
        console.log(followList)
        followList.forEach((follow) => {
          const followKey = follow.follow[i+2]
          const followImage = follow.profile_img;
          const followNickname = follow.nickname;
          let data = { key: followKey, value: followKey, flag: followImage, text: followNickname }
          if (i === 0) {
            setFollowerRes(followerRes => [...followerRes, data])
          }
          else {
            setFollowingRes(followingRes => [...followingRes, data])
          }
        });
      });
    }
  }, []);
  console.log(followerRes, followingRes, 'state?')

  // 드롭다운 팔로 선택 시 선택된 유저 옷장으로 이동
  const DropdownOnClick = (e) => {
    let target = e.target.innerText;
    setRouteTarget(target);
  }

  // 옷장 소개 수정 - 내 옷장인지 확인 필요
  const [ closetIntro, setClosetIntro ] = useState('유림스옷장');
  const [ isEdit, setIsEdit ] = useState(true);

  const handleIntroClick = (e) => {
    setIsEdit(false)
  }

  const ClosetIntroView = () => ( // true  
    <div>
      <span>{closetIntro}</span>
      <button onClick={handleIntroClick}>수정버튼</button>
    </div>
  );

  const ClosetIntroEdit = () => {  // false
    const [ editIntro, setEditIntro ] = useState(closetIntro);

    const handleIntroChange = (e) => {
      setEditIntro(e.target.value)
    }

    const handleIntroBlur = (e) => {
      setClosetIntro(e.target.value)
      setIsEdit(true)
    }
  
    const handleIntroEnter = (e) => {
      if (e.key === 'Enter') {
      setClosetIntro(e.target.value)
      setIsEdit(true)
      }
    }

    return (
      <div>
        <input type="text" value={editIntro} autoFocus
          onChange={handleIntroChange} onBlur={handleIntroBlur} onKeyPress={handleIntroEnter}></input>
      </div>
    )
  }
  
  // 팔로우 버튼 - 내 옷장 아닌지 확인 필요
  const handleFollowClick = (e) => {

  }
  

  return (
    <div className="myCloset">
      <div className="myInfo">
        <div className="myProfile">
          <span className="profileName">Yulim</span>
          <button onClick={handleFollowClick}> follow </button>
          {isEdit ? <ClosetIntroView /> : <ClosetIntroEdit />}
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
        options={followerRes}
        onChange={DropdownOnClick}
      ></Dropdown>
      <Dropdown
        scrolling={true}
        search
        selection
        options={followingRes}
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