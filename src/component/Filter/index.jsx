import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmails, updateCurrentFilter, updateFilteredEmails } from '../../redux/actions/emails';

import './style.css';

const Filter = ({
    currentFilter,
    dispatchUpdateCurrentFilter,
    dispatchUpdateFilteredEmails,
}) => {
    const handleFilterChange = (e) => {
        dispatchUpdateCurrentFilter(e.target.innerText.toLowerCase());
        dispatchUpdateFilteredEmails();
    };

    return (
        <header className="filter">
            <span>Filter By:</span>

            <ul className="items">
                <li>
                    <button
                        type="button"
                        className={currentFilter === 'unread' ? 'active' : ''}
                        onClick={handleFilterChange}
                    >
                        Unread
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={currentFilter === 'read' ? 'active' : ''}
                        onClick={handleFilterChange}
                    >
                        Read
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        className={currentFilter === 'favorites' ? 'active' : ''}
                        onClick={handleFilterChange}
                    >
                        Favorites
                    </button>
                </li>
            </ul>
        </header>
    );
};

Filter.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    dispatchUpdateCurrentFilter: PropTypes.func.isRequired,
    dispatchUpdateFilteredEmails: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmails: (emails) => dispatch(addEmails(emails)),
    dispatchUpdateCurrentFilter: (filter) => dispatch(updateCurrentFilter(filter)),
    dispatchUpdateFilteredEmails: () => dispatch(updateFilteredEmails()),
});

const mapStateToProps = (state) => ({
    currentFilter: state.currentFilter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
