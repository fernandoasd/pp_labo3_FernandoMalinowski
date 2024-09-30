class Vehiculo
{
    id = 0;
    modelo = "";
    anoFab = "1900";
    velMax = 0;

    constructor (p_id, p_modelo, p_anoFab, p_velMax)
    {
        this.id = p_id;
        this.modelo = p_modelo;
        this.anoFab = p_anoFab;
        this.velMax = p_velMax;
    }

    toString()
    {
        return "Id: " + this.id + ", Modelo: " + this.modelo + ", AnoFab: " + this.anoFab + ", VelMAx: " + this.velMax;
    }
}

class Aereo extends Vehiculo
{
    altMax = 0;
    autonomia = 0;

    constructor(p_id, p_modelo, p_anoFab, p_velMax, p_altMax, p_autonomia)
    {
        super(p_id, p_modelo, p_anoFab, p_velMax);
        this.altMax = p_altMax;
        this.autonomia = p_autonomia;
    }

    toString()
    {
        return super.toString() + ", AltMax: " + this.altMax + ", Autonomia: " + this.autonomia;
    }
}

class Terrestre extends Vehiculo
{
    cantPue = 0;
    cantRue = 0;

    constructor(p_id, p_modelo, p_anoFab, p_velMax, p_cantPue, p_cantRue)
    {
        super(p_id, p_modelo, p_anoFab, p_velMax);
        this.cantPue = p_cantPue;
        this.cantRue = p_cantRue;
    }

    toString()
    {
        return super.toString() + ", cantPue: " + this.cantPue + ", CantRue: " + this.cantRue;
    }
}

var stringVehiculos = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"DodgeViper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]';


var tableHead = document.getElementById("tableHead");
var idBody = document.getElementById("idBody");
var arrayObjetos = JSON.parse(stringVehiculos);
var selectFilter = document.getElementById("selectFiltro");
let formDatos = document.formDatos;

var btnModificar = document.getElementById("btnModificar");
var btnEliminar = document.getElementById("btnEliminar");

var txtPromedio = document.getElementById("txtPromedio");
var btnVelocidadPromedio = document.getElementById("btnVelocidadPromedio");

let formAbm = document.getElementById("formAbm");
let btnAceptar = document.getElementById("btnAceptar");
let btnCancelar = document.getElementById("btnCancelar");

let selectTipo = document.getElementById("selectTipo");
let txtId = document.getElementById("txtId");
let txtModelo = document.getElementById("txtModelo");
let txtAnoFab = document.getElementById("txtAnoFab");
let txtVelMax = document.getElementById("txtVelMax");
let txtAltMax = document.getElementById("txtAltMax");
let txtAutonomia = document.getElementById("txtAutonomia");
let txtCantPue = document.getElementById("txtCantPue");
let txtCantRue = document.getElementById("txtCantRue");

console.log("coches::");
console.log(arrayObjetos);

idBody.onload = ()=>{formAbm.style.display = "none"};

var vehiculos = arrayObjetos.map((e) => 
    {
        if (e.hasOwnProperty("autonomia"))
        {
            return new Aereo(e.id, e.modelo, e.anoFab, e.velMax, e.altMax, e.autonomia);
        }
        else if (e.hasOwnProperty("cantPue"))
        {
            return new Terrestre(e.id, e.modelo, e.anoFab, e.velMax, e.cantPue, e.cantRue);
        }
    });

console.log("coches::");
console.log(vehiculos);

var vehiculosFiltrados = [];
actualizarListaFiltrada();

// console.log(p1.toString());
// console.log(p1.toJson());

// console.log(e1.toString());
// console.log(e1.toJson());


// console.log(arrayObjetos);





function actualizarListaFiltrada()
{
    vehiculosFiltrados = filtrarVehiculos(vehiculos);
    console.log("vehiculosFiltrados:");
    console.log(vehiculosFiltrados);
}

selectFilter.addEventListener("change", () =>
{
    actualizarListaFiltrada();
    dibujarTabla(vehiculosFiltrados);
}
);


