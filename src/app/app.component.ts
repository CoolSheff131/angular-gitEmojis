import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from './config/config.service';
import { category, emoji } from './config/interfaces';
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

  emojis:emoji[] =[]
  itemsPerPage:number = 3
  @ViewChild(EmojiTableComponent)  emojiTable!: EmojiTableComponent
  public collectionSize: number


  constructor(private configService: ConfigService){
    this.collectionSize=1
  }

  ngOnInit(): void {
  }

  addItem(newItem: number) { 
  }
  loadPage(pageNumber:number){
    this.configService.getConfig(pageNumber, this.itemsPerPage).subscribe((page)=>{
      this.emojis = page.rows
      this.collectionSize = page.totalCount     
    }) 
  }

  title = 'angular-gitEmojis'
  
}
