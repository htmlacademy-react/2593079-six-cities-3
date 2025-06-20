import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer.ts';
import createAPI from '../services/api.ts';
import { getToken } from '../services/token.ts';
import { redirect } from './middlewares/redirect.ts';


const api = createAPI();
api.interceptors.request.use(
  (requestConfig) => {
    const token = getToken();
    requestConfig.headers['X-Token'] = token;
    return requestConfig;
  }

);

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    }
  }).concat(redirect)
});

