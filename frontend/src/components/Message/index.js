import { useState, useRef, useEffect } from 'react';
import {
    faArrowRight,
    faCircleCheck,
    faReply,
    faFaceSmile,
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './Message.module.scss';
import { PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Message({ messRender, index, messArray, me }) {
    const [interactiveSeeMore, setInteractiveSeeMore] = useState(false);
    const seeMore = useRef();
    const messAction = useRef();

    let showAvatar = true;
    let showNickName = true;
    let showForward = false;
    let showReply = false;
    let styleMess = [];

    if (messRender.reply.userSendId) showReply = true;
    if (messRender.forward) showForward = true;

    useEffect(() => {
        if (seeMore.current) {
            if (interactiveSeeMore) {
                seeMore.current.style.visibility = 'visible';
                messAction.current.style.visibility = 'visible';
            } else {
                seeMore.current.style.visibility = 'hidden';
                messAction.current.style.visibility = '';
            }
        }
    }, [interactiveSeeMore]);

    // Hanhdle message of member on chat
    if (messRender.userSend.userId != me.id) {
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
                // showNickName = false;
                showAvatar = false;
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
            <div className={cx('messOfFriend')}>
                <div className={cx('messOfFriendAvatar')}>{showAvatar && <img src={messRender.userSend.avatar} />}</div>
                <div>
                    {showNickName && <p>{messRender.userSend.nickName || messRender.userSend.fullName}</p>}
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
                                &nbsp;đã trả lời {messRender.reply.nickNameSend || messRender.reply.fullNameSend}
                            </p>
                            <div className={cx('reply1', 'replyfriend1')}>{messRender.reply.messageContent}</div>
                            <div className={cx('reply', 'replyfriend')}>{messRender.reply.messageContent}</div>
                        </div>
                    )}
                    <div className={cx('messValue')}>
                        <span className={cx(styleMess)}>{messRender.messageContent}</span>
                        <div ref={messAction} className={cx('messAction')}>
                            <div>
                                <Tippy
                                    placement="top"
                                    content={<span className={cx('tooltip1')}>Biểu tượng cảm xúc</span>}
                                >
                                    <div className={cx('messInteractive')}>
                                        <FontAwesomeIcon icon={faFaceSmile} />
                                    </div>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy placement="top" content={<span className={cx('tooltip1')}>Trả lời</span>}>
                                    <div className={cx('messInteractive')}>
                                        <FontAwesomeIcon icon={faReply} />
                                    </div>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy placement="top" content={<span className={cx('tooltip1')}>Xem thêm</span>}>
                                    <Tippy
                                        interactive
                                        visible={interactiveSeeMore}
                                        onClickOutside={() => {
                                            setInteractiveSeeMore(false);
                                        }}
                                        placement="top"
                                        render={(arrt) => {
                                            return (
                                                <div ref={seeMore} {...arrt}>
                                                    <PopperWrapper>
                                                        <div className={cx('seeMore')}>
                                                            <div>
                                                                <p>Xóa, gỡ bỏ</p>
                                                            </div>
                                                            <div>
                                                                <p>Chuyển tiếp</p>
                                                            </div>
                                                        </div>
                                                    </PopperWrapper>
                                                </div>
                                            );
                                        }}
                                    >
                                        <div
                                            className={cx('messInteractive')}
                                            onClick={() => {
                                                setInteractiveSeeMore(!interactiveSeeMore);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </div>
                                    </Tippy>
                                </Tippy>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Handle message of me
    let showSeen = [];
    showNickName = false;

    if (index === 0 && messArray.length > 1 && messArray[index + 1].userSend.userId === messRender.userSend.userId) {
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
        showSeen = messRender.saw;
        if (showSeen.length > 1) {
            avatarSeen = showSeen.filter((e) => e.UserId != me.id).map((e) => e.Avatar);
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
                    {showSeen.length === 1 && index === messArray.length - 1 && <FontAwesomeIcon icon={faCircleCheck} />}
                    {showSeen.length === 2 && index === messArray.length - 1 && (
                        <img src={avatarSeen[0]} alt="" />
                    )}
                </div>
                <div className={cx('messContentOfMe')}>
                    {showNickName && <p>{messRender.userSend.nickName || messRender.userSend.fullName}</p>}
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
                                <FontAwesomeIcon icon={faReply} /> &nbsp; Bạn đã trả lời{' '}
                                {messRender.reply.nickNameSend || messRender.reply.fullNameSend}
                            </p>
                            <div className={cx('reply1', 'replyme1')}>{messRender.reply.messageContent}</div>
                            <div className={cx('reply', 'replyme')}>{messRender.reply.messageContent}</div>
                        </div>
                    )}
                    <div className={cx('messValue')}>
                        <div ref={messAction} className={cx('messAction')}>
                            <div>
                                <Tippy placement="top" content={<span className={cx('tooltip1')}>Xem thêm</span>}>
                                    <Tippy
                                        interactive
                                        visible={interactiveSeeMore}
                                        onClickOutside={() => {
                                            setInteractiveSeeMore(false);
                                        }}
                                        placement="top"
                                        render={(arrt) => {
                                            return (
                                                <div ref={seeMore} {...arrt}>
                                                    <PopperWrapper>
                                                        <div className={cx('seeMore')}>
                                                            <div>
                                                                <p>Xóa, gỡ bỏ</p>
                                                            </div>
                                                            <div>
                                                                <p>Chuyển tiếp</p>
                                                            </div>
                                                        </div>
                                                    </PopperWrapper>
                                                </div>
                                            );
                                        }}
                                    >
                                        <div
                                            className={cx('messInteractive')}
                                            onClick={() => {
                                                setInteractiveSeeMore(!interactiveSeeMore);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faEllipsisVertical} />
                                        </div>
                                    </Tippy>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy placement="top" content={<span className={cx('tooltip1')}>Trả lời</span>}>
                                    <div className={cx('messInteractive')}>
                                        <FontAwesomeIcon icon={faReply} />
                                    </div>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy
                                    placement="top"
                                    content={<span className={cx('tooltip1')}>Biểu tượng cảm xúc</span>}
                                >
                                    <div className={cx('messInteractive')}>
                                        <FontAwesomeIcon icon={faFaceSmile} />
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                        <span className={cx(styleMess)}>{messRender.messageContent}</span>
                    </div>
                </div>
            </div>
            {showSeen.length > 2 && <UserSeenMessage />}
        </div>
    );
}

export default Message;
