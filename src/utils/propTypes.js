import PropTypes from 'prop-types';

export const emailShape = () => PropTypes.shape({
    id: PropTypes.string,
    from: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
    }),
    date: PropTypes.number,
    subject: PropTypes.string,
    short_description: PropTypes.string,
    body: PropTypes.string,
    isRead: PropTypes.bool,
    isFavorite: PropTypes.bool,
});

export const emailListShape = () => PropTypes.arrayOf(emailShape().isRequired);
