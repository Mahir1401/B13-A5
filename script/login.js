const loginBtn = document.getElementById('login-btn');
console.log(loginBtn)
loginBtn.addEventListener('click',function(e){
  const usernameInput = document.getElementById('username-input');
  const passwordInput = document.getElementById('password-input');
  let usernameValue = usernameInput.value;
  let passwordValue = passwordInput.value;
  if(usernameValue === 'admin' && passwordValue === 'admin123'){
    alert('Login Successful');
    window.location.assign("./dashboard.html");
  }
  else{
    alert('Login Failed');
    return;
  }
});