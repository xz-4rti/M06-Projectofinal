window.onload = () => {

    // Crear tarjetas
    crearTarjetas(filosofos);

    // crearTarjetas(filosofos)
    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click',crearNuevaTarjeta);

    // Botón para guardar tarjetas
    let botonGuardarTarjetas = document.querySelector('.save-btn');
    botonGuardarTarjetas.addEventListener('click', guardarTarjetas);
 
    // Botón para cargar tarjetas
    let botonCargarTarjetas = document.querySelector('.load-btn');
    botonCargarTarjetas.addEventListener('click', cargarTarjetas);

    // Para ordenar tarjeta de A-Z
    let sortButtonAZ = document.querySelector('.sort-btn-az');
    sortButtonAZ.addEventListener('click', ordenarNombreAZ);

    // Para ordenar tarjeta de Z-A
    let sortButtonZA = document.querySelector('.sort-btn-za');
    sortButtonZA.addEventListener('click', ordenarNombreZA);

    // Crear nuvo tarjeta
    let buttonCreate = document.querySelector('.create-btn');
    buttonCreate.addEventListener('click', crearNuevaTarjeta());

}

function crearTarjetas(filosofos) {

    filosofos.forEach((filosofo) => {

        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');

        // Creamos imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // Creamos caja de informacion
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);

        // Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);

        // Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // Añadimos info del país a filaInfo
        let paisInfo = document.createElement('div');
        paisInfo.classList.add('info-pais');
        filaInfo.append(paisInfo);

        let banderaPais = document.createElement('img');
        banderaPais.src = filosofo.pais.bandera;
        banderaPais.alt = `Bandera de ${filosofo.nombre}`;
        paisInfo.append(banderaPais);

        let nombrePais = document.createElement('span');
        nombrePais.innerHTML = filosofo.pais.nombre;
        nombrePais.classList.add('pais');
        paisInfo.append(nombrePais);


        // Añadimos info de la corriente a filaInfo
        let corrienteInfo = document.createElement('div');
        corrienteInfo.classList.add('info-corriente');
        filaInfo.append(corrienteInfo);

        let corriente = document.createElement('span');
        corriente.innerHTML = `Corriente: ${filosofo.corriente}`;
        corriente.classList.add('corriente');
        corrienteInfo.append(corriente);


        // Añadimos info del arma a filaInfo
        let armaInfo = document.createElement('div');
        armaInfo.classList.add('info-arma');
        filaInfo.append(armaInfo);

        let arma = document.createElement('span');
        arma.innerHTML = `Arma: ${filosofo.arma}`;
        arma.classList.add('arma');
        armaInfo.append(arma);

        // Añadimos caja de habilidades
        let skills = document.createElement('div');
        skills.classList.add('skills');
        info.append(skills);

        // Añadimos una a una las habilidades
        for (let infoHabilidad of filosofo.habilidades) {
            // Añadimos una caja de habilidad
            let skill = document.createElement('div');
            skill.classList.add('skill');
            skills.append(skill);

            // Añadimos contenido caja de habilidad
            // 1.Icono de habilidad
            let skillIcon = document.createElement('img');
            skillIcon.src = "https://via.placeholder.com/16";
            skillIcon.alt = `Icono de ${infoHabilidad.habilidad}`;
            skill.append(skillIcon);

            // 2.Etiqueta de habilidad
            let skillName = document.createElement('span');
            skillName.innerHTML = infoHabilidad.habilidad;
            skillName.classList.add('skill-name');
            skill.append(skillName);
            
            // 2.Barra de habilidad
            let skillBar = document.createElement('div');
            skillBar.classList.add('skill-bar');
            skill.append(skillBar);

            let skillBarLevel = document.createElement('div');
            skillBarLevel.classList.add('level');
            skillBarLevel.style = `width: ${infoHabilidad.nivel * 25}%;`;
            skillBar.append(skillBarLevel);
        }

        // TASCA 2
        // Crear nuevo div
        let nouDiv = document.createElement('div');
        let botonEliminar = document.createElement('button');
        // a. Afegeix-li com a innerHTML el caràcter “&#x2716”
        botonEliminar.innerHTML = '&#x2716';
        // b. Afegeix-li la classe ‘botonEliminar’.
        botonEliminar.classList.add('botonEliminar');
        // c. Afegeix-li un listener per l’event de ‘click’, associat a la funció eliminarTarjeta
        botonEliminar.addEventListener('click', eliminarTarjeta);
        // añadir el nuevo y boton eliminar div creado
        nouDiv.append(botonEliminar);
        tarjeta.append(nouDiv);

        // Añadimos tarjeta creada al contenedor de tarjetas
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);
    })

}

