import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateCurrentPage } from '../../redux/actions/emails';

import './style.css';

const Pagination = ({ currentPage, dispatchUpdateCurrentPage }) => (
    <div>
        <div className="pagination">
            <ul>
                <li>
                    <svg height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
                        <path d="M0-.5h24v24H0z" fill="none" />
                    </svg>
                </li>

                {[1, 2].map((item) => (
                    <li key={item}>
                        <button
                            type="button"
                            className={currentPage === item ? 'is-active' : ''}
                            onClick={() => {
                                window.scrollTo(0, 0);
                                dispatchUpdateCurrentPage(item);
                            }}
                        >
                            {item}
                        </button>
                    </li>
                ))}

                <li>
                    <svg height="40" viewBox="0 0 24 24" width="40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                        <path d="M0-.25h24v24H0z" fill="none" />
                    </svg>
                </li>
            </ul>
        </div>
    </div>
);

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    dispatchUpdateCurrentPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
    dispatchUpdateCurrentPage: (currentPage) => dispatch(updateCurrentPage(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
