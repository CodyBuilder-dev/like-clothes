// Home
const HOME = "/";

// User
const USER = "/user";
const SIGNIN = "/signin";
const SOCIAL_SIGNIN = "/social-signin";
const CREATE_USER = "/create-user";
const READ_USER = "/read-user/:email";
const READ_ALL_USER = "/read-all-user";
const UPDATE_USER = "/update-user";
const UPDATE_PASSWORD = "/update-password";
const DELETE_USER = "/delete-user/:email";

const routes = {
    // Home
    home: HOME,

    // User
    user: USER,
    signin: SIGNIN,
    social_signin: SOCIAL_SIGNIN,
    create_user: CREATE_USER,
    read_user: READ_USER,
    read_all_user: READ_ALL_USER,
    update_user: UPDATE_USER,
    update_password: UPDATE_PASSWORD,
    delete_user: DELETE_USER,
}
export default routes;