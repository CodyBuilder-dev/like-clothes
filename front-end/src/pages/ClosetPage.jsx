import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar, ListItem, ListItemAvatar,
  Card, Box, Grid, MenuItem, Select, TextField, Button,
} from '@material-ui/core';
import { Edit, FavoriteBorder, Favorite, AddRounded } from '@material-ui/icons';
import { closetjsx } from '../css/useStyles'
import QueueArim from 'rc-queue-anim';

const baseUrl = process.env.REACT_APP_URL
const config = { "headers": { "Authorization": localStorage.token } }

export default function Closet(props) {
  const styles = closetjsx();

  const [followerRes, setFollowerRes] = useState([]);
  const [followingRes, setFollowingRes] = useState([]);
  const [userState, setUserState] = useState({ nickname: '', });
  const [userEmail, setUserEmail] = useState('');

  // url로부터 유저 정보 받아오기 위해 선언 user_email => 옷장 주인
  const search = props.location.search;
  const params = new URLSearchParams(search);
  let user_email = params.get('user_email');

  // 유저의 팔로 리스트 서버에서 받아오기
  const [userClothesInfo, setUserClothesInfo] = useState([{ img: '', id: '' }]);
  const [heartFill, setHeartFill] = useState(false);

  useEffect(() => {
    if (!localStorage.token) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      localStorage.removeItem('isAuthenticated');
      alert('로그인 해 주세욧 >_');
      window.location.href="/"
    }

    setUserEmail(user_email);
    // 유저 옷장에 있는 옷들 받아오기
    const closet_url = process.env.REACT_APP_URL + `/clothes/mycloset?user_email=${user_email}`;
    axios.get(closet_url).then((res) => {
      // 유저 정보로부터 받아온 등록된 옷 정보
      setUserClothesInfo(res.data.map((v) => ({ img: v.img, id: v.id })));
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
    let followChkList = [];
    const wer_url = `${baseUrl}/user/follower-user?user_email=${user_email}`;
    axios.get(wer_url)
      .then((res) => {
        const followerList = res.data;
        followChkList = followerList.map((follow) => (
          { email: follow.email, nickname: follow.nickname, img: follow.profile_img }
        ));
        setFollowerRes(followChkList);
        return followChkList;
      }).then(res => {
        if (user_email !== localStorage.email) {
          const followChkList = res;
          // 지금 유저랑 팔로우 관계인지 확인하고 하트 상태 갱신
          let isHeartFill = false;
          followChkList.forEach((follower) => {
            if (follower.email === localStorage.email) {
              // 여기 있으면 나는 팔로우 관계니까 하트를 색칠해라 !
              isHeartFill = true;
            }
          });
          setHeartFill(isHeartFill);
        }
      })

    // following-user 받아오기
    const wing_url = `${baseUrl}/user/following-user?user_email=${user_email}`;
    setFollowingRes([]);
    axios.get(wing_url)
      .then((res) => {
        const followingList = res.data;
        followingList.forEach((follow) => {
          let data = { email: follow.email, nickname: follow.nickname, img: follow.profile_img }
          setFollowingRes(followingRes => [...followingRes, data])
        });
      });
  }, [user_email]);

  // 드롭다운 팔로우 선택 시 선택된 유저 옷장으로 이동
  const followSelect = (e) => {
    const name = e.target.name
    if (name === 'follower') {
      followerRes.forEach((data) => {
        if (data.nickname === e.target.value) {
          props.history.push(`/closet?user_email=${data.email}`);
        }
      })
    } else {
      followingRes.forEach((data) => {
        if (data.nickname === e.target.value) {
          props.history.push(`/closet?user_email=${data.email}`);
        }
      })
    }
  }

  // 팔로우 예쁘게 토글~*_*
  const handleFollowClick = () => {
    const url = baseUrl + '/user/follow-user-toggle';
    axios.post(url, { "following_email": userEmail }, config)
      .then((res) => {
        setHeartFill(res.data.desc === 'Follow');
      })
      .then(() => {
        let followChkList = [];
        const wer_url = `${baseUrl}/user/follower-user?user_email=${user_email}`;
        axios.get(wer_url)
          .then((res) => {
            const followerList = res.data;
            followChkList = followerList.map((follow) => (
              { email: follow.email, nickname: follow.nickname, img: follow.profile_img }
            ));
            setFollowerRes(followChkList);
          })
      })
  };

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
    <div>
      <p style={{ marginBottom: 10 }}><span style={{ fontSize: 22, marginRight: 10 }}>옷장 소개</span>
        {localStorage.email === userEmail && <Edit className={styles.editBtn} onClick={handleIntroClick}></Edit>}</p>
      <Box border={2} borderRadius={5} className={styles.paper}>{closetIntro}</Box>
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
      <div>
        <p style={{ marginBottom: 10 }}><span style={{ fontSize: 22, marginRight: 10 }}>옷장 소개</span>
          <Edit className={styles.editBtn} onClick={handleIntroClick}></Edit></p>

        <Box border={2} borderRadius={5} style={{ margin: 0 }}>
          <TextField type="text" color="secondary" value={editIntro} autoFocus fullWidth='true' variant="outlined"
            onChange={handleIntroChange} onBlur={handleIntroBlur} onKeyPress={handleIntroEnter}></TextField>
        </Box>
      </div>
    )
  }

  return (
    <Card className={styles.roots}>
      <QueueArim type={['right', 'left']} interval={[200, 300]}
        delay={[0, 1000]} duration={[3000, 5000]}
        ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
        <Box key='1' border={2} borderRadius={5} className={styles.paper}>
          <p style={{ fontSize: 30, marginTop: 10, marginLeft: 10 }}>내 옷장</p>
          <Grid className={styles.root} style={{ backgroundColor: 'white' }}>
            <Card variant='outlined'>
              <Grid className="myInfo" container style={{ padding: '20px', paddingBottom: 0 }}>
                <Grid item xs={1}></Grid>
                <Grid className="myProfile" item xs={3} container direction="row" justify="space-evenly">
                  <ListItem style={{ padding: 0, marginTop: 12, marginLeft: 20 }}>
                    <ListItemAvatar>
                      <Avatar src={userState.profile_img} style={{ width: 50, height: 50, marginRight: 20 }}>
                      </Avatar>
                    </ListItemAvatar>
                    <div style={{ marginRight: '20px', display: 'inline', width: '150px', overflow: 'hidden', wordWrap: 'break-word' }}>{userState.nickname}</div>
                    {!!localStorage.isAuthenticated && (heartFill ?
                      <Favorite style={{ visibility: userEmail === localStorage.email ? "hidden" : "visible", }}
                        onClick={handleFollowClick}></Favorite>
                      : <FavoriteBorder style={{ visibility: userEmail === localStorage.email ? "hidden" : "visible", }}
                        onClick={handleFollowClick}></FavoriteBorder>)}
                  </ListItem>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid className="followingfollower" item xs={7} container alignItems="center">
                  <p className="followTag" style={{ fontSize: 20, marginRight: 15 }}>팔로워 :</p>
                  <Box className="clothesImage" border={2} borderRadius={5} align="center" style={{ width: 100, padding: 5, marginRight: 50 }}>
                    <span className="followCnt" style={{ width: 50 }}>{followerRes.length}
                      <Select className={styles.followDrop} name='follower' value="" onChange={followSelect}
                      >{followerRes.map((follower) => (
                        <MenuItem key={follower.email} value={follower.nickname}>
                          <ListItem style={{ padding: 0, paddingRight: 20 }}>
                            <ListItemAvatar>
                              <Avatar src={follower.img}>
                              </Avatar>
                            </ListItemAvatar>
                            <span>{follower.nickname}</span>
                          </ListItem>
                        </MenuItem>
                      ))}</Select></span>
                  </Box>
                  <p className="followTag" style={{ fontSize: 20, marginRight: 15 }}>팔로잉 :</p>
                  <Box className="clothesImage" border={2} borderRadius={5} align="center" style={{ width: 100, padding: 5 }}>
                    <span className="followCnt">{followingRes.length}
                      <Select className={styles.followDrop} name='following' value="" onChange={followSelect}
                      >{followingRes.map((following) => (
                        <MenuItem key={following.email} value={following.nickname}>
                          <ListItem style={{ padding: 0, paddingRight: 20 }}>
                            <ListItemAvatar>
                              <Avatar src={following.img}>
                              </Avatar>
                            </ListItemAvatar>
                            <span>{following.nickname}</span>
                          </ListItem></MenuItem>
                      ))}</Select></span>
                  </Box>
                </Grid>
              </Grid>
              <Grid>
                <div style={{ margin: 15, padding: 15 }}>
                  {isEdit ? <ClosetIntroView /> : <ClosetIntroEdit />}

                  <p style={{ marginTop: 30, marginBottom: 10 }}><span style={{ fontSize: 22, marginRight: 10 }}>등록된 옷 보기</span></p>
                  <Box border={2} borderRadius={5} className={styles.paper}>
                    {userClothesInfo.length > 0 ? userClothesInfo.map((v, i) => (
                      <NavLink to={`/clothesdetail/?clothes_item_id=${v.id}`} key={i}>
                        <img alt="" src={v.img} width="150px" height="150px" style={{ margin: '5px' }}></img>
                      </NavLink>
                    )) : <p>옷장에 옷이 없어요...</p>}
                  </Box>
                </div>
              </Grid>
            </Card>
            <Box className="closet">
              <Grid className="clothesWrite" container justify="flex-end">
                {localStorage.email === userEmail && <NavLink to="/clothesregister" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" size="medium" color="secondary" className={styles.button} style={{ marginRight: 20, marginTop: 20 }}>
                    <AddRounded style={{ marginRight: 20 }} />
                새 옷 등록하기
                </Button>
                </NavLink>}
              </Grid>
            </Box>
          </Grid>
        </Box>
      </QueueArim>
    </Card>
  )
}
