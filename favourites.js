// favourites.js

// Save order to favourites
function saveToFavourites() {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    localStorage.setItem('favourites', JSON.stringify(order));
    alert('Your order has been saved to favourites!');
  }
  
// Apply favourites 
   function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  
    if (favourites.length === 0) {
      alert('No favourite order found!');
      return;
    }
  
    // Update current order
    currentOrder = favourites;
    localStorage.setItem('order', JSON.stringify(favourites));
  
    // Update quantity inputs in the product cards
    favourites.forEach(item => {
      const input = document.querySelector(`.product-card[data-id="${item.id}"] input`);
      if (input) {
        input.value = item.quantity;
      }
    });
  
    // Update the order summary table
    updateOrderSummary();
  
    alert('Favourite order applied!');
  }
  
 