import { firebase_app } from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function deleteData(
  collection: string,
  id: string,
) {
  let result;
  let error;

  try {
    result = await deleteDoc(doc(db, collection, id));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
