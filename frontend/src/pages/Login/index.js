import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const [noUserName, setNoUserName] = useState(false);
    const [noPass, setNoPass] = useState(false);
    const [noPassFail, setNoPassFail] = useState(false);
    const navigate = useNavigate();
    const userName = useRef();
    const pass = useRef();

    const handleLogin = () => {
        if (noUserName && noPass) {
            axios({
                method: 'POST',
                url: 'http://localhost:4000/api/login',
                data: {
                    username: userName.current.value,
                    password: pass.current.value,
                },
            })
                .then((respon) => {
                    if (respon.token) {
                        document.cookie = `token=${respon.token}`;
                        navigate('/', { replace: true });
                    }
                    if (respon.err) {
                        alert('Lỗi cơ sở dữ liệu');
                    }
                    if (respon.fail) {
                        setNoPassFail(true);
                        setNoUserName(false);
                        setNoPass(false);
                    }
                })
                .catch((e) => console.log(e));
        } else {
            setNoPassFail(true);
            setNoUserName(false);
            setNoPass(false);
        }
    };

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
                    <div>
                        <div className={cx('userName')}>
                            <input
                                ref={userName}
                                onChange={(e) => {
                                    setNoPassFail(false);
                                    if (e.target.value.trim() !== '') setNoUserName(true);
                                    else setNoUserName(false);
                                }}
                                type="text"
                                name="userName"
                                placeholder="Tên đăng nhập"
                            />
                        </div>
                        <div className={cx('pass')}>
                            <input
                                ref={pass}
                                onChange={(e) => {
                                    setNoPassFail(false);
                                    if (e.target.value.trim() !== '') setNoPass(true);
                                    else setNoPass(false);
                                }}
                                type="password"
                                name="pass"
                                placeholder="Mật khẩu"
                            />
                        </div>
                        <div className={cx('passFail')}>
                            {noPassFail && <p>Tài khoản hoặc mật khẩu không chính xác</p>}
                        </div>
                        <div className={cx('forgotPass')}>
                            <Link to="#">Quên mật khẩu ?</Link>
                        </div>
                        <div className={cx('submitLogin')}>
                            <button onClick={handleLogin}>Đăng nhập</button>
                        </div>
                        <div className={cx('createAccount')}>
                            <p>
                                Bạn chưa có tài khoản ?<Link to="/register">Tạo tài khoản mới</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
