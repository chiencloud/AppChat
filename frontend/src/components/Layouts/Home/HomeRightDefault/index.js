import classNames from 'classnames/bind';
import Slider from 'react-slick'

import styles from './HomeRightDefault.module.scss';
import {img as imgHomeDefault} from '~/asset/imgHomeDefault'

const cx = classNames.bind(styles);

function HomeRightDefault() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1600,
        autoplaySpeed: 2800,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className={cx('homeRightDefault')}>
            <h3>
                Chào mừng đến với <strong>Cloud</strong>
            </h3>
            <p>
                Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng những người thân, bạn bè được tối ưu hóa
                cho máy tính của bạn
            </p>
            <div className={cx('slider')}>
                <Slider {...settings}>
                    {
                        imgHomeDefault.map((image, index) => {
                            return <div key={index} className={cx('imgSlider')}><img src={image.default} alt=""/></div>
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}

export default HomeRightDefault;