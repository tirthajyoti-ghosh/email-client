import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmails, addEmailBody } from '../redux/actions/emails';
import { parseDate, toggleFavoriteStatus } from '../utils/general';

const EmailBody = ({
    emails, selectedEmailId, currentEmailBody, dispatchAddEmailBody, dispatchAddEmails,
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
    };

    return !currentEmailBody.body ? 'Loading...' : (
        <section className="email-body">
            <img
                src={`https://avatars.dicebear.com/api/initials/${currentEmailBody.from.email}.svg`}
                alt={currentEmailBody.from.email}
            />
            <div className="email-body__details">
                <button type="button" className="mark-favorite-btn" onClick={() => toggleFavorite()}>
                    Mark as favorite
                </button>
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
        </section>
    );
};

EmailBody.propTypes = {
    selectedEmailId: PropTypes.string.isRequired,
    dispatchAddEmailBody: PropTypes.func.isRequired,
    dispatchAddEmails: PropTypes.func.isRequired,
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
    dispatchAddEmailBody: (emailBody) => dispatch(addEmailBody(emailBody)),
    dispatchAddEmails: (emails) => dispatch(addEmails(emails)),
});

const mapStateToProps = (state) => ({
    emails: state.emails,
    selectedEmailId: state.selectedEmailId,
    currentEmailBody: state.currentEmailBody,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailBody);
