export interface Screenshot {
  id: number;
  appUrl: string;
  screenshotPath: string;
  createdBy: Date;
}

export interface MonitoringDataResponse {
  screenshots: Array<Screenshot>;
  currentPage: number;
  pagesCount: number;
  startTime: Date | null;
  appUrl: string;
}
