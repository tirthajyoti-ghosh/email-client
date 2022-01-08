import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmailBody } from '../redux/actions/emails';
import { parseDate } from '../utils/general';

const EmailBody = ({ selectedEmailId, currentEmailBody, dispatchAddEmailBody }) => {
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

    return !currentEmailBody.body ? 'Loading...' : (
        <section className="email-body">
            <img
                src={`https://avatars.dicebear.com/api/initials/${currentEmailBody.from.email}.svg`}
                alt={currentEmailBody.from.email}
            />
            <div className="email-body__details">
                <button type="button" className="mark-favorite-btn">
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
    currentEmailBody: PropTypes.shape({
        id: PropTypes.string,
        from: PropTypes.shape({
            email: PropTypes.string,
            name: PropTypes.string,
        }),
        date: PropTypes.number,
        subject: PropTypes.string,
        body: PropTypes.string,
        // isFavorite: PropTypes.bool.isRequired,
    }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmailBody: (emailBody) => dispatch(addEmailBody(emailBody)),
});

const mapStateToProps = (state) => ({
    selectedEmailId: state.selectedEmailId,
    currentEmailBody: state.currentEmailBody,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailBody);
