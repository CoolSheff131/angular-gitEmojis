import { Component, OnInit } from '@angular/core';
import { category } from '../config/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:category[] = []
  constructor() { }

  ngOnInit(): void {
    this.categories.push({name:"все",active:true})
    this.categories.push({name:"любимые",active:false})
    this.categories.push({name:"удаленные",active:false})
  }

  showCategory(category:category){
    
  }
}
