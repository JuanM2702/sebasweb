// carrito.js

// Agregar al carrito mediante una solicitud POST
function agregarAlCarrito(destino, precio) {
    fetch('/agregar-al-carrito', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destino, precio }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Redirigir a la página del carrito después de agregar al carrito
      window.location.href = '/carrito';
    })
    .catch(error => console.error('Error:', error));
  }
  