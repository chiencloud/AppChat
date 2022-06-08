import { useRef, useEffect } from 'react';
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

const cx = classNames.bind(styles);

function Message({ messRender, index, messArray, me }) {
    const hoverMess = useRef();
    const messVal = useRef();
    const messActionLeft = useRef();
    const messActionRight = useRef();

    let showAvatar = true;
    let showNickName = true;
    let showForward = false;
    let showReply = false;
    let styleMess = [];

    if (messRender.reply.userSendId) showReply = true;
    if (messRender.forward) showForward = true;

    useEffect(() => {
        if (messActionLeft.current) {
            messActionLeft.current.style.left = messVal.current.offsetWidth + 12 + 'px';
            messActionLeft.current.style.top =
                messVal.current.offsetHeight / 2 - messActionLeft.current.offsetHeight / 2 + 'px';
        }
        if (messActionRight.current) {
            messActionRight.current.style.right = messVal.current.offsetWidth + 12 + 'px';
            messActionRight.current.style.top =
                messVal.current.offsetHeight / 2 - messActionRight.current.offsetHeight / 2 + 'px';
        }
        return () => {
            // second;
        };
    }, []);

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
            <div ref={hoverMess} className={cx('messOfFriend')}>
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
                        <span ref={messVal} className={cx(styleMess)}>
                            {messRender.messageContent}
                        </span>
                        <div ref={messActionLeft} className={cx('messAction')}>
                            <div>
                                {/* <Tippy 
                                    visible
                                    // placement='top-right'
                                    render={() => {
                                        return <div>Biểu tượng cảm xúc</div>
                                    }}
                                > */}
                                    <FontAwesomeIcon icon={faFaceSmile} />
                                {/* </Tippy> */}
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faReply} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
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
        <div ref={hoverMess} key={messRender.messageInfoId}>
            <div className={cx('messOfMe')}>
                <div className={cx('messOfFriendAvatar')}>
                    {showSeen[0] === '' && index === messArray.length - 1 && <FontAwesomeIcon icon={faCircleCheck} />}
                    {showSeen[0] !== '' && showSeen.length === 1 && index === messArray.length - 1 && (
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
                        <span ref={messVal} className={cx(styleMess)}>
                            {messRender.messageContent}
                        </span>
                        <div ref={messActionRight} className={cx('messAction')}>
                            Chien
                        </div>
                    </div>
                </div>
            </div>
            {showSeen.length > 1 && <UserSeenMessage />}
        </div>
    );
}

export default Message;
