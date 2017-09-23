/*
AppComponent is slim one having template with known bootstrap code to create navigation bar with one home link only.
The routerlink home name for Home page is what we defined in app.routing.ts’s routing table. You can have defined
whatever is convenient for you e.g. default, index etc. Router-outlet acts as place holder for dynamically loaded
view components. We also defined selector property (user-app) in AppComponent MetaData section because we will
bootstrap AppComponent in AppModule and use this selector in MVC view (index.cshtml) to load it.
*/

import { Component } from "@angular/core"

@Component({
    selector: "user-app",
    template: `
               <div>
                  <nav class='navbar navbar-inverse'>
                       <div class='container-fluid'>
                         <ul class='nav navbar-nav'>
                           <li><a [routerLink]="['home']">Home</a></li>
                           <li><a [routerLink]="['user']">Users Management</a></li>
                      </ul>
                      </div>
                 </nav>    
              <div class='container'>
                <router-outlet></router-outlet>
              </div>
             </div>          
`
})

export class AppComponent {

}