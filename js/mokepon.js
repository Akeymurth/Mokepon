//estas dos lineas solo las ocupamos cuando arranque primero toda el script que este en el DOM en el HEAD, debe de llevar esta funcion y el window
//function iniciarJuego (){}; 
//window.addEventListener('load', iniciarJuego);
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorBotones = document.getElementById('contenedorBotones');
const sectionVerMapa = document.getElementById('verMapa');
const mapa = document.getElementById('mapa');
sectionVerMapa.style.display = 'none';

let jugadorId = null;
let mokepones = [];
let opcionDeMokepones
let ataqueJugador = [];
let ataqueEnemigo = [];
let resultado
let vidasJugador = 3;
let vidasEnemigo = 3;
let victoriasJugador = 0;
let victoriasEnemigo= 0;

let inputHipodoge
let inputCapipepo
let inputRatigueya

let mascotaJugador
let mascotaJugadorObjeto
let ataquesDeMokepones
let ataqueMokeponEnemigo

let botonFuego
let botonAgua
let botonTierra
let botones = [];

let indexAtaqueJugador
let indexAtaqueEnemigo

let lienzo = mapa.getContext('2d');
let intervalo
let mapBackground = new Image();
mapBackground.src = './Imagenes/mokemap.png';

let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20;

const maximoAnchoDelMapa = 625;
if(anchoDelMapa > maximoAnchoDelMapa){
    anchoDelMapa = maximoAnchoDelMapa -20;
}

alturaQueBuscamos = anchoDelMapa * 400 / 600;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class Mokepon {
    constructor(tipo, elemento, nombre, foto, vida) {
        this.tipo = tipo;
        this.elemento = elemento;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 60;
        this.alto = 60;
        this.x = aleatorio (0, mapa.width - this.ancho);
        this.y = aleatorio (0, mapa.height - this.alto);
        this.mapaFoto = new Image();
        this.mapaFoto.src = foto;
        this.velocidadx = 0;
        this.velocidady = 0;
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x, /* eje x en canvas */
            this.y, /* eje y en canvas */
            this.ancho, /* tamaño de la imagen */
            this.alto   /* tamaño de la imagen */
            );
    };
};

let hipodoge = new Mokepon('Agua', '💧💧💧🔥🌱', 'Hipodoge', './Imagenes/hipodoge2.png', 5);
let capipepo = new Mokepon('Planta', '🌱🌱🌱💧🔥', 'Capipepo', './Imagenes/capi2.png', 5);
let ratigueya = new Mokepon('Fuego', '🔥🔥🔥💧🌱', 'Ratigueya', './Imagenes/rati2.png', 5);
let ratimon = new Mokepon('Planta', '🌱🌱🌱💧💧', 'Ratimon', './Imagenes/ratymon2.png', 5);
let dogodoge = new Mokepon('Fuego', '🔥🔥🔥💧💧', 'Dogodoge', './Imagenes/dogodoge.png', 5);
let fokamon = new Mokepon('Agua', '💧💧💧🌱🌱', 'Fokamon', './Imagenes/fokamon.png', 5);

let hipodogeEnemigo = new Mokepon('Agua', '💧💧💧🔥🌱', 'Hipodoge', './Imagenes/hipodoge2.png', 5);
let capipepoEnemigo = new Mokepon('Planta', '🌱🌱🌱💧🔥', 'Capipepo', './Imagenes/capi2.png', 5);
let ratigueyaEnemigo = new Mokepon('Fuego', '🔥🔥🔥💧🌱', 'Ratigueya', './Imagenes/rati2.png', 5);
let ratimonEnemigo = new Mokepon('Planta', '🌱🌱🌱💧💧', 'Ratimon', './Imagenes/ratymon2.png', 5);
let dogodogeEnemigo = new Mokepon('Fuego', '🔥🔥🔥💧💧', 'Dogodoge', './Imagenes/dogodoge.png', 5);
let fokamonEnemigo = new Mokepon('Agua', '💧💧💧🌱🌱', 'Fokamon', './Imagenes/fokamon.png', 5);

