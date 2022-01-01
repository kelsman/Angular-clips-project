import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app';
@Pipe({
  name: 'fbTimestamp',
})
export class FbTimestampPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: firebase.firestore.FieldValue | undefined) {
    if (!value) return '';
    if (value instanceof firebase.firestore.Timestamp) {
      return this.datePipe.transform(value.toDate(), 'mediumDate');
    }
    return;
  }
}
