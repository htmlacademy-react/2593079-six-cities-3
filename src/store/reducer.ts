import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import appReducer from './app/app.ts';
import authReducer from './auth/auth.ts';
import dataReducer from './data/data.ts';


export const reducer = combineReducers({
  [NameSpace.App]: appReducer,
  [NameSpace.Auth]: authReducer,
  [NameSpace.Data]: dataReducer,
});
