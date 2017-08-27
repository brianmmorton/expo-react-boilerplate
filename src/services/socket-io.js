import io from 'socket.io-client';
import { API } from '../config';
export default io(API, { transports: ['websocket'] });
