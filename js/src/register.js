import axios from "../../axios";
const Validator = require('validator')

const submitHandler = () => {
  event.preventDefault();

  let isValid = true
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;

  const emailErr = document.getElementById('email-error')
  const passwrdErr = document.getElementById('password-error')
  const passwrd2Err = document.getElementById('password2-error')

  emailErr.innerHTML = ''
  passwrdErr.innerHTML = ''
  passwrd2Err.innerHTML = ''

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

  if (Validator.isEmpty(password2)) {
    passwrd2Err.innerHTML = "Şifrenizi doğrulamanız gerekiyor";
    isValid = false
  }

  if (password !== password2) {
    passwrd2Err.innerHTML = 'Şifreler uyuşmuyor'
    isValid = false
  }
  
  const registerUser = {
      email,
      password,
      password2
  }

  if (isValid) {
    axios
    .post("/user/register", registerUser)
    .then(res => {
      window.location = '/login.html'
    })
    .catch(err => {
      emailErr.innerHTML = 'Email sistemde kayıtlı'
    });
  }
};

//Exports
window.submitHandler = submitHandler;
