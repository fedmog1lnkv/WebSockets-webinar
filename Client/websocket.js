// var socket = new WebSocket('wss://localhost:44376/ws'); // for LocalHost
var socket = new WebSocket('ws://158.160.26.1:8080/ws');

socket.onopen = function (event) {
    console.log("WebSocket connected.");
};

socket.onmessage = function (event) {
    console.log("Received message:", event.data);

    displayMessage(event.data);
};