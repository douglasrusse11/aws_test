import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Style {
  GREEK = "Greek",
  PUB = "Pub",
  BUFFET = "Buffet",
  MEXICAN = "Mexican",
  TAPAS = "Tapas",
  INDIAN = "Indian",
  CAFE = "Cafe",
  PIZZA = "Pizza"
}



type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Restaurant {
  readonly id: string;
  readonly name: string;
  readonly style: Style | keyof typeof Style;
  readonly latlng?: (number | null)[];
  readonly address?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}