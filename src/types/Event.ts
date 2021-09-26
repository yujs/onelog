export type EventType = "error" | "pageview" | "click";

export interface Event {
  type: EventType;
  eventId: string;
}
