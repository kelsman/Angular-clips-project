import firebase from 'firebase/compat/app';
export interface IClip {
  uid: string;
  displayName: string;
  url: string;
  title: string;
  fileName: string;
  timestamp: firebase.firestore.FieldValue;
  docID?: string;
  screenshotURL: string;
  screenshotFileName: string;
}
