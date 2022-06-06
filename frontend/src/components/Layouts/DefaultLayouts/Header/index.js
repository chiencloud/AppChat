import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faMagnifyingGlass, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import AccountItem from '~/components/AccountItem';
import { PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const info = [
        {
            img: 'https://res.cloudinary.com/dseuvenfm/image/upload/v1649743106/Cloud/ImageProduct/aBT5A8965_gyurga.jpg',
            userName: 'Nguyễn Duy Chiến',
            nickName: 'duychien123',
            type: 'Bạn bè',
        },
        {
            img: 'https://res.cloudinary.com/dseuvenfm/image/upload/v1649743106/Cloud/ImageProduct/aBT5A8965_gyurga.jpg',
            userName: 'Nguyễn Duy Chiến',
            nickName: 'duychien123',
            type: 'Bạn bè',
        },
        {
            img: 'https://res.cloudinary.com/dseuvenfm/image/upload/v1649743106/Cloud/ImageProduct/aBT5A8965_gyurga.jpg',
            userName: 'Nguyễn Duy Chiến',
            nickName: 'duychien123',
            type: 'Người lạ',
        },
    ];

    useEffect(() => {
        // setInterval(() => {
        //     setSearchResult([]);
        // }, 0);
    }, []);

    const handleSearch = (e) => {
        if(e.length > 0){
            setSearchResult([1])
        }
        else{
            setSearchResult([])
        }
    }

    return (
        <div className={cx('header')}>
            <div className={cx('logo')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="88" height="35" viewBox="0 0 88 35">
                    <g id="Logo" transform="translate(-62 -9)">
                        <text
                            id="Cl"
                            transform="translate(69 15) rotate(90)"
                            fontSize="28"
                            fontFamily="Montserrat-Medium, Montserrat"
                            fontWeight="500"
                        >
                            <tspan x="0" y="0">
                                Cl
                            </tspan>
                        </text>
                        <text
                            id="oud"
                            transform="translate(94 36)"
                            fontSize="28"
                            fontFamily="Montserrat-Medium, Montserrat"
                            fontWeight="500"
                        >
                            <tspan x="0" y="0">
                                oud
                            </tspan>
                        </text>
                    </g>
                </svg>
            </div>

            <Tippy
                interactive
                visible={searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('searchResult')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4>Kết quả tìm kiếm</h4>
                            {info.map((infor, index) => {
                                return <AccountItem key={index} infor={infor} />;
                            })}
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input type="text" placeholder="Tìm kiếm trên Cloud" onChange={(e) => handleSearch(e.target.value)}/>
                    <div className={cx('iconSearch')}>
                        <span></span>
                        <div>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div>
                </div>
            </Tippy>

            <div className={cx('info')}>
                <div className={cx('user')}>
                    <FontAwesomeIcon icon={faUserLarge} />
                </div>
                <div className={cx('setting')}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
            </div>
        </div>
    );
}

export default Header;
