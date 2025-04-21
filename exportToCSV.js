const fs = require("fs");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function exportToCSV() {
 
    // 🔥 timestamp 기준 정렬
  const snapshot = await db.collection("names").orderBy("timestamp").get();
  let csv = "timestamp,name\n"; // ✅ 시간 왼쪽, 이름 오른쪽

    
  snapshot.forEach(doc => {
    const data = doc.data();
    const timestamp = data.timestamp;

    if (!timestamp || !timestamp._seconds) return;

    const date = new Date(timestamp._seconds * 1000);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formatted = `'${month}-${day} ${hours}:${minutes}'`;
    csv += `"${formatted}","${data.name}"\n`; // ✅ 시간 왼쪽, 이름 오른쪽
  });

  fs.writeFileSync("names.csv", "\uFEFF" + csv, "utf8");
  console.log("✅ CSV 저장 완료 (timestamp → name 순): names.csv");
}

exportToCSV();




