import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, GridList, GridListTile, CardHeader, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export default function ImageGridList() {
  const styles = useStyles();
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    // let url = 'http://i02a401.p.ssafy.io:8000/clothes/mycloset?user_email=123%40gmail.com';
    let url = 'http://52.78.119.248:5000/ai-server/recommand/clothes-feature'
    // axios.get(url).then((res) => {
    //   setImageData(res.data);
    //   console.log(res.data[0].img);
    // });
    axios.post(url, {
      "img_url": "//image.msscdn.net/images/goods_img/20200420/1410977/1410977_1_500.jpg"
    }).then((res) => {
      console.log(res.data.best_images)
      setImageData(res.data.best_images);
    })
  }, [])

  return (
    <div className={styles.root}>
      <Card>
        <CardHeader>
          Hello
        </CardHeader>
        <CardContent>
          <GridList cellHeight={160} className={styles.gridList} cols={3}>
            {imageData.map((image) => (
              <GridListTile key={image.img} cols={image.cols || 1}>
                <img src={image.img} alt={image.title} />
              </GridListTile>
            ))}
          </GridList>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          Hello
        </CardHeader>
        <CardContent>
          <GridList cellHeight={160} className={styles.gridList} cols={3}>
            {imageData.map((image) => (
              <GridListTile key={image} cols={image.cols || 1}>
                <img src={image} />
              </GridListTile>
            ))}
          </GridList>
        </CardContent>
      </Card>
    </div>
  );
}