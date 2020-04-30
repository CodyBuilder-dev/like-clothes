import SignUp from '../../pages/users/SignUpPage';
import { connect } from 'react-redux';
import { setAuthentication } from '../actions/authenticationActions';

const mapDispatchToProps = dispatch => {
  return { 
    setAuthentication: (isAuthenticated) => dispatch(setAuthentication(isAuthenticated)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
