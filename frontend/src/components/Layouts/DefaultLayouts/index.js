import io from "socket.io-client";
import { createContext } from 'react';
import { useEffect, useContext } from 'react';

import {ProviderMain} from '~/ContentProvider'
import Header from './Header';

const SocketContext = createContext();
const socket = io.connect('http://localhost:4000');

function DefaultLayouts({ children }) {
    const me = useContext(ProviderMain)
    useEffect(() => {
        console.log(123567);
        socket.emit('login',{
            userId: me.id
        })
    },[me])

    return (
        <SocketContext.Provider value={socket} >
            <Header></Header>
            {children}
        </SocketContext.Provider>
    );
}

export {SocketContext}

export default DefaultLayouts;
