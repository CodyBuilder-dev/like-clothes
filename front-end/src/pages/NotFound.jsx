import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends PureComponent {
  render() {
    const { url } = this.props.match || {};
    return (
      <div>
        <div>
          { url } 페이지를 찾을 수 없습니다.
        </div>
        <div>
          <Link to="/">메인으로 이동</Link>
        </div>
      </div>
    );
  };
};

export default NotFound;