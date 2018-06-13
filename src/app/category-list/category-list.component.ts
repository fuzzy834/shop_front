import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {SidebarToggleService} from '../sidebar-toggle.service';
import {CategoryService} from '../category.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit, OnDestroy {

  visible: boolean;

  categories: Category[];

  subscriptions: Subscription[] = [];

  constructor(private toggle: SidebarToggleService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories = this.categoryService.categories;
    const toggleSubscription = this.toggle.observable.subscribe(visible => this.visible = visible);
    this.subscriptions.push(toggleSubscription);
  }

  ngAfterViewInit() {
    const roots: NodeListOf<Element> = document.querySelectorAll('.unfolded');
    Array.from(roots).forEach(root => this.toggleSub(root));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
