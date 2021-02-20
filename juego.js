
document.addEventListener('keydown', function(evento){
	if (evento.keyCode == 32) {
		saltar(); 

		if(nivel.muerto == false){
			saltar();
		
		}else{
			nivel.velocidad = 9;
			nube.velocidad = 1;
			persona.x = ancho + 100;
			nube.x= ancho + 100;
			nivel.marcador = 0;
			nivel.muerto = false;

		}

	}
});
var imgCarro, imgNube, imgPersona, imgSuelo;


function cargaImagenes(){
	imgNube = new Image();
	imgPersona = new Image();
	imgSuelo = new Image();
	imgCarro = new Image();

	imgNube.src = 'img/nube.png'
	imgPersona.src = 'img/persona.png'
	imgSuelo.src = 'img/suelo.png'
	imgCarro.src = 'img/carro.png'
}

var ancho =700;
var alto = 300;

var canvas,ctx;

function inicializa(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
}

function borraCanvas(){
	canvas.width = ancho;
	canvas.height=alto;
}
var suelo = 230;
var carro = {y: suelo, vy:0, gravedad:2, salto:28, vymax:9, saltando: false};
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var persona = {x: ancho + 100, y: suelo-25}
var nube =  {x: 400, y: 100, velocidad: 1};
var suelog = {x: 0, y:suelo};

//AUDIO variables
var grito = new Audio("audio/grito.mp3");
grito.load();
grito.loop = false;
var music = new Audio("audio/VinnyFalcone.mp3");


function dibujaCarro(){

	cargaImagenes();
	ctx.drawImage(imgCarro,0,0,500,500,10,carro.y,130,200);
	}

function espera() {
  setTimeout(function(){ grito.pause(); }, 800);
}
///////////////////////////////////////////////////////
//PERSONA   


function dibujaPersona(){
	ctx.drawImage(imgPersona,0,0,555,746,persona.x,persona.y+18,35,50);
}

function logicaPersona(){
	if(persona.x < -100){
		persona.x = ancho + 100;
		nivel.marcador++;


	}else{																									
		persona.x -= nivel.velocidad;
	}
}
///////////////////////////////////////////////////////
function logicaNube(){
	if(nube.x < -100){
		nube.x = ancho + 100;

	}else{																									
		nube.x -= 2;
	}
}


function saltar(){
	carro.saltando = true;
	carro.vy = carro.salto;
} 

function gravedad(){
	if(carro.saltando == true) {

		if(carro.y - carro.vy - carro.gravedad > suelo){
			carro.saltando = false;
			carro.vy = 0;
			carro.y = suelo;
		}
		else{
		carro.vy -= carro.gravedad;
		carro.y -= carro.vy;
		}
	}
}

function dibujaNube(){
	ctx.drawImage(imgNube,0,0,700,465,nube.x, nube.y-55,82,31);
}

function logicaSuelo(){
	if(nube.x < -100){
		nube.x = ancho + 100;

	}else{																									
		nube.x -= nube.velocidad;
	}
}

function dibujaSuelo(){
	ctx.drawImage(imgSuelo,0,0,700,30,0,suelog.y+40,700,30);
}

function colision(){
	//cactus.x 
	//carro.y
	if(persona.x >= 100 && persona.x <=110){
		if(carro.y >= suelo-25){
			nivel.muerto = true;
			nivel.velocidad = 0;
			nube.velocidad= 0;
			
		}
	}
}


function puntuacion(){
	ctx.font = "30px impact";
	ctx.fillStyle = '#5555555';
	ctx.fillText (`${nivel.marcador}`,600,50);

	if(nivel.muerto == true){
		ctx.font = "68px impact";
		grito.play();
		ctx.fillText (`JUEGO TERMINADO`,90,150);
		espera();
	}
}

//---------------------------------------------------
//BUCLE PRINCIPAL 
var FPS = 50;
setInterval (function(){
	principal();
},1000/FPS);

function principal(){
	//console.log("principal");
}

function principal(){
	borraCanvas();
	dibujaCarro();
	music.play();
	gravedad();
	colision();
	dibujaPersona();
	logicaPersona();
	logicaNube();
	dibujaNube();
	dibujaSuelo();
	logicaSuelo();
	puntuacion();
}
//-----------------------------------------
