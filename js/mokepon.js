//estas dos lineas solo las ocupamos cuando arranque primero toda el script que este en el DOM en el HEAD, debe de llevar esta funcion y el window
//function iniciarJuego (){}; 
//window.addEventListener('load', iniciarJuego);
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorBotones = document.getElementById('contenedorBotones');

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
let ataquesDeMokepones
let ataqueMokeponEnemigo

let botonFuego
let botonAgua
let botonTierra
let botones = [];

let indexAtaqueJugador
let indexAtaqueEnemigo

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }

};

let hipodoge = new Mokepon('Hipodoge', './Imagenes/hipodoge2.png', 5);
let capipepo = new Mokepon('Capipepo', './Imagenes/capipepo2.png', 5);
let ratigueya = new Mokepon('Ratigueya', './Imagenes/ratigueya2.png', 5);

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

mokepones.push(hipodoge, capipepo, ratigueya);

mokepones.forEach((mokepon) =>{
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
       <p>${mokepon.nombre}</p>
       <img id="hipodoge-foto" src=${mokepon.foto} alt=${mokepon.nombre}> 
    </label>
    `
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodoge = document.getElementById ('Hipodoge');
    inputCapipepo = document.getElementById ('Capipepo');
    inputRatigueya = document.getElementById ('Ratigueya');
});

const sectionSeleccionarAtaque = document.getElementById('seleccinar-ataque');
sectionSeleccionarAtaque.style.display = 'none';
const sectionReiniciar = document.getElementById('reiniciar');
sectionReiniciar.style.display = 'none';

const botonMascotaJugador = document.getElementById ('boton-mascota');
botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

function seleccionarMascotaJugador () {
    
    const spanMascotaJugador = document.getElementById ('mascota-jugador');
    let image = document.createElement('img');
    
    if(inputHipodoge.checked) {
        image.src = hipodoge.foto;
        document.querySelector('.foto-jugador').appendChild(image);       
        spanMascotaJugador.innerHTML= inputHipodoge.id;
        mascotaJugador = inputHipodoge.id;
        sectionSeleccionarAtaque.style.display = 'flex';
        extraerAtaques(mascotaJugador);
        seleccionarMascotaEnemigo();
    }else if(inputCapipepo.checked){
        image.src = capipepo.foto;
        document.querySelector('.foto-jugador').appendChild(image);  
        spanMascotaJugador.innerHTML= inputCapipepo.id;
        mascotaJugador = inputCapipepo.id;
        sectionSeleccionarAtaque.style.display = 'flex';
        extraerAtaques(mascotaJugador);
        seleccionarMascotaEnemigo();
    }else if(inputRatigueya.checked){
        image.src = ratigueya.foto;
        document.querySelector('.foto-jugador').appendChild(image);  
        spanMascotaJugador.innerHTML= inputRatigueya.id;
        mascotaJugador = inputRatigueya.id;
        sectionSeleccionarAtaque.style.display = 'flex';
        extraerAtaques(mascotaJugador);
        seleccionarMascotaEnemigo();
    }else{
        alert('!Debes seleccionar una mascota¡');
    };
    
};

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
            }else if(e.target.textContent === 'Agua 💧'){
                ataqueJugador.push('Agua 💧');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;                
            }else {
                ataqueJugador.push('Planta 🌱');
                console.log(ataqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            };
            ataqueMascotaEnemigo();
        });
    });
};

function seleccionarMascotaEnemigo (){
    const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    let mascotaAleatorio = aleatorio(0, mokepones.length -1);
    const spanMascotaEnemigo = document.getElementById ('mascota-enemigo');
    
    sectionSeleccionarMascota.style.display = 'none';
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre;
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
};

function ataqueMascotaEnemigo(){
    let ataqueAletorio = aleatorio(0,ataquesPC.length -1);
    
    if (ataquesPC[ataqueAletorio].nombre === 'Fuego 🔥') {
        ataqueEnemigo.push ('Fuego 🔥');
    } else if (ataquesPC[ataqueAletorio].nombre === 'Agua 💧'){
        ataqueEnemigo.push ('Agua 💧');
    } else {
        ataqueEnemigo.push ('Planta 🌱');  
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

const sectionMensajes = document.getElementById ('nuevo-mensaje');


function crearMensaje(){
    const ataquesDelJugador = document.getElementById ('ataques-del-jugador');
    const ataquesDelEnemigo = document.getElementById ('ataques-del-enemigo');

    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');
    
    /* sectionMensajes.innerHTML = resultado; */
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);  
};

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal;
    
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;

    sectionReiniciar.style.display = 'block';
};

const botonReiniciar = document.getElementById ('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);

function reiniciarJuego(){
    location.reload();
};

function aleatorio(min, max){
    return Math.floor(Math.random() *(max - min + 1)+min)
}; 