function activarCheckBoxes()
{
    let contCkeckboxes = document.getElementById("contenedorCheckboxes").children;
    for (let i=0; i < contCkeckboxes.length; i++) 
    {
        if(contCkeckboxes[i].type === "checkbox") 
        {
            contCkeckboxes[i].checked = true;

            contCkeckboxes[i].addEventListener("change", ()=>
                {
                    actualizarListaFiltrada();
                    dibujarTabla();
                })
        }
    }
}

activarCheckBoxes();


/**
 * Filtra la lista de personas recibida como parámetro
 * @param {Array} personas -Aereos y Terrestres
 * @returns  {Array} personas filtradas 
 */
function filtrarVehiculos(personas)
{
    let seleccion = selectFilter.value;
    let vehiculosFiltrados = vehiculos.filter(elemento => 
    {
        if (elemento instanceof Terrestre && (seleccion == "terrestre" || seleccion == "todos"))
        {
            return true;
        }
        else if (elemento instanceof Aereo && (seleccion == "aereo" || seleccion == "todos"))
        {
            return true;
        }
        return false;
    });
    return vehiculosFiltrados;
}



function dibujarTabla()
{
    let ckId = document.getElementById("checkId");
    let ckNom = document.getElementById("checkModelo");
    let ckAp = document.getElementById("checkAnoFab");
    let ckEd = document.getElementById("checkVelMax");
    let ckVent = document.getElementById("checkAltMax");
    let ckSueld = document.getElementById("checkAutonomida");
    let ckComp = document.getElementById("checkCantPue");
    let ckTel = document.getElementById("checkCantRue");

    let encabezadoId = document.getElementById("colId");
    let encabezadoNom = document.getElementById("colModelo");
    let encabezadoAp = document.getElementById("colAnoFab");
    let encabezadoEd = document.getElementById("colVelMax");
    let encabezadoVent = document.getElementById("colAutonomia");
    let encabezadoSueld = document.getElementById("colAltMax");
    let encabezadoComp = document.getElementById("colCantPue");
    let encabezadoTel = document.getElementById("coCantRue");

    let tableBody = document.getElementById("tableBody");

    
    while (tableBody.firstChild)
    {
        tableBody.removeChild(tableBody.firstChild);
    }

    // actualizarListaFiltrada();

    vehiculosFiltrados.forEach(p => 
    {
        var fila = document.createElement("tr");
        if (ckId.checked)
        {
            encabezadoId.style.display = "table-cell";
            let celda = document.createElement("td");
            celda.className = encabezadoId.className;
            celda.appendChild(document.createTextNode(p.id));
            fila.appendChild(celda);

        }
        else
        {
            encabezadoId.style.display = "none";
        }

        if (ckNom.checked)
        {
            encabezadoNom.style.display = "table-cell";
            let celda = document.createElement("td");
            celda.className = encabezadoNom.className;
            celda.appendChild(document.createTextNode(p.modelo));
            fila.appendChild(celda);
        }
        else
        {
            encabezadoNom.style.display = "none";
        }

        if (ckAp.checked)
        {
            encabezadoAp.style.display = "table-cell";
            let celda = document.createElement("td");
            celda.className = encabezadoAp.className;
            celda.appendChild(document.createTextNode(p.anoFab));
            fila.appendChild(celda);
        }
        else
        {
            encabezadoAp.style.display = "none";
        }

        if (ckEd.checked)
        {
            encabezadoEd.style.display = "table-cell";
            let celda = document.createElement("td");
            celda.className = encabezadoEd.className;
            celda.appendChild(document.createTextNode(p.velMax));
            fila.appendChild(celda);
        }
        else
        {
            encabezadoEd.style.display = "none";
        }

        if (ckSueld.checked)
        {
            let celda = document.createElement("td");
            if (p instanceof Aereo)
            {
                encabezadoSueld.style.display = "table-cell";
                celda.className = encabezadoSueld.className;
                celda.appendChild(document.createTextNode(p.altMax));
            }
            else
            {
                celda.appendChild(document.createTextNode("-"));
            }
            fila.appendChild(celda);
        }
        else
        {
            encabezadoSueld.style.display = "none";
        }
    
        if (ckVent.checked)
        {
            let celda = document.createElement("td");
            if (p instanceof Aereo)
            {
                encabezadoVent.style.display = "table-cell";
                celda.className = encabezadoVent.className;
                celda.appendChild(document.createTextNode(p.autonomia));
            }
            else
            {
                celda.appendChild(document.createTextNode("-"));
            }
            fila.appendChild(celda);
        }
        else
        {
            encabezadoVent.style.display = "none";
        }

        if (ckComp.checked)
        {
            let celda = document.createElement("td");
            if (p instanceof Terrestre)
            {
                encabezadoComp.style.display = "table-cell";
                celda.className = encabezadoComp.className;
                celda.appendChild(document.createTextNode(p.cantPue));
            }
            else
            {
                celda.appendChild(document.createTextNode("-"));
            }
            fila.appendChild(celda);
        }
        else
        {
            encabezadoComp.style.display = "none";
        }
    
        if (ckTel.checked)
        {
            let celda = document.createElement("td");
            if (p instanceof Terrestre)
            {
                encabezadoTel.style.display = "table-cell";
                celda.className = encabezadoTel.className;
                celda.appendChild(document.createTextNode(p.cantRue));
            }
            else
            {
                celda.appendChild(document.createTextNode("-"));
            }
            fila.appendChild(celda);
        }
        else
        {
            encabezadoTel.style.display = "none";
        }

        fila.setAttribute("idElemento", p.id.toString());

        fila.addEventListener("dblclick", (e)=>
        {
            var filaClickeada = (e.target).parentElement;
            var idClick = filaClickeada.getAttribute("idElemento");
            var personaSeleccionada = vehiculosFiltrados.find((x)=>{return x.id == idClick});
            console.log(personaSeleccionada);
            dibujarAbm(personaSeleccionada);
            switchForms();
        });
        
        tableBody.appendChild(fila);
    });
    aplicarEstilos();
}

