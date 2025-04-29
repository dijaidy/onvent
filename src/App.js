import logo from './logo.svg';
import './App.css';
import Navigation from './Navigation';
import { useEffect } from 'react';



// Escaping.js 이미지들
import chultui_intro from "./asset/dressingImages/chultui_intro.svg";
import chultui_button from "./asset/dressingImages/chultui_button.svg";
import 리오 from "./asset/dressingImages/리오.svg";
import 리아 from "./asset/dressingImages/리아.svg";
import joystick from "./asset/dressingImages/joystick.svg";
import walking1 from "./asset/dressingImages/walking1.svg";
import walking2 from "./asset/dressingImages/walking2.svg";
import bgd1 from "./asset/dressingImages/bgd1.svg";
import bgd2 from "./asset/dressingImages/bgd2.svg";
import bgd3 from "./asset/dressingImages/bgd3.svg";
import bgd4 from "./asset/dressingImages/bgd4.svg";
import bgd5 from "./asset/dressingImages/bgd5.svg";
import 교수앞 from "./asset/dressingImages/교수앞.svg";
import 교수뒤 from "./asset/dressingImages/교수뒤.svg";
import 학생들 from "./asset/dressingImages/학생들.svg";
import 리아_stage1 from "./asset/dressingImages/리아_stage1.svg";
import 학생들2 from "./asset/dressingImages/학생들 2.svg";
import goal1 from "./asset/dressingImages/goal1.svg";
import goal2 from "./asset/dressingImages/스테이지 2 출구.svg";
import fail_teacher from "./asset/dressingImages/fail_teacher.svg";
import fail_TA from "./asset/dressingImages/fail_TA.svg";
import start2 from "./asset/dressingImages/스테이지 2 입구.svg";
import coffee_table from "./asset/dressingImages/coffee_table.svg";
import 리딸라 from "./asset/dressingImages/리딸라.svg";
import 리딸라2 from "./asset/dressingImages/리딸라 2.svg";
import 컵홀더 from "./asset/dressingImages/컵홀더.svg";
import 장애물사람 from "./asset/dressingImages/장애물 사람.svg";
import fail_새치기 from "./asset/dressingImages/fail_새치기.svg";
import fail_ridala from "./asset/dressingImages/fail_ridala.svg";
import 나무1 from "./asset/dressingImages/나무1.svg";
import 나무2 from "./asset/dressingImages/나무2.svg";
import 현장이벤트 from "./asset/dressingImages/현장이벤트 2.svg";
import 사람2 from "./asset/dressingImages/사람 2.svg";
import 사람1 from "./asset/dressingImages/사람 1.svg";
import 부스 from "./asset/dressingImages/부스 2.svg";
import success from "./asset/dressingImages/success.svg";

