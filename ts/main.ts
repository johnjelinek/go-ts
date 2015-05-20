/// <reference path="../typings/sockjs/sockjs.d.ts" />

function renderClient(message: string) {
	var updateElem = <HTMLElement>document.querySelector("#client");
	updateElem.innerHTML = `${new Date()} Client: ${message}`;
}

function renderServer(message: string) {
	var updateElem = <HTMLElement>document.querySelector("#server");
	updateElem.innerHTML = `${new Date()} Server: ${message}`;
}

class WSConnection {
	connection: WebSocket;
	interval: number;

	constructor() {
		this.connection = new WebSocket("ws://localhost:3000/square");
		this.connection.onopen = () => {
			console.log("Client connected");
		};
		this.connection.onmessage = (e) => {
			renderServer(e.data);
		};
		this.connection.onclose = () => {
			console.log("Client disconnected");
			clearInterval(this.interval);
		}

		this.interval = setInterval(() => {
			var randomInt = Math.floor(Math.random() * 100) + 1;
			this.connection.send(randomInt);
			renderClient(randomInt.toString());
		}, 1000);
	}
}

class SockConnection {
	sock: SockJS;
	interval: number;

	constructor() {
		this.sock = new SockJS("http://localhost:3000/sock")
		this.sock.onopen = () => {
			console.log("Client connected")
		}
		this.sock.onmessage = (e) => {
			renderServer(e.data);
		}
		this.sock.onclose = () => {
			console.log("Client disconnected");
			clearInterval(this.interval);
		}

		this.interval = setInterval(() => {
			var randomInt = Math.floor(Math.random() * 100) + 1;
			this.sock.send(randomInt);
			renderClient(randomInt.toString());
		}, 1000);
	}
}

new(SockConnection);
