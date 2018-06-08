import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {

  visible = false;
  toggle: BehaviorSubject<boolean> = new BehaviorSubject(false);
  observable = this.toggle.asObservable();

  constructor() { }

  changeState() {
    this.visible = !this.visible;
    this.toggle.next(this.visible);
  }
}
