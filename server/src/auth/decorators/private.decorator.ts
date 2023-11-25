import { SetMetadata } from '@nestjs/common';

export const IS_RPIVATE_KEY = 'isPrivate';
export const Private = () => SetMetadata(IS_RPIVATE_KEY, true);
