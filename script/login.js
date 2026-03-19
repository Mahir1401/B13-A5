const spinner = document.getElementById('spinner');
const loginBtn = document.getElementById('login-btn');
const loginPage = document.getElementById('login-page');
loginBtn.addEventListener('click', function () {
  loginPage.classList.add('hidden');
  spinner.classList.remove('hidden');

  const usernameValue = document.getElementById('username-input').value;
  const passwordValue = document.getElementById('password-input').value;

  setTimeout(() => {
    if (usernameValue === 'admin' && passwordValue === 'admin123') {
      // alert('Login Successful');
      window.location.assign("./dashboard.html");
    } else {
      // alert('Login Failed');
      spinner.classList.add('hidden');
      loginPage.classList.remove('hidden');
    }
  }, 1000);
});
