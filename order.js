// order.js

// Load product data from parts.json (the computer parts)
fetch('parts.json')
  .then(response => response.json())
  .then(data => {
    const pcComponents = data.pcComponents;
    displayProducts(pcComponents);
  })
  .catch(error => console.error('Error loading products:', error));

// Display products in their respective categories
function displayProducts(components) {
  const container = document.getElementById('products-container');

  Object.keys(components).forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);

    const productGrid = document.createElement('div');
    productGrid.classList.add('product-grid');

    components[category].forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      img.style.width = '100%';
      img.style.height = '200px';
      img.style.objectFit = 'cover';

      const name = document.createElement('h4');
      name.textContent = product.name;

      const description = document.createElement('p');
      description.textContent = product.description;

      const price = document.createElement('p');
      price.textContent = `${product.currency} ${product.price.toLocaleString()}`;

      // Quantity Controls
      const quantityControls = document.createElement('div');
      quantityControls.classList.add('quantity-controls');

      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.value = 1;
      quantityInput.min = 1;
      quantityInput.max = 100;
      quantityInput.classList.add('quantity-input');

      const minusBtn = document.createElement('button');
      minusBtn.textContent = '➖';

      const plusBtn = document.createElement('button');
      plusBtn.textContent = '➕';

      minusBtn.onclick = () => {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
          quantityInput.value = currentQuantity - 1;
        }
      };

      plusBtn.onclick = () => {
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
      };

      quantityControls.appendChild(minusBtn);
      quantityControls.appendChild(quantityInput);
      quantityControls.appendChild(plusBtn);

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Order';
      addButton.onclick = () => addToOrder(product, quantityInput.value);

      productDiv.appendChild(img);
      productDiv.appendChild(name);
      productDiv.appendChild(description);
      productDiv.appendChild(price);
      productDiv.appendChild(quantityControls);
      productDiv.appendChild(addButton);

      productGrid.appendChild(productDiv);
    });

    categoryDiv.appendChild(productGrid);
    container.appendChild(categoryDiv);
  });
}

// Add product to the order (alert validation for invalid input)
function addToOrder(product, quantity) {
  const qty = parseInt(quantity);

 
  if (isNaN(qty) || qty <= 0) {
    alert('Please enter a valid quantity.');
    return;
  }

  let order = JSON.parse(localStorage.getItem('order')) || [];

  const existingProduct = order.find(item => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += qty;
  } else {
    order.push({ ...product, quantity: qty });
  }

  localStorage.setItem('order', JSON.stringify(order));
  updateOrderSummary();
}

// Update the order summary table and calculate the total price
function updateOrderSummary() {
  const order = JSON.parse(localStorage.getItem('order')) || [];
  const orderSummaryTableBody = document.querySelector('#order-summary tbody');
  const totalPrice = document.getElementById('total-price');
  let total = 0;

  orderSummaryTableBody.innerHTML = '';

  order.forEach(item => {
    const row = document.createElement('tr');

    const itemNameCell = document.createElement('td');
    itemNameCell.textContent = item.name;

    const itemQuantityCell = document.createElement('td');
    itemQuantityCell.textContent = item.quantity;

    const itemPriceCell = document.createElement('td');
    itemPriceCell.textContent = `${item.currency} ${item.price.toLocaleString()}`;

    const itemSubtotalCell = document.createElement('td');
    const subtotal = item.price * item.quantity;
    itemSubtotalCell.textContent = `${item.currency} ${subtotal.toLocaleString()} `;

    // Delete icon on summary table
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './image03/delete_icon.jpg';
    deleteIcon.alt = 'Delete';
    deleteIcon.classList.add('delete-icon');
    deleteIcon.onclick = () => removeItem(item.name);

    itemSubtotalCell.appendChild(deleteIcon);

    row.appendChild(itemNameCell);
    row.appendChild(itemQuantityCell);
    row.appendChild(itemPriceCell);
    row.appendChild(itemSubtotalCell);

    orderSummaryTableBody.appendChild(row);

    total += subtotal;
  });

  totalPrice.textContent = `${order[0]?.currency || 'Rs.'} ${total.toLocaleString()}`;
}

// Removing one quantity of a product (one by one)
function removeItem(productName) {
  let order = JSON.parse(localStorage.getItem('order')) || [];

  const itemIndex = order.findIndex(item => item.name === productName);
  if (itemIndex > -1) {
    if (order[itemIndex].quantity > 1) {
      order[itemIndex].quantity -= 1;
    } else {
      order.splice(itemIndex, 1);
    }
    localStorage.setItem('order', JSON.stringify(order));
    updateOrderSummary();
  }
}

// Proceed to checkout
function buyNow() {
  if (confirm('Proceed to checkout?')) {
    window.location.href = 'checkout.html';
  }
}

// Summary table to be shown when going back/refresh
window.addEventListener('load', updateOrderSummary);
 