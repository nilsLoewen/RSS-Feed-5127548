import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { RssComponent } from './components/rss/rss.component';
import { ArticleComponent } from './components/article/article.component';
import { WikiSearchComponent } from './components/wiki-search/wiki-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {Routes, RouterModule } from '@angular/router';

let routes:Routes;

routes=[
  { path: '', component: AppComponent }

]

@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    RssComponent,
    ArticleComponent,
    WikiSearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'ignore'
    }),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[WikiSearchComponent]
})
export class AppModule { }
