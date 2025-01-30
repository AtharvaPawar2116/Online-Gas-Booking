

    // Import the necessary functions from Firebase
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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

    // Define the fixed admin email
    const adminEmail = "admin123@gmail.com"; // Set your fixed admin email here

    // Handle form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Check if the entered email matches the fixed admin email
      if (email === adminEmail) {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            // Redirect to dashboard after successful login
            window.location.href = "dashboard.html";
          })
          .catch((error) => {
            // Show error if login fails
            alert("Error: " + error.message);
          });
      } else {
        // Show error if the email is not the fixed admin email
        alert("Invalid admin email. Access denied.");
      }
    });
