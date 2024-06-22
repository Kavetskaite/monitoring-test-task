import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import monitoringDataReducer, {
  MonitoringDataState,
} from "../features/monitoringData/monitoringDataSlice";

export interface RootState {
  monitoringData: MonitoringDataState;
}

export const store = configureStore({
  reducer: {
    monitoringData: monitoringDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
