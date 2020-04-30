import React, { PureComponent } from 'react';
import { TextField, FormLabel } from '@material-ui/core';

const decodeTypeKorToEng = (type) => {
  switch (type) {
    case '태그':
      return 'tags';
    case '상품 이름':
      return 'name';
    case '브랜드':
      return 'brands';
    default:
      return '';
  }
}

export default class SearchInput extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    this.props.setSearchFilter({ type: decodeTypeKorToEng(this.props.type), filterList: e.target.value })
  }

  render() {
    return (
      // <TextField type="text" placeholder={this.props.type} onChange={this.handleChange} style={{ marginRight: 20 }} />
      // {/* <FormLabel component='legend' style={{ color: 'white', display: 'inline' }}>{this.props.type}</FormLabel> */}
      <TextField type="text" required variant="outlined" margin="dense"
        style={{
          backgroundColor: 'white', borderRadius: '5px', border: 'solid 2px black', width: '18%', margin: 0, marginTop: 10
        }}
        placeholder={this.props.type} onChange={this.handleChange} />

    );
  }
}