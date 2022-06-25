import classNames from 'classnames/bind';

import styles from './RoomChat.module.scss';
import { HomeRight } from '~/components/Layouts/Home';


const cx = classNames.bind(styles);

function RoomChat() {
    return <HomeRight />
}

export default RoomChat;
