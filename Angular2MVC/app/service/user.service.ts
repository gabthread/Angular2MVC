/*
OBSERVABLES:
In just few line, Observable is more like data stream, opposite to promise method (in Angular 1.x),
Observable doesn’t return the response at once but in stream, it provides very helpful methods e.g.
map (for mapping result to interface), filter(filter any particular record from array of data) etc.
Observable also provides HTTP request handling. Rxjs is an eternal library providing us all Observable methods.

RESTful API:
One awesome thing about RESTful API is the HTTP verbs like functions names i.e. if function name is starting
from GET, PUT, POST or DELETE, we only need base URL (endpoint), by the HTTP call, it automatically determines
the corresponding function. It’s obvious, one Web API controller should have one HTTP verb method.

*/


import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    constructor(private _http: Http) { }

    get(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => <any>response.json());
        // .do(data => console.log("All: " + JSON.stringify(data)))
        //.catch(this.handleError); 
    }

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.put(url + id, body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    delete(url: string, id: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url + id, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}