// checkout.js

// Displaying order details on the checkout page
function displayOrderDetails() {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    const orderDetailsContainer = document.getElementById('order-details');
  
    if (order.length === 0) {
      orderDetailsContainer.innerHTML = 'Your order is empty !';
      return;
    }
  
    let orderDetailsHTML = '<h3>Your Order</h3><ul>';
    order.forEach(item => {
      orderDetailsHTML += `<li>${item.name} - ${item.quantity} x ${item.currency} ${item.price.toLocaleString()}</li>`;
    });
    orderDetailsHTML += '</ul>';
    orderDetailsHTML += `<br><strong>Total: ${order[0]?.currency || 'Rs.'} ${calculateTotal(order).toLocaleString()}</strong>`;
  
    orderDetailsContainer.innerHTML = orderDetailsHTML;
  }
  
  // Calculate total price
  function calculateTotal(order) {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  // Form validation on checkout 
  function validateCheckoutForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const number = document.getElementById('number').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const card = document.getElementById('card').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
  
    if (!name || !email || !number || !address || !city || !card || !expiry || !cvv) {
      alert('Please fill in all the fields!');
      return false;
    }
  
    return true;
  }
  
  // Handling 'Pay' button
  document.querySelector('button[type="submit"]').addEventListener('click', function (event) {
    event.preventDefault();
    
    if (validateCheckoutForm()) {
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 7); 
      alert(`Thank you for your purchase! Your order will be delivered by ${deliveryDate.toDateString()}.`);
      
      localStorage.removeItem('order');  // Clear the order after successful payment
      window.location.href = 'order.html';  // Redirect to order page
    }
  });
  
  // Displays my order table on checkout page
  window.onload = displayOrderDetails;
  