const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click',function(){
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

const allFilterBtn = document.getElementById('All-filter-btn');
const openFilterBtn = document.getElementById('Open-filter-btn');
const closedFilterBtn = document.getElementById('Closed-filter-btn');

const allSection = document.getElementById('All-section');
const openSection = document.getElementById('Open-section');
const closedSection = document.getElementById('Closed-section');


function toggle(name) {
  allFilterBtn.classList.remove('btn-primary');
  openFilterBtn.classList.remove('btn-primary');
  closedFilterBtn.classList.remove('btn-primary');

  allFilterBtn.classList.add('btn-soft');
  openFilterBtn.classList.add('btn-soft');
  closedFilterBtn.classList.add('btn-soft');

  const selectedBtn = document.getElementById(name)
  selectedBtn.classList.remove('btn-soft');
  selectedBtn.classList.add('btn-primary');

  if(name == 'Open-filter-btn'){
    allSection.classList.add('hidden')
    closedSection.classList.add('hidden')
    openSection.classList.remove('hidden')
  }
  else if(name == 'All-filter-btn'){
    allSection.classList.remove('hidden')
    openSection.classList.add('hidden')
    closedSection.classList.add('hidden')
  }
  else{
    allSection.classList.add('hidden')
    openSection.classList.add('hidden')
    closedSection.classList.remove('hidden')
  }
}

const loadIssues = ()=>{
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((json)=> console.log(json));
};

loadIssues();