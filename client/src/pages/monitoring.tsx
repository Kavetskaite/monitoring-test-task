import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, CircularProgress, IconButton, Link, Pagination, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { RootState, useAppDispatch } from "../app/store";
import { ScreenshotCard } from "../components";
import { fetchMonitoringData } from "../features/monitoringData/monitoringDataSlice";

const SCREENSHOTS_LIMIT = Number(process.env.REACT_APP_SCREENSHOTS_LIMIT) || 10;

export const Monitoring = () => {
  const dispatch = useAppDispatch();

  const { screenshots, currentPage, pagesCount, isLoading, startTime, appUrl } = useSelector(
    (state: RootState) => state.monitoringData
  );

  useEffect(() => {
    dispatch(
      fetchMonitoringData({
        currentPage,
        limit: SCREENSHOTS_LIMIT,
      })
    );
  }, [dispatch, currentPage]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(
      fetchMonitoringData({
        currentPage: value,
        limit: SCREENSHOTS_LIMIT,
      })
    );
  };

  const handleRefreshScreenshots = () => {
    dispatch(
      fetchMonitoringData({
        currentPage: 1,
        limit: SCREENSHOTS_LIMIT,
      })
    );
  };

  return (
    <>
      <Box className="fixed w-full bg-white p-5 flex justify-center">
        <Box className="flex flex-col pr-10">
          <Typography className="text-center pb-2 text-base flex justify-center">
            <Box component="span" className="text-slate-500 pr-1">
              App Link:
            </Box>
            <Link href={appUrl} target="_blank">
              {appUrl}
            </Link>
          </Typography>
          <Typography className="text-center flex justify-center">
            <Box component="span" className="text-slate-500 pr-1">
              Start Time:
            </Box>
            {startTime && format(toZonedTime(startTime, "GMT"), "EEE, dd MMM yyyy HH:mm:ss 'GMT'")}
          </Typography>
        </Box>
        <IconButton className="w-12 h-12" onClick={handleRefreshScreenshots}>
          <RefreshIcon />
        </IconButton>
      </Box>
      {isLoading ? (
        <Box className="flex justify-center items-center h-[100vh]">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="py-20">
          {screenshots.map((screenshot) => (
            <ScreenshotCard {...screenshot} key={screenshot.id} />
          ))}
        </Box>
      )}
      <Box className="fixed bottom-0 w-full bg-white p-4">
        <Pagination
          count={pagesCount}
          page={currentPage}
          onChange={handleChange}
          className="flex justify-center p-4"
          color="primary"
        />
      </Box>
    </>
  );
};
