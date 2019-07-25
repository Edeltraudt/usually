import React, { Component } from 'react';

import './Dashboard.scss';

import * as helpers from '../../helpers';

import { MoodSlider } from '../../components/MoodSlider';
import { Card } from '../../components/Card';

import { NutritionCard, SleepCard, HydrationCard, EventsCard, MentalFitnessCard } from '../../models/card-types';

export class Dashboard extends Component {
  date = new Date();

  constructor(props) {
    super(props);

    this.gridRef = React.createRef();
    this.gridItems = [];
  }

  componentDidMount() {
    this.resizeAllCards();
  }

  resizeCard(card) {
    if (card && card.current) {
      const grid = this.gridRef.current;
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      const rowSpan = Math.ceil((card.current.getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)) + 1;
      card.current.style.gridRowEnd = "span " + rowSpan;
    }
  }

  resizeAllCards() {
    this.gridItems.forEach(card => this.resizeCard(card));
  }

  render() {
    const store = this.props.store;

    return (
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-header">
            <h2 className="headline dashboard-sidebar-headline">How are you<br />feeling today?</h2>
            <p className="subline">Drag to set your mood.</p>
          </div>
          <MoodSlider store={store} />
        </aside>

        <main className="dashboard-content">
          <header className="dashboard-content-header">
            <p className="headline dashboard-content-headline">
              {helpers.printGreeting()},&nbsp;
              {store.user.name}!
            </p>
            <h2 className="headline -secondary dashboard-content-subheadline">Your Dashboard</h2>
            <p className="dashboard-content-date">{helpers.printDate()}</p>
          </header>

          <div className="dashboard-grid" ref={this.gridRef}>
            <Card data={NutritionCard} store={store}
                getRef={ref => (this.gridItems[0] = ref)}/>
            <Card data={SleepCard} store={store}
                getRef={ref => (this.gridItems[1] = ref)}/>
            <Card data={HydrationCard} store={store}
                getRef={ref => (this.gridItems[2] = ref)} />
            <Card data={EventsCard} store={store}
                getRef={ref => (this.gridItems[3] = ref)} />
            <Card data={MentalFitnessCard} store={store}
                getRef={ref => (this.gridItems[4] = ref)} />
          </div>
        </main>
      </div>
    );
  }
}
