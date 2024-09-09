import {configureStore} from '@reduxjs/toolkit';
import {
  useSelector as useAppSelector,
  useDispatch as useAppDispatch,
} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import { rootPersistConfig, rootReducer } from './RootReducer';
const store = configureStore({
  reducer: persistReducer(rootPersistConfig,rootReducer),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    });
  },
});

const persist = persistStore(store);
const {dispatch} = store;
const useSelector = useAppSelector;
const useDispatch = () => useAppDispatch();
export {store, persist, useSelector, dispatch, useDispatch};
