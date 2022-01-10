import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmails, addEmailBody, updateFilteredEmails } from '../../redux/actions/emails';
import { filterEmails, parseDate, toggleFavoriteStatus } from '../../utils/general';

import Avatar from '../Avatar';

import './style.css';

const EmailBody = ({
    emails,
    selectedEmailId,
    isEmailBodyOpen,
    currentEmailBody,
    dispatchAddEmails,
    dispatchAddEmailBody,
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
        const newEmails = toggleFavoriteStatus(emails, selectedEmailId);
        dispatchAddEmails(newEmails);
        dispatchAddEmailBody({ isFavorite: !currentEmailBody.isFavorite });

        const filteredEmails = filterEmails(emails, 'favorites');
        dispatchUpdateFilteredEmails(filteredEmails);
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
    selectedEmailId: PropTypes.string.isRequired,
    dispatchAddEmailBody: PropTypes.func.isRequired,
    dispatchAddEmails: PropTypes.func.isRequired,
    isEmailBodyOpen: PropTypes.bool.isRequired,
    dispatchUpdateFilteredEmails: PropTypes.func.isRequired,
    currentEmailBody: PropTypes.shape({
        id: PropTypes.string,
        from: PropTypes.shape({
            email: PropTypes.string,
            name: PropTypes.string,
        }),
        date: PropTypes.number,
        subject: PropTypes.string,
        body: PropTypes.string,
        isFavorite: PropTypes.bool,
    }).isRequired,
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
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmails: (emails) => dispatch(addEmails(emails)),
    dispatchAddEmailBody: (emailBody) => dispatch(addEmailBody(emailBody)),
    dispatchUpdateFilteredEmails: (filteredEmails) => (
        dispatch(updateFilteredEmails(filteredEmails))
    ),
});

const mapStateToProps = (state) => ({
    emails: state.emails,
    selectedEmailId: state.selectedEmailId,
    isEmailBodyOpen: state.isEmailBodyOpen,
    currentEmailBody: state.currentEmailBody,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailBody);
