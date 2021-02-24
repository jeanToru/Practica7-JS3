/**
 * Ejercicio #5:
 *
 * Imprimir el precio del Bitcoin en USD$
 *
 * API: https://api.coindesk.com/v1/bpi/currentprice.json
 *
 * ¿Como funciona?:
 *
 * 1. Cuando la pagina cargue debemos agregar el precio del Bitcoin en dolares USD y la fecha de actualización
 * 2. Cuando el usuario haga click en el boton "Recargar", debemos actualizar el precio del Bitcoin y la fecha de actualización
 *
 *
 * ¿Que voy a evaluar?
 * 1. Que se imprima el precio del Bitcoin y la fecha de actualización correctamente
 * 2. Que se actualice el precio y la fecha al hacer click en recargar
 * 3. Buenas practicas (incluyendo buenas practicas pasadas)
 *
 *
 * TASKS:
 * 1. Tenemos para obtener del Bitcoin
 * 2. fetch al url https://api.coindesk.com/v1/bpi/currentprice.json
 * 3. Imprimir el precio en el DOM
 * 4. Imprimir la fecha de actualizacion
 * 5. Escuchar el evento del click en el boton "Recargar"
 *    5.1. agarrar el boton
 *    5.2. agregar el evento
 * 6. Jalar la informacion nuevamente con un fetch
 * 7. Imprimir el precio en el DOM
 * 8. Imprimir la fecha de actualizacion
 */

/**
 * PARA LA CASA
 * Agregar la funcionalidad de mostrar el precio en GBP y EUR.
 *
 * Usando el <select> cuando el usuario seleccione otra moneda, actualizar el precio
 * en la moneda seleccionada.
 *
 * El value del select se saca del "elemento.value"
 *
 * ¿Que voy a evaluar?
 * 1. Que se imprima el precio del Bitcoin y la fecha de actualización correctamente
 * en la modena seleccionada por el usuario
 * 2. Buenas practicas (incluyendo buenas practicas pasadas)
 */

const bitcoinPriceUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
const priceElement = document.querySelector("h2");
const timeElement = document.querySelector("p");
const button = document.querySelector("button");


function currencyInfo(data) {
  const currency = document.querySelector("select").value;
  if (currency === "USD") {
    const CURRENCY_INFO = data.bpi.USD;
    priceElement.innerHTML = `${CURRENCY_INFO.code}${CURRENCY_INFO.symbol} ${CURRENCY_INFO.rate}`;
    actualizarDatos();
  } else if (currency === "GBP") {
    const CURRENCY_INFO = data.bpi.GBP;
    priceElement.innerHTML = `${CURRENCY_INFO.code}${CURRENCY_INFO.symbol} ${CURRENCY_INFO.rate}`;
    actualizarDatos();
  } else {
    const CURRENCY_INFO = data.bpi.EUR;
    priceElement.innerHTML = `${CURRENCY_INFO.code}${CURRENCY_INFO.symbol} ${CURRENCY_INFO.rate}`;
    actualizarDatos();
  }
}

const actualizarDatos = () => {
  fetch(bitcoinPriceUrl, {
    method: "GET"
  })
    .then((response) => {
      // La propiedad que nos dice si hubo un error en el request es "ok"
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.status);
      }

      return response.json();
    })
    .then((data) => {

      currencyInfo(data);
      // AQUI TENEMOS LA FECHA DENTRO DE data.time.updated

      const time_info = data.time.updated;
      timeElement.innerHTML = `Actualizado en: ${time_info}`;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

actualizarDatos();

button.addEventListener("click", actualizarDatos);