import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface PhotostreamImage {
    uid: string;
    imageRef: string;
    timestamp: number;
    localFileLocation?: string;
    doc?: any;
}
