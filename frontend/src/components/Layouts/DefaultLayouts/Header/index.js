import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faMagnifyingGlass, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

import AccountItem from '~/components/AccountItem';
import { PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import Load from '~/components/Load'

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true)
    const [isSearchResult, setIsSearchResult] = useState(false);

    const handleSearch = (e) => {
        
        if(e.trim().length > 0){
            setIsSearchResult(true)
            setLoading(true)

            axios.get('http://localhost:4000/api/search', {
                params: {
                    searchValue: e,
                    type: 'short'
                }
            })
            .then(response =>{
                setSearchResult(response.data)
                setLoading(false)                
            })
        }
        else{
            setIsSearchResult(false)
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
                visible={isSearchResult}
                onClickOutside={() => setIsSearchResult(false)}
                appendTo={document.body}
                render={(attrs) => (
                    <div className={cx('searchResult')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4>Kết quả tìm kiếm</h4>
                            {loading && (<Load/>)}
                            {searchResult.length > 0 ? searchResult.map((infor, index) => {
                                return <AccountItem key={index} infor={infor} />;
                            }) : (<div className={cx('searchNoResult')}>
                                Người dùng mà bạn cần tìm kiếm không tồn tại
                            </div>)}
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
