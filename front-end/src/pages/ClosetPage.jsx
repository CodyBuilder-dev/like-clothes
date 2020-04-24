import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, Box, Button, Select, MenuItem } from '@material-ui/core';
import { Edit, FavoriteBorder } from '@material-ui/icons';
import { closetjsx } from '../css/useStyles'

const baseUrl = process.env.REACT_APP_URL

export default function Closet() {
  const styles = closetjsx();

  // 유저의 팔로 리스트 서버에서 받아오기
  const [ routeTarget, setRouteTarget ] = useState('closet');
  const [ followerRes, setFollowerRes ] = useState([]);
  const [ followingRes, setFollowingRes ] = useState([]);

  useEffect(() => {
    var comment1 = ['follower-user', 'following-user']
    for (let i=0; i<2; i++){
      let url = `${baseUrl}/user/${comment1[i]}`;
      console.log(localStorage.token, '토큰')
      axios.get(url, {'headers': {'Authorization': localStorage.token}})
      .then((res) => {
        const followList = res.data;
        followList.forEach((follow) => {
          if (follow.following_email === localStorage.email) { 
            // 나를 팔로우한 유저가 저장 === 내 팔로워
            let data = { email: follow.follower_email, nickname: follow.nickname, img: follow.profile_img }
            setFollowerRes(followerRes => [...followerRes, data])
          } else {
            // 내가 팔로우한 유저가 저장 === 내 팔로잉
            let data = { email: follow.following_email, nickname: follow.nickname, img: follow.profile_img }
            setFollowingRes(followingRes => [...followingRes, data])
          }
        });
      });
    }
  }, []);

  // 드롭다운 팔로 선택 시 선택된 유저 옷장으로 이동
  const followSelect = (e) => {
    let target = e.target.value;
    setRouteTarget(target);
  }

  // 팔로우 버튼 - 내 옷장 아닌지 확인 필요
  const handleFollowClick = (e) => {

  }

  // 옷장 소개 수정 - 내 옷장 인지 확인 필요
  const [ closetIntro, setClosetIntro ] = useState('내 옷장에 온 걸 환영해');
  const [ isEdit, setIsEdit ] = useState(true);

  const handleIntroClick = (e) => {
    setIsEdit(false)
  }

  const ClosetIntroView = () => ( // true  
      <div className={styles.closetIntro}>
        <span>옷장 소개</span>
        <Edit className={styles.editBtn} onClick={handleIntroClick}></Edit>
        <Card className={styles.closetIntroContent}>{closetIntro}</Card>
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

  return (
    <Grid className={styles.root} style={{backgroundColor:'white'}}>
      <Card>
      <Grid className="myInfo" container style={{padding:'20px'}}>
        <Grid className="myProfile" item xs={4} container direction="row" justify="space-evenly" alignItems="center" >
          <span className="profileName">Yulim</span>
          <FavoriteBorder onClick={handleFollowClick}></FavoriteBorder>
        </Grid>
        <Grid className="following" item xs={4} container direction="column" alignItems="center">
          <span className="followTag">Follower</span>
          <span className="followCnt">{followerRes.length}
          <Select className={styles.followDrop} onChange={followSelect} 
          >{followerRes.map((follower) => (
            <MenuItem key={follower.email} value={follower.nickname}><img src={follower.img} width='20px' height='20px'/> {follower.nickname}</MenuItem>
          ))}</Select></span>
        </Grid>
        <Grid className="following" item xs={4} container direction="column" alignItems="center">
          <span className="followTag">Following</span>
          <span className="followCnt">{followingRes.length}
          <Select className={styles.followDrop} onChange={followSelect}
          >{followingRes.map((following) => (
            <MenuItem key={following.email} value={following.nickname}><img src={following.img} width='20px' height='20px'/> {following.nickname}</MenuItem>
            ))}</Select></span>
        </Grid>
      </Grid>
      <Grid>
        {isEdit ? <ClosetIntroView /> : <ClosetIntroEdit />}
        {routeTarget !== 'closet' && <Redirect to={routeTarget}></Redirect>}
      </Grid>
      </Card>

      <Box className="closet">
        <div className="dropMajorDiv">
        </div>
        <div className="dropMiddleDiv">
        </div>
        <div className="dropMinorDiv">
        </div>

        <Grid className="clothesWrite" container justify="flex-end">
          <Link to="/clothesregister"><Button>새 옷 등록하기</Button></Link>
        </Grid>
      </Box>

      <Card className="clothesImage">
        <Link to={`/detail/1`}>
          <img src="./logo192.png"></img>
          <p>클릭시 상세페이지로 이동</p>
        </Link>
      </Card>
    </Grid>
  )
}
