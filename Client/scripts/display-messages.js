function displayMessage(message) {
    // If the message "@$/clear" is received, clear the chat
    if (message === "@$/clear") {
        document.getElementById("messages").innerHTML = "";
        return;
    }

    // Parse username and message from received message
    var separatorIndex = message.indexOf(":");
    var username = message.substring(0, separatorIndex).trim();
    var messageText = message.substring(separatorIndex + 1).trim();

    // If the username exists in localStorage and matches the one in the message, add "self" class to the message
    var selfClass = "";
    var alignName = "name-left";
    var storedUsername = localStorage.getItem("username");

    if (storedUsername && username === storedUsername) {
        selfClass = " darker";
        alignName = "name-right";
    }

    // Append the message to the messages container
    var messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML += '<div class="container' + selfClass + '">' +
        '<p>' + messageText + '</p>' +
        '<span class="' + alignName + '">' + username + "</span>" +
        "</div>";
}