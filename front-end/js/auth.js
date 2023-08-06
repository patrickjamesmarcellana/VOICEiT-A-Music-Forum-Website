import Cookies from "./js.cookie-3.0.5.min.mjs"

function is_logged_in() {
    return Cookies.get("logged_in_as");
}

export default is_logged_in