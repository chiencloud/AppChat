import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('login')}>
            <div className={cx('loginMain')}>
                <div className={cx('loginLeft')}>
                    <div className={cx('loginLeftMain')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="155" height="62" viewBox="0 0 155 62">
                            <g id="Logo" transform="translate(-40 -15)">
                                <text
                                    id="Cl"
                                    transform="translate(53 26) rotate(90)"
                                    fill="#06f"
                                    fontSize="50"
                                    fontFamily="Montserrat-Medium, Montserrat"
                                    fontWeight="500"
                                >
                                    <tspan x="0" y="0">
                                        Cl
                                    </tspan>
                                </text>
                                <text
                                    id="oud"
                                    transform="translate(95 63)"
                                    fill="#06f"
                                    fontSize="50"
                                    fontFamily="Montserrat-Medium, Montserrat"
                                    fontWeight="500"
                                >
                                    <tspan x="0" y="0">
                                        oud
                                    </tspan>
                                </text>
                            </g>
                        </svg>
                        <p>Giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn</p>
                    </div>
                </div>
                <div className={cx('loginRight')}>
                    <form>
                        <div className={cx('userName')}>
                            <input type="text" name="userName" placeholder="Tên đăng nhập" />
                        </div>
                        <div className={cx('pass')}>
                            <input type="password" name="pass" placeholder="Mật khẩu" />
                        </div>
                        <div className={cx('forgotPass')}>
                            <Link to="#">Quên mật khẩu ?</Link>
                        </div>
                        <div className={cx('submitLogin')}>
                            <button>Đăng nhập</button>
                        </div>
                        <div className={cx('createAccount')}>
                            <p>
                                Bạn chưa có tài khoản ?
                                <Link to="/register">
                                    Tạo tài khoản mới
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
