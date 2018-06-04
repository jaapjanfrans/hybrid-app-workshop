import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface PhotostreamImage {
    uid: string;
    imageRef: string;
    dateCreated: Timestamp;
    doc: any;
}
