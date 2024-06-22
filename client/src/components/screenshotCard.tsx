import React from "react";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface ScreenshotCardProps {
  screenshotPath: string;
  createdBy: Date;
}

export const ScreenshotCard: React.FC<ScreenshotCardProps> = ({ screenshotPath, createdBy }) => {
  return (
    <Box className="m-7 flex justify-center flex-col bg-slate-100 p-3">
      <Typography className="text-center pb-3 text-slate-600">
        Screenshot Time:
        {format(toZonedTime(createdBy, "GMT"), "EEE, dd MMM yyyy HH:mm:ss 'GMT'")}
      </Typography>
      <img
        className="max-h-[100vh] max-w-full object-contain"
        src={screenshotPath}
        alt={screenshotPath}
      />
    </Box>
  );
};
