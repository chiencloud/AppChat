import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './Load.module.scss'

const cx = classNames.bind(styles);

function Load({size, top}) {
    console.log(size);
    return ( 
        <div className={cx('load')} style={{fontSize: `${size}rem`, marginTop: `${top}px`}}>
            <FontAwesomeIcon icon={faSpinner} />
        </div>
    );
}

export default Load;