import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private type: string;

  constructor(private route: ActivatedRoute, private googleCalendarService: GoogleCalendarService) {
    this.subscribeToRouteChanges();
  }

  private subscribeToRouteChanges() {
    this.route.data.subscribe((value) => {
      this.type = value.type;
    });
  }

  ngOnInit(): void {
  }

  refresh() {
    this.googleCalendarService.getCalendarEvents();
  }

}
