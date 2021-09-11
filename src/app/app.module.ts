import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ConfigService } from './config/config.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmojiTableComponent } from './emoji-table/emoji-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EmojiTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