dibujarTabla(vehiculosFiltrados);

function dibujarAbm(p)
{
    if (p instanceof Vehiculo)
    {
        btnModificar.style.display = "inline-block";
        btnEliminar.style.display = "inline-block";
        btnAceptar.style.display = "none";
        txtId.value = p.id;
        selectTipo.disabled = true;
        txtId.disabled = true;
        txtModelo.value = p.modelo;
        txtAnoFab.value = p.anoFab;
        txtVelMax.value = p.velMax;

        if (p instanceof Aereo)
        {
            selectTipo.value = 1;
            txtAltMax.value = p.altMax;
            txtAutonomia.value = p.autonomia;
            txtCantPue.value = "";
            txtCantRue.value = "";
        }
        else if (p instanceof Terrestre)
        {
            console.log("instancia Terrestre!");
            selectTipo.value = 2;
            txtCantPue.value = p.cantPue;
            txtCantRue.value = p.cantRue;
            txtAltMax.value = "";
            txtAutonomia.value = "";
        }
    }
    else
    {
        selectTipo.disabled = false;
        txtId.value = generarIdUnica();
        txtId.disabled = true;
        btnAceptar.style.display = "inline-block";
        btnModificar.style.display = "none";
        btnEliminar.style.display = "none";
        txtModelo.value = "";
        txtAnoFab.value = "";
        txtVelMax.value = "";
        txtAltMax.value = "";
        txtAutonomia.value = "";
        txtCantPue.value = "";
        txtCantRue.value = "";
    }
    actualizarFiltroAbm();
    aplicarEstilos();
}

function generarIdUnica()
{
    let nuevaId = 1;
    for (i= 0; i<vehiculos.length; i++)
    {
        if (vehiculos[i].id ==nuevaId)
        {
            nuevaId++;
        }
    }
    return nuevaId;
}

