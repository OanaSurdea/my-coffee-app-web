import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { Coffee } from 'src/app/coffee/models';
import { CoffeeDataService } from './coffee-data.service';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(
    private aFireStorage: AngularFireStorage,
    private coffeeDataService: CoffeeDataService
  ) { }

  // TODO: Refactor
  saveOneImage(coffee: Coffee, file: File): void {
    console.log('[Start] Upload coffee image');

    this.aFireStorage
      .ref(`coffees/${coffee.id}/${file.name}`)
      .put(file)
      .then((snapshot: UploadTaskSnapshot) => {
        console.log('[Success] Upload coffee image');
        console.log('[Start] Generate coffee imageUrl');

        snapshot.ref.getDownloadURL()
          .then((url: string) => {
            coffee.details.imageUrl = url;
            console.log('[Success] Generate coffee imageUrl', url);

            this.coffeeDataService.saveOne(coffee, success => {
              console.log('[Success] Coffee update imageUrl');
            }).catch(() => {
              console.log('[Error] Coffee update imageUrl');
            });

          })
          .catch((error) => {
            console.log('[Error] Generate coffee imageUrl');
          });

      });
  }

}
