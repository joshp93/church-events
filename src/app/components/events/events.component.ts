import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleEvent } from 'src/app/models/google-event.model';
import { GoogleCalendarService } from 'src/app/services/google-calendar.service';
import * as moment from "moment";
import { SpeakingEvent } from 'src/app/models/speaking-event.model';
import { PresidingEvent } from 'src/app/models/presiding-event.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  type: string;
  events: Array<GoogleEvent>;
  speakingEvents: Array<SpeakingEvent>;
  presidingEvents: Array<PresidingEvent>;
  inputForm: FormGroup;
  filters: FormArray;
  filterTerms: Array<string>;

  constructor(private route: ActivatedRoute, private googleCalendarService: GoogleCalendarService, private router: Router, private fb: FormBuilder) {
    this.route.data.subscribe((value) => {
      this.type = value.type
      this.getEvets();
    });
  }

  ngOnInit(): void {
    this.filters = new FormArray([]);
  }

  addFilter() {
    this.filters.insert(this.filters.length, new FormGroup({
      value: new FormControl("")
    }));
  }

  setFilters() {
    this.initTypedArray(this.events);
    this.filters.value.forEach(filter => {
      if (filter.value) {
        this.type === "speaking" ?
          this.speakingEvents = this.speakingEvents.filter((event) => event.description.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 ||
            event.summary.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 ||
            event.location.toLowerCase().indexOf(filter.value.toLowerCase()) > -1)
          :
          this.presidingEvents = this.presidingEvents.filter((event) => event.description.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 ||
            event.summary.toLowerCase().indexOf(filter.value.toLowerCase()) > -1 ||
            event.location.toLowerCase().indexOf(filter.value.toLowerCase()) > -1);
      }
    });
  }

  removeFilter(i) {
    this.filters.removeAt(i);
    this.setFilters();
  }

  addFilterTerm(event) {
    console.log(event);
  }

  getEvets() {
    this.googleCalendarService.getCalendarEvents(this.type)
      .then((gEvents) => {
        this.events = gEvents
        this.initTypedArray(this.events);
      });
  }

  initTypedArray(events: Array<GoogleEvent>) {
    if (this.type === "speaking") {
      this.speakingEvents = new Array<SpeakingEvent>();
      this.events.forEach((event) => {
        this.speakingEvents.push(new SpeakingEvent(event));
      });
    } else {
      this.presidingEvents = new Array<PresidingEvent>();
      this.events.forEach((event) => {
        this.presidingEvents.push(new PresidingEvent(event));
      });
    }
  }

  getStartDate(event: GoogleEvent) {
    return moment(event.getStartDate()).toLocaleString();
  }

  getEndDate(event: GoogleEvent) {
    return moment(event.getStartDate()).toLocaleString();
  }

  openEvent(event: GoogleEvent) {
    if (!event.htmlLink) return
    window.open(event.htmlLink);
  }

  openMaps(event: GoogleEvent) {
    if (!event.location) return
    let searchText = event.location.replace(" ", "+");
    window.open("https://www.google.com/maps/search/" + searchText);
  }
}