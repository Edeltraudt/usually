import React, { Component } from 'react';

import './Slider.scss';

export const SliderType = {
  PROGRESS: 0,
  MULTI: 1
}

class SliderPoint {
  x = 0;
  xPercent = 0;

  constructor(left, parentRect) {
    this.x = left - parentRect.left;
    this.xPercent = this.x / parentRect.width * 100;
  }
}

export class Slider extends Component {
  constructor(props) {
    super(props);

    this.lineRef = React.createRef();
    this.getRectsInterval = undefined;
    this.type = this.props.type || SliderType.PROGRESS;
    this.state = {
      lineRect: { left: 0, width: 1 },
      points: []
    };
  }

  componentDidMount() {
    this.getRectsInterval = setInterval(() => {
      this.setState(state => {
        const lineRect = this.lineRef.current.getBoundingClientRect();
        return JSON.stringify(lineRect) !== JSON.stringify(state.lineRect) ? { lineRect } : null;
      });
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.getRectsInterval);
  }

  handleClick = (event) => {
    if (this.type === SliderType.MULTI) {
      if (!this.state.points.find(p => p.absolutePosition === event.clientX)) {
        this.createNewPoint(event.clientX, this.state.lineRect);
      }
    }
  }

  createNewPoint = (x, parentRect) => {
    const point = new SliderPoint(x, parentRect);
    this.setState({ points: [...this.state.points, point] });
  }

  renderThumb(left, inPercent = false, key = 0) {
    if (inPercent) left += '%';

    return <span className="slider-indicator"
              key={key}
              style={{left}} />;
  }

  render() {
    return (
      <div className="slider">
        <div className="slider-line" ref={this.lineRef} />

        {this.type === SliderType.PROGRESS &&
          this.renderThumb(100)}

        {this.type === SliderType.MULTI &&
          this.state.points.map((point, index) => this.renderThumb(point.xPercent, true, index))}
      </div>
    );
  }
}
