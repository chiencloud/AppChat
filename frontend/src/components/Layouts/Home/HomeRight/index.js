import { useState, useRef, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faImages, faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Picker from 'emoji-picker-react';
import Tippy from '@tippyjs/react/headless';
import Cookies from 'universal-cookie';
import axios from 'axios';

import styles from './HomeRight.module.scss';
import Message from '~/components/Message';
import { SocketContext } from '~/components/Layouts/DefaultLayouts';

const cx = classNames.bind(styles);

function HomeRight({ sendHandleRight }) {
    const { messageContent, setMessageContent, setMesChoose, setMessenger, me } = sendHandleRight;
    const cookies = new Cookies();
    const socket = useContext(SocketContext);

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
        const messContentMain = useRef();

        const inputMess = useRef();

        const onEmojiClick = (event, emojiObject) => {
            inputMess.current.focus();
            let start = inputMess.current.value.substring(0, inputMess.current.selectionStart);
            let end = inputMess.current.value.substring(inputMess.current.selectionStart);
            setCursorPosition(start.length + emojiObject.emoji.length);
            inputMess.current.value = start + emojiObject.emoji + end;
        };

        const handleSendMessage = () => {
            let timeCurrent = new Date();
            let formatTime =
                timeCurrent.getUTCFullYear() +
                '-' +
                ('00' + (timeCurrent.getMonth() + 1)).slice(-2) +
                '-' +
                ('00' + timeCurrent.getDate()).slice(-2) +
                ' ' +
                ('00' + timeCurrent.getHours()).slice(-2) +
                ':' +
                ('00' + timeCurrent.getMinutes()).slice(-2) +
                ':' +
                ('00' + timeCurrent.getSeconds()).slice(-2);

            if (inputMess.current.value) {
                let data = {
                    roomChatId: sendHandleRight.messageContent.roomChatId,
                    userId: me.id,
                    messageContent: inputMess.current.value,
                    createAt: formatTime,
                };
                socket.emit('sendMess', data);
                inputMess.current.value = '';
                inputMess.current.focus();
            }
        };

        useEffect(() => {
            inputMess.current.selectionEnd = cursorPosition;
        }, [cursorPosition]);

        useEffect(() => {
            socket.on('reviceMess', (reviceMess) => {
                if (reviceMess) {
                    axios
                        .get('http://localhost:4000/api/messages', {
                            params: {
                                token: cookies.get('token'),
                                roomChatId: sendHandleRight.messageContent.roomChatId,
                            },
                        })
                        .then((res) => {
                            setMessageContent(res.data);
                            axios.get('http://localhost:4000/api/home', {
                                params: {
                                    token: cookies.get('token'),
                                },
                            })
                            .then((resultMessenger) => {
                                setMessenger(resultMessenger.data);
                            });
                        });
                }
            });

            socket.on('seenMessage', (seenMessage) => {
                if (seenMessage) {
                    axios
                        .get('http://localhost:4000/api/messages', {
                            params: {
                                token: cookies.get('token'),
                                roomChatId: sendHandleRight.messageContent.roomChatId,
                            },
                        })
                        .then((res) => {
                            setMessageContent(res.data);
                        })
                }
            });

            
        }, [socket]);

        useEffect(() => {
            messContentMain.current.scrollTo(0, 100000000);
        }, [messageContent]);

        return (
            <div className={cx('messContent')}>
                <div ref={messContentMain} className={cx('messContentMain')}>
                    {messageContent.message.map((messRender, index, messArray) => {
                        return (
                            <Message
                                key={messRender.messageInfoId}
                                messRender={messRender}
                                index={index}
                                messArray={messArray}
                                me={me}
                            />
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
                                <input type="test" placeholder="Nhập tin nhắn" ref={inputMess} />
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

    useEffect(() => {
        console.log(12345);
        socket.on('reloadMessenger', (data) => {
            console.log(data);
        });
    },[socket])

    return (
        <div className={cx('homeRight')}>
            <AccountMess />
            <AccountContent />
        </div>
    );
}

export default HomeRight;
