import axios from "../../axios";
const Validator = require('validator')

const submitHandler = () => {
  let isValid = true
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailErr = document.getElementById("email-error")
  const passwrdErr = document.getElementById("password-error")

  const logUserIn = {
    email,
    password
  };

  if (Validator.isEmpty(email)) {
    emailErr.innerHTML = "Email yazmanız gerekiyor";
    isValid = false
  }

  if (!Validator.isEmail(email)) {
    emailErr.innerHTML = "Email geçersiz";
    isValid = false
  }

  if (Validator.isEmpty(password)) {
    passwrdErr.innerHTML = "Şifre girmeniz gerekiyor";
    isValid = false
  }

  if (!Validator.isLength(password, { min: 4, max: 16 })) {
    passwrdErr.innerHTML =
      "Şifrenizin 4 karakterle 16 karakter arası olması gerekiyor";
      isValid = false
  }

  if(isValid) {
    axios
    .post("/user/login", logUserIn)
    .then(res => {
      localStorage.setItem('auth', true)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.id)
        window.location = '/'
    })
    .catch(err => {
      emailErr.innerHTML = 'Email bulunamadı'
    });
  }
  
};

window.onload = function checkAuth() {
  if (this.localStorage.getItem("auth") !== null) {
    window.location = "/";
  }
};

//Exports
window.submitHandler = submitHandler;
