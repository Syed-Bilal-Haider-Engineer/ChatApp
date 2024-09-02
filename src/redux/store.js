import {configureStore, isImmutableDefault} from '@reduxjs/toolkit';
import {
  useSelector as useAppSelector,
  useDispatch as useAppDispatch,
} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';

const store = configureStore({
  reducer: persistReducer(),
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
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
