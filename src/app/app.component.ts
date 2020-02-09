import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monAgence';

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyD-hmw8aaNHNYcVMq6z5rDN0AZXpXRCoVg',
      authDomain: 'agenceimmo-58da4.firebaseapp.com',
      databaseURL: 'https://agenceimmo-58da4.firebaseio.com',
      projectId: 'agenceimmo-58da4',
      storageBucket: 'agenceimmo-58da4.appspot.com',
      messagingSenderId: '892800679234',
      appId: '1:892800679234:web:bbed6e256676ca6f22dcdb'
    };
    firebase.initializeApp(firebaseConfig);
  }
}


