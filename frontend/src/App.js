import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayouts from '~/components/Layouts/DefaultLayouts';
import routers from '~/routers';
import ContentProvider from '~/ContentProvider';

function App() {
    return (
        <Router>
            <ContentProvider>
                <Routes>
                    {routers.map((router, index) => {
                        const Page = router.component;

                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    router.private ? (
                                        <DefaultLayouts>
                                            <Page />
                                        </DefaultLayouts>
                                    ) : (
                                        <Page />
                                    )
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </ContentProvider>
        </Router>
    );
}

export default App;
