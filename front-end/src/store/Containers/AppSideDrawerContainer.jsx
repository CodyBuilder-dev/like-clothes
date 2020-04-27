import AppSideDrawer from '../../components/AppSideDrawer';
import { connect } from 'react-redux';
import { setAuthentication } from '../actions/authenticationActions';

// store에서 데이터를 추출하여 객체를 반환하는 역할.
const mapStateToProps = (state, props) => { // provider로부터 얻은 store가 state이당
  return {
    authentication: {
      isAuthenticated: state.authentication.isAuthenticated,
    },
    props: props,
  }
};

const mapDispatchToProps = dispatch => {
  return { 
    setAuthentication: (isAuthenticated) => dispatch(setAuthentication(isAuthenticated)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSideDrawer);
