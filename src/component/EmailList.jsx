import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEmails, addEmailId } from '../redux/actions/emails';

const EmailList = ({ emails, dispatchAddEmails, dispatchAddEmailId }) => {
    useEffect(() => {
        const fetchEmails = async () => {
            const response = await fetch('https://flipkart-email-mock.vercel.app/');
            const data = await response.json();
            dispatchAddEmails(data.list);
        };

        fetchEmails();
    }, []);

    return (
        <section className="email-list">
            <ul>
                {
                    emails.map((item) => (
                        <li
                            key={item.id}
                            role="menuitem"
                            className="email-list__item"
                            onClick={() => dispatchAddEmailId(item.id)}
                            onKeyPress={() => dispatchAddEmailId(item.id)}
                        >
                            <img src={`https://avatars.dicebear.com/api/initials/${item.from.email}.svg`} alt={item.from.email} />
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
                                <p>{item.short_description}</p>
                                <time>{new Date(item.date).toLocaleString()}</time>
                                <span className="favorite">Favorite</span>
                            </div>
                        </li>
                    ))
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
        date: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        short_description: PropTypes.string.isRequired,
        // isRead: PropTypes.bool.isRequired,
        // isFavorite: PropTypes.bool.isRequired,
    }).isRequired).isRequired,
    dispatchAddEmails: PropTypes.func.isRequired,
    dispatchAddEmailId: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    dispatchAddEmails: (emails) => dispatch(addEmails(emails)),
    dispatchAddEmailId: (emailId) => dispatch(addEmailId(emailId)),
});

const mapStateToProps = (state) => ({
    emails: state.emails,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailList);
