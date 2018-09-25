import io from 'socket.io-client';

const socket = io('https://wordris-server.herokuapp.com');

export default socket;
