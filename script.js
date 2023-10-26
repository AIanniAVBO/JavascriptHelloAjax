//Aggiunge un evento che si attiva quando il DOM viene caricato
//	e richiama la funzione onAllLoaded
document.addEventListener("DOMContentLoaded", onAllLoaded);
//Crea una variabile globale, quindi visibile in tutto il codice, di nome table
var table;
//Crea una variabile globale, in cui inserirà il paragrafo (p) con id demo
var demo;

//Crea una variabile costante, che non può essere alterata, per rappresentare il numero di righe
const rows = 3;
//Crea una variabile costante, che non può essere alterata, per rappresentare il numero di colonne
const cols = 3;
//Crea un array che contiene tutte le stringhe che prima erano nella tabella
const words = ["Ciao", "come", "stai", "Tutto", "bene", "grazie", "Mi", "fa", "piacere"];

//Definizione di una funzione che prende in input un argomento
function onAllLoaded(event) {
	//Stampa in console un messaggio
	console.log("DOM loaded");
	
	//Ricerca la table all'interno del DOM e la salva nella variabile creata in precedenza
	table = document.getElementById("wordsTable");
	//Ottiene un array con dentro tutti i figli di table aventi il come tag td
	let allTDs = table.getElementsByTagName('td');
	//Stampa tutti i td
	console.log(allTDs);
	
	//Salva il paragrafo con ID demo per fare in modo di poterlo modificare più avanti nel codice
	demo = document.getElementById("demo");
	//Per ogni elemento contenuto in allTDs
	for (let i = 0; i < allTDs.length; ++i) {
		//Associa un evento che si attiva al click del mouse e che richiama la funzione tdClicked
		allTDs[i].addEventListener("click", tdClicked);
	}
	//Ricerca il tasto resetButton e associa al click la funzione resetText
	document.getElementById("resetButton").addEventListener("click", resetText);
}

//Funzione da chiamare quando viene premuto su un TD
function tdClicked(event) {
	//Estrae il testo da TD
	let cellText = event.srcElement.innerText;
	//Lo concatena con il testo contenuto dentro demo facendo in modo che venga
	//	separato da uno spazio
	demo.innerText = [demo.innerText, cellText].join(" ");
}

//Funzione che effettua imposta un testo vuoto dentro demo
function resetText() {
	//Imposta un testo vuoto dentro demo
	demo.innerText = "";
}