hipodoge.ataques.push(
    { nombre: 'Agua 💧', id: 'boton-agua'},
    { nombre: 'Agua 💧', id: 'boton-agua'},
    { nombre: 'Agua 💧', id: 'boton-agua'}, 
    { nombre: 'Fuego 🔥', id: 'boton-fuego'},
    { nombre: 'Planta 🌱', id: 'boton-tierra'}, 
);

capipepo.ataques.push(
    { nombre: 'Planta 🌱', id: 'boton-tierra'}, 
    { nombre: 'Planta 🌱', id: 'boton-tierra'}, 
    { nombre: 'Planta 🌱', id: 'boton-tierra'}, 
    { nombre: 'Agua 💧', id: 'boton-agua'}, 
    { nombre: 'Fuego 🔥', id: 'boton-fuego'},
);

ratigueya.ataques.push(
    { nombre: 'Fuego 🔥', id: 'boton-fuego'},
    { nombre: 'Fuego 🔥', id: 'boton-fuego'},
    { nombre: 'Fuego 🔥', id: 'boton-fuego'},
    { nombre: 'Agua 💧', id: 'boton-agua'}, 
    { nombre: 'Planta 🌱', id: 'boton-tierra'},
);

ratimon.ataques.push(
    { nombre: 'Planta 🌱', id: 'boton-tierra'},
    { nombre: 'Planta 🌱', id: 'boton-tierra'},
    { nombre: 'Planta 🌱', id: 'boton-tierra'},
    { nombre: 'Agua 💧', id: 'boton-agua'}, 
    { nombre: 'Agua 💧', id: 'boton-agua'}, 
);

dogodoge.ataques.push(
    { nombre: 'Fuego 🔥', id: 'boton-fuego'},
    { nombre: 'Fuego 🔥', id: 'boton-fuego'},
    { nombre: 'Fuego 🔥', id: 'boton-fuego'},
    { nombre: 'Agua 💧', id: 'boton-agua'}, 
    { nombre: 'Agua 💧', id: 'boton-agua'}, 
);

fokamon.ataques.push(
    { nombre: 'Agua 💧', id: 'boton-agua'},
    { nombre: 'Agua 💧', id: 'boton-agua'},
    { nombre: 'Agua 💧', id: 'boton-agua'},
    { nombre: 'Planta 🌱', id: 'boton-tierra'},
    { nombre: 'Planta 🌱', id: 'boton-tierra'},
);

mokepones.push(ratimon, dogodoge, fokamon, hipodoge, capipepo, ratigueya);

