// src/firebase.js

// ✅ Firebase SDK 불러오기
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getFirestore, collection, addDoc, getDocs, deleteDoc, doc 
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Firebase 프로젝트 설정값 (당신이 올린 값 그대로)
const firebaseConfig = {
  apiKey: "AIzaSyBhLf1FzSvT8JrBJME6qwjAe2sHhWNnvLw",
  authDomain: "project-74222793680155886.firebaseapp.com",
  projectId: "project-74222793680155886",
  storageBucket: "project-74222793680155886.firebasestorage.app",
  messagingSenderId: "861137195625",
  appId: "1:861137195625:web:4243394ab470728d1a08f8",
  measurementId: "G-WJS06Z481F"
};

// ✅ Firebase 초기화
const app = initializeApp(firebaseConfig);

// ✅ Analytics (지원되는 환경일 때만 실행)
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) getAnalytics(app);
  });
}

// ✅ Auth, Firestore 설정
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Firestore 헬퍼 함수들
const addIdea = async (uid, ideaText, category, priority) => {
  try {
    await addDoc(collection(db, `user/${uid}/ideas`), {
      text: ideaText,
      category,
      priority,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("아이디어 추가 실패:", error);
  }
};

const fetchIdeas = async (uid) => {
  try {
    const querySnapshot = await getDocs(collection(db, `user/${uid}/ideas`));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("아이디어 불러오기 실패:", error);
    return [];
  }
};

const deleteIdea = async (uid, ideaId) => {
  try {
    await deleteDoc(doc(db, `user/${uid}/ideas`, ideaId));
  } catch (error) {
    console.error("아이디어 삭제 실패:", error);
  }
};

// ✅ 내보내기
export { db, auth, addIdea, fetchIdeas, deleteIdea };
export default app;
