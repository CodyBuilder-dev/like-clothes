import SignIn from '../../pages/users/SignInPage';
import { connect } from 'react-redux';
import { setAuthentication } from '../actions/authenticationActions';

const mapStateToProps = (state, props) => {
};

const mapDispatchToProps = dispatch => {
  return { 
    setAuthentication: (isAuthenticated) => dispatch(setAuthentication(isAuthenticated)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
