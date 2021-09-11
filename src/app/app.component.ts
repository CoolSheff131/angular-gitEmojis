import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config/config.service';
import { emoji } from './config/interfaces';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-gitEmojis'
  emojis :emoji[] = []
  deletedEmojis: emoji[] = []
  
  constructor(private configService: ConfigService){}

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

  makeFavorite(emoji: emoji){
    console.log(emoji.name)
    emoji.isFavorite = !emoji.isFavorite
  }

  delete(index: number){
    let emoji = this.emojis[index]
    emoji.isDeleted = !emoji.isDeleted
    this.deletedEmojis.push(emoji)    
    this.emojis.splice(index, 1);    
  }
}
