import { PutRestaurantDto } from './put.dto';

export interface PatchRestaurantDto extends Partial<PutRestaurantDto> {}
