import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { emoji } from '../config/interfaces';

@Component({
  selector: 'app-emoji-table',
  templateUrl: './emoji-table.component.html',
  styleUrls: ['./emoji-table.component.css']
})
export class EmojiTableComponent {
  asdf = true
  public pageNumber: number = 1
  @Input() loading: boolean = false
  @Input() collectionSize: number = 1
  @Input() itemsPerPage: number = 7;
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() delItemEvent = new EventEmitter<emoji>();
  @Output() favItemEvent = new EventEmitter<emoji>();
  @Output() searchItemEvent = new EventEmitter<string>();
  @Input() emojis: emoji[] = []
  @Input() header: string = ""

  constructor() { }

  search(searchName: string) {
    console.log(searchName);
    this.searchItemEvent.emit(searchName)
  }

  private loadPage() {
    this.newItemEvent.emit(this.pageNumber)
  }

  onPageChanged(pageNumber: number) {
    this.pageNumber = pageNumber
    this.loadPage()
  }

  makeFavorite(emoji: emoji) {
    this.favItemEvent.emit(emoji)
  }

  delete(index: emoji) {
    this.delItemEvent.emit(index)
  }


}
