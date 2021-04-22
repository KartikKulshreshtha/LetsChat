const socket = io('http://localhost:8000');

//Getting DOM elements in respective to JS Variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

//Playing this audio while receiving a message
var audio = new Audio('tune.mp3');

//If the user submitted the form, let the server know
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

//Function which will append the event info to the container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

//Asking the name to the user and the server know
const _name = prompt('Enter your name');
socket.emit('new-user-joined', _name);

//If someone joins the chat, receives the event from the server
socket.on('user-joined', _name=>{
    append(`${_name} joined the chat`,'right');
})

//If the someone receives the message, receives it
socket.on('receive', data=>{
    append(`${data._name}:${data.message}`, 'left');
})

//If someone left the chat, append the info to the container
socket.on('left', _name=>{
    append(`${_name} left the chat`, 'right');
})