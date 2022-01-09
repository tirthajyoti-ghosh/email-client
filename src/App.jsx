import { useState } from 'react';

import EmailBody from './component/EmailBody';
import EmailList from './component/EmailList';
import Filter from './component/Filter';

import './App.css';

const App = () => {
    const [emailId, setEmailId] = useState();

    return (
        <div className="container">
            <Filter />
            <main className="App">
                <EmailList setEmailId={setEmailId} />
                <EmailBody emailId={emailId} />
            </main>
        </div>
    );
};

export default App;
