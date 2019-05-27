import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Step.scss'
import { RangeInput } from '../../shared/RangeInput/RangeInput';

export class Step extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isOptional: PropTypes.bool,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['number', 'text', 'email', 'password', 'range']),
    unit: PropTypes.string,
    label: PropTypes.string,
    headline: PropTypes.string.isRequired,
    onNext: PropTypes.func.isRequired
  };

  static defaultProps = {
    isOptional: false,
    type: 'text'
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      value: '',
      isDisabled: this.props.disabled,
      isDone: false
    };
  }

  componentDidMount() {
    this.handleFocus(this.props.disabled);
  }

  componentWillReceiveProps(props) {
    this.setState({ isDisabled: props.disabled });
    this.handleFocus(props.disabled);
  }

  handleFocus = isDisabled => {
    // TODO: focus meddles with the translated position of the
    // registration-steps container.

    // if (this.inputRef && this.inputRef.current) {
    //   if (!isDisabled) {
    //     this.inputRef.current.focus();
    //   }
    // }
  }

  handleValueChange = e => {
    this.setState({ value: e.target.value });
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleNextStep();
    }
  }

  handleNextStep = () => {
    // TODO: validate form input

    if (!this.props.isOptional && !this.state.value) {
      // TODO: shakey
      console.log('Handle next step: Invalid')
      return;
    }

    this.setState({ isDone: true });

    if (this.props.onNext) {
      this.props.onNext(this.props.id, this.state.value);
      return;
    }
  }

  render() {
    return (
      <section className={'step -' + this.props.type +
            (this.state.isDone ? ' -out' : '') +
            (this.state.isDisabled ? ' -disabled' : '')}
          onKeyDown={this.handleKeyDown}>
        <header className="step-header">
          {this.props.label && <p className="step-label">{this.props.label}</p>}
          <h3 className="step-headline">{this.props.headline}</h3>
        </header>

        <div className="step-input-wrap">
          {this.props.type === 'range' && this.props.rangeProps ?
            <RangeInput
                {...this.props.rangeProps}
                onChange={this.handleValueChange}
              /> : <>
            <input className="step-input input"
                autoCorrect="false"
                type={this.props.type}
                step={this.props.type === 'number' ? 5 : null}
                value={this.state.value}
                onChange={this.handleValueChange}
                placeholder={this.props.placeholder}
                ref={this.inputRef}
              />
            {this.props.unit &&
              <span className="step-unit">{this.props.unit}</span>}
            </>
          }
          <button className="step-button button"
            onClick={this.handleNextStep}>
            { (this.props.isOptional && this.state.value === '') ?
              'Skip' : 'Next' }
          </button>
        </div>
      </section>
    )
  }
}