function actualizarFiltroAbm()
{
    let propOcultas = [];
    let propCargadas = [];
    
    console.log(selectTipo.value);
    if (selectTipo.value == 2)
    {
        propCargadas = document.getElementsByClassName("propTerrestre");
        propOcultas = document.getElementsByClassName("propAereo");
    }
    else if (selectTipo.value == 1)
    {
        propCargadas = document.getElementsByClassName("propAereo");
        propOcultas = document.getElementsByClassName("propTerrestre");
    }

    for (var i= 0; i < propOcultas.length; i ++)
    {
        propOcultas[i].style.display = "none";
        if (propOcultas[i].type == "text")
        {
            propOcultas[i].value = "";
        }
    }

    for (var i= 0; i < propCargadas.length; i ++)
    {
        propCargadas[i].style.display = "inline-block";
    }
}


formDatos.addEventListener("submit", (event) => 
    {
    // cancela el comportamiento por defecto
    event.preventDefault();
    })

formAbm.addEventListener("submit", (event) => 
    {
    // cancela el comportamiento por defecto
    event.preventDefault();
    })

let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click",(e) =>
{
    switchForms()
    dibujarAbm();
})

selectTipo.addEventListener("change", actualizarFiltroAbm);

btnCancelar.addEventListener("click", ()=>
{
    switchForms()
});

btnModificar.addEventListener("click", () =>
    {
        let personaModificar = vehiculosFiltrados.find((p)=>{return p.id == txtId.value});
        console.log(personaModificar);

        personaModificar.modelo = txtModelo.value.toString();
        personaModificar.AnoFab = txtAnoFab.value.toString();
        personaModificar.VelMax = txtVelMax.value.toString();

        if (personaModificar instanceof Aereo)
        {
            personaModificar.CantPue = txtCantPue.value.toString();
            personaModificar.cantRue = txtCantRue.value.toString();

        } 
        else if(personaModificar instanceof Terrestre)
        {
            personaModificar.AltMax = txtAltMax.value.toString();
            personaModificar.Autonomia = txtAutonomia.value.toString();
        }
        console.log("personas filtradas:");
        console.log(vehiculosFiltrados);
        switchForms();
    });

btnEliminar.addEventListener("click", () =>
{
    for (i = 0; i<vehiculos.length; i++)
    {
        if (vehiculos[i].id == txtId.value)
        {
            vehiculos.splice(i, 1)
            // console.log("eLIMINADO:");
            // console.log(vehiculos.splice(i, 1));
            break;
        }
    }

    // console.log("vehiculos filtradas:");
    console.log("dibujamos tabla");
    switchForms();
});

btnAceptar.addEventListener("click", () =>
{
    let nuevoVehiculo = validarVehiculo();
    
    if (nuevoVehiculo != -1)
    {
        vehiculos.push(nuevoVehiculo);
    }
    switchForms();
});

function validarVehiculo()
{
    let banderaOk = false;
    let nuevoVehiculo;

    if(txtId.value > 0 && txtModelo.value != "" && txtAnoFab.value > 1885 && txtVelMax.value >= 0)
    {
        if (selectTipo.value == 1)
            {
                if (txtAltMax.value > 0 && txtAutonomia.value > 0)
                {
                    nuevoVehiculo = new Aereo(txtId.value, txtModelo.value, txtAnoFab.value, txtVelMax.value, txtAltMax.value, txtAutonomia.value); 
                    banderaOk = true;
                }
                else
                {
                    window.alert("AltMax o Autonomia inválidos");
                }
            }
        else if (selectTipo.value == 2)
        {
            if ( txtCantPue.value > -1 && txtCantPue.value != "" && txtCantRue.value > 0)
            {
                nuevoVehiculo = new Terrestre(txtId.value, txtModelo.value, txtAnoFab.value, txtVelMax.value, txtCantPue.value, txtCantRue.value); 
                banderaOk = true;
            }
            else
            {
                window.alert("CantPue o cantRue inválidos");
            }
        }
    }
    else
    {
        window.alert("Id, modelo, AnoFab y/o VelMax inválidos");
    }

    if (banderaOk)
    {
        console.log(nuevoVehiculo);
        return nuevoVehiculo;
    }
    else
    {
        console.log("no se genero persona");
        return -1;
    }
}

