import { useContext, useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Messenger.module.scss';
import { ProviderMain } from '~/ContentProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBan,
    faBell,
    faBellSlash,
    faEllipsis,
    faPhone,
    faRightFromBracket,
    faTrash,
    faUser,
    faVideoCamera,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { PopperWrapper } from '~/components/Popper';
import { countTime } from '~/global';
import {SocketContext} from '~/components/Layouts/DefaultLayouts'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Messenger({ infor, handleOnclick }) {
    const me = useContext(ProviderMain);
    const [custom, setCustom] = useState(false);
    const [countTimeSend, setCountTimeSend] = useState(countTime(infor.messageInfo.createAt));
    const { messChoose, setMesChoose, setMessageContent } = handleOnclick;
    const cookies = new Cookies()
    const socket = useContext(SocketContext);

    const checkSawMessage = infor.messageInfo.saw
    const tippy = useRef();

    const UserProfile = () => {
        return (
            <div>
                <FontAwesomeIcon icon={faUser} />
                Xem profile
            </div>
        );
    };

    const Bell = () => {
        return (
            <div>
                <FontAwesomeIcon icon={faBell} />
                Tắt thông báo
            </div>
        );
    };

    const BellSlash = () => {
        return (
            <div>
                <FontAwesomeIcon icon={faBellSlash} />
                Bật thông báo
            </div>
        );
    };

    const OutChat = () => {
        return (
            <div>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Rời khỏi nhóm
            </div>
        );
    };
    

    const showMessContent = () => {
        axios.get('http://localhost:4000/api/messages',{
            params: {
                token: cookies.get('token'),
                roomChatId: infor.roomChatId
            }
        }).then( res => {
            setMessageContent(res.data)
        })
        setMesChoose(infor.roomChatId);
        
        socket.emit('joinRoomChat',{
            roomId: infor.roomChatId,
            messageInfoId: infor.messageInfo.messageInfoId,
            user: me.id,
            saw: infor.messageInfo.saw
        })
    };

    useEffect(() => {
        if (tippy.current) {
            if (custom) {
                tippy.current.style.visibility = 'visible';
            } else {
                tippy.current.style.visibility = 'hidden';
            }
        }
    }, [custom]);

    useEffect(() => {
        const handleCountTime = () => {
            setCountTimeSend(countTime(infor.messageInfo.createAt));
        };

        setInterval(handleCountTime, 1000 * 60);

        return () => {
            clearInterval(handleCountTime);
        };
    }, []);
    return (
        <div className={cx('messMain')}>
            <div
                className={cx(
                    'messenger',
                    !checkSawMessage && 'messengerSaw',
                    messChoose === infor.roomChatId && 'messChose',
                )}
                onClick={showMessContent}
            >
                <Link to={`/room/${infor.roomChatId}`}>
                    <div className={cx('messengerLeft')}>
                        <div className={cx('avatar')}>
                            <img src={infor.imageBackground} alt={infor.roomChatName} />
                        </div>
                        <div className={cx('infor')}>
                            <h3>{infor.roomChatName}</h3>
                            <p>
                                {infor.messageInfo.messageContent.length > 20
                                    ? infor.messageInfo.messageContent.slice(0, 20) + '...'
                                    : infor.messageInfo.messageContent}
                                <span>&ensp;{' · ' + countTimeSend}</span>
                            </p>
                        </div>
                    </div>
    
                    <div className={cx('alert')}></div>
                    <div className={cx('showBellSlash', !checkSawMessage && 'showBellSlashSaw')}>
                        {infor.notification !== null && <FontAwesomeIcon icon={faBellSlash} /> }
                    </div>
                </Link>
            </div>
            <div>
                <Tippy
                    interactive
                    visible={custom}
                    onClickOutside={() => {
                        setCustom(false);
                    }}
                    render={(arrt) => (
                        <div ref={tippy} {...arrt}>
                            <PopperWrapper>
                                <div className={cx('custom')}>
                                    <div className={cx('notification')}>
                                        {parseInt(infor.member) == 2 && <UserProfile />}
                                        {infor.notification === null ? <Bell /> : <BellSlash />}
                                    </div>
                                    <div className={cx('chatCall')}>
                                        <div>
                                            <FontAwesomeIcon icon={faPhone} />
                                            Gọi thoại
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faVideoCamera} />
                                            Chat video
                                        </div>
                                    </div>
                                    <div className={cx('deleteBlock')}>
                                        <div>
                                            <FontAwesomeIcon icon={faTrash} />
                                            Xóa đoạn chat
                                        </div>
                                        {parseInt(infor.member) > 2 && <OutChat />}
                                        <div>
                                            <FontAwesomeIcon icon={faBan} />
                                            Chặn
                                        </div>
                                    </div>
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div
                        className={cx('customMess')}
                        onClick={() => {
                            setCustom(!custom);
                        }}
                    >
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </Tippy>
            </div>
        </div>
    );
}

export default Messenger;
