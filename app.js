const users = [
  {
    name: 'Kathalina',
    lastName: 'Meneses',
    username: 'kath',
    password: '123',
  },
  {
    name: 'Lesly',
    lastName: 'Carmona',
    username: 'lesly',
    password: '123456789',
  },
]

/**
 * This function will make a request to API Users
 * and will render the name and the image
 */
function printTheUsers() {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://reqres.in/api/users?page=2');

  request.onload = function () {
    var data = JSON.parse(this.response);

    data.data.forEach(user => {
      var div = document.createElement('div');
      div.className = 'login-box';
      div.style.textAlign = 'center';
      div.innerHTML = "<p>" + user.first_name + " " + user.last_name + "</p>" +
                      "<img src=" + user.avatar + " />";
      document.getElementById('login-box').appendChild(div);
    });
  }

  request.send();
}

/**
 * Validate if the user exists in the database.
 * Show a message if the user are successfully loged
 * or if there are an error.
 * Show a message if one of the fields requieres are empety
 */
function login() {
  var form = document.querySelector('#form');
  var info = document.querySelector('#info-messages');

  var usernameElement = document.querySelector('#username');
  var passwordElement = document.querySelector('#password');

  var username = usernameElement.value;
  var password = passwordElement.value;

  username === '' ? usernameElement.classList.add('is-invalid') : usernameElement.classList.remove('is-invalid');
  password === '' ? passwordElement.classList.add('is-invalid') : passwordElement.classList.remove('is-invalid');

  if (username === '' || password === '') {
    return;
  }

  userExists = users.find((user) => {
    return user.username === username && user.password === password;
  });

  form.style.display = 'none';

  // Validate if exists and
  if (userExists) {
    info.innerText = `Hi, ${username} they are your friends`
    printTheUsers();
  } else {
    info.innerHTML = 'There are an error with you username or password'
  }
}