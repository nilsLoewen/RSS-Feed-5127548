import { Component, OnInit } from '@angular/core';
import {WikiSearchComponent} from './../wiki-search/wiki-search.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(/*private matDialog: MatDialog*/) { }

  ngOnInit(): void {
  }


  openWikiSearch(): void {

    /*const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.matDialog.open(WikiSearchComponent, dialogConfig);*/
  }

}
