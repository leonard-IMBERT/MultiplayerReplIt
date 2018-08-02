const express = require('express');
const BodyParser = require('body-parser');
const Http = require('http');
const SocketIO = require('socket.io');
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.json(),
    }),
  ],
});

const Game = require('./src/Game');
const Player = require('./src/Player');

const app = express();
const http = new Http.Server(app);
const io = SocketIO(http);

app.use(BodyParser.json());
app.use(express.static('assets'));
app.set('view engine', 'pug');

const game = new Game();

io.on('connection', (socket) => {
  socket.on('play', () => {

  });

  socket.on('login', (body) => {
    game.addPlayer(new Player(body.name, socket.id));

    logger.info(`A new player enter the game: ${body.name}`);
  });

  socket.on('disconnect', () => {
    const player = game.removePlayer(socket.id);

    logger.info(`A player leaved the game: ${player.name}`);
  });
});

app.get('/', (req, res) => {
  res.render('login');
});

http.listen(3000, () => {
  game.setup();
  logger.info('Server listening on port 3000');
});
