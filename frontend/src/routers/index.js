import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import RoomChat from '~/pages/RoomChat';

const routers = [
    { path: '/', component: Home, private: true, chat: true },
    { path: '/room/:roomChatId', component: RoomChat, private: true, chat: true },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

export default routers;
