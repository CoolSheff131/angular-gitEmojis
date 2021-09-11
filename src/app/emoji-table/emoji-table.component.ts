import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { emoji } from '../config/interfaces';



@Component({
  selector: 'app-emoji-table',
  templateUrl: './emoji-table.component.html',
  styleUrls: ['./emoji-table.component.css']
})
export class EmojiTableComponent implements OnInit {

  public page: number
  public collectionSize: number
  public itemsPerPage: number = 10;

  allEmojis : emoji[] = []
  favoriteEmojis: emoji[] = []
  emojis :emoji[] = []
  deletedEmojis: emoji[] = []
  constructor(private configService: ConfigService) { 
    this.page= 1
    this.collectionSize=1
  }

  ngOnInit(): void {
    this.loadPage()
  }

  private loadPage(){
    this.configService.getConfig(this.page, this.itemsPerPage).subscribe((page)=>{
      this.emojis = page.rows
      this.collectionSize = page.totalCount
      
    }) 
  }

  showFavorite(){

  }

  showDeleted(){

  }
  
  makeFavorite(emoji: emoji){
    emoji.isFavorite = !emoji.isFavorite
    this.favoriteEmojis.push(emoji)
  }

  delete(index: number){
    let emoji = this.emojis[index]
    emoji.isDeleted = !emoji.isDeleted
    this.deletedEmojis.push(emoji)    
    //this.emojis.splice(index, 1);    
  }

  onPageChanged(pageNumber: number){
    this.loadPage()
  }

}
