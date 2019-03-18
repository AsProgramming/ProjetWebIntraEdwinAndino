import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private messageSource = new BehaviorSubject('default');
  currentMessage = this.messageSource.asObservable();

  constructor() { }
   
  setMessage(message: string){
    this.messageSource.next(message);
   }
}

