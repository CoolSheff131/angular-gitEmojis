import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from './config/config.service';
import { category, emoji } from './config/interfaces';
import { EmojiTableComponent } from './emoji-table/emoji-table.component';
import { Page } from './emoji-table/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  categories: category[] = [
    { name: "все", active: true },
    { name: "любимые", active: false },
    { name: "удаленные", active: false }
  ]
  headerTable: string = ""

  currentCategory: number = 0
  emojis: emoji[] = []
  allemojis: emoji[] = []
  favemojis: emoji[] = []
  delemojis: emoji[] = []
  filteredEmojis: emoji[] = []
  itemsPerPage: number = 7
  loading: boolean = true
  pageNumber: number = 1
  searchName: string = ""
  @ViewChild(EmojiTableComponent) emojiTable!: EmojiTableComponent
  public collectionSize: number

  loadLists() {
    let jsonArr = localStorage.getItem("deleted")
    if (jsonArr) {
      this.delemojis = JSON.parse(jsonArr);
      console.log("del loaded");
    } else console.log("not loaded");
    jsonArr = localStorage.getItem("favorite")
    if (jsonArr) {
      this.favemojis = JSON.parse(jsonArr)
      console.log("fav loaded");
    }
    this.checkEmojis()
  }

  saveLists() {

    localStorage.setItem("deleted", JSON.stringify(this.delemojis))
    localStorage.setItem("favorite", JSON.stringify(this.favemojis))
  }

  constructor(private configService: ConfigService) {
    this.collectionSize = 1
  }

  searchItem(searchName: string) {
    this.searchName = searchName
    if (this.currentCategory === 0) {       //загрузить все      
      this.filteredEmojis = this.allemojis.filter(emoji => emoji.name.indexOf(searchName) !== -1)
    } else if (this.currentCategory === 1) {//загрузить любимые      
      this.filteredEmojis = this.favemojis.filter(emoji => emoji.name.indexOf(searchName) !== -1)
    } else if (this.currentCategory === 2) {//загрузить удаленные      
      this.filteredEmojis = this.delemojis.filter(emoji => emoji.name.indexOf(searchName) !== -1)
    }
    let page = this.sliceArr(this.filteredEmojis, 1)
    this.emojis = page!.rows
    this.collectionSize = page!.totalCount
  }

  ngOnInit(): void {

    this.configService.getConfig().subscribe((arr) => {
      this.allemojis = arr
      this.showCategory(0)
      this.loadLists()
      this.loading = false
    })
    this.loading = true

  }

  checkEmojis() {
    this.allemojis.forEach((emoji, indexAll, arrAll) => {
      this.favemojis.forEach((favemoji, index, arr) => {
        if (emoji.name === favemoji.name) {
          emoji.isFavorite = true
          arr[index] = emoji
        }
      })
      this.delemojis.forEach((delemoji, index, arr) => {
        if (delemoji.name === emoji.name) {
          arrAll.splice(indexAll, 1)
          emoji.isDeleted = true
          arr[index] = emoji
        }
      })
    })
  }

  showCategory(index: number) {
    console.log("emojisFiltered" + this.filteredEmojis.length);

    this.categories[this.currentCategory].active = false
    this.currentCategory = index
    this.categories[index].active = true
    this.headerTable = this.categories[index].name

    if (this.searchName.length !== 0) {
      this.searchItem(this.searchName)
      console.log("entered");
    } else {
      this.filteredEmojis = []
    }
    this.loadPage(1)
  }

  sliceArr(arr: emoji[], page: number): Page {
    let startIndex = this.itemsPerPage * (page - 1)
    return new Page(arr.length, arr.slice(startIndex, startIndex + this.itemsPerPage))
  }

  loadPage(pageNumber: number) {
    this.pageNumber = pageNumber
    let page: Page

    if (this.filteredEmojis.length !== 0) {
      page = this.sliceArr(this.filteredEmojis, pageNumber)
      let intersection: emoji[] = []
      if (this.currentCategory === 0) {       //загрузить все      
        intersection = this.filteredEmojis.filter(x => this.allemojis.includes(x));
      } else if (this.currentCategory === 1) {//загрузить любимые      
        intersection = this.filteredEmojis.filter(x => this.favemojis.includes(x));
      } else if (this.currentCategory === 2) {//загрузить удаленные      
        intersection = this.filteredEmojis.filter(x => this.delemojis.includes(x));
      }
      page = this.sliceArr(intersection, pageNumber)
    } else {
      if (this.currentCategory === 0) {       //загрузить все      
        page = this.sliceArr(this.allemojis, pageNumber)
      } else if (this.currentCategory === 1) {//загрузить любимые      
        page = this.sliceArr(this.favemojis, pageNumber)
      } else if (this.currentCategory === 2) {//загрузить удаленные      
        page = this.sliceArr(this.delemojis, pageNumber)
      }
    }

    this.emojis = page!.rows
    this.collectionSize = page!.totalCount
  }

  fav(emoji: emoji) {
    if (!emoji.isFavorite) {
      let index = this.allemojis.indexOf(emoji)
      if (index !== -1) {
        emoji.isFavorite = true
        this.favemojis.push(emoji)
      }
    } else {
      let index = this.favemojis.indexOf(emoji)
      if (index !== -1) {
        emoji.isFavorite = false
        this.favemojis.splice(index, 1)
      }
    }
    this.loadPage(this.pageNumber)
  }

  del(emoji: emoji) {
    if (this.currentCategory == 1) {//если пользователь в списке любимых
      let index = this.favemojis.indexOf(emoji)
      if (index !== -1) {
        emoji.isFavorite = false
        this.favemojis.splice(index, 1)
      }
    } else {
      if (emoji.isDeleted) {
        let index = this.delemojis.indexOf(emoji)
        if (index !== -1) {
          emoji.isDeleted = false
          this.delemojis.splice(index, 1)
          this.allemojis.push(emoji)
        }
      } else {
        let index = this.allemojis.indexOf(emoji)
        if (index !== -1) {
          emoji.isDeleted = true
          this.allemojis.splice(index, 1)
          if (!this.delemojis.includes(emoji))
            this.delemojis.push(emoji)

          index = this.favemojis.indexOf(emoji)
          if (index !== -1) {
            emoji.isFavorite = false
            this.favemojis.splice(index, 1)
          }
        }
      }
    }
    this.loadPage(this.pageNumber)
  }
  title = 'angular-gitEmojis'

}
