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
  public itemsPerPage: number = 7;

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

  showEmojis(i: number){
    console.log(this.emojis);
    
    console.log(i)
    if(i === 0){
      console.log("all")
      this.emojis = this.allEmojis
    }else if(i === 1){
      console.log("fav")
      this.emojis = this.favoriteEmojis
    }else if(i === 2){
      console.log("deleted")
      this.emojis = this.deletedEmojis
    }
    console.log(this.emojis);
    
  }

  
  
  makeFavorite(emoji: emoji){
    emoji.isFavorite = !emoji.isFavorite
    this.favoriteEmojis.push(emoji)
    console.log("favorite become");
    
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
