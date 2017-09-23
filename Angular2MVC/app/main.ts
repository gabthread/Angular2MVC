//AppModule reference is imported from current folder, making it as entry Module and loading other helper
//resources(Bootstrapping) for application by using plateformBrowserDynamic module’s bootstrapModule function.

//Bootstrap function initialize the Angular2 application, loads the required components, services or other helping
//resources to run the application

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);