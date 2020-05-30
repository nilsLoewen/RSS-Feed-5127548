import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/Article';
import { ArticleComponent } from '../components/article/article.component';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService  {

  articles: any[];
  mockArticles: Article[];
  nodeServer: string = "http://localhost:5200/";

  constructor(private http: HttpClient) {
  }


  getMockArticle() {
    return this.mockArticles;
  }

  getArticle() {
    let fullUrl = this.nodeServer + "news";
    return this.http.get(fullUrl, { responseType: 'text' });
  }

  //
 //  Wiki Proessing
 //
  getWiki(searchString){
    let fullUrl = this.nodeServer + "wiki/"+searchString;
    return this.http.get(fullUrl);
  }
}
