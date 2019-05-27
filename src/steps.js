export const steps = [
  {
    id: 'name',
    label: 'Happy to make your acquaintance.',
    headline: 'What\'s your name?',
    type: 'text',
    isOptional: false
  },
  {
    id: 'height',
    label: 'We\'re gonna get a bit personal.',
    headline: 'How tall are you?',
    type: 'number',
    unit: 'cm',
    isOptional: true
  },
  {
    id: 'weight',
    label: 'We\'re gonna get a bit personal.',
    headline: 'What\'s your weight?',
    type: 'number',
    unit: 'kg',
    isOptional: true
  },
  {
    id: 'pac',
    label: 'We\'re almost done.',
    headline: 'How active is your lifestyle?',
    type: 'range',
    rangeProps: {
      min: 1.4,
      minLabel: 'Office Worker',
      max: 2.4,
      maxLabel: 'Very active',
      step: 0.1
    },
    isOptional: true
  },
];
