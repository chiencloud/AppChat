import Cookies from 'universal-cookie';
import axios from 'axios';

async function checkCookieLogin() {
    const cookies = new Cookies();
    if (cookies.get('token')) {
        return await axios({
            method: 'POST',
            url: 'http://localhost:4000/api/checklogin',
            data: {
                token: cookies.get('token'),
            },
        })
            .then((res) => {
                return res
            })
            .catch((err) => {
                console.log(err);
                return false
            });
    }
    return await false
}



export default checkCookieLogin;
