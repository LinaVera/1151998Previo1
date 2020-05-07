/*Lina Vanessa Vera Pulido - 1151998 - 07/05/20 */
function preguntas() {
    var np = document.getElementById('np').value;
    var p = document.getElementById('preguntas');
    var t = "";
    // console.log(np);
    for (i = 1; i <= np; i++) {
        t += "<div id='p" + i + "' class='p-3'>";
        var va1 = aleatorio();
        var va2 = aleatorio();
        t += "<h5>" + i + ". " + va1 + " + " + va2 + "</h5>"
        t += "<div class='form-check'><label class='form-check-label' for='r1" + i + "'><input type='radio' class='form-check-input' id='r1" + i + "' name='radio" + i + "' value=1 >" + (va1 + va2) + "</label></div>";
        t += "<div class='form-check'><label class='form-check-label' for='r2" + i + "'><input type='radio' class='form-check-input' id='r2" + i + "' name='radio" + i + "'>" + aleatorio() + "</label></div>";
        t += "<div class='form-check'><label class='form-check-label' for='r3" + i + "'><input type='radio' class='form-check-input' id='r3" + i + "' name='radio" + i + "'>" + aleatorio() + "</label></div>";
        t += "<div class='form-check'><label class='form-check-label' for='r4" + i + "'><input type='radio' class='form-check-input' id='r4" + i + "' name='radio" + i + "'>" + aleatorio() + "</label></div>";
        t += "</div>"
    }
    t += " <button onclick='calificar()' class='btn btn-primary'>Calificar</button>"
    p.innerHTML = t;
}
function aleatorio() {
    return Math.floor(Math.random() * (100 - 1)) + 1;
}

function calificar() {
    var np = document.getElementById('np').value;
    var nombre = document.getElementById('nombre').value;
    var cC = 0;
    var cIC = 0;
    vC = [];
    vIC = [];
    for (i = 1; i <= np; i++) {
        var ra = document.getElementsByName('radio' + i);

        if (document.getElementById('r1' + i).checked) {
            cC++;
        }
        else if (document.getElementById('r2' + i).checked || document.getElementById('r3' + i).checked || document.getElementById('r4' + i).checked) {
            cIC++;
        }
        else {
            alert("Debe llenar todos los datos");
        }

    }

    vC = [cC.toString()];
    vIC = [cIC.toString()];
    console.log("bien" + vC);
    console.log("Mal" + vIC);
    drawChart(vC, vIC, nombre)
    drawTable(vC, vIC, nombre);
}
//***************Google chart ******************************* */
function draw() {
    drawChart(37);
    google.charts.setOnLoadCallback(drawChart);
}
function drawChart(a, v, p) {
    var data = new google.visualization.DataTable();

    data.addColumn("string", "Notas");
    data.addColumn("number", "Numero de respuesstas");
    data.addRows(a.length);
    for (i = 0; i < a.length; i++) {
        data.setCell(i, 0, a[i]);
        data.setCell(i, 1, v[i]);
    }
    var options = {
        title: "Calificacion de " + p,
        chartArea: { width: "25%" },
        hAxis: {
            title: "Numero de respuestas",
            minValue: 0,
        },
        vAxis: {
            title: "Calificacion",
        },
    };
    var chart = new google.visualization.BarChart(
        document.getElementById("graficador")
    );
    chart.draw(data, options);
}

function drawTable(a, v, p) {
    var data = new google.visualization.DataTable();

    data.addColumn("string", p);
    data.addColumn("number", p);
    data.addRows(a.length);
    for (i = 0; i < a.length; i++) {
        data.setCell(i, 0, a[i]);
        data.setCell(i, 1, v[i]);
    }
    var table = new google.visualization.Table(document.getElementById("tabla"));

    table.draw(data, {
        showRowNumber: false,
        width: '100%',
        height: '100%'
    });
}

