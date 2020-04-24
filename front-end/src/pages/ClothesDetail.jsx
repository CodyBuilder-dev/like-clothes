import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { Card, Grid, Paper, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const styleSet = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 400,
  },
  button: {
    minWidth: 200,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export default function ClothesInfo() {
  const styles = styleSet();
  const [expanded, setExpanded] = useState(false);
  const [rows, setRows] = useState({});

  useEffect(() => {
    let url = 'http://i02a401.p.ssafy.io:8000/clothes/clothes-item?clothes_item_id=1';
    axios.get(url).then((res) => {
      setRows(res.data);
    });
  }, [])

  return (
    // <Card className={classes.root}>
    <Card className={styles.root}>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <img src={'//image.msscdn.net/images/goods_img/20200416/1406534/1406534_1_500.jpg'} width='100%' height='100%' />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={styles.paper}>제품 소개
                            <p color='red'>안녕</p>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.paper}>제품 사이즈</Paper>
              <TableContainer component={Paper}>
                <Table className={styles.table} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>총장(Length)</TableCell>
                      <TableCell>어깨(Shoulder)</TableCell>
                      <TableCell>허리(Waist)</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell>{rows.clothes_info}</TableCell>
                      <TableCell>{rows.shoulder}</TableCell>
                      <TableCell>{rows.waist}</TableCell> */}
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.paper}> 상세 설명
                            <p color='red'>안녕</p>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Paper className={styles.paper}>옷 이름</Paper>
          <Button className={styles.button} variant="contained" color="primary">
            대여 날짜 선택하기
          </Button>
          <Button className={styles.button} variant="contained" color="primary">
            위시리스트 추가하기
          </Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Avatar className={styles.purple}>HC</Avatar>
          <p>김현철</p>
        </Grid>
      </Grid>
    </Card>
  );
}