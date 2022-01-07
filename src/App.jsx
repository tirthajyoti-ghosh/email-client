import { useState } from 'react';

import EmailBody from './component/EmailBody';
import EmailList from './component/EmailList';
import Filter from './component/Filter';

const App = () => {
    const [emailId, setEmailId] = useState();

    return (
        <>
            <Filter />
            <main className="App">
                <EmailList setEmailId={setEmailId} />
                <EmailBody emailId={emailId} />
            </main>
        </>
    );
};

export default App;
