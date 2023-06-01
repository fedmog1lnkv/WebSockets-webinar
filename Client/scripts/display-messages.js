function displayMessage(message) {
    // Если получено сообщение "@$/clear", то очищаем чат
    if (message === "@$/clear") {
        document.getElementById("messages").innerHTML = "";
        return;
    }

    // Парсим имя пользователя и сообщение из полученного сообщения
    var separatorIndex = message.indexOf(':');
    var username = message.substring(0, separatorIndex).trim();
    var messageText = message.substring(separatorIndex + 1).trim();

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
}