function switchForms()
{
    if (formDatos.style.display == "none")
    {
        formDatos.style.display = "inline-block";
        formAbm.style.display = "none";
        actualizarListaFiltrada();
        dibujarTabla();
    }
    else
    {
        formDatos.style.display = "none";
        formAbm.style.display = "inline-block";
    }
}

function calcularVelMaxPromedio()
{
    let sumaVelMaxes = vehiculosFiltrados.reduce((valorAnterior, elemento) =>
    {
        return valorAnterior + Number.parseInt(elemento.velMax);
    }, 0);

    let promedio = sumaVelMaxes / vehiculosFiltrados.length
    return Number.parseFloat(promedio).toFixed(2);
}

btnVelocidadPromedio.addEventListener("click",()=>
{
    txtPromedio.value = calcularVelMaxPromedio();
});


function aplicarEstilos()
{
    // formDatos.style.width = "50vw";
    // formDatos.style.margin = "auto";

    // formAbm.style.width = "50vw";
    // formAbm.style.margin = "auto";
}

tableHead.addEventListener("dblclick", (e)=>
{
    var columnaClicleada = e.target;
    var idClick = columnaClicleada.firstChild;
    idClick.
    console.log("------------");
    console.log(idClick);
    console.log(idClick == "ID");

    console.log("####");
    console.log(vehiculosFiltrados);

    switch (idClick)
    {
        case ("ID"):
            
            vehiculosFiltrados.sort((a,b)=>
                {
                    if (a.id > b.id)
                        return -1;
                    else if(b.id > a.id )
                        return 1;
                    else
                        return 0;
                });
                break;
        case ("modelo"):
            vehiculosFiltrados.sort((a,b)=>
                {
                    if (a.modelo > b.modelo)
                        return -1;
                    else if(b.modelo > a.modelo )
                        return 1;
                    else
                        return 0;
                });
                break;
        case ("AnoFab"):
            vehiculosFiltrados.sort((a,b)=>
                {
                    if (a.AnoFab > b.AnoFab)
                        return -1;
                    else if(b.AnoFab > a.AnoFab )
                        return 1;
                    else
                        return 0;
                });
                break;
        case ("VelMax"):
            vehiculosFiltrados.sort((a,b)=>
                {
                    if (a.VelMax > b.VelMax)
                        return -1;
                    else if(b.VelMax > a.VelMax )
                        return 1;
                    else
                        return 0;
                });
                break;
        case ("AltMax"):
            vehiculosFiltrados.sort((a,b)=>
                {
                    if (a.AltMax > b.AltMax)
                        return -1;
                    else if(b.AltMax > a.AltMax )
                        return 1;
                    else
                        return 0;
                });
                break;
        case ("Autonomia"):
            vehiculosFiltrados.sort((a,b)=>
            {
                if (a.Autonomia > b.Autonomia)
                    return -1;
                else if(b.Autonomia > a.Autonomia )
                    return 1;
                else
                    return 0;
            });
            break;

        case ("CantPue"):
            vehiculosFiltrados.sort((a,b)=>
            {
                if (a.CantPue > b.CantPue)
                    return -1;
                else if(b.CantPue > a.CantPue )
                    return 1;
                else
                    return 0;
            });
            break;
        case ("cantRue"):
            vehiculosFiltrados.sort((a,b)=>
            {
                if (a.cantRue > b.cantRue)
                    return -1;
                else if(b.cantRue > a.cantRue )
                    return 1;
                else
                    return 0;
            });
            break;
    }
    dibujarTabla();
});

function menorAMayor(a,b)
{
    if (a > b) 
        return -1;
    else if (b > a)
        return 1
    else
        return 0;
}