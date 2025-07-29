import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class GeoCoordinate {
  @Prop({ type: String, default: '' })
  type: string;

  @Prop({ type: [[[Number]]], default: [] })
  coordinates: number[][][];
}

@Schema({
  _id: false,
})
export class Properties {
  @Prop({ type: String, default: '' })
  name: string;
}

@Schema({
  _id: false,
})
export class Polygon {
  @Prop({ type: String, default: 'Feature' })
  type: string;

  @Prop({ type: String, default: '' })
  zoneName: string;

  @Prop({ type: GeoCoordinate, default: {} })
  geo: GeoCoordinate;

  @Prop({ type: GeoCoordinate, default: {} })
  geometry: GeoCoordinate;

  @Prop({ type: GeoCoordinate, default: {} })
  center: GeoCoordinate;

  @Prop({ type: Properties, default: {} })
  properties: Properties;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

@Schema({
  _id: false,
})
export class Currency {
  @Prop({ type: String, default: '' })
  iso: string;

  @Prop({ type: String, default: '' })
  symbol: string;
}

@Schema({ _id: false })
export class CommissionByCurrency {
  @Prop({ type: String, default: '' })
  currencyISO: string;

  @Prop({ type: Number, default: 0 })
  commissionValue: number;
}
