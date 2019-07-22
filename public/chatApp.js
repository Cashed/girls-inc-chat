$(function() {
    // socket to communicate to main board
    const socket = io('http://110.131.226.150:3000');

    // custom user info
    // TODO: set this to your liking!
    const username = "___________";
    const avatarImg = "https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/UP2538-CUSA05620_00-AV00000000000108/1563243779000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000";
   
    // Set the header to display username
    $('.welcome').text(`Welcome to ${username}'s Board!`);

    // references
    const body = $('.chat-app');

    // listen to the "send" button and post the message
    $('form').submit(function(e){
        e.preventDefault(); // prevents page reloading

        // get the message text from the input
        const messageText = $('#m').val();

        // set the input to be blank afterwards
        $('#m').val('');

        // TODO: post the message to the board
        postMessage(messageText);

        return false;
    });

    // TODO: let others post to this board
    // write function here


    // function for posting a message
    function postMessage(msg) {
        // create an img element for our avatar
        const avatar = $('<img class="avatar">').attr('src', avatarImg);
        // create an element to hold the username
        const user = $('<div class="username">').text(username + ":");
        // create an element to hold the message text
        const text = $('<p class="message-text">').text(msg); 
        // now create the entire message as it will be posted with everything above included
        const message = $('<li class="message">').append(avatar).append(user).append(text);
        
        // append the message to the message list
        $('#messages').last().append(message);
        // make sure we scroll to the bottom each time a message is appended
        $('#messages')[0].scrollTop = $('#messages')[0].scrollHeight;

        // TODO: send a message to another board
    }

    // publish the message to the main board
    function makeMessagePublic(message) {
        // emit a "public message" event with our message to another board
        socket.emit('public message', message);
    }
    
});