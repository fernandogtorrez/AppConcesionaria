const autos = require("./autos.json");

const concesionaria = {
  autos,
  buscarAuto: function (patente) {
    return this.autos.find((auto) => auto.patente === patente) || null;
  },
  venderAuto: function (patente) {
    const auto = this.buscarAuto(patente);
    if (auto) auto.vendido = true;
  },
  autosParaLaVenta: function () {
    return this.autos.filter((auto) => !auto.vendido);
  },
  autosNuevos: function () {
    return this.autosParaLaVenta().filter((auto) => auto.km < 100);
  },
  listaDeVentas: function () {
    const autosVendidos = this.autos.filter((auto) => auto.vendido);
    return autosVendidos.map((auto) => auto.precio);
  },
  totalDeVentas: function () {
    const ventas = this.listaDeVentas();
    return ventas.reduce((total, venta) => total + venta, 0);
  },
  puedeComprar: function (auto, persona) {
    let valorDeCuota = auto.precio / auto.cuotas;
    return (
      auto.precio <= persona.capacidadDePagoTotal &&
      valorDeCuota <= persona.capacidadDePagoEnCuotas
    );
  },
  autosQuePuedeComprar: function (persona) {
    return this.autosParaLaVenta().filter((auto) =>
      this.puedeComprar(auto, persona)
    );
  },
};

let persona = {
  nombre: "Juan",
  capacidadDePagoEnCuotas: 200000,
  capacidadDePagoTotal: 5000000,
};

console.log(concesionaria.autosQuePuedeComprar(persona));