import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/Article';
import { ArticleComponent } from '../components/article/article.component';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})

/**
 * Ein Service der alle Requests an den Server weiterleitet
 */
export class DataServiceService  {

  articles: any[];
  mockArticles: Article[];
  nodeServer: string = "http://localhost:5200/";

  constructor(private http: HttpClient) {
  }

  /**
   * Sended GET-Request an den Server um den RSS Feed zu erhallten. Gibt diese Daten direkt an die Komponente weiter, die anfragt
   */
  getArticle() {
    let fullUrl = this.nodeServer + "news";
    return this.http.get(fullUrl, { responseType: 'text' });
  }

  /**
   * Sended GET-Request an den Server um eine Wikipediasuche durchzuführen. Das Ergebniss wird als JSON an die Komponente weitergeleitet, die anfragt.
   * @param searchString Nutzereingabe, nach der bei Wikipedia gesucht werden soll
   */
  getWiki(searchString){
    let fullUrl = this.nodeServer + "wiki/"+searchString;
    return this.http.get(fullUrl);
  }
}
