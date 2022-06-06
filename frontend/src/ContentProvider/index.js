import { createContext } from 'react';

const ProviderMain = createContext();

function ContentProvider({ children }) {
    const user = {
        id: '001',
    };

    return <ProviderMain.Provider value={user}>{children}</ProviderMain.Provider>;
}

export {ProviderMain}

export default ContentProvider;
