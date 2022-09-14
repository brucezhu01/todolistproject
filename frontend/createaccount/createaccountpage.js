function hasWhiteSpace(s) {
  return (/\s/).test(s);
}

function onSubmit() {
  const textbox = document.getElementById('new_username_content');
  const username = textbox.value;

  const textbox2 = document.getElementById('new_password_content');
  const password = textbox2.value;

  const textbox3 = document.getElementById('confirm_password_content');
  const confirmPassword = textbox3.value;

  if (password != confirmPassword){
    alert('Passwords not match. Please make sure you enter the same password!')
  } else if (username === '' || password === '') {
    alert('Please don\'t leave anything blank!')
  } else if (hasWhiteSpace(username) === true || hasWhiteSpace(password) === true){
    alert('No whitespaces are allowed in both username and password!')
  } else {
    createaccount_info = {
      username: username,
      password: password,
    };
    json_createaccount_info = JSON.stringify(createaccount_info);

    $.ajax ({
      url: 'http://127.0.0.1:5000/createaccount',
      data: json_createaccount_info,
      type: 'POST',
      contentType: 'application/json'
    }).done(function(res) {
      alert(res.msg);
      console.log(res.status);

      if (res.status === 'Success') {
        window.location.href= "http://127.0.0.1:5500/loginpage/loginpage.html";
      }
    })
  }
}