import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation';
import { useEffect } from 'react';


const imagePaths = [
  // Escaping.js
  "chultui_intro.svg", "chultui_button.svg", "리오.svg", "리아.svg",
  "joystick.svg", "walking1.svg", "walking2.svg", "bgd1.svg", "bgd2.svg", "bgd3.svg", "bgd4.svg", "bgd5.svg",
  "교수앞.svg", "교수뒤.svg", "학생들.svg", "리아_stage1.svg", "학생들 2.svg",
  "goal1.svg", "스테이지 2 출구.svg", "fail_teacher.svg", "fail_TA.svg", "조교앞.svg", "조교뒤.svg",
  "스테이지 2 입구.svg", "coffee_table.svg", "리딸라.svg", "리딸라 2.svg", "컵홀더.svg", "장애물 사람.svg",
  "fail_새치기.svg", "fail_ridala.svg", "나무1.svg", "나무2.svg", "현장이벤트 2.svg", "사람 2.svg", "사람 1.svg", "부스 2.svg",
  "success.svg",

  // Dressing2.js
  "Frame 11.svg", "Frame 10.svg", "Frame 12.svg", "Frame 13.svg", "Frame 14.svg", "Frame 15.svg",
  "Frame 8.svg", "Frame 9.svg", "Frame 16.svg", "Frame 17.svg", "Frame 4.svg", "Frame 5.svg", "Frame 6.svg", "Frame 7.svg",
  "soccerpo.svg", "hockeypo.svg", "shoes1po.svg", "shoes2po.svg", "shoes3po.svg", "shoes4po.svg",
  "head1po.svg", "head2po.svg", "head3po.svg", "head4po.svg", "eye1po.svg", "eye2po.svg", "eye3po.svg", "eye4po.svg",
];

const preloadImages = (paths) => {
  paths.forEach((filename) => {
    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/asset/dressingImages/${filename}`;
  });
};

function App() {
  
  useEffect(() => {
    preloadImages(imagePaths);
  }, []);

  return (
    <div className="App">
      <Navigation/>
    </div>
  );
}

export default App;
   