import classNames from 'classnames/bind';
import styles from './RoomChat.module.scss';

const cx = classNames.bind(styles);

function RoomChat() {
    return <div className={cx('home')}>
        <HomeLeft sendHandleLeft={sendHandleLeft} />
        <HomeRight sendHandleRight={sendHandleRight} />
    </div>;
}

export default RoomChat;
