import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms'
import { DataServiceService } from '../../services/data-service.service'


export let browserRefresh = false;

@Component({
  selector: 'app-wiki-search',
  templateUrl: './wiki-search.component.html',
  styleUrls: ['./wiki-search.component.css']
})
/**
 * Komponente wird nur als Dialog geöffnet und enthällt ein Wikipedia-Suchfeld und das dazugehörige Ergebniss
 */
export class WikiSearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('resultTitle') resultTitle: ElementRef;
  @ViewChild('resultDesc') resultDesc: ElementRef;
  @ViewChild('resultExtract') resultExtract: ElementRef;
  @ViewChild('resultUrl') resultURL: ElementRef;
  wikiURL:string;
  found:boolean = false; //legt fest, ob der Ergebniss-Bereich sichtbar ist
  success:boolean = true;//legt fest, ob die Fehlermeldung für keine Suchergebisse erscheint


  constructor(public dialogRef: MatDialogRef<WikiSearchComponent>, private dataService: DataServiceService) {
  }


/**
 * Wird getriggert wenn Komponente geladen wird
 * Eventlistener verhinder, dass der Dialog neu geladen wird. Angular triggert jedes mal wenn eine Datei erzeugt wird einen Reload, wodurch der Dialog geschlossen wird.
 */
  ngOnInit(): void {
    this.resetForm();
    window.addEventListener("beforeunload", function (e) {
      e.returnValue = "";
    });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
  }

  onClose() {
    this.dialogRef.close();
  }

  /**
   * schickt Wikipedia Suche an den Service mit dem Such-String als Parameter
   */
  search(){
    this.dataService.getWiki(this.searchInput.nativeElement.value).subscribe(data => {
      //Wenn kein Ergebniss zu dem Suchstring vorhanden ist, handelt dieses If-Statement die Fehlermeldung
      if (data['detail'] == "Page or revision not found.")
      {
        this.success = false;
        document.getElementById('wikiButton').style.display = 'none';
        document.getElementById('resultTitle').style.display = 'none';
        document.getElementById('resultDesc').style.display = 'none';
        document.getElementById('resultExtract').style.display = 'none';
      }
      //Ansonsten wird das Ergebnss angezeigt und eingeblendet
      else
      {
        this.success = true;
        document.getElementById('wikiButton').style.display = 'block';
        document.getElementById('resultTitle').style.display = 'block';
        document.getElementById('resultDesc').style.display = 'block';
        document.getElementById('resultExtract').style.display = 'block';
        this.wikiURL = "https://de.wikipedia.org/wiki/" + data["title"];
        document.getElementById('resultTitle').innerHTML = data['title'];
        document.getElementById('resultDesc').innerHTML = data['description'];
        document.getElementById('resultExtract').innerHTML = data['extract'];
      }
    });
    this.found = true;
  }
}
