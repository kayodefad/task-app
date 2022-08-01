import logger from 'redux-logger';
import {
	AnyAction,
	configureStore,
	Dispatch,
	Middleware,
} from '@reduxjs/toolkit';
import reducer from './reducer';

const middleware: Middleware<{}, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
	middleware.push(logger);
}

export const store = configureStore({
	reducer,
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
