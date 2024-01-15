// Crea un json que contendrá un listado de objetos película, dónde cada película
// tiene un nombre y un precio

// Deberás generar automáticamente:
// - Importar el json creado (usando fetch) y usar sus valores para crear las opciones y modificar los precios
// - La creación de las filas y asientos: <div class="seat"></div>
// - Algunos asientos de manera aleatoria estarán ocupados

// Ampliación: Crear un input para crear filas de asientos dinámicas
// Ampliación: Posicionar en la pantalla del cine, una imágen de la película seleccionada

let select = document.querySelector("#movie");
let option = document.createElement("option");
let container = document.querySelector(".container");
let cont = document.querySelector("#count");
let contA = 0;
let precio = document.querySelector("#total");
let filas = document.querySelector("#rows");
let columnas = document.querySelector("#columns");
let generar = document.querySelector("#btn");

generar.addEventListener("click", function () {
  container.innerHTML = "";
  let pantalla = document.createElement("div");
  pantalla.className = "screen";
  container.appendChild(pantalla);

  for (let i = 0; i < filas.value; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < columnas.value; j++) {
      let seat = document.createElement("div");
      seat.classList.add("seat");
      pantalla.style.backgroundImage = `url("img/${select.value}.jpg")`;
      pantalla.style.backgroundSize = "cover";
      if (seat.classList.contains("occupied")) {
        cont.innerHTML = "0";
      } else {
        seat.addEventListener("click", function () {
          if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            contA--;
            cont.innerHTML = "";
            cont.innerHTML = contA;
            console.log(contA);
          } else if (!seat.classList.contains("occupied")) {
            seat.classList.toggle("selected");
            contA++;
            cont.innerHTML = "";
            cont.innerHTML = contA;
            console.log(contA);
          }

          precio.innerHTML = "";
          precio.innerHTML = contA * select.value;
        });
      }

      select.addEventListener("change", function () {
        precio.innerHTML = "";
        precio.innerHTML = contA * select.value;
        pantalla.style.backgroundImage = `url("img/${select.value}.jpg")`;
        pantalla.style.backgroundSize = "cover";
      });

      row.appendChild(seat);
      let random = Math.floor(Math.random() * 2);

      for (let k = 0; k < random; k++) {
        seat.classList.add("occupied");
      }
    }

    container.appendChild(row);
  }
});

let jsonUrl = "peliculas.json";

fetch(jsonUrl)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.peliculas.length; i++) {
      option = document.createElement("option");
      option.value = data.peliculas[i].precio;
      option.text = data.peliculas[i].nombre;
      select.appendChild(option);
    }
  });
