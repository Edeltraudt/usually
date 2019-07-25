import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import './Start.scss';

import cardPreview from './../../asset/images/card-preview.svg';
import { RegistrationWithRouter } from '../../components/Registration';
import { MoodSlider } from '../../components/MoodSlider';

import * as errors from '../../errors';

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistering: false
    };
  }

  handleStartClick = e => {
    e.preventDefault();

    if (this.props.store) {
      if (this.props.store.user) {
        this.handleRegistrationFinish();
      } else {
        this.setState({ isRegistering: true });
      }
    } else {
      console.error(errors.storeUndefined);
    }
  }

  handleRegistrationFinish = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div className="start -is-registering">
        <aside className="start-cell start-slider">
          <MoodSlider readOnly />
        </aside>

        <main className="start-cell start-content">
          <div className="start-content-wrap">
            <h1 className="title start-title">Usually</h1>
            <p className="intro start-cell-text">Track your mood and habits to gain control of your bowel movements.</p>
          </div>

          <div className="start-interactive">
            { this.state.isRegistering
              ? <RegistrationWithRouter
                  store={this.props.store}
                  onFinish={this.handleRegistrationFinish} />
              : <div className="button-group">
                  <button type="button" className="button -primary"
                    onClick={this.handleStartClick}>Get started</button>
                  <a href="https://" className="button" target="_blank" rel="noopener noreferrer">Read more</a>
                </div> }
          </div>

          <aside className="start-content-demo">
            {/* TODO: replace with actual card for playing around and quick demo */}
            <img src={cardPreview} alt="" />
          </aside>
        </main>

        <section className="start-cell -secondary start-how">
          <h2 className="start-cell-text subheadline">How does it work?</h2>
          <p className="start-cell-text">Unless you create an online account to synchronise your encrypted data with all your devices, everything is saved directly to your device and will not be processed by any party that’s unknown to you.</p>
        </section>

        <section className="start-cell -secondary start-why">
          <h2 className="start-cell-text subheadline">Why?</h2>
          <p className="start-cell-text">Data analysis is hard. I needed the challenge, and a lot of people around me could use a tracker like this. Free because I’m not a broke bitch.</p>
        </section>

        <aside className="start-cell -secondary start-external">
          <svg className="start-external-logo" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 100 100">
            <path d="M82.9,25.6L50,9l-12.6,6.4c3.2,1.6,45.5,22.9,45.5,22.9V25.6z" />
            <polygon points="33.9,17.1 17.1,25.6 17.1,38.2 46.5,23.4 " />
            <polygon points="17.1,74.4 50,91 62.6,84.7 17.1,61.8 " />
            <polygon points="66,82.9 82.9,74.4 82.9,61.8 53.4,76.6 " />
            <polygon points="99.4,50 50,25.2 0.6,50 50,74.9 " />
          </svg>
          <a href="https://zentigon.com" className="start-external-link" target="_blank" rel="noopener noreferrer">Visit zentigon.com</a>
        </aside>
      </div>
    );
  }
}

export const StartWithRouter = withRouter(Start);
