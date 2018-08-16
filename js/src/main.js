import "bootstrap";
import "mdbootstrap";
import jwt_decode from "jwt-decode";

if (localStorage.getItem("token")) {
  const decoded = jwt_decode(localStorage.getItem("token"));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    const args = ["auth", "token", "userId"];
    args.map(arg => localStorage.removeItem(arg));
    window.location = "/";
  }
}
