import {Component} from '@angular/core';
import {DemoService} from './demo.service';
import {Observable} from 'rxjs/Rx';
import { Account } from './account';

@Component({
  selector: 'demo-app',
  template:`
  <h1>Angular 5 HttpClient Demo App</h1>
  <p>This is a complete mini-CRUB application using a Node back-end. See src/app/demo.service.ts for the API call code.</p>
  <h2>Accounts</h2>
  <ul>
    <li *ngFor="let account of accounts"><input type="text" name="email" [(ngModel)]="account.email"><button (click)="updateAccount(account)">Save</button> <button (click)="deleteAccount(account)">Delete</button></li>
  </ul>
  <p>Create a new account: <input type="text" name="email" [(ngModel)]="account.email"><button (click)="createAccount(account)">Save</button></p>

  <h2>Books and Movies</h2>

  <p>This is an example of loading data from multiple endpoints using Observable.forkJoin(). The API calls here are read-only.</p>

  <h3>Books</h3>
  <ul>
    <li *ngFor="let book of books">{{book.title}}</li>
  </ul>
  <h3>Movies</h3>
  <ul>
    <li *ngFor="let movie of movies">{{movie.title}}</li>
  </ul>
  `
})
export class AppComponent {

  public accounts ;
  public books;
  public movies;

  public email;

  public account : Account;

  constructor(private _demoService: DemoService) { }

  ngOnInit() {
    this.getAccounts();
    console.log("Vaidy 1");
    this.getBooksAndMovies();
  }

  getAccounts() {
    this._demoService.getAccounts().subscribe(
      // the first argument is a function which runs on success
      data => { this.accounts = data;
              console.log(data);
    },

      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading accounts')
    );

  }

  getBooksAndMovies() {
    this._demoService.getBooksAndMovies().subscribe(
      data => {
        this.books = data[0]
        this.movies = data[1]
      }
      // No error or completion callbacks here. They are optional, but
      // you will get console errors if the Observable is in an error state.
    );
  }

  createAccount(account) {
    account.email = 'vaidy.jayaraman@gmail.com';
    account.merchant = 'va11';
    account.guid = '12321321321';
    let acc = {name: name};
    this._demoService.createAccount(account).subscribe(
       data => {
         // refresh the list
         this.getAccounts();
         return true;
       },
       error => {
         console.error("Error saving Account!");
         return Observable.throw(error);
       }
    );
  }

  updateFood(food) {
    this._demoService.updateFood(food).subscribe(
       data => {
         // refresh the list
         this.getAccounts();
         return true;
       },
       error => {
         console.error("Error saving food!");
         return Observable.throw(error);
       }
    );
  }

  deleteAccount(account) {
    if (confirm("Are you sure you want to delete " + account.email + "?")) {
      this._demoService.deleteAccount(account).subscribe(
         data => {
           // refresh the list
           this.getAccounts();
           return true;
         },
         error => {
           console.error("Error deleting food!");
           return Observable.throw(error);
         }
      );
    }
  }
}
