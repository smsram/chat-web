// Your web app's Firebase configuration
var firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  favourite_song = document.getElementById('mobile_number').value
  milk_before_cereal = document.getElementById('gender_male_female').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password are invalid!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
    alert('One more extra field is needed!')
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      favourite_song : favourite_song,
      milk_before_cereal : milk_before_cereal,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Account Created!')
    document.querySelector(".nowLogin").style.display = "block"
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value;
  password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or password are invalid!');
      return;
  }

  auth.signInWithEmailAndPassword(email, password)
      .then(function () {
          // Declare user variable
          var user = auth.currentUser;

          // Retrieve user details from the database
          var database_ref = database.ref(`users/${user.uid}`);
          database_ref.once('value').then(function (snapshot) {
              var user_data = snapshot.val();
              if (user_data) {
                  // Store the full name in localStorage
                  localStorage.setItem('username', user_data.full_name);
              }
            // Trigger the alert and then show the container
          });
      })
      .catch(function (error) {
          var error_message = error.message;
          alert(error_message);
      });

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!')
    let chatContainer = document.querySelector(".chat-container");
            chatContainer.style.display = "block";
            let loginContainer = document.querySelector(".login-container");
            loginContainer.style.display = "none";
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}