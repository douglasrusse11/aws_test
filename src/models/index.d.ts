import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Restaurant {
  readonly id: string;
  readonly name: string;
  readonly style?: string;
  readonly latlng?: (number | null)[];
  readonly address?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}