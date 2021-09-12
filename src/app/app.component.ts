import { Component, OnInit, ViewChild } from '@angular/core';
import { category } from './config/interfaces';
import { EmojiTableComponent } from './emoji-table/emoji-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  categories:category[] = [
    {name:"все",active:true},
    {name:"любимые",active:false},
    {name:"удаленные",active:false}
  ]

  @ViewChild(EmojiTableComponent)  emojiTable!: EmojiTableComponent
  


  constructor(){
    
  }
  ngOnInit(): void {
    console.log(
    "from app"+
    this.emojiTable.emojis
    );
  }

  addItem(newItem: number) {
    
  }

  title = 'angular-gitEmojis'
  
}
