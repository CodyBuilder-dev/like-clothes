import React, { useState } from 'react';
import '../css/ClothesRegisterPage.css';
import axios from 'axios';

import SearchInput from '../components/SearchInput';
import MultipleSelect from '../components/MultipleSelect';
import { searchClothesFunc } from '../module/searchClothesFunc';
import { Search } from '@material-ui/icons'

import { withStyles } from '@material-ui/core/styles';
import { clothesdetailjsx } from '../css/useStyles'
import {
  Card, Box, Grid, Divider,
  TextField, Button, Table, TableCell,
  TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import QueueArim from 'rc-queue-anim';


function ClothesRegister({history}) {
  const styles = clothesdetailjsx();

  // 최종 데이터 전송
  const [sendData, setSendData] = useState({
    clothes_id: '',
    description: '',
    size: '',
    length: 0,
    shoulder: 0,
    waist: 0,
    color: 'black',
    user_img: [],
  })

  const infoValueChange = (e) => {
    const inpValue = e.target.value
    const inpType = e.target.name
    setSendData({ ...sendData, [inpType]: inpValue })
  }

  const infoSubmitButton = () => {
    const url = process.env.REACT_APP_URL + '/clothes/clothes-item'
    const config = { "headers": { "Authorization": localStorage.token } }
    axios.post(url, sendData, config)
      .then((res) => {
        history.push(`/closet?user_email=${localStorage.email}`);
      })
  }

  // // 여기는 현재 필요없는 기능
  // // 유저가 직접 업로드하는 사진 로드
  // const [previewURL, setPreviewURL] = useState([]);
  // const [fileState, setFileState] = useState([]);

  // const handleFileInput = e => {
  //   let file = e.target.files;
  //   let fileindex = Object.keys(file);

  //   fileindex.map((i) => {
  //     // 여기 객체에 제대로 안 들어감. 수정 필요
  //     setSendData(sendData => [{...sendData, user_img: file[i]}])

  //     let reader = new FileReader();
  //     reader.readAsDataURL(file[i])
  //     reader.onloadend = () => {
  //       const base64 = reader.result;
  //       setPreviewURL(previewURL => [...previewURL, base64.toString()]);
  //     }
  //   })
  // }

  // const lenfile = fileState.length;
  // let lenList = []
  // for (let i = 0; i < lenfile; i++) {
  //   lenList.push(i.toString());
  // }

  // // 유저가 업로드한 옷 사진 미리보기
  // const imagesPreview = lenList.map((i) => {
  //   return (
  //     <div key={i} className="imagesPreviewDiv">
  //       <img className="imagesPreview"
  //         src={previewURL[i]} width="100px" height="100px">
  //       </img>
  //       <button className="imageDeleteButton"
  //         onClick={(e) => handleImageDelete(e, i)}>삭제버튼</button>
  //     </div>
  //   )
  // });

  // // 유저가 업로드한 옷 삭제 - 미완성!!! 삭제 이상함 ㅠ ㅠ
  // const handleImageDelete = (e, i) => {
  //   console.log(i, 'i는?')
  //   const calc = (i) => {
  //     let filterFile = [];
  //     for (let key = 0; key < fileState.length; key++) {
  //       if (key != i) filterFile.push(fileState[key]);
  //     }
  //     return filterFile
  //   }
  //   setFileState(calc)
  //   // setFileState(fileState.filter((i) => (i !== key)))
  //   setPreviewURL(previewURL.splice(i, 1))
  // }

  // 검색필터 가져와서 따라함
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
  const [searchDataList, setSearchDataList] = useState([]);
  // 각 타입에서 검색할 목록이 선택된 필터 리스트를 검색할 목록 변수에 저장
  const setSearchFilter = ({ type, filterList }) => {
    searchState[type] = filterList
  }
  // 검색할 목록 변수를 가지고 실제 검색해온 데이터 결과를 업데이트
  const setSearchState = (searchDataList) => {
    if (searchDataList.length > 0) {
      setSearchDataList(searchDataList)
    } else alert('검색 결과가 없네욧!');
  };

  // 응답으로 온 데이터 중 한 가지를 선택하고, 그 옷 정보 받아오기
  const [selectData, setSelectData] = useState({
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
      setSelectData({ name: data.code_name, brand: data.brand, season: data.season })
      setSendData({ ...sendData, clothes_id: data.id })
    })
  }

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


  return (
    <Card className={styles.roots}>
      <QueueArim type={['right', 'left']} interval={[200, 300]}
          delay={[0, 1000]} duration={[3000, 5000]}
          ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
      <Box key='1' border={2} borderRadius={5} className={styles.paper} style={{ paddingLeft: 80, paddingRight: 80 }}>
        <p style={{ fontSize: 30, marginTop: 10 }}>옷 등록하기</p>
        <div className="WriteClothes" style={{ backgroundColor: 'white' }}>
          <Box>
            <p style={{marginBottom:0}}>대분류&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;중분류</p>
            <span style={{ marginRight: 10 }}><MultipleSelect type="대분류" setSearchFilter={setSearchFilter} /></span>
            <span style={{ marginRight: 10 }}><MultipleSelect type="중분류" setSearchFilter={setSearchFilter} /></span>
          </Box>
          <Box>
            <span style={{ marginRight: 10 }}><SearchInput type="태그" setSearchFilter={setSearchFilter} /></span>
            <span style={{ marginRight: 10 }}><SearchInput type="상품 이름" setSearchFilter={setSearchFilter} /></span>
            <span style={{ marginRight: 20 }}><SearchInput type="브랜드" setSearchFilter={setSearchFilter} /></span>
            <Button onClick={() => searchClothesFunc(searchState, setSearchState)} variant="contained" color="secondary" style={{ width: 150, height: 40, marginTop: 20 }}>
              <Search style={{ marginRight: 10 }}></Search>
              상품 검색
            </Button>
          </Box>
          <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
          <div className="section">
            {!!searchDataList ? searchDataList.map((searchData, i) => (
              <div key={i} style={{ display: 'inline', width: "100px", height: '100px' }}>
                <img alt="" src={searchData.img} width='200px' height='200px' name={i} onClick={searchDataSelect} />
              </div>
            )) : null}
          </div>
          <Grid container spacing={1}>
            <Grid style={{ minWidth: 120 }}>
              <p>제품 이름 (필수) :</p>
            </Grid>
            <Grid style={{ paddingLeft: 10, marginRight: 50 }}>
              {selectData.name === '' ? <TextField
                required
                label="Item Name"
                color="secondary"
                margin="dense"
                variant="outlined"
              /> : <p>{selectData.name}</p>}
            </Grid>
            <Grid style={{ minWidth: 130 }}>
              <p>브랜드 이름 (필수) :</p>
            </Grid>
            <Grid style={{ paddingLeft: 10 }}>
              {selectData.brand === '' ? <TextField
                required
                label="Brand Name"
                color="secondary"
                margin="dense"
                variant="outlined"
              /> : <p>{selectData.brand}</p>}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid style={{ minWidth: 125 }}>
              <p>시즌 :</p>
            </Grid>
            <Grid style={{ paddingLeft: 10 }}>
              {(selectData.season === '') || (selectData.season === 'none') ? <TextField
                required
                label="Season"
                color="secondary"
                margin="dense"
                variant="outlined"
              /> : <p>{selectData.season}</p>}
            </Grid>
          </Grid>
          <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
          <Grid container spacing={1}>
            <Grid style={{ minWidth: 130 }}>
              <p>제품 소개 :</p>
            </Grid>
            <Grid sm={7} xs={12} style={{ width: 'calc(100% - 150px)', paddingLeft: 5 }}>
              <TextField
                multiline
                fullWidth
                rows={4}
                label="제품 소개"
                margin="dense"
                color="secondary"
                variant="outlined"
                name='description'
                onChange={infoValueChange}
              />
            </Grid>
          </Grid>
          <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
          <Grid container spacing={1}>
            <Grid style={{ minWidth: 130 }}>
              <p>제품 상세정보 :</p>
            </Grid>
            <Grid sm={7} xs={12} style={{ width: 'calc(100% - 150px)', paddingLeft: 5 }}>
              <TableContainer style={{ padding: 10, marginBottom: 10 }}>
                <Table className={styles.table} size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>사이즈(Size)</StyledTableCell>
                      <StyledTableCell>총장(Length)</StyledTableCell>
                      <StyledTableCell>어깨(Shoulder)</StyledTableCell>
                      <StyledTableCell>허리(Waist)</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" style={{ padding: 0, paddingRight: 5, margin: 0 }}>
                        <TextField
                          label="Size(XS ~ 4XL)"
                          color="secondary"
                          margin="dense"
                          variant="filled"
                          name='size'
                          onChange={infoValueChange} />
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0, paddingRight: 5, margin: 0 }}>
                        <TextField
                          label="Length(cm)"
                          color="secondary"
                          margin="dense"
                          variant="filled"
                          name='length'
                          onChange={infoValueChange} />
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0, paddingRight: 5, margin: 0 }}>
                        <TextField
                          label="Shoulder(cm)"
                          color="secondary"
                          margin="dense"
                          variant="filled"
                          name='shoulder'
                          onChange={infoValueChange} />
                      </TableCell>
                      <TableCell align="center" style={{ padding: 0, margin: 0 }}>
                        <TextField
                          label="Waist(cm)"
                          color="secondary"
                          margin="dense"
                          variant="filled"
                          name='waist'
                          onChange={infoValueChange} />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
            <Button variant="contained" color="primary" onClick={infoSubmitButton}
              style={{ width: 150, marginTop: 40, alignContent: 'right' }}>제출하기</Button>
        </div>
      </Box>
      </QueueArim>
    </Card >
  );
}

export default ClothesRegister;