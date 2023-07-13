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
//filtros
$(document).ready(function () {
  var productosData; // Variable para almacenar los datos originales de los productos
  var productosFiltrados; // Variable para almacenar los productos filtrados

  // Realizar la llamada a la API Swagger para obtener los datos de productos, marcas y categorías
  $.ajax({
    url: 'https://localhost:7292/api/Producto',
    method: 'GET',
    success: function (response) {
      productosData = response.resultado; // Almacenar los datos originales de los productos

      // Generar los elementos de los productos
      generarProductos(productosData);

      // Generar los elementos de las marcas
      generarMarcas(productosData);

      // Generar los elementos de las categorías
      generarCategorias(productosData);
    },
    error: function () {
      console.log('Error al cargar los productos desde la API.');
    }
  });

  // Evento de filtrar por precio, marca y categoría
  $('#btnFiltrar').on('click', function () {
    filtrarProductos();
  });

  // Función para generar los elementos de los productos
  function generarProductos(productos) {
    var productosContainer = $('#productosContainer');
    productosContainer.empty();

    productos.forEach(function (producto) {
      var productoItem = $('<div>').addClass('col-lg-4 col-md-6 mb-4 producto-item');
      var card = $('<div>').addClass('card');
      var imagenContainer = $('<div>').addClass('producto-imagen-container');
      var imagen = $('<img>').addClass('producto-imagen img-fluid').attr('src', producto.imagenProducto).attr('alt', producto.nombreProducto);
      var cardBody = $('<div>').addClass('card-body');
      var titulo = $('<h5>').addClass('card-title').text(producto.nombreProducto);
      var precio = $('<p>').addClass('card-text').text('$' + producto.precio.toFixed(2));
      var enlace = $('<a>').addClass('btn btn-primary w-100').attr('href', 'detalle-producto.html?id=' + producto.idProducto).text('Ver Detalles');

      imagenContainer.append(imagen);
      cardBody.append(titulo, precio, enlace);
      card.append(imagenContainer, cardBody);
      productoItem.append(card);
      productosContainer.append(productoItem);

      // Agregar evento de clic al contenedor del producto
      productoItem.on('click', function () {
        window.location.href = 'detalle-producto.html?id=' + producto.idProducto;
      });
    });
  }

  // Función para generar los elementos de las marcas
  function generarMarcas(productos) {
    var marcas = obtenerMarcas(productos);
    var filtroMarca = $('#filtroMarca');

    marcas.forEach(function (marca) {
      var marcaItem = $('<div>').addClass('form-check');
      var input = $('<input>').addClass('form-check-input').attr('type', 'checkbox').attr('name', 'marca').attr('value', marca.idMarca).attr('id', 'marca' + marca.idMarca);
      var label = $('<label>').addClass('form-check-label').attr('for', 'marca' + marca.idMarca).text(marca.nombreMarca);

      marcaItem.append(input, label);
      filtroMarca.append(marcaItem);
    });
  }

  // Función para obtener las marcas únicas de los productos
  function obtenerMarcas(productos) {
    var marcas = [];

    productos.forEach(function (producto) {
      var marcaExistente = marcas.find(function (marca) {
        return marca.idMarca === producto.marca.idMarca;
      });

      if (!marcaExistente) {
        marcas.push(producto.marca);
      }
    });

    return marcas;
  }

  // Función para generar los elementos de las categorías
  function generarCategorias(productos) {
    var categorias = obtenerCategorias(productos);
    var filtroCategoria = $('#filtroCategoria');

    categorias.forEach(function (categoria) {
      var categoriaItem = $('<div>').addClass('form-check');
      var input = $('<input>').addClass('form-check-input').attr('type', 'checkbox').attr('name', 'categoria').attr('value', categoria.idCategoria).attr('id', 'categoria' + categoria.idCategoria);
      var label = $('<label>').addClass('form-check-label').attr('for', 'categoria' + categoria.idCategoria).text(categoria.nombreCategoria);

      categoriaItem.append(input, label);
      filtroCategoria.append(categoriaItem);
    });
  }

  // Función para obtener las categorías únicas de los productos
  function obtenerCategorias(productos) {
    var categorias = [];

    productos.forEach(function (producto) {
      var categoriaExistente = categorias.find(function (categoria) {
        return categoria.idCategoria === producto.categoria.idCategoria;
      });

      if (!categoriaExistente) {
        categorias.push(producto.categoria);
      }
    });

    return categorias;
  }

  // Función para filtrar los productos
  function filtrarProductos() {
    var marcasSeleccionadas = obtenerMarcasSeleccionadas();
    var categoriasSeleccionadas = obtenerCategoriasSeleccionadas();
    var minPrecio = parseFloat($('#minPrecio').val());
    var maxPrecio = parseFloat($('#maxPrecio').val());

    productosFiltrados = productosData.filter(function (producto) {
      var cumpleMarca = marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(producto.marca.idMarca);
      var cumpleCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(producto.categoria.idCategoria);
      var cumplePrecio = producto.precio >= minPrecio && producto.precio <= maxPrecio;

      return cumpleMarca && cumpleCategoria && cumplePrecio;
    });

    generarProductos(productosFiltrados);
  }

  // Función para obtener las marcas seleccionadas
  function obtenerMarcasSeleccionadas() {
    var marcasSeleccionadas = [];

    $('input[name="marca"]:checked').each(function () {
      marcasSeleccionadas.push(parseInt($(this).val()));
    });

    return marcasSeleccionadas;
  }

  // Función para obtener las categorías seleccionadas
  function obtenerCategoriasSeleccionadas() {
    var categoriasSeleccionadas = [];

    $('input[name="categoria"]:checked').each(function () {
      categoriasSeleccionadas.push(parseInt($(this).val()));
    });

    return categoriasSeleccionadas;
  }
});

