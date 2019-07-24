import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Text.scss';

export class Text extends Component {
  static propTypes = {
    showLabel: PropTypes.bool,
    value: PropTypes.string
  };

  static defaultProps = {
    showLabel: true
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      timeout: null
    };
  }

  handleInputChange = (event) => {
    if (this.state.timeout) window.clearTimeout(this.state.timeout);

    const value = event.target.value;
    this.setState({value});

    if (this.props.onChange) {
      this.setState({ timeout: window.setTimeout(() => {
        this.props.onChange(value);
        this.setState({ timeout: null });
      }, 200)});
    }
  };

  render() {
    return (
      <div className="card-text">
        <span aria-label={this.props.label} className="card-section-heading">
          {(this.props.showLabel) && this.props.label}
        </span>
        <textarea className="card-text-input"
          placeholder='Write here...'
          onChange={this.handleInputChange}
          value={this.state.value} />
        {this.props.info &&
          <p className="card-info">{this.props.info}</p>}
      </div>
    );
  }
}
