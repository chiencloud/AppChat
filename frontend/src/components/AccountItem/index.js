import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ infor }) {
    return (
        <div className={cx('messenger')}>
            <Link to={`/${infor.nickName}`}>
                <div className={cx('messengerLeft')}>
                    <div className={cx('avatar')}>
                        <img src={infor.img} alt={infor.userName} />
                    </div>
                    <div className={cx('infor')}>
                        <h3>{infor.userName}</h3>
                        <p>{infor.nickName}</p>
                    </div>
                </div>
                <div className={cx('messengerRight')}>
                    <div className={cx('type', infor.type === 'Bạn bè' ? 'blue' : 'gray')}>{infor.type}</div>
                </div>
            </Link>
        </div>
    );
}

export default AccountItem;
