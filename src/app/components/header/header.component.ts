import { Component, OnInit } from '@angular/core';
import {WikiSearchComponent} from './../wiki-search/wiki-search.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    const modalDialog = this.matDialog.open(WikiSearchComponent, dialogConfig);
  }

}
