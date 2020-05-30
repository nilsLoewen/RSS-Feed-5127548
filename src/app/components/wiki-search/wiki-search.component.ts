import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {NgForm} from '@angular/forms'
import { DataServiceService } from '../../services/data-service.service'
//import { NavigationStart, Router } from '@angular/router';
//import { Subscription } from 'rxjs';


export let browserRefresh = false;

@Component({
  selector: 'app-wiki-search',
  templateUrl: './wiki-search.component.html',
  styleUrls: ['./wiki-search.component.css']
})
export class WikiSearchComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('resultTitle') resultTitle: ElementRef;
  @ViewChild('resultDesc') resultDesc: ElementRef;
  @ViewChild('resultExtract') resultExtract: ElementRef;
  @ViewChild('resultUrl') resultURL: ElementRef;
  wikiURL:string;
  found:boolean = false;
  success:boolean = true;
  audioFile:File;
  //subscription: Subscription;


  constructor(public dialogRef: MatDialogRef<WikiSearchComponent>, private dataService: DataServiceService,) {
   }



  ngOnInit(): void {
    this.resetForm();
    window.addEventListener("beforeunload", function (e) {
      e.returnValue = "";
    });
  }


  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

  }

  onClose() {
    this.dialogRef.close();
  }

   search(){
     this.dataService.getWiki(this.searchInput.nativeElement.value).subscribe(data => {
       console.log(data['description']);
       console.log(data.valueOf());
       if (data['detail'] == "Page or revision not found.")
      {
        this.success = false;
         document.getElementById('wikiButton').style.display = 'none';
         document.getElementById('resultTitle').style.display = 'none';
         document.getElementById('resultDesc').style.display = 'none';
         document.getElementById('resultExtract').style.display = 'none';
      }
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
         console.log('after tts');
/*
         this.subscription = this.router.events.subscribe((event) => {
           if (event instanceof NavigationStart) {
             browserRefresh = !this.router.navigated;
           }
         });*/

      }
    });
     this.found = true;
  }
}
