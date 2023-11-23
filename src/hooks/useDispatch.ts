// Хук не даст отправить экшен, который ему не знаком
import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch } from '../services/store';

const useDispatch = (): AppDispatch => dispatchHook<AppDispatch>();

export default useDispatch;
