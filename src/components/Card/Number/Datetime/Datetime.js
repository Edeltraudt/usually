import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutosizeInput from 'react-input-autosize';
import TimeField from 'react-simple-timefield';

import * as helpers from '../../../../helpers';

import './Datetime.scss';

export class Datetime extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.any,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    let [value, internalValue, isPm] =
      helpers.convertAmPm(props.value.toString() || '00:00');

    this.state = { value, internalValue, isPm };
  }

  handleChange = (input) => {
    let [value, internalValue, isPm] =
      helpers.convertAmPm(input, this.state.isPm, false);
    this.setState({ value, internalValue, isPm });
  }

  /**
   * Blurs the focus on the input element and passes the
   * input value upwards.
   */
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.inputRef.input.blur();
      this.props.onChange(this.state.internalValue);
    }
  }

  /**
   * Converts time into opposite of am/pm, translates the
   * internal 24-hour value and passes the updated value up.
   */
  handleAmPmClick = () => {
    let [value, internalValue, isPm] =
      helpers.convertAmPm(this.state.value, this.state.isPm);
    this.setState({ value, internalValue, isPm });
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
          className='card-number-input'
        />}
        value={this.state.value}
        onChange={this.handleChange}
      />
      <span className="unit -toggle"
        onClick={this.handleAmPmClick}>{this.state.isPm ? 'pm' : 'am'}</span>
    </>);
  }
}
