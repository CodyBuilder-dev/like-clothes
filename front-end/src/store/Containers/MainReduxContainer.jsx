import MainPage from '../../pages/MainPage';
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions';

// store에서 데이터를 추출하여 객체를 반환하는 역할.
const mapStateToProps = (state, props) => { // provider로부터 얻은 store가 state이당
  console.log('state', state)
  console.log('props', props)
  return {
    userName: state.user.name,
    userEmail: state.user.email,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (name, email) => dispatch(setUser(name, email)), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
