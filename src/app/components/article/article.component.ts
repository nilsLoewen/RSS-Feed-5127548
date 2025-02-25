import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/Article';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
/**
 * Wird aus RSS-Component generiert.
 * Erhällt über @Input() article alle nötigen Informationen um einen Artikel darzustellen
 */
export class ArticleComponent implements OnInit {

  @Input() article: Article;

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
  }

}

