/**
 * COMMUNITY EVENTS — mock data + a Luma-ready adapter.
 *
 * Decision: ship with simulated data to demonstrate the vision (Cursor-style
 * globe + chronological RSVP list), but keep the data behind an adapter so it
 * can later be swapped to pull from the real Devin Luma calendar
 * (https://luma.com/devin) with zero UI changes.
 *
 * To go live later: implement `lumaProvider` and switch `getEvents`.
 */

export type CommunityEvent = {
  id: string;
  title: string;
  kind: "cafe" | "workshop" | "meetup" | "hackathon" | "devin-day";
  host: string;
  city: string;
  country: string;
  /** ISO date */
  date: string;
  lat: number;
  lng: number;
  rsvpUrl: string;
};

export interface EventProvider {
  getEvents(): Promise<CommunityEvent[]>;
}

/** Mock provider — sample of a plausible global Cafe Cognition calendar. */
export const mockProvider: EventProvider = {
  async getEvents() {
    return MOCK_EVENTS;
  },
};

/**
 * Luma provider (stub). When ready, fetch the public Devin Luma calendar and
 * map it into CommunityEvent[]. Left intentionally unimplemented.
 */
export const lumaProvider: EventProvider = {
  async getEvents() {
    // TODO(cloud-devin): implement against https://luma.com/devin
    // e.g. fetch ICS / Luma API, map fields -> CommunityEvent.
    throw new Error("lumaProvider not implemented — using mockProvider for now.");
  },
};

/** Flip this to lumaProvider when the Luma integration lands. */
export const eventProvider: EventProvider = mockProvider;

export async function getEvents() {
  return eventProvider.getEvents();
}

/** Vision stats — framed as "what this could look like" (Cursor for reference). */
export const COMMUNITY_STATS = [
  { value: "30+", label: "Cafe Cognition cities (target Y1)" },
  { value: "4", label: "Devin Days flagship hubs" },
  { value: "3", label: "Ambassador tiers" },
  { value: "1", label: "weekly Devin Office Hours" },
];

export const MOCK_EVENTS: CommunityEvent[] = [
  { id: "sf-devin-day", title: "Devin Day SF", kind: "devin-day", host: "Cognition Coffee Co.", city: "San Francisco", country: "USA", date: "2026-07-12", lat: 37.7749, lng: -122.4194, rsvpUrl: "#" },
  { id: "nyc-cafe", title: "Cafe Cognition NYC", kind: "cafe", host: "Ali K.", city: "New York", country: "USA", date: "2026-07-15", lat: 40.7128, lng: -74.006, rsvpUrl: "#" },
  { id: "austin-meetup", title: "Devin Builders Meetup", kind: "meetup", host: "Austin Chapter", city: "Austin", country: "USA", date: "2026-07-18", lat: 30.2672, lng: -97.7431, rsvpUrl: "#" },
  { id: "london-workshop", title: "Orchestrating Fleets of Devins", kind: "workshop", host: "London Chapter", city: "London", country: "UK", date: "2026-07-22", lat: 51.5072, lng: -0.1276, rsvpUrl: "#" },
  { id: "bangalore-hack", title: "Devin Hack Night", kind: "hackathon", host: "Bangalore Chapter", city: "Bangalore", country: "India", date: "2026-07-26", lat: 12.9716, lng: 77.5946, rsvpUrl: "#" },
  { id: "berlin-cafe", title: "Cafe Cognition Berlin", kind: "cafe", host: "Berlin Chapter", city: "Berlin", country: "Germany", date: "2026-07-29", lat: 52.52, lng: 13.405, rsvpUrl: "#" },
  { id: "sf-office-hours", title: "Devin Office Hours (virtual)", kind: "workshop", host: "Cognition Coffee Co.", city: "Remote", country: "Global", date: "2026-08-01", lat: 0, lng: 0, rsvpUrl: "#" },
  { id: "toronto-meetup", title: "Non-coding Devin: Research & Docs", kind: "meetup", host: "Toronto Chapter", city: "Toronto", country: "Canada", date: "2026-08-05", lat: 43.6532, lng: -79.3832, rsvpUrl: "#" },
];
