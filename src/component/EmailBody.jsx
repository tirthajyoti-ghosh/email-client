import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmailBody } from '../redux/actions/emails';

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
                src="https://avatars.dicebear.com/api/initials/careers@flipkart.com.svg"
                alt="careers@flipkart.com"
            />
            <div className="email-body__details">
                <button type="button" className="mark-favorite-btn">
                    Mark as favorite
                </button>
                <h1>Lorem ipsum</h1>
                <time>26/02/2020 06:56 pm</time>

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
        id: PropTypes.string.isRequired,
        // from: PropTypes.shape({
        //     email: PropTypes.string.isRequired,
        //     name: PropTypes.string.isRequired,
        // }).isRequired,
        // date: PropTypes.string.isRequired,
        // subject: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
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
