import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const EmailList = ({ setEmailId }) => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        fetch('https://flipkart-email-mock.vercel.app/')
            .then((response) => response.json())
            .then((data) => setEmails(data.list));
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
                            onClick={() => setEmailId(item.id)}
                            onKeyPress={() => setEmailId(item.id)}
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

export default EmailList;
