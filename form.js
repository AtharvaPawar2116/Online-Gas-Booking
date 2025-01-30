
// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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
const database = getDatabase(app);

// Function to handle payment form submission
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
    const paymentOption = document.getElementById("paymentOption");

    // Handle dynamic payment fields
    paymentOption.addEventListener("change", function () {
        const qrContainer = document.getElementById("qrContainer");
        const upiField = document.getElementById("upiField");

        if (this.value === "paytm") {
            qrContainer.style.display = "block";
            upiField.style.display = "none";
        } else if (this.value === "upi") {
            qrContainer.style.display = "none";
            upiField.style.display = "block";
        } else {
            qrContainer.style.display = "none";
            upiField.style.display = "none";
        }
    });

    // Submit booking details
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Retrieve form values
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const phone = document.getElementById("phone").value;
        const cylinderType = document.getElementById("cylinderType").value;
        const selectedPaymentOption = paymentOption.value;
        const upiInput = document.getElementById("upiInput").value || null;

        // Validate UPI field if selected
        if (selectedPaymentOption === "upi" && !upiInput) {
            alert("Please enter a valid UPI ID.");
            return;
        }

        // Save booking details to Firebase
        const bookingsRef = ref(database, "users");
        const newBookingRef = push(bookingsRef);

        const bookingData = {
            name: name,
            address: address,
            phone: phone,
            cylinderType: cylinderType,
            paymentOption: selectedPaymentOption,
            upiID: upiInput,
            paymentStatus: selectedPaymentOption === "cash" ? "Pending" : "Paid",
            bookedAt: new Date().toISOString()
        };

        set(newBookingRef, bookingData)
            .then(() => {
                alert("Booking Confirmed!");
                window.location.href = "Home.html"; //redirect to home page.
            })
            .catch((error) => {
                console.error("Error saving booking:", error.message);
                alert("Failed to save booking. Please try again.");
            });
    });
});
