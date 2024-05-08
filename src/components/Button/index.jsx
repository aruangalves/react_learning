import './styles.css';

import P from 'prop-types';

import { Component } from 'react';

export class Button extends Component {
    render() {
        const { disabled, onClick, text } = this.props;

        return (
            <button disabled={disabled} className="btn" onClick={onClick}>
                {text}
            </button>
        );
    }
}

Button.defaultProps = {
    disabled: false,
};

Button.propTypes = {
    text: P.string.isRequired,
    onClick: P.func.isRequired,
    disabled: P.bool,
};
