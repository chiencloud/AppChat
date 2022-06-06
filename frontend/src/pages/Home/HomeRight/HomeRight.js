import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faCircleCheck,
    faFaceSmile,
    faImages,
    faMicrophone,
    faPaperPlane,
    faReply,
} from '@fortawesome/free-solid-svg-icons';
import Picker from 'emoji-picker-react';
import Tippy from '@tippyjs/react/headless';

import styles from '../Home.module.scss';

const cx = classNames.bind(styles);

function HomeRight({ sendHandleRight }) {
    const { messageContent, setMessageContent, me } = sendHandleRight;
    const AccountMess = () => {
        return (
            <div className={cx('accountMess')}>
                <div className={cx('accountMessLeft')}>
                    <div className={cx('imgChat')}>
                        <img src={messageContent.imageBackground} alt="" />
                    </div>
                    <div className={cx('accountMessInfo')}>
                        <h2>{messageContent.roomChatName}</h2>
                        <p>Đang hoạt động</p>
                    </div>
                </div>
            </div>
        );
    };

    const AccountContent = () => {
        const [emoji, setEmoji] = useState(false);
        const [cursorPosition, setCursorPosition] = useState(0);

        const inputMess = useRef();

        const onEmojiClick = (event, emojiObject) => {
            inputMess.current.focus();
            let start = inputMess.current.value.substring(0, inputMess.current.selectionStart);
            let end = inputMess.current.value.substring(inputMess.current.selectionStart);
            setCursorPosition(start.length + emojiObject.emoji.length);
            inputMess.current.value = start + emojiObject.emoji + end;
        };

        const handleSendMessage = () => {
            setMessageContent((messContentPrev) => {
                return {
                    ...messContentPrev,
                    message: [
                        ...messContentPrev.message,

                        // Add new message
                        {
                            messageInfoId: 'mess6',
                            userSend: {
                                userId: '001',
                                fullName: 'Trần Đắc Phong',
                                nickName: 'phongtd',
                                avatar: 'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                            },
                            messageContent: inputMess.current.value,
                            hidden: '',
                            forward: '',
                            reply: '',
                            createAt: '2022-05-30 09:56:16',
                            saw: '',
                            delete: '',
                        },
                    ],
                };
            });
        };

        useEffect(() => {
            inputMess.current.selectionEnd = cursorPosition;
        }, [cursorPosition]);

        return (
            <div className={cx('messContent')}>
                <div className={cx('messContentMain')}>
                    {messageContent.message.map((messRender, index, messArray) => {
                        let showAvatar = true;
                        let showNickName = true;
                        let showForward = false;
                        let showReply = false;
                        let styleMess = [];

                        if (messRender.reply.userSendId) showReply = true;
                        if (messRender.forward) showForward = true;

                        // Hanhdle message of member on chat
                        if (messRender.userSend.userId !== me.id) {
                            // Check show icon member, nick name, style border-radius of send message
                            if (
                                index === 0 &&
                                messArray.length > 1 &&
                                messArray[index + 1].userSend.userId === messRender.userSend.userId
                            ) {
                                showAvatar = false;
                                styleMess = ['messBorderBottomLeft'];
                            } else if (index !== 0 && index < messArray.length - 1) {
                                if (
                                    messArray[index - 1].userSend.userId !== messRender.userSend.userId &&
                                    messRender.userSend.userId === messArray[index + 1].userSend.userId
                                ) {
                                    showNickName = false;
                                    styleMess = ['messBorderBottomLeft'];
                                }

                                if (
                                    messArray[index - 1].userSend.userId === messRender.userSend.userId &&
                                    messRender.userSend.userId === messArray[index + 1].userSend.userId
                                ) {
                                    showNickName = false;
                                    showAvatar = false;
                                    styleMess = ['messBorderTopLeft', 'messBorderBottomLeft'];
                                }
                                if (
                                    messArray[index - 1].userSend.userId === messRender.userSend.userId &&
                                    messRender.userSend.userId !== messArray[index + 1].userSend.userId
                                ) {
                                    showNickName = false;
                                    styleMess = ['messBorderTopLeft'];
                                }
                            } else if (
                                index === messArray.length - 1 &&
                                messArray.length !== 1 &&
                                messArray[index - 1].userSend.userId === messRender.userSend.userId
                            ) {
                                showNickName = false;
                                styleMess = ['messBorderTopLeft'];
                            }

                            if (messRender.member === 2) showNickName = false;

                            if (showForward) showNickName = false;
                            if (showReply) showNickName = false;

                            return (
                                <div key={messRender.messageInfoId} className={cx('messOfFriend')}>
                                    <div className={cx('messOfFriendAvatar')}>
                                        {showAvatar && <img src={messRender.userSend.avatar} />}
                                    </div>
                                    <div>
                                        {showNickName && (
                                            <p>{messRender.userSend.nickName || messRender.userSend.fullName}</p>
                                        )}
                                        {showForward && (
                                            <p>
                                                <FontAwesomeIcon icon={faArrowRight} /> &nbsp;
                                                {messRender.userSend.nickName || messRender.userSend.fullName}
                                                &nbsp;đã chuyển tiếp tin nhắn
                                            </p>
                                        )}
                                        {showReply && (
                                            <div style={{ position: 'relative' }}>
                                                <p>
                                                    <FontAwesomeIcon icon={faReply} /> &nbsp;
                                                    {messRender.userSend.nickName || messRender.userSend.fullName}
                                                    &nbsp;đã trả lời{' '}
                                                    {messRender.reply.nickNameSend || messRender.reply.fullNameSend}
                                                </p>
                                                <div className={cx('reply1', 'replyfriend1')}>{messRender.reply.messageContent}</div>
                                                <div className={cx('reply', 'replyfriend')}>{messRender.reply.messageContent}</div>
                                            </div>
                                        )}
                                        <span className={cx(styleMess)}>{messRender.messageContent}</span>
                                    </div>
                                </div>
                            );
                        }

                        // Handle message of me
                        let showSeen = [];
                        showNickName = false;

                        if (
                            index === 0 &&
                            messArray.length > 1 &&
                            messArray[index + 1].userSend.userId === messRender.userSend.userId
                        ) {
                            showAvatar = false;
                            styleMess = ['messBorderBottomRight'];
                        } else if (index !== 0 && index < messArray.length - 1) {
                            if (
                                messArray[index - 1].userSend.userId !== messRender.userSend.userId &&
                                messRender.userSend.userId === messArray[index + 1].userSend.userId
                            ) {
                                styleMess = ['messBorderBottomRight'];
                            }

                            if (
                                messArray[index - 1].userSend.userId === messRender.userSend.userId &&
                                messRender.userSend.userId === messArray[index + 1].userSend.userId
                            ) {
                                showAvatar = false;
                                styleMess = ['messBorderTopRight', 'messBorderBottomRight'];
                            }
                            if (
                                messArray[index - 1].userSend.userId === messRender.userSend.userId &&
                                messRender.userSend.userId !== messArray[index + 1].userSend.userId
                            ) {
                                styleMess = ['messBorderTopRight'];
                            }
                        } else if (
                            index === messArray.length - 1 &&
                            messArray.length !== 1 &&
                            messArray[index - 1].userSend.userId === messRender.userSend.userId
                        ) {
                            showNickName = false;
                            styleMess = ['messBorderTopRight'];
                        }

                        let avatarSeen = [];
                        if (index === messArray.length - 1) {
                            showSeen = messRender.saw.split(' ');
                            if (showSeen.length === 1 && showSeen[0] !== '') {
                                avatarSeen = [
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                ];
                            }
                            if (showSeen.length > 1) {
                                avatarSeen = [
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                    'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/278073227_1533794527018124_1201657733374137874_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=hXeHJKVbevkAX8Rmw1S&_nc_ht=scontent.fhan5-2.fna&oh=00_AT_1PXVF7yg07cvbVvsYxUsUPFAyY2UAuh5QEqz_vK6j4A&oe=62A2BBBC',
                                ];
                            }
                        }

                        const UserSeenMessage = () => {
                            let hiddenAvatar = 0;
                            return (
                                <div key={messRender.messageInfoId} className={cx('userSeenMessage')}>
                                    {avatarSeen.map((avatar, index) => {
                                        if (index < 4) {
                                            return <img key={index} src={avatar} alt="" />;
                                        } else {
                                            hiddenAvatar++;
                                        }

                                        if (index === avatarSeen.length - 1 && hiddenAvatar !== 0) {
                                            return (
                                                <div key={index} className={cx('avatarHidden')}>
                                                    + {hiddenAvatar}
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            );
                        };

                        return (
                            <div key={messRender.messageInfoId}>
                                <div className={cx('messOfMe')}>
                                    <div className={cx('messOfFriendAvatar')}>
                                        {showSeen[0] === '' && index === messArray.length - 1 && (
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        )}
                                        {showSeen[0] !== '' &&
                                            showSeen.length === 1 &&
                                            index === messArray.length - 1 && <img src={avatarSeen[0]} alt="" />}
                                    </div>
                                    <div className={cx('messContentOfMe')}>
                                        {showNickName && (
                                            <p>{messRender.userSend.nickName || messRender.userSend.fullName}</p>
                                        )}
                                        {showForward && (
                                            <p>
                                                <FontAwesomeIcon icon={faArrowRight} /> &nbsp;
                                                {messRender.userSend.nickName || messRender.userSend.fullName}
                                                &nbsp;đã chuyển tiếp tin nhắn
                                            </p>
                                        )}
                                        {showReply && (
                                            <div className={cx('messReplyOfMe')} style={{ position: 'relative' }}>
                                                <p>
                                                    <FontAwesomeIcon icon={faReply} /> &nbsp;
                                                    Bạn đã trả lời{' '}
                                                    {messRender.reply.nickNameSend || messRender.reply.fullNameSend}
                                                </p>
                                                <div className={cx('reply1', 'replyme1')}>{messRender.reply.messageContent}</div>
                                                <div className={cx('reply', 'replyme')}>{messRender.reply.messageContent}</div>
                                            </div>
                                        )}
                                        <span className={cx(styleMess)}>{messRender.messageContent}</span>
                                    </div>
                                </div>
                                {showSeen.length > 1 && <UserSeenMessage />}
                            </div>
                        );
                    })}
                </div>
                <div className={cx('sendMessage')}>
                    <div className={cx('chooseFile')}>
                        <FontAwesomeIcon icon={faMicrophone} />
                        <FontAwesomeIcon icon={faImages} />
                    </div>
                    <div className={cx('send')}>
                        <Tippy
                            interactive
                            visible={emoji}
                            onClickOutside={() => setEmoji(!emoji)}
                            placement="top-end"
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Picker onEmojiClick={onEmojiClick} />
                                </div>
                            )}
                        >
                            <div className={cx('inputSend')}>
                                <input placeholder="Nhập tin nhắn" ref={inputMess} />
                                <span onClick={() => setEmoji(!emoji)}>
                                    <FontAwesomeIcon icon={faFaceSmile} />
                                </span>
                            </div>
                        </Tippy>
                        <button>
                            <FontAwesomeIcon icon={faPaperPlane} onClick={handleSendMessage} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className={cx('homeRight')}>
            <AccountMess />
            <AccountContent />
        </div>
    );
}

export default HomeRight;
