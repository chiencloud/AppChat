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
import { PopperWrapper } from '~/components/Popper';
import { countTime } from '~/global';

const cx = classNames.bind(styles);

function Messenger({ infor, handleOnclick }) {
    const user = useContext(ProviderMain);
    const [custom, setCustom] = useState(false);
    const [countTimeSend, setCountTimeSend] = useState(countTime(infor.messageInfo.createAt));
    const { messChoose, setMesChoose, setMessageContent } = handleOnclick;

    const sawMessage = infor.messageInfo.saw.split(' ');
    const checkSawMessage = sawMessage.some((e) => e === user.id);

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

    // console.log(countTimeSend);

    return (
        <div className={cx('messMain')}>
            <div
                className={cx(
                    'messenger',
                    checkSawMessage && 'messengerSaw',
                    messChoose === infor.userId && 'messChose',
                )}
                onClick={() => {
                    setMesChoose(infor.userId);
                    setMessageContent({
                        userId: '1',
                        roomChatId: 'room1',
                        roomChatName: 'Nguyễn Duy Chiến',
                        imageBackground:
                            'https://res.cloudinary.com/dseuvenfm/image/upload/v1649743106/Cloud/ImageProduct/aBT5A8965_gyurga.jpg',
                        emoji: '',
                        topic: {
                            topicId: 'topic1',
                            topicName: 'Xanh',
                        },
                        notification: '15',
                        nickName: 'chienCloud',
                        fullName: 'Nguyễn Duy Chiến',

                        onChatRoom: true,
                        member: 2,
                        message: [
                            {
                                messageInfoId: 'mess0',
                                userSend: {
                                    userId: '002',
                                    fullName: 'Trần Đắc Phong',
                                    nickName: 'phongtd',
                                    avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                },
                                messageContent: 'Alo Alo',
                                createAt: '2022-05-30 09:56:16',
                                hidden: '005 006',
                                forward: '',
                                delete: '',
                                reply: {
                                    messageInfoId: 'mess1',
                                    userSendId: '001',
                                    nickNameSend: 'chiencloud',
                                    fullNameSend: 'Nguyễn Duy Chiến',
                                    messageContent: 'Alo Chiến 12345',
                                },
                                saw: '002',
                            },
                            {
                                messageInfoId: 'mess3',
                                userSend: {
                                    userId: '002',
                                    fullName: 'Trần Đắc Phong',
                                    nickName: 'phongtd',
                                    avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                },
                                messageContent: '12345',
                                createAt: '2022-05-30 09:56:16',
                                hidden: '',
                                forward: 'mess100',
                                delete: '',
                                reply: {},
                                saw: '',
                            },
                            {
                                messageInfoId: 'mess1',
                                userSend: {
                                    userId: '001',
                                    fullName: 'Trần Đắc Phong',
                                    nickName: 'phongtd',
                                    avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                },
                                messageContent: 'Alo Chiến',
                                createAt: '2022-05-30 09:56:16',
                                hidden: '',
                                forward: '',
                                delete: '',
                                reply: {
                                    messageInfoId: 'mess1',
                                    userSendId: '001',
                                    nickNameSend: '',
                                    fullNameSend: 'Nguyễn Duy Chiến',
                                    messageContent: 'Gì Hà xinh gái',
                                },
                                saw: '',
                            },
                            {
                                messageInfoId: 'mess2',
                                userSend: {
                                    userId: '001',
                                    fullName: 'Trần Đắc Phong',
                                    nickName: 'phongtd',
                                    avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                },
                                messageContent: '12345',
                                createAt: '2022-05-30 09:56:16',
                                hidden: '',
                                forward: '',
                                delete: '',
                                reply: {},
                                saw: '',
                            },
                            {
                                messageInfoId: 'mess4',
                                userSend: {
                                    userId: '003',
                                    fullName: 'Nguyễn Duy Chiến',
                                    nickName: '',
                                    avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                },
                                messageContent:
                                    'Singapore đất nước với diện tích chỉ tầm 1/5 Hà Nội, đất nước mà nước cũng là một nguồn tài nguyên quý giá. Chính vì vậy tại đất nước này nước thải sau khi đổ xuống cống sẽ được hệ thống lọc nước tiên tiến tái chế để sử dụng làm nước sinh hoạt. Được biết tại quốc đảo này người dân có thể uống nước trực tiếp từ vòi nước này.',
                                createAt: '2022-05-30 09:56:16',
                                hidden: '005 006',
                                forward: '',
                                delete: '',
                                reply: {},
                                saw: '002',
                            },
                            // {
                            //     messageInfoId: 'mess5',
                            //     userSend: {
                            //         userId: '001',
                            //         fullName: 'Trần Đắc Phong',
                            //         nickName: 'phongtd',
                            //         avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                            //     },
                            //     messageContent: 'Alo 123',
                            //     createAt: '2022-05-30 09:56:16',
                            //     hidden: '',
                            //     forward: '',
                            //     delete: '',
                            //     reply: {

                            // },
                            //     saw: '1',
                            // },
                        ],
                    });
                }}
            >
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
                <div className={cx('showBellSlash', checkSawMessage && 'showBellSlashSaw')}>
                    {infor.notification !== '' ? <FontAwesomeIcon icon={faBellSlash} /> : ''}
                </div>
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
                                        {infor.notification === '' ? <Bell /> : <BellSlash />}
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
