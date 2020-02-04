//https://github.com/brozeph/simple-socks

const socks5 = require('simple-socks');
const server = socks5.createServer({
	authenticate: function (username, password, socket, callback) {
		// verify username/password
		if (username !== 'admin' || password !== 'admin') {
			console.log('Wrong username and pwd', username, password);
			// respond with auth failure (can be any error)
			return setImmediate(callback, new Error('invalid credentials'));
		}

		// return successful authentication
		return setImmediate(callback);
	}
});

// start listening!
server.listen(1080);

server.on('handshake', function () {
	console.log('------new client connection recieved-------');
});

// When authentication succeeds
server.on('authenticate', function (username) {
	console.log('user %s successfully authenticated!', username);
});

// When authentication fails
server.on('authenticateError', function (username, err) {
	console.log('user %s failed to authenticate...', username);
	console.log(err);
});

// When a reqest arrives for a remote destination
server.on('proxyConnect', function (info, destination) {
	console.log('connected to remote server at %s:%d', info.host, info.port);
});

server.on('proxyData', function (data) {
	console.log('data length', data.length);
});

// When an error occurs connecting to remote destination
server.on('proxyError', function (err) {
	console.error('unable to connect to remote server, Error:');
	console.error(err);
});

// When a proxy connection ends
server.on('proxyEnd', function (response, args) {
	console.log('socket closed with code %d', response);
});


