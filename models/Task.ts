export interface Task {
  id: string;
  title: string;
  allowedDevices: string[];
  allowedRegions: string[];
  excludedCountries: string[];
}
