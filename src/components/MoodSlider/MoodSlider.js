import React, { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import './MoodSlider.scss';

export class MoodSlider extends Component {
  static propTypes = {
    readOnly: PropTypes.bool
  };

  key = 'mood';
  field = 'level';

  constructor(props) {
    super(props);
    this.mouthRef = React.createRef();
    this.rangeRef = React.createRef();
    this.smileyRef = React.createRef();
    this.offsetTop = -1;

    this.state = {
      deltaY: 0,
      relativeY: 0,
      timeout: null,
      defaultPosition: null
    };
  }

  componentDidMount() {
    if (!this.props.readOnly && this.props.store) {
      const value = this.props.store.getFieldValue(this.key, this.field);
      const deltaY = this.fromRelativePosition(value);
      this.setState({ defaultPosition: { x: 0, y: deltaY }});
    } else {
      this.setState({ defaultPosition: { x: 0, y: 0 } });
    }
  }

  getRelativePosition = (y) => {
    const rangeRect = this.rangeRef.current.getBoundingClientRect();
    const smileyRect = this.smileyRef.current.getBoundingClientRect();
    const deltaY = y ? this.state.deltaY + y : 0;

    this.offsetTop = Math.round(smileyRect.top - rangeRect.top);

    const value = (deltaY + this.offsetTop) /
                  (rangeRect.height - smileyRect.height);

    return value.toFixed(2);
  }

  fromRelativePosition = (relative) => {
    const rangeRect = this.rangeRef.current.getBoundingClientRect();
    const smileyRect = this.smileyRef.current.getBoundingClientRect();
    this.offsetTop = Math.round(smileyRect.top - rangeRect.top);

    const deltaY = relative * (rangeRect.height - smileyRect.height) - this.offsetTop;

    this.setState({ deltaY });
    return Math.round(deltaY);
  }

  handleDrag = (event, ui) => {
    if (this.state.timeout) window.clearTimeout(this.state.timeout);

    this.setState({
      deltaY: this.state.deltaY + ui.deltaY,
      relativeY: this.getRelativePosition(ui.deltaY)
    }, () => this.setState({
      timeout: window.setTimeout(() => {
        this.save();
        this.setState({ timeout: null });
      }, 200)
    }));
  }

  save = (event) => {
    if (event) event.preventDefault();
    if (this.props.store) {
      this.props.store.saveFieldValue(this.key, this.field, this.state.relativeY);
    }
  }

  render() {
    const smiley = <div className="mood-slider-smiley" ref={this.smileyRef} >
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 149.8 121" enableBackground="new 0 0 149.8 121">
        <path className="smile-mouth" fill="currentColor" d="M74.9,121c-34,0-64.1-22.8-74.9-56.7l14.3-4.5C23.1,87.4,47.5,106,74.9,106c27.5,0,51.9-18.6,60.6-46.3
          l14.3,4.5C139.1,98.2,109,121,74.9,121z"
            ref={this.mouthRef}   />
        <circle className="smile-eye-left" fill="currentColor" cx="31.9" cy="14" r="14"/>
        <circle className="smile-eye-right" fill="currentColor" cx="117.9" cy="14" r="14"/>
      </svg>
    </div>;

    return (
      <div className={'mood-slider' + (this.props.readOnly ? ' -readonly' : '')}
          ref={this.rangeRef}>
        <div className="mood-slider-track">
          {this.state.defaultPosition
            ? <Draggable
                axis="y"
                bounds="parent"
                onDrag={this.handleDrag}
                disabled={this.props.readOnly}
                defaultPosition={this.state.defaultPosition}
              >
              { smiley }
            </Draggable>
            : <>{ smiley }</> }
        </div>
      </div>
    );
  }
}
