import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Register() {
    const [userName, setUserName] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [rePass, setRePass] = useState('');
    const [gender, setGender] = useState('');
    const [checkPass, setCheckPass] = useState(false);
    const [checkUserName, setCheckUserName] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const navigate = useNavigate();

    if (userName) {
        axios
            .get('http://localhost:4000/api/register/checkusername', {
                params: {
                    username: userName,
                },
            })
            .then((e) => {
                setCheckUserName(e.data);
            });
    }

    const register = () => {
        if (userName && fullName && password && rePass && gender && !checkPass && !checkUserName) {
            axios({
                method: 'POST',
                url: 'http://localhost:4000/api/register',
                data: {
                    username: userName,
                    fullname: fullName,
                    password: password,
                    gender: gender,
                },
            })
                .then((res) => {
                    if (res.data) {
                        setRegisterSuccess(true);
                    }
                    else{
                        alert('Lỗi')
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            alert('Vui lòng nhập đầy đủ thông tin ');
        }
    };

    const RegisterSuccess = () => {
        return (
            <div className={cx('registerSuccess')}>
                <p>Tạo tài khoản thành công. Nhấn tiếp tục để đăng nhập</p>
                <button
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Tiếp tục
                </button>
            </div>
        );
    };

    // const ResigerForm = () => {
    //     console.log(1);
    //     return (

    //     );
    // };

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
                    {registerSuccess ? (
                        <RegisterSuccess />
                    ) : (
                        <div>
                            <div className={cx('userName')}>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Tên đăng nhập"
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                    }}
                                />
                                {checkUserName && (
                                    <p>
                                        <FontAwesomeIcon icon={faExclamation} /> Tên này đã được sử dụng
                                    </p>
                                )}
                            </div>
                            <div className={cx('fullName')}>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Họ tên"
                                    onChange={(e) => {
                                        setFullName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={cx('pass')}>
                                <input
                                    type="password"
                                    name="pass"
                                    placeholder="Mật khẩu"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className={cx('forgotPass')}>
                                <input
                                    type="password"
                                    name="checkPass"
                                    placeholder="Nhập lại mật khẩu"
                                    onChange={(e) => {
                                        setRePass(e.target.value);
                                        if (e.target.value === password) setCheckPass(false);
                                        else setCheckPass(true);
                                    }}
                                />
                                {checkPass && (
                                    <p>
                                        <FontAwesomeIcon icon={faExclamation} /> Mật khẩu không khớp
                                    </p>
                                )}
                            </div>
                            <div className={cx('gender')}>
                                <div>
                                    <input
                                        name="gender"
                                        type="radio"
                                        id="male"
                                        onClick={(e) => {
                                            e.target.checked = true;
                                            setGender(e.target.checked ? '1' : '0');
                                        }}
                                    />
                                    <label htmlFor="male">Nam</label>
                                </div>
                                <div>
                                    <input
                                        name="gender"
                                        type="radio"
                                        id="famale"
                                        onClick={(e) => {
                                            e.target.checked = true;
                                            setGender(e.target.checked ? '0' : '1');
                                        }}
                                    />
                                    <label htmlFor="famale">Nữ</label>
                                </div>
                            </div>
                            <div className={cx('submitRegister')}>
                                <button onClick={register}>Đăng ký</button>
                            </div>
                            <div className={cx('createAccount')}>
                                <p>
                                    Bạn đã có tài khoản ?<Link to="/login">Đăng nhập</Link>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
