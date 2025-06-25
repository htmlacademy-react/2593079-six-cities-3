import { createAction } from '@reduxjs/toolkit';
import { RoutePath } from '../const';

const redirectTo = createAction<RoutePath>('redirectTo');

export {redirectTo};
