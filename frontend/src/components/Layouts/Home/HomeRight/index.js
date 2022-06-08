import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFaceSmile,
    faImages,
    faMicrophone,
    faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import Picker from 'emoji-picker-react';
import Tippy from '@tippyjs/react/headless';

import styles from './HomeRight.module.scss';
import Message from '~/components/Message';

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
                        return <Message key={messRender.messageInfoId} messRender={messRender} index={index} messArray={messArray} me={me}/>
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
