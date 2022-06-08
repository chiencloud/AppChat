import classNames from 'classnames/bind';

import Messenger from '~/components/Messenger';
import styles from './HomeLeft.module.scss';

const cx = classNames.bind(styles);

function HomeLeft({ sendHandleLeft }) {
    const { 
        setSelectionType, 
        selectionType, 
        setMessenger, 
        messenger, 
        setMesChoose, 
        messChoose, 
        setMessageContent
    } = sendHandleLeft;
        

    const handleMessAll = () => {
        setSelectionType('all');
        setMessenger([
            {
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
                friend: true,
                onChatRoom: true,
                member: 3,
                notification: '11233',
                messageInfo: {
                    messageInfoId: 'mess1',
                    messageContent: 'Alo Alo 123456 nguyễn duy chiến',
                    createAt: '2022-05-30 09:56:16',
                    saw: '002',
                    hidden: '',
                    forward: '000',
                    reply: '',
                    delete: ''
                },
            },
            {
                userId: '2',
                roomChatId: 'room1',
                roomChatName: 'Trần Đắc Phong',
                imageBackground:
                    'https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-1/252319241_10159523875086815_2143106260104798828_n.png?stp=dst-png_p148x148&_nc_cat=107&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=UEMX3fMZ53AAX-RY008&_nc_ht=scontent.fhan3-2.fna&oh=00_AT_a9d6igppbz_DYZHl_YwQcJjsBWBhTE8DK846nqyd_HQ&oe=629A99BC',
                emoji: '',
                topic: {
                    topicId: 'topic1',
                    topicName: 'Xanh',
                },
                friend: true,
                onChatRoom: true,
                member: 2,
                notification: '111',
                messageInfo: {
                    messageInfoId: 'mess1',
                    messageContent: 'Alo Alo',
                    createAt: '2022-06-04 10:21:16',
                    saw: '001',
                    hidden: '',
                    forward: '',
                    reply: '',
                    delete: ''
                },
            },
            {
                userId: '3',
                roomChatId: 'room1',
                roomChatName: 'Nguyễn Duy Chiến',
                imageBackground:
                    'https://res.cloudinary.com/dseuvenfm/image/upload/v1649743106/Cloud/ImageProduct/aBT5A8965_gyurga.jpg',
                emoji: '',
                topic: {
                    topicId: 'topic1',
                    topicName: 'Xanh',
                },
                friend: true,
                onChatRoom: true,
                member: 2,
                notification: '',
                messageInfo: {
                    messageInfoId: 'mess1',
                    messageContent: 'Alo Alo',
                    createAt: '2022-05-30 09:56:16',
                    saw: '001',
                    hidden: '',
                    forward: '',
                    reply: '',
                    delete: ''
                },
            },
            {
                userId: '4',
                roomChatId: 'room1',
                roomChatName: 'Nguyễn Duy Chiến',
                imageBackground:
                    'https://res.cloudinary.com/dseuvenfm/image/upload/v1649743106/Cloud/ImageProduct/aBT5A8965_gyurga.jpg',
                emoji: '',
                topic: {
                    topicId: 'topic1',
                    topicName: 'Xanh',
                },
                friend: true,
                onChatRoom: true,
                member: 2,
                notification: '',
                messageInfo: {
                    messageInfoId: 'mess1',
                    messageContent: 'Alo Alo',
                    createAt: '2022-05-30 09:56:16',
                    saw: '002',
                    hidden: '',
                    forward: '',
                    reply: '',
                    delete: ''
                },
            },
        ]);
    };

    const handleMessNoSeen = () => {
        setSelectionType('notSee');
        setMessenger([
            {
                userId: '2',
                roomChatId: 'room1',
                roomChatName: 'Trần Đắc Phong',
                imageBackground:
                    'https://scontent.fhan3-2.fna.fbcdn.net/v/t39.30808-1/252319241_10159523875086815_2143106260104798828_n.png?stp=dst-png_p148x148&_nc_cat=107&ccb=1-7&_nc_sid=1eb0c7&_nc_ohc=UEMX3fMZ53AAX-RY008&_nc_ht=scontent.fhan3-2.fna&oh=00_AT_a9d6igppbz_DYZHl_YwQcJjsBWBhTE8DK846nqyd_HQ&oe=629A99BC',
                emoji: '',
                topic: {
                    topicId: 'topic1',
                    topicName: 'Xanh',
                },
                friend: true,
                onChatRoom: true,
                member: 2,
                notification: '111',
                messageInfo: {
                    messageInfoId: 'mess1',
                    messageContent: 'Alo Alo',
                    createAt: '2022-06-04 10:21:16',
                    saw: '001',
                    hidden: '',
                    forward: '',
                    reply: '',
                    delete: ''
                },
            },
            {
                userId: '3',
                roomChatId: 'room1',
                roomChatName: 'Nguyễn Duy Chiến',
                imageBackground:
                    'https://res.cloudinary.com/dseuvenfm/image/upload/v1649743106/Cloud/ImageProduct/aBT5A8965_gyurga.jpg',
                emoji: '',
                topic: {
                    topicId: 'topic1',
                    topicName: 'Xanh',
                },
                friend: true,
                onChatRoom: true,
                member: 2,
                notification: '',
                messageInfo: {
                    messageInfoId: 'mess1',
                    messageContent: 'Alo Alo',
                    createAt: '2022-05-30 09:56:16',
                    saw: '001',
                    hidden: '',
                    forward: '',
                    reply: '',
                    delete: ''
                },
            },
        ]);
    };

    const handleMessSeen = () => {
        setSelectionType('seen');
        setMessenger([]);
    };

    return (
        <div className={cx('homeLeft')}>
            <div className={cx('selection')}>
                <div className={cx(selectionType === 'all' ? 'all' : '')} onClick={handleMessAll}>
                    Tất cả
                </div>
                <div className={cx(selectionType === 'notSee' ? 'notSee' : '')} onClick={handleMessNoSeen}>
                    Chưa xem
                </div>
                <div className={cx(selectionType === 'seen' ? 'seen' : '')} onClick={handleMessSeen}>
                    Đang chờ
                </div>
            </div>
            <div className={cx('messenger')}>
                {messenger.map((mess, index) => {
                    return (
                        <Messenger
                            key={index}
                            infor={mess}
                            handleOnclick={{
                                messChoose,
                                setMesChoose,
                                setMessageContent,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default HomeLeft;
