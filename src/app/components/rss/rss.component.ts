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

  articles:Article[];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {

    // get all projects from the data service
    this.articles = this.dataService.getArticle();

  }

}
