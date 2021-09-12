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
  @Input() emojiTable!: EmojiTableComponent
  currentCategory: number = 0
  @Output() newItemEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
    
  }

  showCategory(index:number){
    this.newItemEvent.emit(index)
    // console.log(this.emojiTable.emojis);

    // this.categories[this.currentCategory].active = false
    // this.currentCategory = index
    // this.categories[index].active = true
    // this.emojiTable.showEmojis(index)
  }
}
