import React from 'react';
import { Store } from "./Store";

export class Predictor {
  constructor(props) {
    this.store = new Store();
  }

  getRecommendationFor(card, field, unit) {
    let number, text, value;

    switch(card) {
      case 'nutrition':
        number = this.nutritionRecommendation;
        text = <>Your recommended intake for today so far is <strong>{Number(number).toLocaleString()} {unit}</strong>.</>;
        value = Number(number);
        break;
      case 'hydration':
        number = this.hydrationRecommendation;
        text = <>Your recommended intake for today so far is <strong>{Number(number).toLocaleString()} {unit}</strong>.</>;
        value = Number(number);
        break;
      default:
        text = <></>;
        value = 0;
    }

    return { text, value };
  }

  get nutritionRecommendation() {
    // this is the recommendation for keeping your weight
    // TODO: branching for gaining or losing weight
    // https://www.fitness-emotion.at/berechnung-grundumsatz/#Mifflin-StJeor-Formel

    const modifier = this.store.user.physicalActivity || 1;
    const w = 9.99 * this.store.user.weight;
    const h = 6.25 * this.store.user.height;
    const a = 4.92 * this.store.age;
    let value = w + h - a;

    if (this.store.user.sex === 'f') {
      value -= 161;
    } else {
      value += 5;
    }

    return Math.round(value * modifier);
  }

  get hydrationRecommendation() {
    return this.store.user.weight * 30;
  }
}
