import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-gitEmojis';

  constructor(private configService: ConfigService){}

  ngOnInit(): void {
    console.log("started");
    
    this.configService.getConfig().subscribe( resp =>{
      console.log(resp)
    })  

    console.log("ended");
    
  }


  
}
