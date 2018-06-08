import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {SidebarToggleService} from '../sidebar-toggle.service';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit {

  visible: boolean;

  categories: Category[];

  constructor(private toggle: SidebarToggleService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories = this.categoryService.categories;
    this.toggle.observable.subscribe(visible => this.visible = visible);
  }

  ngAfterViewInit() {
    const roots: NodeListOf<Element> = document.querySelectorAll('.unfolded');
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
    target.classList.toggle('unfolded');
  }
}
