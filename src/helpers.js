import React from 'react';

const monthNames = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December'
];

/**
 * Formats a date object into the data-structure format.
 */
export function formatDate(date) {
  return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
}

/**
 * Converts a time string into number of minutes.
 */
export function getTimeAsMinutes(str) {
  const [hours, minutes = 0] = str.split(':');
  return hours * 60 + minutes;
}

/**
 * Takes hours and original am/pm as starting parameters and
 * returns converted hours and opposite am/pm as an object.
 */
export function convertAmPm(hours, from) {
  let ampm = 'am';
  hours = parseInt(hours);

  // convert 24-hour format into 12-hour format
  if (!from || hours > 12) {
    if (hours >= 12) ampm = 'pm';
    if (hours === 0) hours = 12;

    hours = hours % 12;
  }

  // convert 12-hour format into opposite am/pm
  if (from === 'am' || from === 'pm') {
    ampm = (from === 'am') ? 'pm' : 'am';

  }

  return [ hours, ampm ];
}

export function convertTo24Hours(hours, ampm) {
  hours = parseInt(hours);

  if (hours === 12) hours = 0;
  if (hours < 12 && ampm === 'pm') hours += 12;

  return hours;
}

/**
 * Prints month and day in human-readable format.
 */
export function printDate(date = null) {
  if (!date) date = new Date();
  return monthNames[date.getMonth()] + ' ' + date.getDate();
}

/**
 * Gets the greeting based on the current time.
 */
export function printGreeting() {
  const time = new Date().getHours();

  if (time > 17) {
    return 'Good evening';
  } else if (time > 14) {
    return 'Good afternoon';
  } else if (time > 12) {
    return 'Hello';
  } else {
    return 'Good morning';
  }
}

export function printValue(value, unit) {
  if (unit === 'time') {
    return getTimespanAsValue(value);
  } else if (unit === 'datetime') {
    return getTimeAsValue(value);
  } else {
    return getNumberAsValue(value, unit);
  }
}

export function getTimespanAsValue(minutes) {
  const mins = minutes % 60;
  const hours = (minutes - mins) / 60;

  return (<>
    {hours}<span className="unit">h</span>
    {mins}<span className="unit">m</span>
  </>)
}

export function getTimeAsValue(date) {
  let hours = date.getHours() % 12;
  let minutes = date.getMinutes();
  let ampm = 'am';

  if (date.getHours() >= 12) ampm = 'pm';
  if (hours === 0) hours = 12;

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');

  return (<>
    {hours}:{minutes}<span className="unit">{ampm}</span>
  </>)
}

export function getNumberAsValue(number, unit) {
  return (<>
    {Number(number).toLocaleString()}<span className="unit">{unit}</span>
  </>)
}

export function parseJSON(string) {
  if (string && string !== undefined && string !== 'undefined') {
    return JSON.parse(string);
  } else {
    return null;
  }
}
