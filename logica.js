function calcularPlazoFijo() {
  var monto = document.getElementById("monto").value;
  var tasa = document.getElementById("tasa").value;
  var plazo = document.getElementById("plazo").value;
  var impuesto = document.getElementById("impuesto").value;
  var costos = document.getElementById("costos").value;

  var tasaMensual = tasa / 12;
  var interesCompuesto = monto * (Math.pow(1 + tasaMensual / 100, plazo) - 1);
  var montoTotal = parseFloat(monto) + interesCompuesto - parseFloat(costos);
  var impuestoGanancias = montoTotal * impuesto / 100;
  var montoTotalDespues = montoTotal - impuestoGanancias;

  document.getElementById("resultado").innerHTML = `
    <br>
    <div class="alert alert-success" role="alert">
      El monto a recibir después de ${plazo} días es de: <strong>$${montoTotalDespues.toFixed(2)}</strong>
    </div>
  `;
}

function simularEscenarios() {
  var monto = document.getElementById("monto").value;
  var tasa = document.getElementById("tasa").value;
  var impuesto = document.getElementById("impuesto").value;
  var costos = document.getElementById("costos").value;

  var escenarios = [    {      plazo: 30,      ganancia: 0,    },    {      plazo: 60,      ganancia: 0,    },    {      plazo: 90,      ganancia: 0,    },    {      plazo: 180,      ganancia: 0,    },    {      plazo: 365,      ganancia: 0,    },  ];

  for (var i = 0; i < escenarios.length; i++) {
    var plazo = escenarios[i].plazo;
    var tasaMensual = tasa / 12;
    var interesCompuesto = monto * (Math.pow(1 + tasaMensual / 100, plazo) - 1);
    var montoTotal = parseFloat(monto) + interesCompuesto - parseFloat(costos);
    var impuestoGanancias = montoTotal * impuesto / 100;
    var montoTotalDespues = montoTotal - impuestoGanancias;
    escenarios[i].ganancia = montoTotalDespues - monto;
  }

  var plazos = [];
  var ganancias = [];

  for (var i = 0; i < escenarios.length; i++) {
    plazos.push(escenarios[i].plazo);
    ganancias.push(escenarios[i].ganancia);
  }

  var ctx = document.getElementById('grafico').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: plazos,
      datasets: [{
        label: 'Ganancia',
        backgroundColor: 'rgba(0, 153, 255, 0.5)',
        data: ganancias
        
      }]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                  return "Ganancia: $" + tooltipItem.yLabel.toFixed(2);
              }
          }
      }
  }
});
}




