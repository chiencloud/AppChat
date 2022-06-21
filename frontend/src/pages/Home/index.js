import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import Cookies from 'universal-cookie';

import styles from './Home.module.scss';
import { HomeLeft, HomeRightDefault } from '~/components/Layouts/Home';
import { checkCookieLogin } from '~/global';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        checkCookieLogin()
            .then((res) => {
                if (!res) {
                    navigate('/login')
                }
            })
    }, []);

    return (
        <div className={cx('home')}>
            <HomeLeft/>
            <HomeRightDefault />
        </div>
    );
}

export default Home;
