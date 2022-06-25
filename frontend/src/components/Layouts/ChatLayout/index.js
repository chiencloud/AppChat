import classNames from 'classnames/bind';
import {HomeLeft} from '~/components/Layouts/Home';
import styles from './ChatLayout.module.scss';

const cx = classNames.bind(styles);

function ChatLayout({ children }) {
    return ( 
        <div className={cx('home')}>
            <HomeLeft />
            {children}
        </div>
    );
}

export default ChatLayout;