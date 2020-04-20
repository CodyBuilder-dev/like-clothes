
// Home
const HOME = "/";

// User
const USER = "/user";
const SIGNIN = "/signin";
const SIGNUP = "/signup";
const SOCIAL_SIGNIN = "/social-signin";
const USER_EMAIL = "/:email";
const PASSWORD = "/password";
const FOLLOW_USER_TOGGLE = "/follow-user-toggle";


// Clothes
const CLOTHES = "/clothes";
const SEARCH_CLOTHES = "/search-clothes";
const SEARCH_CLOTHES_TAG = "/search-clothes-tag";
const MYCLOSET = "/mycloset";
const CLOTHES_ITEM = "/clothes-item"

const routes = {
    // Home
    home: HOME,

    // User
    user : USER,
    signin : SIGNIN,
    signup : SIGNUP,
    social_signin: SOCIAL_SIGNIN,
    user_email: USER_EMAIL,
    password: PASSWORD,
    follow_user_toggle: FOLLOW_USER_TOGGLE,

    // Clothes
    clothes : CLOTHES,
    search_clothes : SEARCH_CLOTHES,
    search_clothes_tag : SEARCH_CLOTHES_TAG,
    mycloset : MYCLOSET,
    clothes_item : CLOTHES_ITEM
}
export default routes;