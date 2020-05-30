import { Component, OnInit } from '@angular/core';
import {WikiSearchComponent} from './../wiki-search/wiki-search.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 * Navigationsleiste am oberen Bildschirmrand. Wird immer angezeigt, unabhängig vom Content.
 * Wenn die Seite um Routing erweitert werden würde und mehrere Pages dazukommen, würde diese Komponente immer automatisch auf jeder angezeigt werden
 */
export class HeaderComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Öffnet die Wiki-Search Komponente als Dialog
   * Wird über den 'Dienste'-Link getriggert
   */
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    const modalDialog = this.matDialog.open(WikiSearchComponent, dialogConfig);
  }

}
