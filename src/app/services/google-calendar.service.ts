import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleEvent } from '../models/google-event.model';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  private _dateFilter: Date;
  private _eventType: string;
  private dateChange: BehaviorSubject<Date>;
  gapiEventsChange: BehaviorSubject<Array<GoogleEvent>> = new BehaviorSubject(undefined)
  gapiLoaded: boolean;

  public get dateFilter(): Date {
    return this._dateFilter;
  }
  public set dateFilter(value: Date) {
    this._dateFilter = value;
    if (this.dateChange) {
      this.dateChange.next(value);
    }
  }

  public get eventType(): string {
    return this._eventType;
  }
  public set eventType(value: string) {
    this._eventType = value;
  }

  constructor() {
    this.dateFilter = new Date();
    this.dateChange = new BehaviorSubject<Date>(this.dateFilter);
    this.dateChange.subscribe(() => {
      this.getCalendarEvents();
    });
  }

  getCalendarEvents() {
      if (!this.gapiLoaded) {
        gapi.load("client", () => {
          this.initClient()
            .then(() => {
              this.getEventsFromGapi(this._eventType)
                .then((googleEvents) => {
                  this.gapiLoaded = true;
                  this.gapiEventsChange.next(googleEvents);
                })
                .catch((result) => this.gapiEventsChange.error(result));
            });
        });
      } else {
        this.getEventsFromGapi(this._eventType)
          .then((googleEvents) => {
            this.gapiEventsChange.next(googleEvents);
          })
          .catch((result) => this.gapiEventsChange.error(result));
      }
  }

  private getEventsFromGapi(eventType: string): Promise<Array<GoogleEvent>> {
    return new Promise<Array<GoogleEvent>>((resolve, reject) => {

      gapi.client.calendar.events.list({
        'calendarId': environment.gapiConfig.calendarId,
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': environment.gapiConfig.maxResults,
        'orderBy': 'startTime',
        'q': eventType,
        'timeMin': this._dateFilter.toISOString()
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
