import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Article } from '../../models/Article';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
/**
 * Dient als Content-Manager für die Artikel.
 * Ruft den Service auf, um die Artikel zu laden und generiert dann für jedes Ergebniss eine Entsprechende Komponente
 */
export class RssComponent implements OnInit {

  articles:Article[] = [];  //Vom Server geschickte Artikel werden hier gespeichert

  constructor(private dataService: DataServiceService) { }

  /**
   * Wird getriggert sobald Komponente geladen wird
   */
  ngOnInit(): void {
    /**
     * Schickt Anfrage an den Service.
     * Wartet auf eine Antwort
     */
    this.dataService.getArticle().subscribe(data => {

      let stringData = data.toLocaleString() //Antowrt wird in String Konvertiert zur leichteren verarbeitung
      let xmlDoc:Document;
      let i:number = 0;                     //Loop-Variable

      /**
       * Erzeugt DOM-Object aus der String-Antwort
       */
      if (window.DOMParser) {
        let parser = new DOMParser();
        xmlDoc = parser.parseFromString(stringData, "text/xml");
      }

      /**
       * Sucht die nötigen Daten aus dem DOM und erzeugt daraus ein Temporäres Article-Objekt, welches dem article-array hinzugefügt wird
       * Das wird 3 mal gemacht, da die Seite 3 Artikel anzeigen soll
       */
      for (i = 0; i < 3; i++) {
        let resTitle = xmlDoc.getElementsByTagName("title")[i + 1].childNodes[0].nodeValue;
        let resDate = xmlDoc.getElementsByTagName("pubDate")[i + 1].childNodes[0].nodeValue;
        let resDesc = xmlDoc.getElementsByTagName("description")[i + 1].childNodes[0].nodeValue;
        let resLink = xmlDoc.getElementsByTagName("link")[i + 1].childNodes[0].nodeValue;
        let cdata = xmlDoc.getElementsByTagName("content:encoded")[i].childNodes[1].nodeValue;
        let dummy = document.createElement('div');
        dummy.innerHTML = cdata.trim();
        let resImg = dummy.getElementsByTagName("img")[0];
        let resImgLink = resImg.src;
        this.articles.push(new Article(resTitle, resDesc, resDate, resImgLink, resLink,i));
      }
    });
  }
}
