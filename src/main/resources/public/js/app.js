//Establish the WebSocket connection and set up event handlers
var webSocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/chat/");
var username;
var guid;
var message;
var newUser = true;
webSocket.onmessage = function (msg) { updateChat(msg); };
webSocket.onclose = function () {
  $.notify(
    "It seems that you have been inactive for a while. We have disconnected you from the server.", 
    { 
      globalPosition:"top",
      className: "error",
      autoHide: false
    }
  );
};

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
    var emoji = new EmojiConvertor();
    var userMessage = emoji.replace_emoticons(data.userMessage);
    insert("chat", userMessage);
    id("userlist").innerHTML = "";
    data.userlist.forEach(function (user) {
        insert("userlist", "<li>" + user + "</li>");
    });
    insert("userlist", "<strong>" + "Users: " + data.userlist.length + "</strong>");
}

//Helper function for inserting HTML as the first child of an element
function insert(targetId, message) {
    id(targetId).insertAdjacentHTML("afterbegin", message);
}

// open emoji menu on emoji button pressed
$('#emojisBtn').click(function() {
  $('#message').jemoji('open');
});

// show chat
function displayChat() {
  $('.display-first').hide();
  $('.display-after').removeClass('display-after');
}

// user entered a username 
id("usernameInput").addEventListener("keypress", function (e) {
    username = document.getElementById("usernameInput").value;
    if (e.keyCode === 13 && username && username !== "") {
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
      displayChat();
    }
});

// user pressed generate random username button
$('#randomUsernameBtn').click(function() {
  username = faker.name.findName();
  $.notify(
    "Generated a random anonymous name for you. Welcome " + username + "!", 
    { 
      globalPosition:"top",
      className: "success",
      autoHideDelay: 10000, 
    }
  );
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
  displayChat();
});

//Helper function for selecting element by id
function id(id) {
    return document.getElementById(id);
}

$('#message').jemoji();