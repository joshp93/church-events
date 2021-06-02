import { GoogleEvent } from "./google-event.model";

export class SpeakingEvent extends GoogleEvent {
    title: string;
    church: string;
    talkType: string;
    extraInfo: string;

    constructor(event: GoogleEvent) {
        super(event);
        if (event.description) {
            this.makeTitleAndExtraInfo(event.description);
            this.tbc = (this.description.toLowerCase().indexOf("tbc") != -1 || this.description.toLowerCase().indexOf("tba") != -1)
        }
    }

    private makeTitleAndExtraInfo(description: string) {
        if (description.indexOf("--")) {
           let values = description.split("--");
           this.title = values[0].trim();
           this.extraInfo = values[1] ? values[1].trim() : "";
        } else {
            this.title = description.trim();
            this.extraInfo = "";
        }
    }
}
