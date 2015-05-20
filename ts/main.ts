class WSConnection {
	connection: WebSocket;
	interval: number;

	constructor() {
		this.connection = new WebSocket("ws://localhost:3000/square");
		this.connection.onopen = () => {
			console.log("Client connected");
		};
		this.connection.onmessage = (e) => {
			this.renderServer(e.data);
		};
		this.connection.onclose = () => {
			console.log("Client disconnected");
			clearInterval(this.interval);
		}

		this.interval = setInterval(() => {
			var randomInt = Math.floor(Math.random() * 100) + 1;
			this.connection.send(randomInt);
			this.renderClient(randomInt);
		}, 1000);
	}

	renderClient(message) {
		var updateElem = <HTMLElement>document.querySelector("#client");
		updateElem.innerHTML = `${new Date()} Client: ${message}`;
	}

	renderServer(message) {
		var updateElem = <HTMLElement>document.querySelector("#server");
		updateElem.innerHTML = `${new Date()} Server: ${message}`;
	}
}

new(WSConnection);
