$(document).ready(function () {
    // Obtener el ID del producto de la URL (ejemplo: detalle-producto.html?id=1)
    var urlParams = new URLSearchParams(window.location.search);
    var productoId = urlParams.get('id');

    // Realizar la llamada a la API Swagger para obtener los detalles del producto
    $.ajax({
      url: 'https://localhost:7292/api/Producto/' + productoId,
      method: 'GET',
      success: function (response) {
        var producto = response.resultado; // Obtener los detalles del producto

        // Actualizar la vista con los detalles del producto
        $('#productoImagen').attr('src', producto.imagenProducto);
        $('#productoNombre').text(producto.nombreProducto);
        $('#productoPrecio').text('Precio: $' + producto.precio.toFixed(2));
        $('#productoDescripcion').text('Descripción: ' + producto.descripcion);
        $('#productoDescuento').text('Descuento: ' + producto.descuento + '%');
        $('#productoStock').text('Stock: ' + producto.stock);
        $('#productoCategoria').text('Categoría: ' + producto.categoria.nombreCategoria);
        $('#productoMarca').text('Marca: ' + producto.marca.nombreMarca);
      },
      error: function () {
        console.log('Error al cargar los detalles del producto desde la API.');
      }
    });

    // Evento de agregar al carrito
    $('#agregarCarrito').on('click', function () {
      var cantidad = parseInt($('#cantidad').val());

      // Realizar la lógica para agregar el producto al carrito
      // ...
      console.log('Producto agregado al carrito: ' + cantidad + ' unidades.');
    });
  });