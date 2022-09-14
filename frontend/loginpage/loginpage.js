function LoginCheck(username, password){
  login_information = {
    username: username,
    password: password,
  };
  json_login_information = JSON.stringify(login_information);

  $.ajax ({
    url: 'http://127.0.0.1:5000/login',
    data: json_login_information,
    type: 'POST',
    contentType: 'application/json'
  }).done(function(res) {
    alert(res.msg);
    if (res.status === 'Success'){
      localStorage.setItem('username_data_localStorage',json_login_information);
      window.location.href= "http://127.0.0.1:5500/mainpage/mainpage.html";
    }
  })
}

function redirectCreateAccount() {
  window.location.href= "http://127.0.0.1:5500/createaccount/createaccountpage.html";
}

function onLogin(){
  const textbox = document.getElementById('username_content');
  const username = textbox.value;

  const textbox2 = document.getElementById('password_content');
  const password = textbox2.value;

  LoginCheck(username, password);
}