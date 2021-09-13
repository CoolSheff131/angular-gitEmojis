import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { category } from '../config/interfaces';
import { EmojiTableComponent } from '../emoji-table/emoji-table.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [EmojiTableComponent]
})
export class SidebarComponent {

  @Input() categories: category[] = []
  @Output() itemSelectedEvent = new EventEmitter<number>();
  constructor() { }

  showCategory(index: number) {
    this.itemSelectedEvent.emit(index)
  }
}
