import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {SidebarToggleService} from '../sidebar-toggle.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(private toggle: SidebarToggleService) {
  }

  ngOnInit() {
    const toggleSubscription = this.toggle.observable.subscribe();
    this.subscriptions.push(toggleSubscription);
  }

  toggleSidebar() {
    this.toggle.changeState();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
