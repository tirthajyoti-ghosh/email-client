import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Avatar = ({ name }) => (
    <span className="avatar">{name[0].toUpperCase()}</span>
);

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
};

export default memo(Avatar);
