import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/Article';
import { ArticleComponent } from '../components/article/article.component';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  articles: Article[];

  constructor() {

    this.articles = [
      {
        title:"Arcticle No 1",
        content:"adlknwecjwmcdspoücmlksdkcnmsljdncknsdkcnmsdjkcnaslcksdnmöclknascmöjklsdcnaslkmclasncjklasdnckljasdöklcsdknc",
        date: new Date("2019-02-16"),
      },

      {
        title: "Arcticle No 2",
        content: "adlknwecjwmcdspoücmlksdkcnmsljdncknsdkcnmsdjkcnaslcksdnmöclknascmöjklsdcnaslkmclasncjklasdnckljasdöklcsdknc",
        date: new Date("2020-01-04"),
      },

      {
        title: "Arcticle No 3",
        content: "adlknwecjwmcdspoücmlksdkcnmsljdncknsdkcnmsdjkcnaslcksdnmöclknascmöjklsdcnaslkmclasncjklasdnckljasdöklcsdknc",
        date: new Date("2019-08-04"),
      },
    ]

  }


  getArticle() {
    return this.articles;
  }
}
