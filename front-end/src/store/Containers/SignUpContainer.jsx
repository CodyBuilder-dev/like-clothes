import SignUp from '../../pages/users/SignUp';
import { connect } from 'react-redux';
import { setAuthentication } from '../actions/authenticationActions';

const mapDispatchToProps = dispatch => {
  return { 
    setAuthentication: (isAuthenticated) => dispatch(setAuthentication(isAuthenticated)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