mokepones.forEach((mokepon) =>{
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
       <p>${mokepon.nombre}</p>
       <img id="hipodoge-foto" src=${mokepon.foto} alt=${mokepon.nombre}>
       <p>${mokepon.elemento}</p> 
       <p>${mokepon.tipo}</p>
    </label>
    `
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodoge = document.getElementById ('Hipodoge');
    inputCapipepo = document.getElementById ('Capipepo');
    inputRatigueya = document.getElementById ('Ratigueya');
    inputRatimon = document.getElementById ('Ratimon');
    inputDogodoge = document.getElementById ('Dogodoge');
    inputFokamon = document.getElementById ('Fokamon');

});

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const sectionSeleccionarAtaque = document.getElementById('seleccinar-ataque');
sectionSeleccionarAtaque.style.display = 'none';
const sectionReiniciar = document.getElementById('reiniciar');
sectionReiniciar.style.display = 'none';

const botonMascotaJugador = document.getElementById ('boton-mascota');
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

function seleccionarMascotaJugador () {
    
    const spanMascotaJugador = document.getElementById ('mascota-jugador');
    const spanJugadorTipo = document.getElementById ('jugadorTipo');
    const spanJugadorElemento = document.getElementById ('jugadorElemento');
    let image = document.createElement('img');
        
    if(inputHipodoge.checked) {
        spanJugadorTipo.innerHTML = hipodoge.tipo;
        spanJugadorElemento.innerHTML = hipodoge.elemento;
        image.src = hipodoge.foto;
        document.querySelector('.foto-jugador').appendChild(image);       
        spanMascotaJugador.innerHTML= inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
        sectionVerMapa.style.display = 'flex';
        /* sectionSeleccionarAtaque.style.display = 'flex'; */
        extraerAtaques(mascotaJugador);
        /* seleccionarMascotaEnemigo(); */
    }else if(inputCapipepo.checked){
        spanJugadorTipo.innerHTML = capipepo.tipo;
        spanJugadorElemento.innerHTML = capipepo.elemento;
        image.src = capipepo.foto;
        document.querySelector('.foto-jugador').appendChild(image);  
        spanMascotaJugador.innerHTML= inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
        sectionVerMapa.style.display = 'flex';
        /* sectionSeleccionarAtaque.style.display = 'flex'; */
        extraerAtaques(mascotaJugador);
        /* seleccionarMascotaEnemigo(); */
    }else if(inputRatigueya.checked){
        spanJugadorTipo.innerHTML = ratigueya.tipo;
        spanJugadorElemento.innerHTML = ratigueya.elemento;
        image.src = ratigueya.foto;
        document.querySelector('.foto-jugador').appendChild(image);  
        spanMascotaJugador.innerHTML= inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
        sectionVerMapa.style.display = 'flex';
        /* sectionSeleccionarAtaque.style.display = 'flex'; */
        extraerAtaques(mascotaJugador);
        /* seleccionarMascotaEnemigo(); */
    }else if(inputRatimon.checked){
        spanJugadorTipo.innerHTML = ratimon.tipo;
        spanJugadorElemento.innerHTML = ratimon.elemento;
        image.src = ratimon.foto;
        document.querySelector('.foto-jugador').appendChild(image);  
        spanMascotaJugador.innerHTML= inputRatimon.id;
        mascotaJugador = inputRatimon.id;
        sectionVerMapa.style.display = 'flex';
        /* sectionSeleccionarAtaque.style.display = 'flex'; */
        extraerAtaques(mascotaJugador);
        /* seleccionarMascotaEnemigo(); */
    }else if(inputDogodoge.checked){
        spanJugadorTipo.innerHTML = dogodoge.tipo;
        spanJugadorElemento.innerHTML = dogodoge.elemento;
        image.src = dogodoge.foto;
        document.querySelector('.foto-jugador').appendChild(image);  
        spanMascotaJugador.innerHTML= inputDogodoge.id;
        mascotaJugador = inputDogodoge.id;
        sectionVerMapa.style.display = 'flex';
        /* sectionSeleccionarAtaque.style.display = 'flex'; */
        extraerAtaques(mascotaJugador);
        /* seleccionarMascotaEnemigo(); */
    }else if(inputFokamon.checked){
        spanJugadorTipo.innerHTML = fokamon.tipo;
        spanJugadorElemento.innerHTML = fokamon.elemento;
        image.src = fokamon.foto;
        document.querySelector('.foto-jugador').appendChild(image);  
        spanMascotaJugador.innerHTML= inputFokamon.id;
        mascotaJugador = inputFokamon.id;
        sectionVerMapa.style.display = 'flex';
        /* sectionSeleccionarAtaque.style.display = 'flex'; */
        extraerAtaques(mascotaJugador);
        /* seleccionarMascotaEnemigo(); */
    }else{
        alert('!Debes seleccionar una mascota¡');
        return;
    };

    seleccionarMokepon(mascotaJugador);    
    iniciarMapa();
};

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for(let i=0; i<mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        };
    };

    mostrarAtaque(ataques);
};

function mostrarAtaque (ataques){
    ataques.forEach((ataque) =>{
        ataquesDeMokepones = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorBotones.innerHTML += ataquesDeMokepones;

    });

    botones = document.querySelectorAll('.BAtaque');
    
    botonFuego = document.getElementById ('boton-fuego');
    botonAgua = document.getElementById ('boton-agua');
    botonTierra = document.getElementById ('boton-tierra');
};

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === 'Fuego 🔥'){
                ataqueJugador.push('Fuego 🔥');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
                sectionJugadorAtaque('Fuego 🔥');                
            }else if(e.target.textContent === 'Agua 💧'){
                ataqueJugador.push('Agua 💧');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true; 
                sectionJugadorAtaque('Agua 💧');                
            }else {
                ataqueJugador.push('Planta 🌱');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
                sectionJugadorAtaque('Planta 🌱');                
            };
            ataqueMascotaEnemigo();
        });
    });
};

/* function seleccionarMascotaEnemigo (){
    let mascotaAleatorio = aleatorio(0, mokepones.length -1);
    const spanMascotaEnemigo = document.getElementById ('mascota-enemigo');
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre;
    
    const spanEnemigoTipo = document.getElementById ('enemigoTipo');
    spanEnemigoTipo.innerHTML = mokepones[mascotaAleatorio].tipo;

    const spanEnemigoElemento = document.getElementById ('enemigoElemento');
    spanEnemigoElemento.innerHTML = mokepones[mascotaAleatorio].elemento;
    
    sectionSeleccionarMascota.style.display = 'none';
    ataqueMokeponEnemigo = mokepones[mascotaAleatorio].ataques;
    
    let image = document.createElement('img');
    image.src = mokepones[mascotaAleatorio].foto;
    document.querySelector('.foto-enemigo').appendChild(image); 
    
    mokepones.forEach((moke) =>{
        if(moke.nombre === mokepones[mascotaAleatorio].nombre){
            console.log(moke.nombre);
            ataquesPC = moke.ataques
        }
    });

    console.log(ataquesPC);
    secuenciaAtaque();
}; */

function seleccionarMascotaEnemigo (enemigo){
    
    const spanMascotaEnemigo = document.getElementById ('mascota-enemigo');
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    
    const spanEnemigoTipo = document.getElementById ('enemigoTipo');
    spanEnemigoTipo.innerHTML = enemigo.tipo;

    const spanEnemigoElemento = document.getElementById ('enemigoElemento');
    spanEnemigoElemento.innerHTML = enemigo.elemento;
    
    sectionSeleccionarMascota.style.display = 'none';
    ataqueMokeponEnemigo = enemigo.ataques;
    
    let image = document.createElement('img');
    image.src = enemigo.foto;
    document.querySelector('.foto-enemigo').appendChild(image); 
    
    mokepones.forEach((moke) =>{
        if(moke.nombre === enemigo.nombre){
            console.log(moke.nombre);
            ataquesPC = moke.ataques
        }
    });

    console.log(ataquesPC);
    secuenciaAtaque();
};

function ataqueMascotaEnemigo(){
    let ataqueAletorio = aleatorio(0,ataquesPC.length -1);
    
    if (ataquesPC[ataqueAletorio].nombre === 'Fuego 🔥') {
        ataqueEnemigo.push ('Fuego 🔥');
        sectionEnemigoAtaque('Fuego 🔥')
    } else if (ataquesPC[ataqueAletorio].nombre === 'Agua 💧'){
        ataqueEnemigo.push ('Agua 💧');
        sectionEnemigoAtaque('Agua 💧')
    } else {
        ataqueEnemigo.push ('Planta 🌱'); 
        sectionEnemigoAtaque('Planta 🌱')
    };

    console.log(ataqueEnemigo);
    ataquesPC.splice(ataqueAletorio,1);
    iniciarPelea();
}

function iniciarPelea() {
    if (ataqueJugador.length === 5){
        combate();
    }
};

function indexAmbosAtaques(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
};

function combate (){
    const spanVidasJugador = document.getElementById ('vidas-jugador');
    const spanVidasEnemigo = document.getElementById ('vidas-enemigo');

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index] ){
            indexAmbosAtaques(index, index);
            crearMensaje ('- Empate 😒🤔');
        }else if (ataqueJugador[index] === 'Fuego 🔥' && ataqueEnemigo[index] === 'Planta 🌱' || ataqueJugador[index] === 'Agua 💧' && ataqueEnemigo[index] === 'Fuego 🔥' || ataqueJugador[index] === 'Planta 🌱' && ataqueEnemigo[index] === 'Agua 💧'){
            indexAmbosAtaques(index, index);
            crearMensaje ('- Ganaste 🎉🎊');
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        } else{
            indexAmbosAtaques(index, index);
            crearMensaje ('- Perdiste!!! 😭😭');
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        };
    };
    
    revisarVictorias();
};


function revisarVictorias(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal('- Esto es un empate 🙄😑');
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('- Ganaste la partida 🤗🎉🎊');
    } else {
        crearMensajeFinal('- Perdiste la partida 😭');
    };
};

function sectionJugadorAtaque(mensajeAtaque){
    const mensajeAtaqueJugador = document.getElementById('mensajeResultadoJugador');
    mensajeAtaqueJugador.innerHTML = mensajeAtaque;
};

function sectionEnemigoAtaque(mensajeEnemigo){
    const mensajeAtaqueEnemigo = document.getElementById('mensajeResultadoEnemigo');
    mensajeAtaqueEnemigo.innerHTML = mensajeEnemigo;
};


const sectionMensajes = document.getElementById ('nuevo-mensaje');


function crearMensaje(){
    const ataquesDelJugador = document.getElementById ('ataques-del-jugador');
    const ataquesDelEnemigo = document.getElementById ('ataques-del-enemigo');

    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');
    
    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);  
};

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal;
    sectionReiniciar.style.display = 'block';
};

const botonReiniciar = document.getElementById ('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);

unirseAlJuego();

function reiniciarJuego(){
    location.reload();
};

function unirseAlJuego(){
    fetch('http://localhost:8080/unirse')
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta);
                        jugadorId = respuesta;
                    })
            }
        })
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadx;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidady;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapBackground,
        0, 
        0, 
        mapa.width, 
        mapa.height
        );
    mascotaJugadorObjeto.pintarMokepon();
    hipodogeEnemigo.pintarMokepon();
    capipepoEnemigo.pintarMokepon();
    ratigueyaEnemigo.pintarMokepon();
    ratimonEnemigo.pintarMokepon();
    dogodogeEnemigo.pintarMokepon();
    fokamonEnemigo.pintarMokepon();

    enviarPosocion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

    if(mascotaJugadorObjeto.velocidadx !== 0 || mascotaJugadorObjeto.velocidady !== 0){
        revisarColision(hipodogeEnemigo);
        revisarColision(ratigueyaEnemigo);
        revisarColision(capipepoEnemigo);
        revisarColision(ratimonEnemigo);
        revisarColision(dogodogeEnemigo);
        revisarColision(fokamonEnemigo);
    };
};

function enviarPosocion (x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos);
                })
        }
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadx = 5;
};

function moverAbajo(){
    mascotaJugadorObjeto.velocidady = 5;
};

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadx = -5;
};

function moverArriba(){
    mascotaJugadorObjeto.velocidady = -5;
};

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadx = 0;
    mascotaJugadorObjeto.velocidady = 0;
};

function sePresionoUnaTecla(event){
    /* console.log(event.key); */
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
            case 'ArrowDown':
                moverAbajo()
                break
            case 'ArrowLeft':
                moverIzquierda()
                break
            case 'ArrowRight':
                moverDerecha()
                break
            default:
                break
    };
};

function iniciarMapa(){
    /* mapa.width = 600;
    mapa.height = 400; */
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
    sectionSeleccionarMascota.style.display = 'none';
}

function obtenerObjetoMascota(){
    for(let i=0; i<mokepones.length; i++){
        if (mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        };
    };
};

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y +25;
    const abajoEnemigo = enemigo.y + enemigo.alto -25;
    const derechaEnemigo = enemigo.x + enemigo.ancho -25;
    const izquierdaEnemigo = enemigo.x +25;

    const arribaMascota = mascotaJugadorObjeto.y;
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
    const izquierdaMascota = mascotaJugadorObjeto.x;

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }

    detenerMovimiento();
    clearInterval(intervalo);
    seleccionarMascotaEnemigo(enemigo);
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none';
    
};

function aleatorio(min, max){
    return Math.floor(Math.random() *(max - min + 1)+min)
}; 