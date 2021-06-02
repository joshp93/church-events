export const environment = {
  production: false,
  locale: "en-GB",
  gapiConfig: {
    apiKey: "AIzaSyA0N4CqBhUEKo8VyHO2GXpz10T4OeBTdRQ",
    clientId: "239879716820-2adj6grsvs4lqn7ppv3f3d9bd0unh841.apps.googleusercontent.com",
    calendarId: "gugv89dscdt6es89be9ubde5h0@group.calendar.google.com",
    maxResults: 2500,
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: ["https://www.googleapis.com/auth/calendar.events.public.readonly"].join(" ")
  }
};
