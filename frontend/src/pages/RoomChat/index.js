import classNames from 'classnames/bind';

import styles from './RoomChat.module.scss';
import { HomeLeft, HomeRight } from '~/components/Layouts/Home';


const cx = classNames.bind(styles);

function RoomChat() {
    
    return <div className={cx('home')}>
        <HomeLeft />
        {<HomeRight />}
    </div>;
}

export default RoomChat;
