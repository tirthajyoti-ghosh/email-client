const Filter = () => (
    <section className="filter">
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
    </section>
);

export default Filter;
