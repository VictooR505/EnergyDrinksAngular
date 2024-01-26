export class Review {
    id?: number;
    brand?: string;
    name?: string;
    sugar?: number;
    flavour?: string;
    reviewer?: string;
    date?: Date;
    rating?: number;
    positive?: string;
    negative?: string;
    size?: string;
}
export interface ReviewParams {
  brands?: string[],
  flavours?: string[],
  sugarMin?: number,
  sugarMax?: number,
  ratingMin?: number,
  ratingMax?: number,
  dateMin?: Date,
  dateMax?: Date,
  sortBy?: string,
  sortOrder?: string
}
