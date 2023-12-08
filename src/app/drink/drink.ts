export class Drink {
  id?: number;
  brand?: string;
  name?: string;
  sugar?: number;
  flavour?: string;
  additionalInfo?: string;
  reviewsIds?: number[];
}

export interface DrinksParams {
  brands?: string[],
  flavours?: string[],
  sugarMin?: number,
  sugarMax?: number,
  sortBy?: string,
  sortOrder?: string
}