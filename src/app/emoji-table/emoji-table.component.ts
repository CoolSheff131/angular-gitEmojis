import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { emoji } from '../config/interfaces';



@Component({
  selector: 'app-emoji-table',
  templateUrl: './emoji-table.component.html',
  styleUrls: ['./emoji-table.component.css']
})
export class EmojiTableComponent implements OnInit {
  asdf = true
  public page: number
  @Input() loading: boolean = false
  @Input() collectionSize: number
  @Input() itemsPerPage: number = 7;
  @Output() newItemEvent = new EventEmitter<number>();
  @Output() delItemEvent = new EventEmitter<emoji>();
  @Output() favItemEvent = new EventEmitter<emoji>();
  @Input() emojis :emoji[] = []
  @Input() header: string = ""
  constructor() { 
    this.page= 1
    this.collectionSize=1
  }

  ngOnInit(): void {
    this.loadPage()
  }

  private loadPage(){
    this.newItemEvent.emit(this.page)   
  }

  onPageChanged(pageNumber: number){
    this.loadPage()
  }

  showEmojis(i: number){
    console.log(this.emojis);   
  }

  
  makeFavorite(emoji: emoji){
    this.favItemEvent.emit(emoji)   
  }

  delete(index: emoji){
    this.delItemEvent.emit(index)   
  }


}
