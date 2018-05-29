import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {Attribute} from '../../model/attribute';
import {Value} from '../../model/value';
import {SidebarToggleService} from '../sidebar-toggle.service';

declare var $: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  visible: boolean;

  @Input() categories: Category[];

  constructor(private toggle: SidebarToggleService) {
  }

  ngOnInit() {
    this.toggle.observable.subscribe(visible => this.visible = visible);
  }

  toggleSub(event) {
    const target = $(event.target);
    target.parent('div').find('div').toggle();
    target.toggleClass('active');
  }
}
