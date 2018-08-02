const socket = io();

socket.emit('login', { name: 'Kplop' });
