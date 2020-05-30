import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
/**
 * Generiert alle Inhallte die unter der Navigationsleiste angezeigt werden.
 * In diesem Fall sind das die Fakultäten, der IFrame und die RSS-Component
 */
export class ContentComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }


}
