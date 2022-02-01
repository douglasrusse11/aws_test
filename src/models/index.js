// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Style = {
  "GREEK": "Greek",
  "PUB": "Pub",
  "BUFFET": "Buffet",
  "MEXICAN": "Mexican",
  "TAPAS": "Tapas",
  "INDIAN": "Indian",
  "CAFE": "Cafe",
  "PIZZA": "Pizza"
};

const { Restaurant } = initSchema(schema);

export {
  Restaurant,
  Style
};