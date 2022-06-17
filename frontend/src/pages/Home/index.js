import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

import styles from './Home.module.scss';
import { ProviderMain } from '~/ContentProvider';
import { HomeLeft, HomeRightDefault, HomeRight } from '~/components/Layouts/Home';
import { checkCookieLogin } from '~/global';

const cx = classNames.bind(styles);

function Home() {
    const me = useContext(ProviderMain);
    const [selectionType, setSelectionType] = useState('all');
    const [messenger, setMessenger] = useState([]);
    const [messChoose, setMesChoose] = useState('');
    const [messageContent, setMessageContent] = useState(null);
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        checkCookieLogin()
            .then((res) => {
                if (res) {
                    axios.get('http://localhost:4000/api/home',{
                        params: {
                            token: cookies.get('token')
                        }
                    }).then((resultMessenger) => {
                        setMessenger(resultMessenger.data)
                    });
                }
                else {
                    navigate('/login')
                }
            })
    }, []);

    const sendHandleLeft = {
        setSelectionType,
        selectionType,
        setMessenger,
        messenger,
        setMesChoose,
        messChoose,
        setMessageContent,
    };

    const sendHandleRight = {
        messageContent,
        setMessageContent,
        setMesChoose,
        setMessenger,
        me,
    };

    return (
        <div className={cx('home')}>
            <HomeLeft sendHandleLeft={sendHandleLeft} />
            {messageContent ? <HomeRight sendHandleRight={sendHandleRight} /> : <HomeRightDefault />}
        </div>
    );
}

export default Home;
