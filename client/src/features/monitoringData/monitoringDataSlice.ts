import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MonitoringDataResponse, Screenshot } from "../../types";

export interface MonitoringDataState extends MonitoringDataResponse {
  isLoading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MonitoringDataState = {
  screenshots: [] as Array<Screenshot>,
  currentPage: 1,
  pagesCount: 0,
  startTime: null,
  appUrl: "",
  isLoading: true,
  status: "idle",
  error: null,
};

export const fetchMonitoringData = createAsyncThunk(
  "screenshots/fetchScreenshots",
  async (options: { currentPage: number; limit: number }) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/monitoring-data?currentPage=${options.currentPage}&limit=${options.limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch screenshots");
    }

    const data = await response.json();

    return data as MonitoringDataResponse;
  }
);

const monitoringDataSlice = createSlice({
  name: "monitoringData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonitoringData.pending, (state) => {
        return {
          ...state,
          status: "loading",
          isLoading: true,
        };
      })
      .addCase(fetchMonitoringData.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          status: "succeeded",
          currentPage: Number(action.payload.currentPage),
          isLoading: false,
        };
      })
      .addCase(fetchMonitoringData.rejected, (state, action) => {
        return {
          ...state,
          status: "failed",
          error: action.error.message ?? "Failed to fetch screenshots",
          isLoading: false,
        };
      });
  },
});

export default monitoringDataSlice.reducer;
