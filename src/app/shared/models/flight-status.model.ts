export class FlightStatus {
  code?: string;
  time?: Date;
}

/*
status code - non-mandatory. Attribute code on the element status indicates the status text for a flight: A = "Landed" (Arrived), C = "Canceled", D = "Departed", E = "New time" (New time), N = "New info" (New info). Note that the status texts are subject to change without notice. We recommend using a separate service for status texts (see below).
 */
