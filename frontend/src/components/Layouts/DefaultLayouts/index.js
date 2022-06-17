import Header from './Header';

import io from "socket.io-client";
import { createContext } from 'react';

const SocketContext = createContext();
const socket = io.connect('http://localhost:4000');

function DefaultLayouts({ children }) {

    return (
        <SocketContext.Provider value={socket} >
            <Header></Header>
            {children}
        </SocketContext.Provider>
    );
}

export {SocketContext}

export default DefaultLayouts;
