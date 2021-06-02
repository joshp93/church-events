export class GoogleEvent {
    etag: undefined | string;
    id: string;
    status: string;
    private created: string;
    private updated: string;
    summary: string;
    description: string;
    location: string;
    private start: {
      date: string;
      dateTime: string,
      timeZone: string
    };
    private end: {
      date: string;
      dateTime: string,
      timeZone: string
    };
    private originalStartTime: {
      date: string;
      dateTime: string,
      timeZone: string
    };
    tbc: boolean;
    htmlLink: string;

    constructor(event: any) {
      this.etag = event.etag ? event.etag : "";
      this.id = event.id ? event.id : "";
      this.status = event.status ? event.status : "";
      this.created = event.created ? event.created : "";
      this.updated = event.updated ? event.updated : "";
      this.summary = event.summary ? event.summary : "";
      this.description = event.description ? event.description : "";
      this.location = event.location ? event.location : "";
      this.start = event.start ? event.start : "";
      this.end = event.end ? event.end : "";
      this.originalStartTime = event.originalStartTime ? event.originalStartTime : "";
      this.htmlLink = event.htmlLink ? event.htmlLink : "";
    }

    getCreatedDate(): Date {
      return new Date(this.created);
    }
    getUpdatedDate(): Date {
      return new Date(this.updated);
    }
    getStartDate(): Date {
      return new Date(this.start.dateTime);
    }
    getEndDate(): Date {
      return new Date(this.end.dateTime);
    }
    getOriginalStartTime(): Date {
      return new Date(this.originalStartTime.dateTime);
    }
}
