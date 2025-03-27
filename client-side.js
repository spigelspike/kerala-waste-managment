// Use same version (11.5.0) everywhere
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { app, db, auth } from "./firebase-config.js";

// Global variables
let selectedWasteType = null;
let selectedPayment = null;
let user = {
    name: "LOGGED IN AS SHAREEF",
    houseNumber: "0000",
    phoneNumber: "0000000000"
};

// Display logged-in user
const loggedInUserElement = document.getElementById("loggedInUser");
if (loggedInUserElement) {
    loggedInUserElement.innerText = user?.name || "Guest";
}

// Waste type selection
function selectWasteType(element) {
    document.querySelectorAll(".waste-type-card").forEach(card => card.classList.remove("selected"));
    element.classList.add("selected");
    selectedWasteType = element.querySelector(".waste-type-title").innerText;
}

document.querySelectorAll(".waste-type-card").forEach(card => {
    card.addEventListener("click", function () {
        selectWasteType(this);
    });
});

// Payment method selection
function selectPaymentOption(element) {
    document.querySelectorAll(".payment-option").forEach(option => option.classList.remove("selected"));
    element.classList.add("selected");
    selectedPayment = element.getAttribute("data-value");
}

document.querySelectorAll(".payment-option").forEach(option => {
    option.addEventListener("click", function () {
        selectPaymentOption(this);
    });
});

// Submit waste collection request
async function submitRequest() {
    const weightInput = document.getElementById("waste-weight");
    const weight = weightInput ? weightInput.value : "";

    if (!selectedWasteType || !weight || !selectedPayment) {
        alert("Please select waste type, enter weight, and choose a payment method.");
        return;
    }

    try {
        await addDoc(collection(db, "wasteRequests"), {
            name: user.name,
            houseNumber: user.houseNumber,
            phoneNumber: user.phoneNumber,
            wasteType: selectedWasteType,
            weight: weight,
            paymentMethod: selectedPayment,
            status: "Pending",
            timestamp: new Date().toISOString()
        });
        alert("Request submitted successfully!");
        window.location.reload();
    } catch (error) {
        console.error("Error submitting request:", error);
        alert("Failed to submit request. Try again.");
    }
}

const submitRequestButton = document.getElementById("submitRequest");
if (submitRequestButton) {
    submitRequestButton.addEventListener("click", submitRequest);
}
