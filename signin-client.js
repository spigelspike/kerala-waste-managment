// Import Firestore from firebase-config.js
import { db } from "./firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Function to handle login
async function handleLogin(event) {
  event.preventDefault();

  const houseNumber = document.getElementById("houseNumber").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const name = document.getElementById("name").value.trim();

  if (!houseNumber.match(/^\d+$/)) {
    alert("House number must be numeric.");
    return;
  }
  if (!phoneNumber.match(/^\d{10}$/)) {
    alert("Phone number must be exactly 10 digits.");
    return;
  }
  if (!name) {
    alert("Please enter your name.");
    return;
  }

  const clientsRef = collection(db, "clients");

  // Query Firestore for matching houseNumber and phoneNumber
  const q = query(clientsRef, where("houseNumber", "==", houseNumber), where("phoneNumber", "==", phoneNumber));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      
      // Store user details in local storage
      const userDataToStore = {
        name: userData.name,
        houseNumber: userData.houseNumber,
        phoneNumber: userData.phoneNumber
      };

      localStorage.setItem("user", JSON.stringify(userDataToStore));

      console.log("User data stored in localStorage:", userDataToStore);

      alert(`Welcome, ${userData.name}!`);
      window.location.href = "client-side.html"; // Redirect to dashboard
    });
  } else {
    alert("Invalid house number or phone number.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    } else {
        console.error("Error: loginForm not found in the document.");
    }
});

