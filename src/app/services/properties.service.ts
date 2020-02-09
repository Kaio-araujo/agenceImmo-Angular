import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { reject, Promise } from 'q';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import * as firebase from 'firebase';
import { promise } from 'protractor';
import { PromiseType } from 'protractor/built/plugins';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties() {
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });
  }

  getSingleProperties(id) {
    return Promise(
      (resolve, reject) => {
        firebase.database().ref('/properties/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createProperty(property: Property) {
    console.log('Crée');
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  DeleteProperty(index) {
    console.log('Supprimé');
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }

  updateProperty(property: Property, index) {
    console.log('Mise à jour');
    // this.properties[index] = property;
    // this.saveProperties();
    // this.emitProperties();
    firebase.database().ref('/properties/' + index).update(property).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  uploadFile(file: File) {
    return Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + uniqueId + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement ...');
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
  }

  removeFile(fileLink: string) {
    if (fileLink) {
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('file deleted');
        },
      ).catch(
        (error) => {
          console.error(error);
        }
      )
    }
  }

}
