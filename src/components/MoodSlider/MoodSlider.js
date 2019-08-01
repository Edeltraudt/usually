import React, { Component } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

import './MoodSlider.scss';
import { IconSmile } from '../../asset/icons';

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
      defaultPosition: null,
      level: 2
    };
  }

  componentDidMount() {
    if (!this.props.readOnly && this.props.store) {
      const value = this.props.store.getFieldValue(this.key, this.field);
      const deltaY = this.fromRelativePosition(value);
      this.setState({
        defaultPosition: { x: 0, y: deltaY },
        level: this.getLevelFromValue(value)
      });
    } else {
      this.setState({ defaultPosition: { x: 0, y: 0 } });
    }
  }

  getLevelFromValue = (value) => {
    if (value >= 0.8) return 5;
    if (value >= 0.6) return 4;
    if (value >= 0.4) return 3;
    if (value >= 0.2) return 2;
    if (value >= 0) return 1;
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
      <IconSmile
        level={this.state.level} />
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
                defaultPosition={this.state.defaultPosition} >
              { smiley }
            </Draggable>
            : <>{ smiley }</> }
        </div>
      </div>
    );
  }
}
