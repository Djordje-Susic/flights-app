export class Flight {
  uniqueId!: string;
  flight_id!: string;
  dom_int!: string;
  schedule_time!: string;
  arr_dep!: string;
  airport!: string;
  airline!: string;
  via_airport?: string;
  check_in?: string;
  street?: string;
  status?: {};// TODO
  // status_code?: string;
  // status_time?: string;
  belt_number?: string;
}


/*
status code - non-mandatory. Attribute code on the element status indicates the status text for a flight: A = "Landed" (Arrived), C = "Canceled", D = "Departed", E = "New time" (New time), N = "New info" (New info). Note that the status texts are subject to change without notice. We recommend using a separate service for status texts (see below).
 */
