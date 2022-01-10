import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmails, updateCurrentFilter, updateFilteredEmails } from '../../redux/actions/emails';
import { filterEmails } from '../../utils/general';

import './style.css';

const Filter = ({
    emails,
    currentFilter,
    dispatchUpdateCurrentFilter,
    dispatchUpdateFilteredEmails,
}) => {
    const handleFilterChange = (e) => {
        dispatchUpdateCurrentFilter(e.target.innerText.toLowerCase());

        const filteredEmails = filterEmails(emails, e.target.innerText.toLowerCase());
        dispatchUpdateFilteredEmails(filteredEmails);
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
    emails: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        from: PropTypes.shape({
            email: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
        date: PropTypes.number.isRequired,
        subject: PropTypes.string.isRequired,
        short_description: PropTypes.string.isRequired,
        isRead: PropTypes.bool.isRequired,
        isFavorite: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    currentFilter: PropTypes.string.isRequired,
    dispatchUpdateCurrentFilter: PropTypes.func.isRequired,
    dispatchUpdateFilteredEmails: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmails: (emails) => dispatch(addEmails(emails)),
    dispatchUpdateCurrentFilter: (filter) => dispatch(updateCurrentFilter(filter)),
    dispatchUpdateFilteredEmails: (filteredEmails) => (
        dispatch(updateFilteredEmails(filteredEmails))
    ),
});

const mapStateToProps = (state) => ({
    emails: state.emails,
    currentFilter: state.currentFilter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
