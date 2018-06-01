import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Category} from '../../model/category';
import {Attribute} from '../../model/attribute';
import {Value} from '../../model/value';
import {SidebarToggleService} from '../sidebar-toggle.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit {

  visible: boolean;

  @Input() categories: Category[];

  constructor(private toggle: SidebarToggleService) {
  }

  ngOnInit() {
    this.toggle.observable.subscribe(visible => this.visible = visible);
  }

  ngAfterViewInit() {
    const roots: NodeListOf<Element> = document.querySelectorAll('.active');
    Array.from(roots).forEach(root => this.toggleSub(root));
  }

  toggleSub(target) {
    const parent = target.parentElement;
    const el = parent.children;
    Array.from(el).forEach(e => {
      if (e['nodeName'] === 'DIV') {
        e['style'].display = (e['style'].display === 'none') ? 'block' : 'none';
      }
    });
    target.classList.toggle('active');
  }
}
