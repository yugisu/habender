import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ToolButton.css';

class ToolButton extends Component {
  static defaultProps = {
    className: '',
    alt: '',
  };

  static propTypes = {
    emoji: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  shouldComponentUpdate({ emoji: nextEmoji, className: nextClassName }) {
    const { emoji, className } = this.props;
    return nextEmoji !== emoji || nextClassName !== className;
  }

  render() {
    const { emoji, className, alt, ...others } = this.props;
    return (
      <img
        className={`tool-button ${className}`}
        src={emoji}
        alt={alt}
        {...others}
      />
    );
  }
}

export default ToolButton;
