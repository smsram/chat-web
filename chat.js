// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  push, 
  onChildAdded, 
  onChildRemoved, 
  remove 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBY9053eCr5lc2WY-9vN0cjPsHoJX_xEq4",
    authDomain: "experiment-1-b7167.firebaseapp.com",
    databaseURL: "https://experiment-1-b7167-default-rtdb.firebaseio.com",
    projectId: "experiment-1-b7167",
    storageBucket: "experiment-1-b7167.firebasestorage.app",
    messagingSenderId: "63125502544",
    appId: "1:63125502544:web:076fcdf07cb9a950e72f55",
    measurementId: "G-GZD73E0EFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// References
const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");
const messagesRef = ref(database, "messages");

// Update logged-in user profile dynamically
const loggedUserProfile = document.querySelector(".loggedUserProfile");
usernameInput.addEventListener('input', () => {
  loggedUserProfile.textContent = usernameInput.value;
});

// Send a message
sendBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    push(messagesRef, { username, message, timestamp: new Date().toISOString() });
    messageInput.value = ""; // Clear the input field
  } else {
    alert("Please enter both a username and a message!");
  }
});

// Display messages and listen for new ones
onChildAdded(messagesRef, (snapshot) => {
  const messageKey = snapshot.key; // Unique ID of the message
  const { username, message, timestamp } = snapshot.val();

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.id = `msg-${messageKey}`; // Assign an ID for easy deletion

  const messageText = document.createElement("span");
  messageText.className = "message-text";
  messageText.textContent = `[${new Date(timestamp).toLocaleTimeString()}] ${username}: ${message}`;

  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteMessage(messageKey));

  messageDiv.appendChild(messageText);
  messageDiv.appendChild(deleteBtn);

  chatBox.appendChild(messageDiv);
  scrollToBottom(); // Ensure chat always scrolls to the bottom
});

// Delete a message from the database
function deleteMessage(messageKey) {
  const messageRef = ref(database, `messages/${messageKey}`);
  remove(messageRef)
    .then(() => console.log(`Message ${messageKey} deleted successfully`))
    .catch((error) => console.error("Error deleting message:", error));
}

// Automatically remove message from the chat box when deleted
onChildRemoved(messagesRef, (snapshot) => {
  const messageKey = snapshot.key; // Get the key of the deleted message
  const messageElement = document.getElementById(`msg-${messageKey}`);
  if (messageElement) {
    messageElement.remove(); // Remove it from the DOM
  }
});

// Ensure chat box scrolls to the bottom
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

/*// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  push, 
  onChildAdded, 
  onChildRemoved, 
  remove 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBY9053eCr5lc2WY-9vN0cjPsHoJX_xEq4",
    authDomain: "experiment-1-b7167.firebaseapp.com",
    databaseURL: "https://experiment-1-b7167-default-rtdb.firebaseio.com",
    projectId: "experiment-1-b7167",
    storageBucket: "experiment-1-b7167.firebasestorage.app",
    messagingSenderId: "63125502544",
    appId: "1:63125502544:web:076fcdf07cb9a950e72f55",
    measurementId: "G-GZD73E0EFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// References
const chatBox = document.getElementById("chat-box");
const usernameInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");
const messagesRef = ref(database, "messages");

const loggedUserProfile = document.querySelector(".loggedUserProfile");
email.addEventListener('input', () => {
  loggedUserProfile.textContent = email.value;
});

// Send a message
sendBtn.addEventListener("click", () => {
  const username = usernameInput.value;
  //document.querySelector(".loggedUserProfile").textContent = usernameInput.value;
  const message = messageInput.value.trim();

  if (username && message) {
    push(messagesRef, { username, message, timestamp: new Date().toISOString() });
    messageInput.value = ""; // Clear the input field
  } else {
    alert("Please enter both a username and a message!");
  }
});

// Display messages and listen for new ones
onChildAdded(messagesRef, (snapshot) => {
  const messageKey = snapshot.key; // Unique ID of the message
  const { username, message, timestamp } = snapshot.val();

  const messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.id = `msg-${messageKey}`; // Assign an ID for easy deletion

  const messageText = document.createElement("span");
  messageText.className = "message-text";
  messageText.textContent = `[${new Date(timestamp).toLocaleTimeString()}] ${username}: ${message}`;

  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteMessage(messageKey));

  messageDiv.appendChild(messageText);
  messageDiv.appendChild(deleteBtn);

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
});

// Delete a message from the database
function deleteMessage(messageKey) {
  const messageRef = ref(database, `messages/${messageKey}`);
  remove(messageRef)
    .then(() => console.log(`Message ${messageKey} deleted successfully`))
    .catch((error) => console.error("Error deleting message:", error));
}

// Automatically remove message from the chat box when deleted
onChildRemoved(messagesRef, (snapshot) => {
  const messageKey = snapshot.key; // Get the key of the deleted message
  const messageElement = document.getElementById(`msg-${messageKey}`);
  if (messageElement) {
    messageElement.remove(); // Remove it from the DOM
  }
});

// Fixing message appearing
const chatBox = document.querySelector('.chat-box');

// Function to scroll to the bottom of the chat box
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Call this function after appending a new message
scrollToBottom();
*/