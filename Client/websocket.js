// Create a WebSocket object to establish a connection with the server running on LocalHost at port 44376
// var socket = new WebSocket('wss://localhost:44376/ws'); // for LocalHost

// Create a WebSocket object to establish a connection with the server running on IP address 158.160.26.1 at port 8080
var socket = new WebSocket('ws://158.160.26.1:8080/ws');

// Event listener that executes when the WebSocket is successfully connected to the server
socket.onopen = function (event) {
    console.log("WebSocket connected.");
};

// Event listener that executes whenever the WebSocket receives a message from the server
socket.onmessage = function (event) {
    console.log("Received message:", event.data);

    // Display the message received from the server by calling the "displayMessage" function
    displayMessage(event.data);
};