import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { category } from '../config/interfaces';
import { EmojiTableComponent } from '../emoji-table/emoji-table.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [EmojiTableComponent]
})
export class SidebarComponent implements OnInit {

  @Input() categories:category[] = []
  @Output() newItemEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    
  }

  showCategory(index:number){
    this.newItemEvent.emit(index)
  }
}
