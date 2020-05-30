import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Article } from '../../models/Article';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css']
})
export class RssComponent implements OnInit {

  articles:Article[] = [];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {

    // get all projects from the data service
    //this.articles = this.dataService.getArticle();

    this.dataService.getArticle().subscribe(data => {

      let stringData = data.toLocaleString()
      let xmlDoc:Document;
      let i:number = 0;

      if (window.DOMParser) {
        let parser = new DOMParser();
        xmlDoc = parser.parseFromString(stringData, "text/xml");
      }

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
