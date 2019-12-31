import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Task } from './Task';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  updatetask: any = {};
  url = 'http://localhost:8082/api/tasks';

  constructor(private _httpclient: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getviewtasklist(): Observable<any> {
    return this._httpclient.get(this.url)
      .pipe(retry(1), catchError(this.ErrorHanlding));
  }

  addtaskService(data): Observable<Task> {
    return this._httpclient.post<Task>(this.url, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ErrorHanlding)
      )
  }
  // GET Task based on specific Id
  gettaskbyID(id): Observable<Task> {
    return this._httpclient.get<Task>(this.url + '/task/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ErrorHanlding)
      )
  }

  //EDIT Task details

  edittask(id, data): Observable<Task> {
    return this._httpclient.put<Task>(this.url + "/" + id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ErrorHanlding)
      )
  }

  ErrorHanlding(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
