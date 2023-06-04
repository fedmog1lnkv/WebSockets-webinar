// Open a pop-up window with the username input form when the page loads if the username doesn't exist in localStorage
window.onload = function () {
    if (!localStorage.getItem("username")) {
        var username = prompt("Please enter your name:");

        // Prompt user to enter their name until a valid input has been provided
        while (username === null || username === "") {
            username = prompt("Please enter your name:");
        }

        setUsername(username);
    }
};

// Save the provided username to localStorage
function setUsername(username) {
    localStorage.setItem("username", username);
}

// Message input form event listener
var form = document.getElementById("send-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the message input and username from localStorage
    var input = document.getElementById("message-input");
    var message = input.value;
    var username = localStorage.getItem("username");

    // Send the message if a user exists and a message has been entered
    if (username !== null || username !== "") {
        if (message) {
            socket.send(username + ": " + message);
            input.value = "";
        }
    }
});

// HTTP DELETE request to clear the chat on the server
function clearChat() {
    var requestOptions = {
        method: "DELETE",
        redirect: "follow",
    };

    fetch("http://158.160.26.1:8080/chat/clear", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}