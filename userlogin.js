
  // Import necessary Firebase functions
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
  
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAsv_VcwGsRgFoAhVynBZqFXR8Ets1cQQs",
    authDomain: "new-firebase-project-1.firebaseapp.com",
    databaseURL: "https://new-firebase-project-1-default-rtdb.firebaseio.com",
    projectId: "new-firebase-project-1",
    storageBucket: "new-firebase-project-1.firebasestorage.app",
    messagingSenderId: "787055583067",
    appId: "1:787055583067:web:288e11bebaaec2dc58047e",
    measurementId: "G-VYV8E2PMKD"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  // User Registration Logic
  document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create user with Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store user details in Firebase Realtime Database
            set(ref(database, 'users/' + user.uid), {
                email: email,
                registeredAt: new Date().toISOString(),
            });

            alert("Registration successful!");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
            console.error("Registration error:", error.message);
            alert(error.message);
        });
  });

  // User Login Logic
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Sign in the user with Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Login successful!");
            window.location.href = "form.html"; // Redirect to user dashboard
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            alert(error.message);
        });
  });
