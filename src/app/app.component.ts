import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from './config/config.service';
import { category, emoji } from './config/interfaces';
import { EmojiTableComponent } from './emoji-table/emoji-table.component';
import { Page } from './emoji-table/page';

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
  headerTable:string = ""
  currentCategory: number = 0
  emojis:emoji[] =[]
  allemojis:emoji[] =[]
  favemojis:emoji[] =[]
  delemojis:emoji[] =[]
  itemsPerPage:number = 7
  @ViewChild(EmojiTableComponent)  emojiTable!: EmojiTableComponent
  public collectionSize: number

  loadLists(){
    let jsonArr = localStorage.getItem("deleted")
    if(jsonArr){
      this.delemojis = JSON.parse(jsonArr);
      console.log("del loaded");
      
    }else console.log("not loaded");
    
    jsonArr = localStorage.getItem("favorite")
    if(jsonArr){
      this.favemojis = JSON.parse(jsonArr)
      console.log("fav loaded");
      
    }

    
  }

  saveLists(){
    localStorage.setItem("deleted",JSON.stringify(this.delemojis))
    localStorage.setItem("favorite",JSON.stringify(this.favemojis))
  }

  constructor(private configService: ConfigService){
    this.collectionSize=1
  }
  

  ngOnInit(): void {
    this.configService.getConfig().subscribe((arr)=>{
      this.allemojis = arr
      this.showCategory(0)
    })
    this.loadLists()
  }

  showCategory(index: number) { 
    this.categories[this.currentCategory].active = false
    this.currentCategory = index
    this.categories[index].active = true
    this.headerTable = this.categories[index].name
    this.loadPage(1)
  }

  sliceArr(arr : emoji[],page: number):Page{
    var startIndex = this.itemsPerPage * (page - 1)
    return new Page(arr.length,arr.slice(startIndex, startIndex + this.itemsPerPage))
    
  }

  loadPage(pageNumber:number){
    let page : Page
    if(this.currentCategory===0){
      //загрузить все
      page = this.sliceArr(this.allemojis,pageNumber)
    }else if(this.currentCategory === 1){
      //загрузить любимые
      page = this.sliceArr(this.favemojis,pageNumber)
    }else if(this.currentCategory === 2){
      //загрузить удаленные
      page = this.sliceArr(this.delemojis,pageNumber)
    }
    this.emojis = page!.rows
    this.collectionSize = page!.totalCount     
  }
  fav(emoji: emoji){
    emoji.isFavorite = !emoji.isFavorite
    this.favemojis.push(emoji)
  }
  del(index: number){

    let emoji = this.allemojis[index]
    emoji.isDeleted = !emoji.isDeleted
    this.allemojis.splice(index,1)
    this.delemojis.push(emoji)
  }
  title = 'angular-gitEmojis'
  
}
