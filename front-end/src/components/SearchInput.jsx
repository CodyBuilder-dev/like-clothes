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
    this.props.setSearchFilter({type: decodeTypeKorToEng(this.props.type), filterList: e.target.value})
  }

  render() {
    return (
        // {/* <FormLabel component='legend' style={{ color: 'white', display: 'inline' }}>{this.props.type}</FormLabel> */}
        <TextField type="text" required
        style={{backgroundColor:'pink', borderRadius:'2px', width:'140px', margin:'15px 0 0 0'}}
        placeholder={this.props.type} onChange={this.handleChange} />
    );
  }
}