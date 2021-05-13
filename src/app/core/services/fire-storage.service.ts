import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private aFireStorage: AngularFireStorage) { }

  saveCoffeeImage(coffeeId: string, file: File): void {
    // let id = this.db.list('projects').push(project).key;
    this.aFireStorage
      .ref(`coffees/${coffeeId}/${file.name}`)
      .put(file)
      .then((snapshot: UploadTaskSnapshot) => {
        console.log(snapshot);

        //       project.imageUrl = snapshot.downloadURL;
        //       this.db.object('projects/' + key).set(project);
      });
  }

}
