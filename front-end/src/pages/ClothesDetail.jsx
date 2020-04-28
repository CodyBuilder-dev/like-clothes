import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Box, Grid, Divider,
  Typography, Button, Avatar, Table, TableCell,
  TableContainer, TableHead, TableRow, GridList, GridListTile } from '@material-ui/core';
import { LocalShipping, FavoriteRounded } from '@material-ui/icons'
import { clothesdetailjsx } from '../css/useStyles'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function ClothesDetail(props) {
  const styles = clothesdetailjsx();
  const [item, setItem] = useState({});
  const [recommend, setRecommend] = useState([]);
  const [others, setOthers] = useState([]);

  useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const clothes_item_id = params.get('clothes_item_id');
    const url = process.env.REACT_APP_URL + `/clothes/clothes-item?clothes_item_id=4`;
    axios.get(url).then((res) => {
      console.log(res.data);
      setItem(res.data);
    });
  }, [])

  useEffect(() => {
    const url = process.env.REACT_APP_AI_URL + '/recommand/clothes-set'
    axios.post(url, {
      "img_url": "http://image.msscdn.net/images/goods_img/20200420/1410977/1410977_1_500.jpg"
    }).then((res) => {
      console.log(res.data);
      setRecommend(res.data);
    })
  }, [])

  return (
    <Card className={styles.root}>
      {console.log(recommend)}
      <Box border={2} borderRadius={5} className={styles.paper}>
        <Grid container spacing={1}>
          <Grid item md={5} sm={12}>
            {item.clothes_info && <img src={item.clothes_info[0].img} width="100%" />}
            <CardContent>
              <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                상품명
              </Typography>
              <Typography gutterBottom variant="h5" color="textPrimary" component="p">
                <Box fontWeight="fontWightBold" fontSize={25}>
                  {item.clothes_info && item.clothes_info[0].brand} {item.clothes_info && item.clothes_info[0].code_name}
                </Box>
              </Typography>
              <Typography gutterBottom variant="h5" color="textPrimary" component="p">
                <Box fontWeight="fontWightBold" fontSize={13}>
                  {item.clothes_info && `${item.clothes_info[0].major} > ${item.clothes_info[0].middle} > ${item.clothes_info[0].minor}`}
                </Box>
              </Typography>
            </CardContent>
          </Grid>
          <Divider orientation="vertical" flexItem style={{ margin: 30 }} />
          <Grid item md={6} sm={12} justify="center">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" color="textPrimary" component="p">
                  <Box fontWeight="fontWightBold" fontSize={30} m={1}>
                    상품 정보
                    </Box>
                </Typography>
                <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                  상품 태그
                  </Typography>
                <Typography variant="h6" component="h2" style={{ marginLeft: 10 }}>
                  {item.clothes_tags &&
                    (item.clothes_tags[0].tag === null ? '없음' :
                      item.clothes_tags[0].tag)}
                </Typography>
                <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                  상품 상세정보
                  </Typography>
                <TableContainer style={{ padding: 10, marginBottom: 10 }}>
                  <Table className={styles.table} size="small">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">Brand</StyledTableCell>
                        <StyledTableCell align="center">CodeName</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">{item.clothes_info && item.clothes_info[0].brand}</TableCell>
                        <TableCell align="center">{item.clothes_info && item.clothes_info[0].code_name}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
                <TableContainer style={{ padding: 10, marginBottom: 10 }}>
                  <Table className={styles.table} size="small">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">상품번호</StyledTableCell>
                        <StyledTableCell align="left">색상</StyledTableCell>
                        <StyledTableCell align="left">성별</StyledTableCell>
                        <StyledTableCell align="left">Season</StyledTableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">{item.clothes_info && item.clothes_info[0].id}</TableCell>
                        <TableCell align="left">{item.clothes_info && item.clothes_info[0].color}</TableCell>
                        <TableCell align="left">{item.clothes_info && item.clothes_info[0].gender}</TableCell>
                        <TableCell align="left">{item.clothes_info && item.clothes_info[0].season}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                  상품 사이즈
                  </Typography>
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
                        <TableCell align="left">{item.clothes_info && item.clothes_info[0].size}</TableCell>
                        <TableCell align="center">{item.clothes_info && item.clothes_info[0].length}</TableCell>
                        <TableCell align="center">{item.clothes_info && item.clothes_info[0].shoulder}</TableCell>
                        <TableCell align="center">{item.clothes_info && item.clothes_info[0].waist}</TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                  상세 설명
                </Typography>
                <Typography variant="h6" component="h2" style={{ marginLeft: 10 }}>
                  {item.clothes_info && item.clothes_info[0].description}
                </Typography>
                <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                  판매자 정보
                </Typography>
                <Box style={{ marginLeft: 10 }}>
                  {item.clothes_info && item.clothes_info[0].nickname}
                </Box>
                <Divider style={{ margin: 20, marginLeft: 0, marginRight: 0 }} />
                <Grid container spacing={1}>
                  <Grid item sm={6} xs={12}>
                    <Button variant="contained" size="medium" color="primary" className={styles.button}>
                      <LocalShipping style={{ marginRight: 20 }} />
                      구독해욧
                    </Button>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Button variant="contained" size="medium" color="secondary" className={styles.button}>
                      <FavoriteRounded style={{ marginRight: 20 }} />
                      좋아욧
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box border={2} borderRadius={5} className={styles.paper}>
        <Typography gutterBottom variant="h5" color="textPrimary" component="p">
          <Box fontWeight="fontWightBold" fontSize={25} m={1}>
            AI 추천 서비스
                    </Box>
        </Typography>
        <GridList className={styles.gridList} cols={5} cellHeight={300} style={{ width: '100%', marginTop: 15, marginBottom: 30 }}>
          {recommend.best_images && (recommend.best_images.map((item) => (
            <GridListTile key={item} height="300px">
              <img src={item} height="100%"/>
            </GridListTile>
          )))}
        </GridList>
        <Typography gutterBottom variant="h5" color="textPrimary" component="p">
          <Box fontWeight="fontWightBold" fontSize={25} m={1}>
            판매자가 올린 다른 옷 보기
                    </Box>
        </Typography>
        <Typography gutterBottom variant="h5" color="textPrimary" component="p">
          <Box fontWeight="fontWightBold" fontSize={25} m={1}>
            이런 옷은 어떠세요??
                    </Box>
        </Typography>
        <GridList className={styles.gridList} cols={5} cellHeight={300} style={{ width: '100%', marginTop: 15, marginBottom: 30 }}>
          {recommend.worst_images && (recommend.worst_images.map((item) => (
            <GridListTile key={item} height="300px">
              <img src={item} height="100%"/>
            </GridListTile>
          )))}
        </GridList>
      </Box>
    </Card >
  );
}