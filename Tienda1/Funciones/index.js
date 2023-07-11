//realiza llamada a las categorias
$(document).ready(function () {
    // Realizar la llamada a la API Swagger
    $.ajax({
        url: 'https://localhost:7292/api/Categoria',
        method: 'GET',
        success: function (response) {
            var categoryDropdown = $('#categoryDropdown');

            // Limpiar los elementos previos del menú desplegable
            categoryDropdown.empty();

            // Generar los elementos del menú con los nombres de las categorías obtenidos de la API
            response.resultado.forEach(function (categoria) {
                var categoriaItem = $('<li>').append($('<a>').addClass('dropdown-item').attr('href', '#').text(categoria.nombreCategoria));
                categoryDropdown.append(categoriaItem);
            });
        },
        error: function () {
            console.log('Error al cargar las categorías desde la API.');
        }
    });
});
//Realiza la llamada a la seccion Productos Destacados
$(document).ready(function() {
    // Realizar la llamada a la API Swagger
    $.ajax({
      url: 'https://localhost:7292/api/Producto',
      method: 'GET',
      success: function(response) {
        var productosDestacadosContainer = $('#productosDestacadosContainer');
  
        // Limpiar los elementos previos
        productosDestacadosContainer.empty();
  
        // Ordenar los productos por el mayor descuento
        var productosOrdenadosPorDescuento = response.resultado.sort(function(a, b) {
          return b.descuento - a.descuento;
        });
  
        // Tomar los primeros 9 productos (puedes ajustar el número según tus necesidades)
        var productosDestacados = productosOrdenadosPorDescuento.slice(0, 9);
  
        // Generar los elementos de los productos
        productosDestacados.forEach(function(producto) {
          var productoCard = $('<div>').addClass('col-lg-4 col-md-6 mb-4');
          var card = $('<div>').addClass('card rounded');
          var imagen = $('<img>').addClass('card-img-top producto-imagen').attr('src', producto.imagenProducto).attr('alt', producto.nombreProducto);
          var cardBody = $('<div>').addClass('card-body');
          var titulo = $('<h5>').addClass('card-title').text(producto.nombreProducto);
          var precio = $('<p>').addClass('card-text').text('$' + producto.precio.toFixed(2));
          var enlace = $('<a>').addClass('btn btn-primary').attr('href', '#').text('Ver Detalles');
  
          cardBody.append(titulo, precio, enlace);
          card.append(imagen, cardBody);
          productoCard.append(card);
          productosDestacadosContainer.append(productoCard);
        });
      },
      error: function() {
        console.log('Error al cargar los productos desde la API.');
      }
    });
  });
  
  