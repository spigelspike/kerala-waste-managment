import { db, collection, query, onSnapshot, updateDoc, doc } from "./firebase-config.js";

// DOM elements
const pendingRequestsGrid = document.getElementById('pending-requests');
const completedRequestsGrid = document.getElementById('completed-requests');
const filterButtons = document.querySelectorAll('.btn-filter');

// Status mapping
const statusMap = {
  'Pending': { class: 'pending', text: 'Pending' },
  'Completed': { class: 'completed', text: 'Completed' }
};

// Payment method mapping
const paymentMap = {
  'prepaid': { class: 'prepaid', text: 'Prepaid' },
  'postpaid': { class: 'postpaid', text: 'Postpaid' }
};

// Fetch and display requests
function fetchRequests() {
  const q = query(collection(db, "wasteRequests"));
  
  onSnapshot(q, (snapshot) => {
    pendingRequestsGrid.innerHTML = '';
    completedRequestsGrid.innerHTML = '';
    
    snapshot.forEach((doc) => {
      const request = doc.data();
      const requestId = doc.id;
      const requestCard = createRequestCard(request, requestId);
      
      // Add to appropriate status grid
      if (request.status === 'Pending') {
        pendingRequestsGrid.appendChild(requestCard);
      } else {
        completedRequestsGrid.appendChild(requestCard);
      }
    });
    
    addButtonEventListeners();
  });
}

// Card creation (unchanged)
function createRequestCard(request, requestId) {
  const card = document.createElement('div');
  card.className = 'request-card';
  card.innerHTML = `
    <div class="request-header">
      <div class="request-id">#${requestId.substring(0, 8)}</div>
      <div class="request-status ${statusMap[request.status].class}">
        ${statusMap[request.status].text}
      </div>
      <div class="payment-status ${paymentMap[request.paymentMethod].class}">
        ${paymentMap[request.paymentMethod].text}
      </div>
    </div>
    <div class="request-details">
      <h3>${request.name}</h3>
      <p>House: ${request.houseNumber}</p>
      <p>Phone: ${request.phoneNumber}</p>
      <p>Waste: ${request.wasteType} (${request.weight} kg)</p>
    </div>
    <div class="request-actions">
      <button class="btn btn-primary complete-btn" data-id="${requestId}">
        ${request.status === 'Pending' ? 'Mark Complete' : 'Completed'}
      </button>
    </div>
  `;
  return card;
}

// Update status (unchanged)
async function updateRequestStatus(requestId) {
  try {
    await updateDoc(doc(db, "wasteRequests", requestId), {
      status: "Completed",
      completedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update status. Please try again.");
  }
}

// Event listeners (unchanged)
function addButtonEventListeners() {
  document.querySelectorAll('.complete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const requestId = e.target.dataset.id;
      updateRequestStatus(requestId);
    });
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchRequests();
  
  // Filter buttons functionality
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Toggle between pending and completed views
      if (btn.dataset.filter === 'pending') {
        pendingRequestsGrid.style.display = 'grid';
        completedRequestsGrid.style.display = 'none';
      } else {
        pendingRequestsGrid.style.display = 'none';
        completedRequestsGrid.style.display = 'grid';
      }
    });
  });
});