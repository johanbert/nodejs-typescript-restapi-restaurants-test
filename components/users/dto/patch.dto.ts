import { PutUserDto } from './put.dto';

export interface PatchUserDto extends Partial<PutUserDto> {}
