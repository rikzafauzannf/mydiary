import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const collectionName = "posts";

export const addPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), post);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  let posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });
  return posts;
};

export const getPostById = async (id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  } else {
    console.log("No such document!");
  }
};

export const updatePost = async (id, updatedPost) => {
  const postRef = doc(db, collectionName, id);
  await updateDoc(postRef, updatedPost);
};

export const deletePost = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};
