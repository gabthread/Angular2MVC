import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'search-list',
    template: `<div class="form-inline">
                <div class="form-group">
                  <label><h3>{{title}}</h3></label>
                </div>
          <div class="form-group">
            <div class="col-lg-12">
              <input class="input-lg" placeholder="Enter any text to filter" (paste)="getPasteData($event)" (keyup)="getEachChar($event.target.value)" type="text" [(ngModel)]="listFilter" /><img src="../../images/cross.png" class="cross-btn" (click)="clearFilter()" *ngIf="listFilter"/>
           </div>
         </div>
         <div class="form-group">
             <div *ngIf='listFilter'>
           <div class="h3 text-muted">Filter by: {{listFilter}}</div>
        </div>
      </div>
     </div> `
})

export class SearchComponent {

    listFilter: string;
    @Input() title: string; //@Input decorator, we will send search textbox title from another component

    /*
    Third variable change is with @Output decorator and of EventEmitter type. This is how we send data back to parent component.
    change EventEmitter<string> means change is an event that parent component needs to subscribe and will get string argument
    type. We will explicitly call emit function (i.e. change.emit(“test”)) to send the value back to the parent component.
    */
    @Output() change: EventEmitter<string> = new EventEmitter<string>();


    /*
    his function will be called for every character user will enter in search textbox. We are only calling
    this.change.emit(value); that is sending that character to parent component where it is being sent to the
    UserFilterPipe pipe to be filtered from list.
    */
    getEachChar(value: any) {
        this.change.emit(value);
    }


    //Will clear the filter to reset the list to default without any filtering.
    clearFilter() {
        this.listFilter = null;
        this.change.emit(null);
    }


    /**
    This is little interesting function that will take care if user would copy search string from somewhere and paste it
     in search textbox to filter the list. Through value.clipboardData.getData('text/plain') we are getting the pasted data
     and sending it through change.emit(value) function to parent component.
    */
    getPasteData(value: any) {
        let pastedVal = value.clipboardData.getData('text/plain');
        this.change.emit(pastedVal);
        value.preventDefault();
    }
}