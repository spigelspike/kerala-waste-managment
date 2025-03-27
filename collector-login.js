import { db } from "./firebase-config.js"; 
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

window.onload = () => {
    // Select form elements
    const loginForm = document.querySelector(".form");
    const idInput = document.getElementById("collector-name");
    const phoneInput = document.getElementById("phone-number");

    if (!loginForm) {
        console.error("Login form not found. Make sure the script runs after the form loads.");
        return;
    }

    // Function to handle login
    const handleCollectorLogin = async (event) => {
        event.preventDefault();

        const idNumber = idInput.value.trim();
        const phoneNumber = phoneInput.value.trim();

        // Validate inputs
        if (idNumber.length !== 6 || phoneNumber.length !== 10) {
            alert("Invalid ID Number or Phone Number format.");
            return;
        }

        try {
            // Query Firestore for matching collector
            const q = query(collection(db, "collectors"), where("idNumber", "==", idNumber), where("phoneNumber", "==", phoneNumber));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("Login successful!");
                window.location.href = "collector-side.html";
            } else {
                alert("Invalid ID Number or Phone Number.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Error logging in. Please try again.");
        }
    };

    // Attach event listener to login form
    loginForm.addEventListener("submit", handleCollectorLogin);
};