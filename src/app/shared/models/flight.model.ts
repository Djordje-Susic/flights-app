import { FlightStatus } from "./flight-status.model";

export class Flight {
  uniqueID!: string;
  flight_id!: string;
  dom_int!: string;
  schedule_time!: Date;
  arr_dep!: string;
  airport!: string;
  airline!: string;
  via_airport?: string;
  check_in?: string;
  street?: string;
  status?: FlightStatus;
  belt_number?: string;
}
