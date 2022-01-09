import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmails, addEmailId, addEmailBody } from '../../redux/actions/emails';
import { addAdditionalProperties, markEmailAsRead, parseDate } from '../../utils/general';

import Avatar from '../Avatar';

import './style.css';

const EmailList = ({
    emails,
    dispatchAddEmails,
    dispatchAddEmailId,
    dispatchAddEmailBody,
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
        };

        fetchEmails();
    }, []);

    const handleEmailInteraction = (item) => {
        window.scrollTo(0, 0);

        setActiveEmail(item.id);

        const newEmails = markEmailAsRead(emails, item.id);
        dispatchAddEmails(newEmails);

        dispatchAddEmailId(item.id);
        dispatchAddEmailBody(item);
    };

    return (
        <section className="email-list">
            <ul>
                {
                    emails.map((item) => {
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
    dispatchAddEmails: PropTypes.func.isRequired,
    dispatchAddEmailId: PropTypes.func.isRequired,
    dispatchAddEmailBody: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmails: (emails) => dispatch(addEmails(emails)),
    dispatchAddEmailId: (emailId) => dispatch(addEmailId(emailId)),
    dispatchAddEmailBody: (emailBody) => dispatch(addEmailBody(emailBody)),
});

const mapStateToProps = (state) => ({
    emails: state.emails,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailList);
