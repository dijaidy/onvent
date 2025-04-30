import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // ← 너가 Firebase 초기화 해놓은 위치 기준

export async function sendNameToFirebase(name) {
  try {
    const docRef = doc(db, 'names', name); // 🔥 문서 ID = 사용자 이름
    await setDoc(docRef, {
      name,
      timestamp: serverTimestamp(),
    });
    console.log('✅ 이름 저장 성공:', name);
  } catch (error) {
    console.error('❌ 이름 저장 실패:', error);
  }
}
