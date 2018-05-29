import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarToggleService } from '../sidebar-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private toggle: SidebarToggleService) { }

  ngOnInit() {
    this.toggle.observable.subscribe();
  }

  toggleSidebar() {
    this.toggle.changeState();
  }

}
