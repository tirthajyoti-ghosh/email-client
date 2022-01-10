import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    addEmails,
    addEmailId,
    addEmailBody,
    openEmailBody,
    updateFilteredEmails,
} from '../../redux/actions/emails';
import {
    addAdditionalProperties,
    markEmailAsRead,
    parseDate,
} from '../../utils/general';
import { emailListShape } from '../../utils/propTypes';

import Avatar from '../Avatar';

import './style.css';

const EmailList = ({
    emails,
    filteredEmails,
    isEmailBodyOpen,
    dispatchAddEmails,
    dispatchAddEmailId,
    dispatchAddEmailBody,
    dispatchOpenEmailBody,
    dispatchUpdateFilteredEmails,
}) => {
    const [activeEmail, setActiveEmail] = useState(null);

    useEffect(() => {
        const fetchEmails = async () => {
            const response = await fetch('https://flipkart-email-mock.vercel.app/');
            const data = await response.json();
            const newData = addAdditionalProperties(
                data.list,
                {
                    isRead: false,
                    isFavorite: false,
                },
            );
            dispatchAddEmails(newData);
            dispatchUpdateFilteredEmails();
        };

        fetchEmails();
    }, []);

    const handleEmailInteraction = (item) => {
        if (!isEmailBodyOpen) {
            dispatchOpenEmailBody();
        }

        dispatchAddEmailId(item.id);
        dispatchAddEmailBody(item);

        window.scrollTo(0, 0);

        setActiveEmail(item.id);

        const newEmails = markEmailAsRead(emails, item.id);
        dispatchAddEmails(newEmails);
    };

    return (
        <section className={`email-list ${isEmailBodyOpen ? 'email-body-open' : ''}`}>
            <ul>
                {
                    filteredEmails.map((item) => {
                        const itemClassName = `email-list__item ${item.isRead ? 'read' : ''} ${activeEmail === item.id ? 'active' : ''}`;

                        return (
                            <li
                                key={item.id}
                                role="menuitem"
                                className={itemClassName}
                                onClick={() => handleEmailInteraction(item)}
                                onKeyPress={() => handleEmailInteraction(item)}
                            >

                                <Avatar name={item.from.name} />
                                <div className="email-list__item__details">
                                    <p className="info">
                                        From:
                                        {' '}
                                        <strong>
                                            {item.from.name}
                                            {' '}
                                            &lt;
                                            {item.from.email}
                                            &gt;
                                        </strong>
                                    </p>
                                    <p className="info">
                                        Subject:
                                        {' '}
                                        <strong>{item.subject}</strong>
                                    </p>
                                    <p className="short-desc">{item.short_description}</p>
                                    <time>{parseDate(item.date)}</time>
                                    {item.isFavorite && <span className="favorite">Favorite</span>}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    );
};

EmailList.propTypes = {
    emails: emailListShape().isRequired,
    filteredEmails: emailListShape().isRequired,
    isEmailBodyOpen: PropTypes.bool.isRequired,
    dispatchAddEmails: PropTypes.func.isRequired,
    dispatchAddEmailId: PropTypes.func.isRequired,
    dispatchAddEmailBody: PropTypes.func.isRequired,
    dispatchOpenEmailBody: PropTypes.func.isRequired,
    dispatchUpdateFilteredEmails: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmails: (emails) => dispatch(addEmails(emails)),
    dispatchAddEmailId: (emailId) => dispatch(addEmailId(emailId)),
    dispatchAddEmailBody: (emailBody) => dispatch(addEmailBody(emailBody)),
    dispatchOpenEmailBody: () => dispatch(openEmailBody()),
    dispatchUpdateFilteredEmails: () => dispatch(updateFilteredEmails()),
});

const mapStateToProps = (state) => ({
    emails: state.emails,
    filteredEmails: state.filteredEmails,
    isEmailBodyOpen: state.isEmailBodyOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailList);
