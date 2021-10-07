import { ExtendedError } from "./error";

export type EventType = "error" | "pageview" | "click";

export interface Event {
  type: EventType;
  event_id: string;
  time: number;
  payload?: ExtendedError;
  title:string;
}
