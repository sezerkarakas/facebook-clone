const socket = io("http://localhost:3000")
const messageContainer = document.getElementById("messages");
const messageForm = document.getElementById("form")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const joinRoomButton = document.getElementById("room-button")



const name = prompt("what is you name")
appendMessage("You joined")
socket.emit("new-user", name)

socket.on("chat-message", data => {
    appendMessage(data)
})
socket.on("user-connected", name => {
    name.forEach(element => {
        appendMessage(`${element} connected`)
    });
})

messageForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === "") return
    appendMessage(message)
    socket.emit("send-chat-message", message, room)

    messageInput.value = "";
})

function appendMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.id = "newMessage"
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value;
    socket.emit("join-room", room, message => {
        appendMessage(message)
    })
})