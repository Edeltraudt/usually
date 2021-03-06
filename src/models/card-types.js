import { Card } from "./card";
import { IconNutrition, IconSleep, IconHydration, IconGlassS, IconGlassL, IconEvent, IconFocus } from "../asset/icons";
import { Number } from "../components/Card/Number/Number";
import { Rating } from "../components/Card/Rating/Rating";
import { Text } from "../components/Card/Text/Text";

const sleepTime = new Date();
sleepTime.setHours(22, 32);

export const NutritionCard = new Card('nutrition', 'Nutrition', 'kcal', IconNutrition);
  NutritionCard.createField(Number, 'amount', {
    label: 'Intake today',
    info: 'Your recommended intake for today so far is 2,341 kcal.'
  });
  NutritionCard.createField(Rating, 'quality', {
    label: 'How healthy did you eat today?'
  });

export const SleepCard = new Card('sleep', 'Last Night\'s Sleep', 'time', IconSleep);
  SleepCard.createField(Number, 'sleeptime', {
    label: 'Went to sleep at',
    showLabel: true,
    unit: 'datetime',
    info: 'Sounds good! Going to sleep between 10–11pm improves your mood by 23%.'
  });
  SleepCard.createField(Number, 'wakeuptime', {
    label: 'Woke up at',
    showLabel: true,
    unit: 'datetime',
    info: ''
  });
  SleepCard.createField(Rating, 'quality', {
    label: 'How did you feel when you woke up?'
  });

export const HydrationCard = new Card('hydration', 'Hydration', 'ml', IconHydration);
  HydrationCard.createField(Number, 'amount', {
    label: 'Water intake today',
    info: 'Your recommended intake for today so far is 2,300 ml.',
    quickActions: [
      { operator: '+', amount: 200, icon: IconGlassS },
      { operator: '+', amount: 300, icon: IconGlassL }
    ]
  });

export const EventsCard = new Card('events', 'Life Events', null, IconEvent);
  EventsCard.createField(Text, 'notes', {
    label: 'Notes for yourself',
    showLabel: true
  });
  EventsCard.createField(Rating, 'influence', {
    label: 'How do these events affect you today?'
  });

export const MentalFitnessCard = new Card('mental', 'Mental Fitness', null, IconFocus);
  MentalFitnessCard.createField(Rating, 'quality', {
    label: 'Was it big brain time?',
    showLabel: false
  });
