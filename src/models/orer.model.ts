import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Person} from './person.model';

@model()
export class Orer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  product: string;

  @property({
    type: 'number',
    required: true,
  })
  cant_product: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
    required: true,
  })
  state: number;

  @belongsTo(() => Person)
  personId: string;

  @property({
    type: 'string',
  })
  productId?: string;

  constructor(data?: Partial<Orer>) {
    super(data);
  }
}

export interface OrerRelations {
  // describe navigational properties here
}

export type OrerWithRelations = Orer & OrerRelations;
