import './style.css';

const Filter = () => (
    <header className="filter">
        <span>Filter By:</span>

        <ul className="items">
            <li>
                <button type="button">Unread</button>
            </li>
            <li>
                <button type="button">Read</button>
            </li>
            <li>
                <button type="button">Favorites</button>
            </li>
        </ul>
    </header>
);

export default Filter;
