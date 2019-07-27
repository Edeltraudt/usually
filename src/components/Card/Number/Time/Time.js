import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutosizeInput from 'react-input-autosize';
import TimeField from 'react-simple-timefield';

import * as helpers from '../../../../helpers';

import './Time.scss';

export class Time extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.any,
    className: PropTypes.string
  };

  static defaultProps = {
    value: 0
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    let value = '00:00';
    let internalValue = 0;
    let isModified = false;

    if (props.value) {
      value = this.convertValue(props.value);
      internalValue = parseInt(props.value);
      isModified = true;
    }

    this.state = { value, internalValue, isModified }
  }

  /**
   * Receives the value as a numerical value in minutes
   * and converts it into a time string
   */
  convertValue(value) {
    let minutes = value % 60;
    let hours = (value - minutes) / 60;

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  handleChange = (value) => {
    const internalValue = helpers.getTimeAsMinutes(value);
    this.setState({ value, internalValue, isModified: true });
    this.props.onChange(internalValue);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.onChange(this.state.internalValue);
      this.props.onKeyPress(event);
      this.inputRef.input.blur();
      this.setState({ isModified: true });
    }
  }

  render() {
    return (<>
      <TimeField
        input={<AutosizeInput
            type="text"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.value}
            style={this.props.style}
            ref={(input) => this.inputRef = input}
            className={this.props.className + (!this.state.isModified ? " -untouched" : "")}
          />}
        value={this.state.value}
        onChange={this.handleChange}
      />
      <span className="unit">h</span>
    </>);
  }
}
