import { Card } from "./card";
import { IconNutrition, IconSleep, IconHydration, IconGlassS, IconGlassL, IconEvent } from "../asset/icons";
import { Number } from "../components/Card/Number/Number";
import { Rating } from "../components/Card/Rating/Rating";
import { Text } from "../components/Card/Text/Text";

const sleepTime = new Date();
sleepTime.setHours(22, 32);

export const NutritionCard = new Card('nutrition', 'Nutrition', 'kcal', IconNutrition);
  NutritionCard.createField(Number, 'amount', {
    label: 'Intake today',
    value: 1786,
    info: 'Your recommended intake for today so far is 2,341 kcal.'
  });
  NutritionCard.createField(Rating, 'quality', {
    label: 'How healthy did you eat today?'
  });

export const SleepCard = new Card('sleep', 'Last Night\'s Sleep', 'time', IconSleep);
  SleepCard.createField(Number, 'amount', {
    label: 'Sleep Duration',
    value: 397,
    unit: 'time',
    info: '8h 12m seem to work best for you.'
  });
  SleepCard.createField(Number, 'amount', {
    label: 'Went to sleep at',
    showLabel: true,
    value: sleepTime,
    unit: 'datetime',
    info: 'Sounds good! Going to sleep between 10–11pm improves your mood by 23%.'
  });
  SleepCard.createField(Rating, 'quality', {
    label: 'How did you feel when you woke up?'
  });

export const HydrationCard = new Card('hydration', 'Hydration', 'ml', IconHydration);
  HydrationCard.createField(Number, 'amount', {
    label: 'Water intake today',
    value: 700,
    info: 'Your recommended intake for today so far is 2,300 ml.',
    quickActions: [
      { action: 'add', amount: 250, icon: IconGlassS },
      { action: 'add', amount: 400, icon: IconGlassL }
    ]
  });

export const EventsCard = new Card('events', 'Life Events', null, IconEvent);
  EventsCard.createField(Text, 'notes', {
    label: 'Notes for yourself',
    showLabel: true,
    value: ''
  });
  EventsCard.createField(Rating, 'influence', {
    label: 'How did these events affect you?'
  });
