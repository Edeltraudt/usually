import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import './Registration.scss'

import { User } from './../../models/user';
import { Step } from './Step';
import { steps } from '../../steps';

import * as errors from '../../errors';

class Registration extends Component {
  user = new User();
  steps = steps;

  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      isFinished: false
    };
  }

  handleNextStep = (id, value) => {
    this.user[id] = value;
    this.setState({step: this.state.step + 1});

    if ((this.state.step + 1) >= this.steps.length) {
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    if (this.props.store) {
      this.props.store.user = this.user;
    } else {
      console.error(errors.storeUndefined);
    }

    // TODO: handle what comes after the registration
    this.setState({ isFinished: true });
  }

  handleFinish = e => {
    e.preventDefault();

    if (this.props.onFinish) {
      this.props.onFinish(this.props.history);
    }
  }

  render() {
    return (
      <section className="registration">
        <h2 className="visually-hidden">Create your profile</h2>

        <div className="registration-steps-wrap">
          {/* step slider wrapper */}
          <div className="registration-steps"
              style={{'transform': 'translateX(-'+100 * this.state.step+'%)'}}>
            {/* step list */}
            {this.steps.map((step, index) =>
              <Step
                  {...step}
                  key={step.id}
                  onNext={this.handleNextStep}
                  disabled={index !== this.state.step}
              />)}

            {/* end screen */}
            <section className={'step ' + (this.state.isFinished ? '' : '-hidden')}>
              <header className="step-header">
                <p className="step-label">That's it!</p>
                <h3 className="step-headline">We're ready to go.</h3>
              </header>

              <button type="button" className="button -primary"
                onClick={this.handleFinish}>Dive in</button>
            </section>
          </div>
        </div>

        {/* step counter */}
        {!this.state.isFinished &&
          <footer className="registration-footer">
            <span className="registration-current">{this.state.step+1}</span>
            /
            <span className="registration-total">{this.steps.length}</span>
          </footer>}
      </section>
    )
  }
}

export const RegistrationWithRouter = withRouter(Registration);
