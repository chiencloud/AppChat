import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

const routers = [
    {path: '/', component: Home, private: true},
    {path: '/login', component: Login},
    {path: '/register', component: Register}
]


export default routers