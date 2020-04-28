import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, Box, Button, Select, MenuItem, TextField } from '@material-ui/core';
import { Edit, FavoriteBorder } from '@material-ui/icons';
import { closetjsx } from '../css/useStyles'

const baseUrl = process.env.REACT_APP_URL

export default function Closet(props) {
  const styles = closetjsx();

  // 유저의 팔로 리스트 서버에서 받아오기
  const [ followerRes, setFollowerRes ] = useState([]);
  const [ followingRes, setFollowingRes ] = useState([]);
  const [ userState, setUserState ] = useState({ nickname: '', });
  
  // url로부터 유저 정보 받아오기 위해 선언
  const search = props.location.search;
  const params = new URLSearchParams(search);
  let user_email = params.get('user_email');
  
  const [ userClothesInfo, setUserClothesInfo ] = useState([{
    // img: '',
    // id: ''
  }]);
  useEffect(() => {
    // 유저 옷장에 있는 옷들 받아오기
    const closet_url = process.env.REACT_APP_URL + `/clothes/mycloset?user_email=${user_email}`;
    axios.get(closet_url).then((res) => {
      // 유저 옷장으로부터 받아온 데이터를 관리하는 소스 작성 필요
      console.log('mycloset/user_email data:', res.data);
      res.data.map((v) => {
        setUserClothesInfo(userClothesInfo => [...userClothesInfo, {img: v.img, id: v.id}])
      })
    });

    // 유저 정보 받아와 closet 페이지 갱신하기
    const user_url = process.env.REACT_APP_URL + `/user/${user_email}`;

    // user_email에 해당하는 옷장 정보 받아오기
    axios.get(user_url).then((res) => {
      console.log('user/user_email data:', res.data);
      if (res.data.state === 'success') { 
        setUserState(res.data.user);
        setClosetIntro(res.data.user.description);
      }
      else {
        // 모달로 수정 필요?
        // alert(`잘못된 접근입니다.\n메인으로 이동합니다.`);
        // props.history.replace("/");
      }
    });

    var comment = ['follower-user', 'following-user']
    for (let i=0; i<2; i++){
      let url = `${baseUrl}/user/${comment[i]}?user_email=${user_email}`;
      axios.get(url)
      .then((res) => {
        console.log(res,'res.data')
        const followList = res.data;
        followList.forEach((follow) => {
          if (follow.following_email === localStorage.email) { 
            // 나를 팔로우한 유저가 저장 === 내 팔로워
            let data = { email: follow.email, nickname: follow.nickname, img: follow.profile_img }
            setFollowerRes(followerRes => [...followerRes, data])
          } else {
            // 내가 팔로우한 유저가 저장 === 내 팔로잉
            let data = { email: follow.email, nickname: follow.nickname, img: follow.profile_img }
            setFollowingRes(followingRes => [...followingRes, data])
          }
        });
      });
    }
  }, []);

  // 드롭다운 팔로 선택 시 선택된 유저 옷장으로 이동
  const followSelect = (e) => {
    followingRes.forEach((data) => {
      console.log('check data:', data);
      if (data.nickname === e.target.value) {
        props.history.push(`/closet?user_email=${data.email}`);
        window.location.reload(false);
      }
    })
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
        {localStorage.email === user_email && <Edit className={styles.editBtn} onClick={handleIntroClick}></Edit>}
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
      <div className={styles.closetIntro}>
        <span>옷장 소개</span>
        <Edit className={styles.editBtn} onClick={handleIntroClick}></Edit>
        <Card className={styles.closetIntroContent}>
        <TextField type="text" value={editIntro} autoFocus fullWidth='true' variant="outlined"
          onChange={handleIntroChange} onBlur={handleIntroBlur} onKeyPress={handleIntroEnter}></TextField>
        </Card>
      </div>
    )
  }

  return (
    <Grid className={styles.root} style={{backgroundColor:'white'}}>
      <Card>
      <Grid className="myInfo" container style={{padding:'20px'}}>
        <Grid className="myProfile" item xs={4} container direction="row" justify="space-evenly" alignItems="center" >
          <span className="profileName">{userState.nickname}</span>
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
          {console.log(userClothesInfo, '정보?')}
          {userClothesInfo && userClothesInfo.map((v, i) => {
            if (i > 0) {
              return(
                <Link to={`/clothesdetail/?clothes_item_id=${v.id}`}>
                  <img src={v.img} width="150px" height="150px"></img>
                </Link>
              )
            }
          })}
      </Card>
    </Grid>
  )
}
