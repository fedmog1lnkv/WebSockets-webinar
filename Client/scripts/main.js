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

// Форма ввода сообщения и отображение сообщений
var socket = new WebSocket('ws://158.160.26.1:8080/ws');
// var socket = new WebSocket('wss://localhost:44376/ws');

socket.onopen = function (event) {
    console.log("WebSocket connected.");
};

socket.onmessage = function (event) {
    console.log("Received message:", event.data);

    // Если получено сообщение "@$/clear", то очищаем чат
    if (event.data === "@$/clear") {
        document.getElementById("messages").innerHTML = "";
        return;
    }

    // Парсим имя пользователя и сообщение из полученного сообщения
    var separatorIndex = event.data.indexOf(':');
    var username = event.data.substring(0, separatorIndex).trim();
    var messageText = event.data.substring(separatorIndex + 1).trim();

    // Если в localstorage есть имя пользователя и оно совпадает с именем в сообщении, добавляем класс "self" к сообщению
    var selfClass = '';
    var alignName = 'name-left';
    var storedUsername = localStorage.getItem('username');
    if (storedUsername && username === storedUsername) {
        selfClass = ' darker';
        alignName = 'name-right';
    }

    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += '<div class="container' + selfClass + '">' +
        '<p>' + messageText + '<p>' +
        '<span class="' + alignName + '">' + username + '</span>' +
        '</div>';
};

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