import { useState, useRef, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faFaceSmile, faImages, faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Picker from 'emoji-picker-react';
import Tippy from '@tippyjs/react/headless';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import styles from './HomeRight.module.scss';
import Message from '~/components/Message';
import { ProviderMain } from '~/ContentProvider';
import { SocketContext } from '~/components/Layouts/DefaultLayouts';
import Load from '~/components/Load';


const cx = classNames.bind(styles);

function HomeRight() {
    const { roomChatId } = useParams();
    const cookies = new Cookies();
    const socket = useContext(SocketContext);
    const me = useContext(ProviderMain);
    const [messageContent1, setMessageContent1] = useState({
        roomChatId: '',
        roomChatName: '',
        imageBackground: '',
        emoji: '',
        topicId: '',
        topicName: '',
        notification: '',
        nickName: '',
        fullName: '',
        onChatRoom: true,
        member: '',
        message: [],
    });
    const [loading, setLoading] = useState(true);

    const AccountMess = () => {
        return (
            <div className={cx('accountMess')}>
                <div className={cx('accountMessLeft')}>
                    <div className={cx('imgChat')}>
                        <img src={messageContent1.imageBackground} alt="" />
                    </div>
                    <div className={cx('accountMessInfo')}>
                        <h2>{messageContent1.roomChatName}</h2>
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
        const slideMessage = useRef();
        const inputMess = useRef();
        const sendMessage = useRef();
        const [messageContent, setMessageContent] = useState(messageContent1);
        const [scrollToMess, setScrollToMess] = useState(10000000);
        const [seenNewMessage, setSeenNewMessage] = useState(false);
        const [replyMess, setReplyMess] = useState(false);
        const [replyMessContent, setReplyMessContent] = useState({
            messId: null,
            userSendId: null,
            userName: null,
            messageContent: null,
        });

        const onEmojiClick = (event, emojiObject) => {
            inputMess.current.focus();
            let start = inputMess.current.value.substring(0, inputMess.current.selectionStart);
            let end = inputMess.current.value.substring(inputMess.current.selectionStart);
            setCursorPosition(start.length + emojiObject.emoji.length);
            inputMess.current.value = start + emojiObject.emoji + end;
        };

        const handleSendMessage = () => {
            if (inputMess.current.value.trim()) {
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
                let data = {
                    roomChatId: roomChatId,
                    userId: me.id,
                    messageContent: inputMess.current.value,
                    createAt: formatTime,
                    reply: replyMessContent.messId ? `${replyMessContent.messId} ${replyMessContent.userSendId}` : null,
                };
                console.log(data);
                socket.emit('sendMess', data);
                if (replyMess) {
                    setReplyMess(false);
                    setReplyMessContent({
                        messId: null,
                        userSendId: null,
                        userName: null,
                        messageContent: null,
                    });
                }
                inputMess.current.value = '';
                inputMess.current.focus();
            }
        };

        const handleScroll = () => {
            if (
                messContentMain.current.scrollHeight -
                    (messContentMain.current.scrollTop + messContentMain.current.offsetHeight) >
                800
            ) {
                slideMessage.current.style.display = 'block';
                slideMessage.current.style.bottom = `${sendMessage.current.offsetHeight + 30}px`;
            } else {
                slideMessage.current.style.display = 'none';
            }
            if (
                seenNewMessage &&
                messContentMain.current.scrollTop + messContentMain.current.offsetHeight ==
                    messContentMain.current.scrollHeight
            ) {
                socket.emit('checkSeenMess', {
                    roomId: roomChatId,
                    user: me.id,
                });
                setSeenNewMessage(false);
                setScrollToMess(messContentMain.current.scrollHeight);
            }
        };

        useEffect(() => {
            inputMess.current.selectionEnd = cursorPosition;
        }, [cursorPosition]);

        useEffect(() => {
            socket.emit('checkSeenMess', {
                roomId: roomChatId,
                user: me.id,
            });
            setScrollToMess(messContentMain.current.scrollHeight);
        }, []);

        useEffect(() => {
            messContentMain.current.scrollTo({
                left: 0,
                top: scrollToMess,
            });
        }, [scrollToMess]);

        useEffect(() => {
            socket.on('reviceMessUserSend', async (reviceMess) => {
                if (socket.id == reviceMess.socketId) {
                    await axios
                        .get('http://localhost:4000/api/messages', {
                            params: {
                                token: cookies.get('token'),
                                roomChatId: roomChatId,
                            },
                        })
                        .then((res) => {
                            if (messContentMain.current) {
                                if (
                                    messContentMain.current.scrollTop + messContentMain.current.offsetHeight !=
                                    messContentMain.current.scrollHeight
                                ) {
                                    setMessageContent(res.data);
                                    setScrollToMess(messContentMain.current.scrollTop);
                                } else {
                                    setMessageContent(res.data);
                                    setScrollToMess(messContentMain.current.scrollHeight + 100000);
                                }
                            }
                        });
                }
            });
            socket.on('reviceMess', async (reviceMess) => {
                if (reviceMess) {
                    await axios
                        .get('http://localhost:4000/api/messages', {
                            params: {
                                token: cookies.get('token'),
                                roomChatId: roomChatId,
                            },
                        })
                        .then((res) => {
                            if (messContentMain.current) {
                                if (
                                    messContentMain.current.scrollTop + messContentMain.current.offsetHeight !=
                                    messContentMain.current.scrollHeight
                                ) {
                                    setMessageContent(res.data);
                                    setScrollToMess(messContentMain.current.scrollTop);
                                } else {
                                    setMessageContent(res.data);
                                    setScrollToMess(messContentMain.current.scrollHeight + 100000);
                                }
                                setSeenNewMessage(true);
                            }
                        });
                }
            });

            socket.on('seenMessage', (seenMessage) => {
                if (seenMessage) {
                    axios
                        .get('http://localhost:4000/api/messages', {
                            params: {
                                token: cookies.get('token'),
                                roomChatId: roomChatId,
                            },
                        })
                        .then((res) => {
                            if (
                                messContentMain.current.scrollTop + messContentMain.current.offsetHeight !=
                                messContentMain.current.scrollHeight
                            ) {
                                setMessageContent(res.data);
                                setScrollToMess(messContentMain.current.scrollTop);
                            } else {
                                setMessageContent(res.data);
                                setScrollToMess(messContentMain.current.scrollHeight + 100000);
                            }
                        });
                }
            });
        }, [socket]);

        return (
            <div className={cx('messContent')}>
                <div ref={messContentMain} className={cx('messContentMain')} onScroll={handleScroll}>
                    {messageContent.message &&
                        messageContent.message.map((messRender, index, messArray) => {
                            return (
                                <Message
                                    key={messRender.messageInfoId}
                                    messRender={messRender}
                                    index={index}
                                    messArray={messArray}
                                    me={me}
                                    handleMess={{
                                        setReplyMess: setReplyMess,
                                        setReplyMessContent: setReplyMessContent,
                                    }}
                                />
                            );
                        })}
                </div>
                <div ref={slideMessage} className={cx('slideSeenMessage')}>
                    <div
                        className={cx('slideSeenMessage1')}
                        onClick={() => {
                            messContentMain.current.scrollTo({
                                left: 0,
                                top: messContentMain.current.scrollHeight + 1000,
                                behavior: 'smooth',
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                </div>
                <div ref={sendMessage} className={cx('sendMessage')}>
                    {replyMess && (
                        <div className={cx('replyMessage')}>
                            <span
                                className={cx('closeReply')}
                                onClick={() => {
                                    setReplyMess(false);
                                    setReplyMessContent({
                                        messId: null,
                                        userSendId: null,
                                        userName: null,
                                        messageContent: null,
                                    });
                                }}
                            >
                                &#10005;
                            </span>
                            <p>
                                Đang trả lời <span>{replyMessContent.userName}</span>
                            </p>
                            <p>{replyMessContent.messageContent}</p>
                        </div>
                    )}
                    <div className={cx('sendMessage1')}>
                        <div className={cx('chooseFile')}>
                            <FontAwesomeIcon icon={faMicrophone} />
                            <FontAwesomeIcon icon={faImages} />
                        </div>
                        <div className={cx('send')}>
                            <Tippy
                                interactive
                                visible={emoji}
                                onClickOutside={() => setEmoji(!emoji)}
                                appendTo={document.body}
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
            </div>
        );
    };

    useEffect(() => {
        setLoading(true)
        async function getMessage() {

            await axios
                .get('http://localhost:4000/api/messages', {
                    params: {
                        token: cookies.get('token'),
                        roomChatId: roomChatId,
                    },
                })
                .then((res) => {
                    setMessageContent1(res.data);
                    setLoading(false)
                });
        }

        getMessage();
        socket.emit('checkSeenMess', {
            roomId: roomChatId,
            user: me.id,
        });
    }, [roomChatId]);

    return (
        <div className={cx('homeRight')}>
            {loading ? (
                <Load size={2.2} top={25}/>
            ) : (
                <>
                    <AccountMess />
                    <AccountContent />
                </>
            )}
        </div>
    );
}

export default HomeRight;
