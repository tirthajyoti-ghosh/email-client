import EmailBody from './component/EmailBody';
import EmailList from './component/EmailList';
import Filter from './component/Filter';

function App() {
    return (
        <>
            <Filter />
            <main className="App">
                <EmailList />
                <EmailBody />
            </main>
        </>
    );
}

export default App;
