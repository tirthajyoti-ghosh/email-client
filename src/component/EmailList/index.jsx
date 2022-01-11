import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    addEmails,
    addEmailId,
    addEmailBody,
    openEmailBody,
    markEmailAsRead,
    updateFilteredEmails,
} from '../../redux/actions/emails';
import {
    parseDate,
    addAdditionalProperties,
    convertEmailsArrToLocalStorage,
} from '../../utils/general';
import { emailListShape } from '../../utils/propTypes';

import Avatar from '../Avatar';

import './style.css';
import Pagination from '../Pagination';

const EmailList = ({
    emails,
    currentPage,
    filteredEmails,
    isEmailBodyOpen,
    dispatchAddEmails,
    dispatchAddEmailId,
    dispatchAddEmailBody,
    dispatchOpenEmailBody,
    dispatchMarkEmailsAsRead,
    dispatchUpdateFilteredEmails,
}) => {
    const [activeEmail, setActiveEmail] = useState(null);

    useEffect(() => {
        const fetchEmails = async () => {
            const response = await fetch(`https://flipkart-email-mock.vercel.app/?page=${currentPage}`);
            const { list: data } = await response.json();

            let newData;
            const storedEmailsFilterState = localStorage.getItem('emails');
            if (storedEmailsFilterState) {
                const persistedState = JSON.parse(storedEmailsFilterState);

                newData = data.map((email) => {
                    // If filter state of this email is not present in localStorage,
                    // then mutate `persistedState` to include default filter state with email id.
                    if (!persistedState[email.id]) {
                        persistedState[email.id] = {
                            id: email.id,
                            isRead: false,
                            isFavorite: false,
                        };
                    }

                    return {
                        ...email,
                        ...persistedState[email.id],
                    };
                });

                localStorage.setItem('emails', JSON.stringify(persistedState));
            } else {
                newData = addAdditionalProperties(
                    data,
                    {
                        isRead: false,
                        isFavorite: false,
                    },
                );

                localStorage.setItem('emails', JSON.stringify(convertEmailsArrToLocalStorage(newData)));
            }

            dispatchAddEmails(newData);
            dispatchUpdateFilteredEmails();
        };

        if (!emails[currentPage]) {
            fetchEmails();
        }
    }, [currentPage]);

    const handleEmailInteraction = (item) => {
        if (!isEmailBodyOpen) {
            dispatchOpenEmailBody();
        }

        dispatchAddEmailId(item.id);
        dispatchAddEmailBody(item);

        window.scrollTo(0, 0);

        setActiveEmail(item.id);

        dispatchMarkEmailsAsRead(item.id);

        // A 0ms timeout is used to ensure that the main thread is not blocked
        // as localStorage is synchronous and takes time to update
        setTimeout(() => {
            if (localStorage.getItem('emails')) {
                const persistedState = JSON.parse(localStorage.getItem('emails'));

                persistedState[item.id].isRead = true;
                localStorage.setItem('emails', JSON.stringify(persistedState));
            }
        }, 0);
    };

    const emailsArray = filteredEmails[currentPage] || [];

    return (
        <section className={`email-list ${isEmailBodyOpen ? 'email-body-open' : ''}`}>
            <ul>
                {
                    emailsArray.map((item) => {
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

            <Pagination />
        </section>
    );
};

EmailList.propTypes = {
    emails: emailListShape().isRequired,
    currentPage: PropTypes.number.isRequired,
    filteredEmails: emailListShape().isRequired,
    isEmailBodyOpen: PropTypes.bool.isRequired,
    dispatchAddEmails: PropTypes.func.isRequired,
    dispatchAddEmailId: PropTypes.func.isRequired,
    dispatchAddEmailBody: PropTypes.func.isRequired,
    dispatchOpenEmailBody: PropTypes.func.isRequired,
    dispatchMarkEmailsAsRead: PropTypes.func.isRequired,
    dispatchUpdateFilteredEmails: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmails: (emails) => dispatch(addEmails(emails)),
    dispatchAddEmailId: (emailId) => dispatch(addEmailId(emailId)),
    dispatchAddEmailBody: (emailBody) => dispatch(addEmailBody(emailBody)),
    dispatchOpenEmailBody: () => dispatch(openEmailBody()),
    dispatchMarkEmailsAsRead: (emailId) => dispatch(markEmailAsRead(emailId)),
    dispatchUpdateFilteredEmails: () => dispatch(updateFilteredEmails()),
});

const mapStateToProps = (state) => ({
    emails: state.emails,
    currentPage: state.currentPage,
    filteredEmails: state.filteredEmails,
    isEmailBodyOpen: state.isEmailBodyOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailList);
