import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutosizeInput from 'react-input-autosize';
import TimeField from 'react-simple-timefield';

import * as helpers from '../../../../helpers';

import './Datetime.scss';

export class Datetime extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.any,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    let value = '11:00';
    let internalValue = '23:00';
    let isPm = true;
    let isModified = false;

    if (props.value) {
      [value, internalValue, isPm] =
        helpers.convertAmPm(props.value.toString() || '11:30');
      isModified = true;
    }

    this.state = { value, internalValue, isPm, isModified };
  }

  handleChange = (input) => {
    this.handleTimeChange(input);
  }

  handleTimeChange = (input, updateAmPm = false) => {
    let [value, internalValue, isPm] =
      helpers.convertAmPm(input, this.state.isPm, updateAmPm);
    this.setState({ value, internalValue, isPm, isModified: true });
  }

  /**
   * Blurs the focus on the input element and passes the
   * input value upwards.
   */
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.inputRef.input.blur();
      this.setState({ isModified: true });
      this.handleTimeChange(this.state.value, true);
    }
  }

  /**
   * Converts time into opposite of am/pm, translates the
   * internal 24-hour value and passes the updated value up.
   */
  handleAmPmClick = () => {
    let [value, internalValue, isPm] =
      helpers.convertAmPm(this.state.value, this.state.isPm, true, true);
    this.setState({ value, internalValue, isPm, isModified: true});
    this.props.onChange(internalValue);
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
      <span className="unit -toggle"
        onClick={this.handleAmPmClick}>{this.state.isPm ? "pm" : "am"}</span>
    </>);
  }
}
