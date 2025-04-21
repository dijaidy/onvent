import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export async function sendNameToFirebase(name) {
  try {
    await addDoc(collection(db, 'names'), {
      name,
      timestamp: serverTimestamp()
    });
    console.log('✅ 이름 저장 성공:', name);
  } catch (error) {
    console.error('❌ 이름 저장 실패:', error);
  }
}
