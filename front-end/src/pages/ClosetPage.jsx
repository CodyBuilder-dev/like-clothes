import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Card, Box, Grid, Divider, MenuItem, Select,
  Typography, TextField, Button, Table, TableCell,
  TableContainer, TableHead, TableRow, InputLabel
} from '@material-ui/core';
import { Edit, FavoriteBorder, Favorite } from '@material-ui/icons';
import { closetjsx } from '../css/useStyles'

const baseUrl = process.env.REACT_APP_URL
const config = { "headers": { "Authorization": localStorage.token } }

export default function Closet(props) {
  const styles = closetjsx();

  const [followerRes, setFollowerRes] = useState([]);
  const [followingRes, setFollowingRes] = useState([]);
  const [userState, setUserState] = useState({ nickname: '', });

  // url로부터 유저 정보 받아오기 위해 선언 user_email => 옷장 주인
  const search = props.location.search;
  const params = new URLSearchParams(search);
  let user_email = params.get('user_email');

  // 유저의 팔로 리스트 서버에서 받아오기
  const [userClothesInfo, setUserClothesInfo] = useState([{ img: '', id: '' }]);
  const [heartFill, setHeartFill] = useState(false);

  useEffect(() => {
    // 유저 옷장에 있는 옷들 받아오기
    const closet_url = process.env.REACT_APP_URL + `/clothes/mycloset?user_email=${user_email}`;
    axios.get(closet_url).then((res) => {
      // 유저 정보로부터 받아온 등록된 옷 정보
      console.log(res.data, '얜가?')
      res.data.map((v) => {
        setUserClothesInfo(userClothesInfo => [...userClothesInfo, { img: v.img, id: v.id }])
      })
    });

    // 유저 정보 받아와 closet 페이지 갱신하기
    const user_url = process.env.REACT_APP_URL + `/user/${user_email}`;
    axios.get(user_url).then((res) => {
      if (res.data.state === 'success') {
        setUserState(res.data.user);
        setClosetIntro(res.data.user.description);
      }
      else {
        // 모달로 수정 필요?
        alert(`잘못된 접근입니다.\n메인으로 이동합니다.`);
        props.history.replace("/");
      }
    });

    // follower-user 받아오기
    const followChkList = Array();
    const wer_url = `${baseUrl}/user/follower-user?user_email=${user_email}`;
    axios.get(wer_url)
      .then((res) => {
        const followerList = res.data;
        followerList.forEach((follow) => {
          let data = { email: follow.email, nickname: follow.nickname, img: follow.profile_img }
          followChkList.push(data);
          setFollowerRes(followerRes => [...followerRes, data])
        });
        return followChkList;
      }).then(res => {
        if (user_email !== localStorage.email) {
          const followChkList = res;
          // 지금 유저랑 팔로우 관계인지 확인하고 하트 상태 갱신
          followChkList.forEach((follower) => {
            if (follower.email === localStorage.email) {
              // 여기 있으면 나는 팔로우 관계니까 하트를 색칠해라 !
              setHeartFill(true)
            }
          });
        }
      })

    // following-user 받아오기
    const wing_url = `${baseUrl}/user/following-user?user_email=${user_email}`;
    axios.get(wing_url)
      .then((res) => {
        const followingList = res.data;
        followingList.forEach((follow) => {
          let data = { email: follow.email, nickname: follow.nickname, img: follow.profile_img }
          setFollowingRes(followingRes => [...followingRes, data])
        });
      });
  }, []);

  // 드롭다운 팔로우 선택 시 선택된 유저 옷장으로 이동
  const followSelect = (e) => {
    const name = e.target.name
    if (name === 'follower') {
      followerRes.forEach((data) => {
        if (data.nickname === e.target.value) {
          props.history.push(`/closet?user_email=${data.email}`);
          window.location.reload(false);
        }
      })
    } else {
      followingRes.forEach((data) => {
        if (data.nickname === e.target.value) {
          props.history.push(`/closet?user_email=${data.email}`);
          window.location.reload(false);
        }
      })
    }
  }

  // 팔로우 예쁘게 토글~*_*
  const handleFollowClick = () => {
    const url = baseUrl + '/user/follow-user-toggle';
    axios.post(url, { "following_email": user_email }, config)
      .then(() => {
        window.location.reload(false);
      })
  }

  // 옷장 소개 수정
  const [closetIntro, setClosetIntro] = useState(userState.description);
  const [isEdit, setIsEdit] = useState(true);

  const ClosetIntroUpdate = (data) => {
    const url = baseUrl + '/user';
    axios.put(url, { "description": data }, config)
  }

  const handleIntroClick = () => {
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
    const [editIntro, setEditIntro] = useState(closetIntro);

    const handleIntroChange = (e) => {
      setEditIntro(e.target.value)
    }

    const handleIntroBlur = (e) => {
      const newData = e.target.value
      setClosetIntro(newData)
      setIsEdit(true)
      ClosetIntroUpdate(newData)
    }

    const handleIntroEnter = (e) => {
      const newData = e.target.value
      if (e.key === 'Enter') {
        setClosetIntro(newData)
        setIsEdit(true)
        ClosetIntroUpdate(newData)
      }
    }

    return (
      <div className={styles.closetIntro}>
        <span style>옷장 소개</span>
        <Edit className={styles.editBtn} onClick={handleIntroClick}></Edit>
        <TextField type="text" color="secondary" value={editIntro} autoFocus fullWidth='true' variant="outlined"
          onChange={handleIntroChange} onBlur={handleIntroBlur} onKeyPress={handleIntroEnter}></TextField>
      </div>
    )
  }

  return (
    <Card className={styles.roots}>
      <Box border={2} borderRadius={5} className={styles.paper}>
        <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10 }}>내 옷장</p>

        <Grid className={styles.root} style={{ backgroundColor: 'white' }}>
          <Card>
            <Grid className="myInfo" container style={{ padding: '20px' }}>
              <Grid className="myProfile" item xs={4} container direction="row" justify="space-evenly" alignItems="center" >
                <img src={userState.profile_img} width="70px" height="70px"></img>
                <span className="profileName">{userState.nickname}</span>
                {user_email !== localStorage.email &&
                  (heartFill ? <Favorite onClick={handleFollowClick}></Favorite> : <FavoriteBorder onClick={handleFollowClick}></FavoriteBorder>)
                }
              </Grid>
              <Grid className="following" item xs={4} container direction="column" alignItems="center">
                <span className="followTag">Follower</span>
                <span className="followCnt">{followerRes.length}
                  <Select className={styles.followDrop} name='follower' onChange={followSelect}
                  >{followerRes.map((follower) => (
                    <MenuItem key={follower.email} value={follower.nickname}><img src={follower.img} width='20px' height='20px' /> {follower.nickname}</MenuItem>
                  ))}</Select></span>
              </Grid>
              <Grid className="following" item xs={4} container direction="column" alignItems="center">
                <span className="followTag">Following</span>
                <span className="followCnt">{followingRes.length}
                  <Select className={styles.followDrop} name='following' onChange={followSelect}
                  >{followingRes.map((following) => (
                    <MenuItem key={following.email} value={following.nickname}><img src={following.img} width='20px' height='20px' /> {following.nickname}</MenuItem>
                  ))}</Select></span>
              </Grid>
            </Grid>
            <Grid>
              {isEdit ? <ClosetIntroView /> : <ClosetIntroEdit />}
            </Grid>
          </Card>

          <Box className="closet">
            <Grid className="clothesWrite" container justify="flex-end">
              {localStorage.email === user_email && <Link to="/clothesregister"><Button>새 옷 등록하기</Button></Link>}
            </Grid>
          </Box>

          <Card className="clothesImage">
            {userClothesInfo && userClothesInfo.map((v, i) => {
              if (i > 0) return (
                <Link to={`/clothesdetail/?clothes_item_id=${v.id}`}>
                  <img src={v.img} width="150px" height="150px"></img>
                </Link>
              )
            }
            )}
          </Card>
        </Grid>
      </Box>
    </Card>
  )
}
