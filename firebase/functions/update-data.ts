import {firebase_app} from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function updateData(
  collection: string,
  id: string,
  data: any
) {
  let result;
  let error;

  try {
    result = await updateDoc(doc(db, collection, id), data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
