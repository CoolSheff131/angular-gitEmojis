import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { emoji } from '../config/interfaces';



@Component({
  selector: 'app-emoji-table',
  templateUrl: './emoji-table.component.html',
  styleUrls: ['./emoji-table.component.css']
})
export class EmojiTableComponent implements OnInit {

  public page: number
  @Input() collectionSize: number
  @Input() itemsPerPage: number = 7;


  
  @Output() newItemEvent = new EventEmitter<number>();
  @Input() emojis :emoji[] = []

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

  showEmojis(i: number){
    console.log(this.emojis);   
  }

  
  
  makeFavorite(emoji: emoji){
  }

  delete(index: number){
  }

  onPageChanged(pageNumber: number){
    this.loadPage()
  }

}
