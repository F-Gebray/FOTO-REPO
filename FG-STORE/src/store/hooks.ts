import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Modern RTK 2.0 withTypes API for robust IDE type inference
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
