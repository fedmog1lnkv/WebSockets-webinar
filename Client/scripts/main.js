// Открываем всплывающее окно с формой ввода имени
window.onload = function () {
    if (!localStorage.getItem('username')) {
        var username = prompt("Please enter your name:");
        while (username === null || username === "") {
            username = prompt("Please enter your name:");
        }
        setUsername(username);
    }
}

function setUsername(username) {
    localStorage.setItem('username', username);
}

// Форма ввода сообщения
var form = document.getElementById("send-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    var input = document.getElementById("message-input");
    var message = input.value;
    var username = localStorage.getItem('username'); // получаем имя пользователя из localstorage
    if (username !== null || username !== "") {
        if (message) {
            socket.send(username + ': ' + message); // отправляем сообщение со значением из localstorage
            input.value = "";
        }
    }
});

// HTTP Delete на сервер для очистки чата
function clearChat() {
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("http://158.160.26.1:8080/chat/clear", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}