//Vaeiables
const formulario = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');
let tweets = [];
//console.log(formulario);

//Event listener
eventListener();

function eventListener(){
    //cuando el usuario ingresa un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //cuando el documento es recargado (para que no se pierdan los tweets)
    document.addEventListener('DOMContentLoaded', () =>{

        tweets = JSON.parse(localStorage.getItem('tweets')) || []; //se coloca un [] porque si el localStorage esta vacio lo asigna como NULL y eso da error
        console.log(tweets);
        crearHTML();

    });
}

//Funciones

function agregarTweet(e){

    e.preventDefault();
    
    //valor del text area

    const texto = document.querySelector('#tweet').value;

    if(texto === ''){

        mostrarError('un mensaje no puede ir vacio');
        return;

    }

    const tweetObj = {

        id: Date.now(),
        mensaje: texto 
    }
    //añadir al arreglo de tweets

    tweets = [...tweets,tweetObj];
    //console.log(tweets);

    //creamos HTML
    crearHTML();

    //reiniciar el textBox

    formulario.reset();

}

//funcion mostrar error

function mostrarError (mensaje){

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');

    //vamos a insertarlo en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(( )=>{

        mensajeError.remove();

    },3000)

}

//muestra los tweets en el HTML

function crearHTML (){

    limpiarHTML();

    if(tweets.length > 0){

        tweets.forEach((tweet) => {
            //agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = ()=>{

                borrarTweet(tweet.id);

            }

            //crear lista
            const lista = document.createElement('li');
            lista.innerText = tweet.mensaje;

            //insertar en el HTML
            listTweets.appendChild(lista);
            listTweets.appendChild(btnEliminar);

        });

    }

    sincronizarStorage();

}

//agrega los Tweets actuales a LocalStorage
function sincronizarStorage(){

    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//Borrar un tweet

function borrarTweet (id){

    console.log('boorrando tweet', id);
    tweets = tweets.filter( (tweet)=>{

        return tweet.id !== id;

    } )

    crearHTML();
}

//limpiar HTML

function limpiarHTML (){

    while(listTweets.firstChild){

        listTweets.removeChild(listTweets.firstChild);

    }

}