import Cookies from 'universal-cookie';
import { createContext } from 'react';

const ProviderMain = createContext();
const cookies = new Cookies();

function ContentProvider({ children }) {
    const user = {
        id: cookies.get('userId'),
    };

    return <ProviderMain.Provider value={user}>{children}</ProviderMain.Provider>;
}

export {ProviderMain}

export default ContentProvider;
