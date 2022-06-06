import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('register')}>
            <div className={cx('registerMain')}>
                <div className={cx('registerLeft')}>
                    <div className={cx('registerLeftMain')}>
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
                <div className={cx('registerRight')}>
                    <form>
                        <div className={cx('userName')}>
                            <input type="text" name="userName" placeholder="Email" />
                        </div>
                        <div className={cx('fullName')}>
                            <input type="text" name="fullName" placeholder="Họ tên" />
                        </div>
                        <div className={cx('pass')}>
                            <input type="password" name="pass" placeholder="Mật khẩu" />
                        </div>
                        <div className={cx('forgotPass')}>
                            <input type="password" name="checkPass" placeholder="Nhập lại mật khẩu" />
                        </div>
                        <div className={cx('submitRegister')}>
                            <button>Đăng ký</button>
                        </div>
                        <div className={cx('createAccount')}>
                            <p>
                                Bạn đã có tài khoản ?<Link to="/login">Đăng nhập</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
