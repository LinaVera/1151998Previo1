function aleatorio() {
    return Math.floor(Math.random() * (100 - 1)) + 1;
}
function pyr() {
    var np = document.getElementById('np').value;//número de preguntas
    var p = document.getElementById('preguntas');//espacio para las pregutas
    var vP = [];//vector de preguntas
    var vR = [];//vector de respuestas
    var vRes = [];
    var t = "";
    for (var i = 0; i < np; i++) {
        var va1 = aleatorio();
        var va2 = aleatorio();
        var suma = va1 + va2;
        vP[i] = va1 + "+" + va2;//guardó el texto de la suma
        t += "<div id='p" + i + "' class='p-3'>";
        t += "<h5>" + (i + 1) + ". " + va1 + " + " + va2 + "</h5>"
        vR[i] = [suma, aleatorio(), aleatorio(), aleatorio()];//en la primera posición el verdadero resultado y luego genero los aleatorios
        var rP = vR[i];//Respuetas posibles de la pregunta que estamos
        for (var j = 0; j < 4; j++) {//imprimir respuestas
            vRes[j] = "<div class='form-check'><label class='form-check-label'><input type='radio' class='form-check-input' name='radio" + i + "' id='r" + j + i + "'>" + rP[j] + "</label></div>";
        }
        t += aleatorioLina(vRes);
        t += "</div>";
    }
    //El boton este en la parte derecha
    t += "<div class='clearfix'>";
    t += "<input type='button' class='float-right mb-2 btn btn-primary' value='Calificar' onclick='calificar()'>";
    t += "</div>";
    p.innerHTML = t;
}
function aleatorioLina(v) {
    var t = "";
    var l = Math.floor(Math.random() * v.length);
    if (l === 0) {
        //correcta la primera
        t += v[0];
        t += v[1];
        t += v[3];
        t += v[2];
    }
    else if (l === 1) {        
        //correcta la segunda
        t += v[3];
        t += v[0];
        t += v[1];
        t += v[2];
    }
    else if (l === 2) {
        //correcta la tercera
        t += v[2];
        t += v[3];
        t += v[0];
        t += v[1];
    }
    else if (l === 3) {
        //correcta la cuarta
        t += v[3];
        t += v[1];
        t += v[2];
        t += v[0];
    }
    return t;
}
function calificar() {
    var np = document.getElementById('np').value;
    var nombre = document.getElementById('nombre').value;
    var cC = 0;
    var cIC = 0;
    vC = [];
    vIC = [];
    for (var i = 0; i < np; i++) {
        //console.log("Pregunta: " + i);
        if (document.getElementById('r0' + i).checked) {
            cC++;
        }
        else if (document.getElementById('r1' + i).checked || document.getElementById('r2' + i).checked || document.getElementById('r3' + i).checked) {
            cIC++;
        }
        else {
            alert("Debe llenar todos los datos");
        }
    }
    vC = [cC.toString()];
    vIC = [cIC.toString()];
    drawChart(vC, vIC, nombre)
    drawTable(vC, vIC, nombre);
}
//***************Google chart ******************************* */
function draw() {
    drawChart(37);
    google.charts.setOnLoadCallback(drawChart);
}
function drawChart(a, v, p) {
    var w1 = parseInt(a[0]);
    var w2 = parseInt(v[0]);
    var data = google.visualization.arrayToDataTable([
        ['', 'Bien', 'Mal'],
        ['', w1, w2]
    ]);
    var options = {
        title: "Calificacion de " + p,
        hAxis: {
            title: "Numero de respuestas",
            minValue: 0,
        },
        vAxis: {
            title: "Preguntas y respuetas",
        },
    };
    var chart = new google.visualization.BarChart(
        document.getElementById("graficador")
    );
    chart.draw(data, options);
}

function drawTable(a, v) {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Respuestas correctas");
    data.addColumn("number", "Respuestas incorrectas");
    data.addRows(a.length);
    for (i = 0; i < a.length; i++) {
        data.setCell(i, 0, a[i]);
        data.setCell(i, 1, v[i]);
    }
    var table = new google.visualization.Table(document.getElementById("tabla"));
    table.draw(data, {
        showRowNumber: false,
        width: '100%', height: '100%'
    });
}