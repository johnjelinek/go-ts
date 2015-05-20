class WSConnection {
	connection: WebSocket;
	interval: number;

	constructor() {
		this.connection = new WebSocket("ws://localhost:3000/square");
		this.connection.onopen = () => {
			console.log("Client connected");
		};
		this.connection.onmessage = (e) => {
			console.log(`Server: ${e.data}`);
		};
		this.connection.onclose = () => {
			console.log("Client disconnected");
			clearInterval(this.interval);
		}

		this.interval = setInterval(() => {
			var randomInt = Math.floor(Math.random() * 100) + 1;
			console.log(`Client: ${randomInt}`);
			this.connection.send(randomInt);
		}, 1000);
	}
}

new(WSConnection);
