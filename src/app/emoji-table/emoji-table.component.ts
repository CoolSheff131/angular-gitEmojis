import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { emoji } from '../config/interfaces';

@Component({
  selector: 'app-emoji-table',
  templateUrl: './emoji-table.component.html',
  styleUrls: ['./emoji-table.component.css']
})
export class EmojiTableComponent implements OnInit {
  allEmojis : emoji[] = []
  favoriteEmojis: emoji[] = []
  emojis :emoji[] = []
  deletedEmojis: emoji[] = []
  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.configService.getConfig().subscribe((data)=>{
      for (const [key, value] of Object.entries(data)) {
        let val = typeof value === 'string'
        ? value
        : undefined
        let emoji = {name:key,url: val }
        this.emojis?.push(emoji)
      }
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

}
