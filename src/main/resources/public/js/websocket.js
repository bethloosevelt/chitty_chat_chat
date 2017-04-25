//Establish the WebSocket connection and set up event handlers
var webSocket = new WebSocket("wss://" + location.hostname + ":" + location.port + "/chat/");
var username;
var guid;
var message;
var newUser = true;
webSocket.onmessage = function (msg) { updateChat(msg); };
webSocket.onclose = function () { alert("WebSocket connection closed") };
webSocket.onopen = function () {
    username = prompt("What would you like your username to be?");
    guid = Guid.raw();
    var sendObject = {
      type: "message",
      username: username,
      newUser: newUser,
      id: guid,
      date: Date.now()
    };
    webSocket.send(JSON.stringify(sendObject));
    newUser = false;
};

//Send message if "Send" is clicked
id("send").addEventListener("click", function () {
    sendMessage(id("message").value);
});

//Send message if enter is pressed in the input field
id("message").addEventListener("keypress", function (e) {
    if (e.keyCode === 13) { sendMessage(e.target.value); }
});

//Send a message if it's not empty, then clear the input field
function sendMessage(message) {
    if (message !== "") {
        var sendObject = {
          type: "message",
          username: username,
          text: message,
          newUser: newUser,
          id: guid,
          date: Date.now()
        };
        webSocket.send(JSON.stringify(sendObject));
        id("message").value = "";
    }
}

//Update the chat-panel, and the list of connected users
function updateChat(msg) {
    var data = JSON.parse(msg.data);
    insert("chat", data.userMessage);
    id("userlist").innerHTML = "";
    data.userlist.forEach(function (user) {
        insert("userlist", "<li>" + user + "</li>");
    });
}

//Helper function for inserting HTML as the first child of an element
function insert(targetId, message) {
    id(targetId).insertAdjacentHTML("afterbegin", message);
}

//Helper function for selecting element by id
function id(id) {
    return document.getElementById(id);
}