// Dressing2.js 이미지들
import frame11 from "./asset/dressingImages/Frame 11.svg";
import frame10 from "./asset/dressingImages/Frame 10.svg";
import frame12 from "./asset/dressingImages/Frame 12.svg";
import frame13 from "./asset/dressingImages/Frame 13.svg";
import frame14 from "./asset/dressingImages/Frame 14.svg";
import frame15 from "./asset/dressingImages/Frame 15.svg";
import head1 from "./asset/dressingImages/Frame 8.svg";
import head2 from "./asset/dressingImages/Frame 9.svg";
import head3 from "./asset/dressingImages/Frame 16.svg";
import head4 from "./asset/dressingImages/Frame 17.svg";
import eye1 from "./asset/dressingImages/Frame 4.svg";
import eye2 from "./asset/dressingImages/Frame 5.svg";
import eye3 from "./asset/dressingImages/Frame 6.svg";
import eye4 from "./asset/dressingImages/Frame 7.svg";
import soccerpo from "./asset/dressingImages/soccerpo.svg";
import hockeypo from "./asset/dressingImages/hockeypo.svg";
import shoes1po from "./asset/dressingImages/shoes1po.svg";
import shoes2po from "./asset/dressingImages/shoes2po.svg";
import shoes3po from "./asset/dressingImages/shoes3po.svg";
import shoes4po from "./asset/dressingImages/shoes4po.svg";
import head1po from "./asset/dressingImages/head1po.svg";
import head2po from "./asset/dressingImages/head2po.svg";
import head3po from "./asset/dressingImages/head3po.svg";
import head4po from "./asset/dressingImages/head4po.svg";
import eye1po from "./asset/dressingImages/eye1po.svg";
import eye2po from "./asset/dressingImages/eye2po.svg";
import eye3po from "./asset/dressingImages/eye3po.svg";
import eye4po from "./asset/dressingImages/eye4po.svg";
import rio from './asset/dressingImages/rio.svg';
import enterName from './asset/dressingImages/enterName.svg';
import prevButton from './asset/dressingImages/prevButton.svg';
import nextButton from './asset/dressingImages/nextButton.svg';
import shareButton from './asset/dressingImages/shareButton.svg';
import info from './asset/dressingImages/info.svg';
import 화살표우 from './asset/dressingImages/화살표 우.svg';
import 화살표좌 from './asset/dressingImages/화살표 좌.svg';
import background05 from './asset/dressingImages/page5.svg';
import background14 from './asset/dressingImages/page1-4.svg';
import title from './asset/dressingImages/title.svg';
import firstRio from './asset/dressingImages/firstRio.svg';
import firstInfo from './asset/dressingImages/firstInfo.svg';
import 조교1앞1 from "./asset/dressingImages/조교1 앞1.svg";  
import 조교1앞2 from "./asset/dressingImages/조교1 앞2.svg";  
import 조교2앞1 from "./asset/dressingImages/조교2 앞1.svg"; 
import 조교2앞2 from "./asset/dressingImages/조교2 앞2.svg"; 
import 조교뒤1 from "./asset/dressingImages/조교 뒤1.svg"; 
import 조교뒤2 from "./asset/dressingImages/조교 뒤2.svg"; 
import empty from "./asset/dressingImages/empty.svg";
import startButton from "./asset/dressingImages/startbutton.svg";
import 출튀배경 from "./asset/dressingImages/출튀배경.svg";
import 다시하기 from "./asset/dressingImages/다시하기.svg";
import 출튀배경실패 from "./asset/dressingImages/출튀 배경 실패.svg"
import 실패문구1 from "./asset/dressingImages/실패문구1.svg"
import 실패문구2 from "./asset/dressingImages/실패문구2.svg"
import 실패문구3 from "./asset/dressingImages/실패문구3.svg"
import 실패문구4 from "./asset/dressingImages/실패문구4.svg"
import 공유하기 from "./asset/dressingImages/공유하기.svg"

import 빗썸화면 from "./asset/dressingImages/빗썸화면.svg"
import 스프링클제목 from "./asset/dressingImages/스프링클제목.svg"


export const imagePaths = [
  chultui_intro, chultui_button, 리오, 리아, joystick, walking1, walking2,
  bgd1, bgd2, bgd3, bgd4, bgd5,
  교수앞, 교수뒤, 학생들, 리아_stage1, 학생들2,
  goal1, goal2, fail_teacher, fail_TA, 조교1앞1, 조교1앞2, 조교2앞1, 조교2앞2, 조교뒤1, 조교뒤2,
  start2, coffee_table, 리딸라, 리딸라2, 컵홀더, 장애물사람,
  fail_새치기, fail_ridala, 나무1, 나무2, 현장이벤트, 사람2, 사람1, 부스,
  success, 화살표우, 화살표좌, empty, 출튀배경, 다시하기, 출튀배경실패, 실패문구1, 실패문구2, 실패문구3,
  실패문구4, 공유하기,

  frame11, frame10, frame12, frame13, frame14, frame15,
  head1, head2, head3, head4,
  eye1, eye2, eye3, eye4,
  soccerpo, hockeypo, shoes1po, shoes2po, shoes3po, shoes4po,
  head1po, head2po, head3po, head4po,
  eye1po, eye2po, eye3po, eye4po,
  background05, background14, rio, enterName, prevButton, nextButton, shareButton, info,
  firstInfo, firstRio, title, startButton,

  빗썸화면, 스프링클제목
];

const preloadImages = (paths) => {
  return paths.map((filename) => (<img style={{ display: 'none' }} src={filename}></img>));
};

const imgArr = preloadImages(imagePaths)

function App() {

  return (
    <div className="App">
      <text style={{position: 'absolute', color: 'transparent', fontFamily: 'Fighting'}}>a</text> 
      <text style={{position: 'absolute', color: 'transparent', fontFamily: 'Yangjin'}}>a</text> 
      <text style={{position: 'absolute', color: 'transparent', fontFamily: 'Romance'}}>a</text> 
      {imgArr}
      <Navigation/>
    </div>
  );
}

export default App;
   