$(function() {
    // socket to communicate to main board
    const socket = io('http://localhost:3000');

    // custom user info
    const username = "Paco";
    const avatarImg = "https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/UP2538-CUSA05620_00-AV00000000000108/1563243779000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000";
    // Set the header to display username
    $('.welcome').text(`Welcome to ${username}'s Board!`);

    // references to elements in the DOM
    const body = $('.chat-app');

    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading

        const messageText = $('#m').val();
        $('#m').val('');
        postMessage(messageText);

        return false;
      });

    // socket.on('public board message', function(msg) {
    //     postMessage(msg);
    // });

    function postMessage(msg) {
        const avatar = $('<img class="avatar">').attr('src', avatarImg);
        const user = $('<div class="username">').text(username + ":");
        const text = $('<p class="message-text">').text(msg); 
        const message = $('<li class="message">').append(avatar).append(user).append(text);
        
        $('#messages').last().append(message);
        $('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;

        const pubMsg = {
            username: username,
            message: msg,
            pic: avatarImg
        };

        socket.emit('public message', pubMsg);
    }

    // publish the message to the main board
    function makeMessagePublic(message) {
        socket.emit('public board message', message);
    }   
    
});