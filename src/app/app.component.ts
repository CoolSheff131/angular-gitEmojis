import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-gitEmojis'
  emojis :any[] | undefined
  
  constructor(private configService: ConfigService){}

  ngOnInit(): void {
    this.configService.getConfig().subscribe((data)=>{
      console.log(data);
      this.emojis = data
    }) 
  }  
}
