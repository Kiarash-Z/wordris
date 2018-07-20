import io from 'socket.io-client';

const socket = io('http://wordris-server.herokuapp.com');

export default socket;
