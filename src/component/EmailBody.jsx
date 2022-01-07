import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

// eslint-disable-next-line react/prop-types
const EmailBody = ({ emailId }) => {
    const [email, setEmail] = useState({});

    useEffect(() => {
        if (emailId) {
            fetch(`https://flipkart-email-mock.vercel.app/?id=${emailId}`)
                .then((response) => response.json())
                .then((data) => setEmail(data));
        }
    }, [emailId]);

    return !email.body ? 'Loading...' : (
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
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(email.body,
                            { USE_PROFILES: { html: true } }),
                    }}
                />
            </div>
        </section>
    );
};

export default EmailBody;