function eliminarTarjeta(event) {

    // Obtener la tarjeta padre del botón de eliminar (el botón está dentro de .card)
    let tarjeta = event.target.closest('.card'); 
    // Eliminar la tarjeta del DOM
    tarjeta.remove();

}

function ordenarNombreAZ() {

    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });

    // Eliminar totes les targetes de l'array 'tarjeta'
    let container = document.querySelector(".cards-container");
    container.innerHTML = '';

    // Afegir 'tarjetasOrdenadas' al contenidor de cards
    tarjetasOrdenadas.forEach((tarjeta) => {
        container.appendChild(tarjeta);
    })

}

function ordenarNombreZA() {

    let tarjetas = Array.from(document.querySelectorAll('.card'));

    // Ordenar las tarjetas por el nombre en orden alfabético inverso Z-A
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre2.localeCompare(nombre1);
    });

    // Eliminar totes les targetes de l'array 'tarjeta'
    let container = document.querySelector(".cards-container");
    container.innerHTML = '';

    // Afegir 'tarjetasOrdenadas' al contenidor de cards
    tarjetasOrdenadas.forEach((tarjeta) => {
        container.appendChild(tarjeta);
    })

}

function crearNuevaTarjeta(event) {

    event.preventDefault();

    // Crear nuevo objeto filosofo
    let nuevoFilosofo = {};
    nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
    nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;
    nuevoFilosofo.pais = {};
    nuevoFilosofo.pais.nombre = document.querySelector('.create-card-form .pais').value;

    // Completar la función
    nuevoFilosofo.pais.bandera = document.querySelector('.create-card-form .bandera').value;
    nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
    nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;

    nuevoFilosofo.habilidades = [];
    let habilidadesInfo = document.querySelectorAll('.create-card-form .skills');
    let habilidadesNombre = ["Sabiduria", "Oratoria", "Lógica", "Innovación"]; // Un array con nombre de habilidades

    habilidadesInfo.forEach((element, index) => {

        nuevoFilosofo.habilidades.push({
            habilidad: habilidadesNombre[index],
            nivel: parseInt(element.value) || 0 // Si
        });

    });

    filosofos.push(nuevoFilosofo);

    crearTarjetas([nuevoFilosofo]);

    document.querySelector('.create-card-form form').reset();

}

function parsearTarjetas(tarjetas){

    let filosofosParseados = [];
    for (let tarjeta of tarjetas){
        let filosofo = {};
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        // Completar funció
        filosofo.pais.nombre = tarjeta.querySelector('.pais').innerHTML;
        filosofo.pais.bandera = tarjeta.querySelector('.info-pais img').src;
        filosofo.corriente = tarjeta.querySelector('.corriente').innerHTML;
        filosofo.arma = tarjeta.querySelector('.arma').innerHTML;

        filosofo.habilidades = [];
        let habilidades = tarjeta.querySelectorAll('.skill');
        for (let habilidad of habilidades) {

            let habilidadParaGuardar = {};
            habilidadParaGuardar.habilidad = habilidad.querySelector('.skill-name').innerHTML;
            habilidadParaGuardar.nivel = parseInt(habilidad.querySelector('.level').style.width) / 25;
            filosofo.habilidades.push(habilidadParaGuardar);

        }

        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;

}

function guardarTarjetas(){

    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
    alert('Tarjetas guardadas en el localStorage.');

}


function cargarTarjetas() {
    
    let tarjetasGuardadas = JSON.parse(localStorage.getItem('tarjetas') || '[]');
    if (tarjetasGuardadas.length === 0) {
        alert('No hay tarjetas guardadas.');
        return;
    }
    crearTarjetas(tarjetasGuardadas);
    
}

const filosofos = [

    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]