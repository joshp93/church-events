import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GoogleEvent } from '../models/google-event.model';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  constructor() { }

  getCalendarEvents(eventType: string): Promise<Array<GoogleEvent>> {

    return new Promise<Array<GoogleEvent>>((resolve, reject) => {
      gapi.load("client", () => {
        this.initClient()
          .then(() => {
            gapi.client.calendar.events.list({
              'calendarId': environment.gapiConfig.calendarId,
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': environment.gapiConfig.maxResults,
              'orderBy': 'startTime',
              'q': eventType,
              'timeMin': new Date().toISOString()
            })
              .then((response) => {
                let events = new Array<GoogleEvent>();
                response.result.items.forEach(event => {
                  events.push(new GoogleEvent(event));
                });
                resolve(events);
              })
              .catch((reason) => {
                console.error(reason);
                reject(undefined);
              });
          });
      });
    });

  }

  private initClient(): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {
      gapi.client.init({
        apiKey: environment.gapiConfig.apiKey,
        clientId: environment.gapiConfig.clientId,
        discoveryDocs: environment.gapiConfig.discoveryDocs,
        scope: environment.gapiConfig.scope
      })
        .then(() => resolve(true))
        .catch((reason) => {
          console.error(reason);
          reject(false);
        });
    });
  }
}
