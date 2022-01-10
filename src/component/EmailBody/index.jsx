import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmailBody, updateFilteredEmails, markEmailAsFavorite } from '../../redux/actions/emails';
import { parseDate } from '../../utils/general';
import { emailShape } from '../../utils/propTypes';

import Avatar from '../Avatar';

import './style.css';

const EmailBody = ({
    selectedEmailId,
    currentFilter,
    isEmailBodyOpen,
    currentEmailBody,
    dispatchAddEmailBody,
    dispatchMarkEmailAsFavorite,
    dispatchUpdateFilteredEmails,
}) => {
    useEffect(() => {
        const fetchEmailBody = async () => {
            const response = await fetch(`https://flipkart-email-mock.vercel.app/?id=${selectedEmailId}`);
            const data = await response.json();
            dispatchAddEmailBody(data);
        };

        if (selectedEmailId) {
            fetchEmailBody();
        }
    }, [selectedEmailId]);

    const toggleFavorite = () => {
        dispatchMarkEmailAsFavorite(selectedEmailId);
        dispatchAddEmailBody({ isFavorite: !currentEmailBody.isFavorite });

        if (currentFilter === 'favorites') {
            dispatchUpdateFilteredEmails();
        }
    };

    return isEmailBodyOpen ? (
        <section className={`email-body ${isEmailBodyOpen ? 'email-body-open' : ''}`}>
            <div className="container">
                {!currentEmailBody.body ? 'Loading...' : (
                    <>
                        <Avatar name={currentEmailBody.from.name} />
                        <div className="email-body__details">
                            {
                                currentEmailBody.isFavorite
                                    ? <span className="mark-favorite__text">Marked as favorite</span>
                                    : (
                                        <button type="button" className="mark-favorite__btn" onClick={toggleFavorite}>
                                            Mark as favorite
                                        </button>
                                    )
                            }
                            <h1>{currentEmailBody.subject}</h1>
                            <time>{parseDate(currentEmailBody.date)}</time>

                            <div
                                className="email-body__description"
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        currentEmailBody.body,
                                        { USE_PROFILES: { html: true } },
                                    ),
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    ) : null;
};

EmailBody.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    selectedEmailId: PropTypes.string.isRequired,
    dispatchAddEmailBody: PropTypes.func.isRequired,
    isEmailBodyOpen: PropTypes.bool.isRequired,
    dispatchMarkEmailAsFavorite: PropTypes.func.isRequired,
    dispatchUpdateFilteredEmails: PropTypes.func.isRequired,
    currentEmailBody: emailShape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmailBody: (emailBody) => dispatch(addEmailBody(emailBody)),
    dispatchUpdateFilteredEmails: () => dispatch(updateFilteredEmails()),
    dispatchMarkEmailAsFavorite: (emailId) => dispatch(markEmailAsFavorite(emailId)),
});

const mapStateToProps = (state) => ({
    emails: state.emails,
    selectedEmailId: state.selectedEmailId,
    isEmailBodyOpen: state.isEmailBodyOpen,
    currentEmailBody: state.currentEmailBody,
    currentFilter: state.currentFilter,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailBody);
