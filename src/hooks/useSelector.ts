// Теперь этот хук «знает» структуру хранилища
import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import { RootState } from '../services/store';

const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default useSelector;
