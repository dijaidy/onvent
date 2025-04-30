import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // ✅ 기존 경로 그대로

export async function checkNameDuplicate(name) {
  try {
    const docRef = doc(db, 'names', name.trim());
    const snapshot = await getDoc(docRef);
    return snapshot.exists(); // true면 중복
  } catch (err) {
    console.error('❌ 중복 체크 실패:', err);
    return false; // 실패한 경우 중복으로 간주 안 함
  }
}
