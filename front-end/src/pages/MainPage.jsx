import React, { PureComponent } from "react";
import { Grid, Button, AppBar, Toolbar, Card, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search';
import MultipleSelect from '../components/MultipleSelect';
import { searchClothesFunc } from '../module/searchClothesFunc';
import InfiniteScrollContainer from '../components/InfiniteScrollContainer';
import SearchInput from '../components/SearchInput';
import { closetjsx } from '../css/useStyles'
import QueueArim from 'rc-queue-anim';
import { HashLoader } from "react-spinners";
import { css } from "@emotion/core";

const Background = require('../components/Background.jpg')
const override = css`
  display: block:
  margin: 0 auto:
  border-color: red:
  `;


class MainPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      name: '',
      majors: [],
      middles: [],
      minors: [],
      brands: '',
      searchDataList: [],
      page: 0,
      loading: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    console.log("시작입니다. ", this.props)
  }

  componentDidMount() {
    searchClothesFunc(this.state, this.setSearchState);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };


  setSearchState = (searchDataList) => {
    if (searchDataList.length > 0)
      this.setState({
        ...this.state,
        searchDataList: searchDataList,
        page: 0,
        loading: true,
      });
    else alert('검색 결과가 없습니다.');
  };

  setSearchFilter = ({ type, filterList }) => {
    this.setState({
      ...this.state,
      [type]: filterList,
    });
  }

  nextPage = () => {
    this.setState({
      ...this.state,
      page: this.state.page + 1,
    })
  }

  handleScroll(event) {
    // console.log('the scroll things', event.path[1].pageYOffset)
  };



  render() {
    return (
      <div>
        <QueueArim type={['right', 'left']} interval={[200, 300]}
          delay={[0, 1000]} duration={[3000, 5000]}
          ease={['easeOutBack', 'easeInOutCirc']} leaveReverse>
        <AppBar position="fixed" style={{ backgroundImage: `url(${Background})`, paddingLeft: '256px', width: '100%' }}>
          <Toolbar variant='dense' style={{height: 90}}>
            <Grid style={{ width: '10%' }} container justify='center'>
              <h2 style={{ marginTop: 20, marginBottom: 10 }}>검색해욧</h2>
            </Grid>
            <Grid style={{ width: '80%' }} container justify="space-evenly" alignItems="center">
              <MultipleSelect type="대분류" setSearchFilter={this.setSearchFilter} />
              <MultipleSelect type="중분류" setSearchFilter={this.setSearchFilter} style={{ marginRight: '20px' }} />
              <SearchInput type="태그" setSearchFilter={this.setSearchFilter} />
              <SearchInput type="브랜드" setSearchFilter={this.setSearchFilter} />
              <SearchInput type="상품 이름" setSearchFilter={this.setSearchFilter} />
            </Grid>
            <Grid style={{ width: '10%' }} container justify='center'>
              <Button onClick={() => searchClothesFunc(this.state, this.setSearchState)}>
                <SearchIcon style={{ color: 'white', width: '50px', height: '50px' }}></SearchIcon>
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>

        <Card key="1" styles={{ flexGrow: 1, padding: 16 }}>
          {/* {this.state.loading ? <HashLoader css={override} size={100} color={"red"} loading={this.state.loading}></HashLoader>: */}
          <Box border={2} borderRadius={5} style={{
            padding: 24, textAlign: 'center',
            color: 'rgb(128, 128, 128)',
            paddingTop: 55,
          }}>
            {this.state.searchDataList.length > 0 &&
            <InfiniteScrollContainer dataList={this.state.searchDataList} initPage={this.state.page} nextPage={this.nextPage} setChoicedImgId={this.setChoicedImgId} />}
          </Box>
        </Card>
        </QueueArim>
      </div>
    )
  };
};

export default withStyles(closetjsx)(MainPage);