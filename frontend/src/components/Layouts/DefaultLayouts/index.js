import Header from './Header';

function DefaultLayouts({ children }) {
    return (
        <>
            <Header></Header>
            {children}
        </>
    );
}

export default DefaultLayouts;
