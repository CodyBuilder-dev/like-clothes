
// Home
const HOME = "/";

// Image
const IMAGE = "/api/image";

// User
const USER = "/api/user";
const SIGNIN = "/signin";
const SIGNUP = "/signup";
const SOCIAL_SIGNIN = "/social-signin";
const USER_EMAIL = "/:email";
const PASSWORD = "/password";
const FOLLOW_USER_TOGGLE = "/follow-user-toggle";
const FOLLOWING_USER = "/following-user"
const FOLLOWER_USER = "/follower-user"


// Clothes
const CLOTHES = "/api/clothes";
const SEARCH_CLOTHES = "/search-clothes";
const SEARCH_CLOTHES_TAG = "/search-clothes-tag";
const MYCLOSET = "/mycloset";
const CLOTHES_ITEM = "/clothes-item";
const WISH_LIST = "/wish-list";
const RANDOM_CLOTHES = "/random-clothes";
const RECORD_USER_CLOTHES = "/record-user-clothes";


// Clothes Reservation
const CLOTHES_RESV = "/api/clothes-resv";

const routes = {
    // Home
    home: HOME,

    // Image
    image: IMAGE,

    // User
    user : USER,
    signin : SIGNIN,
    signup : SIGNUP,
    social_signin: SOCIAL_SIGNIN,
    user_email: USER_EMAIL,
    password: PASSWORD,
    follow_user_toggle: FOLLOW_USER_TOGGLE,
    following_user : FOLLOWING_USER,
    follower_user : FOLLOWER_USER,

    // Clothes
    clothes : CLOTHES,
    search_clothes : SEARCH_CLOTHES,
    search_clothes_tag : SEARCH_CLOTHES_TAG,
    mycloset : MYCLOSET,
    clothes_item : CLOTHES_ITEM,
    wish_list : WISH_LIST,
    random_clothes : RANDOM_CLOTHES,
    record_user_clothes : RECORD_USER_CLOTHES,
    
    // Clothes Reservation
    clothes_resv : CLOTHES_RESV
}
export default routes;