import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import { rh, rw } from "../managements/Dimensions";
import { data, useNavigate } from "react-router-dom";
import '../index.css';
import Swal from 'sweetalert2';

import chultui_intro from "../asset/dressingImages/chultui_intro.svg";
import chultui_button from "../asset/dressingImages/chultui_button.svg";
import 리오 from "../asset/dressingImages/리오.svg";
import 리아 from "../asset/dressingImages/리아.svg";
import joystickImg from "../asset/dressingImages/joystick.svg";
import walking1 from "../asset/dressingImages/walking1.svg";
import walking2 from "../asset/dressingImages/walking2.svg";
import bgd1 from "../asset/dressingImages/bgd1.svg";
import bgd2 from "../asset/dressingImages/bgd2.svg";
import bgd3 from "../asset/dressingImages/bgd3.svg";
import bgd4 from "../asset/dressingImages/bgd4.svg";
import bgd5 from "../asset/dressingImages/bgd5.svg";
import 교수앞 from "../asset/dressingImages/교수앞.svg";
import 교수뒤 from "../asset/dressingImages/교수뒤.svg";
import 학생들 from "../asset/dressingImages/학생들.svg";
import 리아_stage1 from "../asset/dressingImages/리아_stage1.svg";
import 학생들2 from "../asset/dressingImages/학생들 2.svg";
import goal1 from "../asset/dressingImages/goal1.svg";
import goal2 from "../asset/dressingImages/스테이지 2 출구.svg"; 
import fail_teacher from "../asset/dressingImages/fail_teacher.svg";
import fail_TA from "../asset/dressingImages/fail_TA.svg";
import 조교앞 from "../asset/dressingImages/조교앞.svg";
import 조교뒤 from "../asset/dressingImages/조교뒤.svg";  
import start2 from "../asset/dressingImages/스테이지 2 입구.svg"; 
import coffee_table from "../asset/dressingImages/coffee_table.svg"; 
import 리딸라 from "../asset/dressingImages/리딸라.svg";  
import 리딸라2 from "../asset/dressingImages/리딸라 2.svg"; 
import 컵홀더 from "../asset/dressingImages/컵홀더.svg"; 
import 장애물사람 from "../asset/dressingImages/장애물 사람.svg"; 
import fail_새치기 from "../asset/dressingImages/fail_새치기.svg"
import fail_ridala from "../asset/dressingImages/fail_ridala.svg"
import 나무1 from "../asset/dressingImages/나무1.svg";
import 나무2 from "../asset/dressingImages/나무2.svg";
import 현장이벤트 from "../asset/dressingImages/현장이벤트 2.svg";
import 사람2 from "../asset/dressingImages/사람 2.svg";
import 사람1 from "../asset/dressingImages/사람 1.svg";
import 부스 from "../asset/dressingImages/부스 2.svg";
import success from "../asset/dressingImages/success.svg";

const screenWidth = rw(440);
const screenHeight = rh(956);
const gameScreenWidth = rw(350);
const gameScreenHeight = rh(570);
const rioWidth = rw(85);
const rioHeight = rh(92);
const joystickRadius = rw(96);
const joystickInterRadius = 25;
const velocity = 0.05;

export default function Escaping() {
    const [stage, setStage] = useState(-1);
    const stageRef = useRef(stage);
    const animationId = useRef(null);
    const walkingAnimationId = useRef(null);
    const teacherAnimationId = useRef(null);
    const ridalaAnimationId = useRef(null);
    const walkFrame = useRef(0);
    const teacherFrame = useRef(0);
    const ridalaFrame = useRef(0);
    const teacherWatch = useRef(true);
    const [name, setName] = useState('');
    const [isClear, setIsClear] = useState(false);
    const [time, setTime] = useState(0);
    const [manual, setManual] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [alreadyPopUp, setAlreadyPopUp] = useState(false);
    const [fail, setFail] = useState(false);
    const [treeTouch, setTreeTouch] = useState(false);
    const rio = useRef(walking1);
    const teacher = useRef(교수앞);
    const ridala = useRef(리딸라);

    const taPos = [useSpring({x: rw(38), y: rh(46)}), useSpring({x: rw(240), y: rh(308)})];
    const taSize = [rw(77), rh(204)];
    const ta = [useRef(조교앞), useRef(조교뒤)];
    const taVel = [1.3, 2];
    const taAnimationIdArr = [useRef(null), useRef(null)];
    const [isBlocked, setIsBlocked] = useState(false);

    const stageSetting = {
      bgd: [bgd1, bgd2, bgd3, bgd4, bgd5],
      starting: [[rw(170), rh(284)], [rw(26), rh(442)], [rw(256), rh(278)], [rw(31), rh(23)], [rw(8), rh(251), rw(88), rh(88)]],
      barrier: [
        [[rw(201), rh(68), rw(106), rh(140), teacher, null], [rw(14), rh(184), rw(240), rh(94), 학생들], [rw(14), rh(374), rw(240), rh(94), 학생들],[rw(102), rh(275), rw(64), rh(98), 리아_stage1],], 
        [],
        [[0, 0, rw(350), rh(135)], [0, rh(459), rw(350), rh(111)]],
        [],
        []
      ],
      object: [
        [[rw(14), rh(279), rw(240), rh(94), 학생들2]],
        [[0, rh(442), rw(32), rh(108), start2]],
        [[rw(127.72), rh(124.01), rw(106.56), rh(45.98), coffee_table], !alreadyPopUp && [rw(200), rh(86), rw(30), rh(42), ridala, null]],
        [[0, rh(190), rw(204), rh(96), 장애물사람], !treeTouch && [rw(200), rh(22), rw(142), rh(264), 나무1], treeTouch && [rw(147), rh(231), rw(174), rh(270), 나무2]],
        [[rw(121), rh(373), rw(52), rh(96), 사람1], [0, rh(85), rw(268), rh(104), 부스], [0, rh(406), rw(268), rh(104), 부스], [rw(20), rh(141), rw(64), rh(96), 사람2], [rw(273), rh(31), rw(64), rh(96), 사람2], [rw(20), rh(471), rw(64), rh(96), 사람2], [rw(201), rh(122), rw(64), rh(96), 사람2], [rw(123), rh(163), rw(52), rh(96), 사람1], [rw(247), rh(459), rw(52), rh(96), 사람1]]
      ],
      event: [
        [],
        [],
        [[rw(119), rh(45), rw(125), rh(115), ()=>{
          if (!alreadyPopUp){
            stopRidalaAnimation();
            setPopUp(true);
            ridala.current?.setAttribute('src', 리딸라);
          }
        }]],
        [[0, rh(190), rw(194), rh(96), ()=>{
          setTimeout(()=>{
            setFail(fail_새치기);
          }, 200);
        },],
        (!treeTouch && [rw(221), rh(190), rw(130), rh(93), ()=>{
          setTreeTouch(true);
        }]),
      ],
      []
      ],
      goal: [
        [rw(14.32), rh(561.01), rw(63.36), rh(8.99), goal1], 
        [rw(341), rh(20), rw(8.99), rh(108), goal2],
        [0, rh(170), rw(13), rh(289), false],
        [rw(316), rh(518), rw(24), rh(44)],
        [rw(276), rh(179), rw(74), rh(244), 현장이벤트]
      ],
        
    }

    const navigate = useNavigate();

    const joystickPos = useSpring({x: 0, y: 0});
    const [rioPos, api] = useSpring(() => ({
      x: stageSetting.starting[0][0],
      y: stageSetting.starting[0][1],
    }));
    
    useEffect(()=>{
      stageRef.current = stage;
      if (stage >= 0) {
        rio.current?.setAttribute('src', walkFrame.current === 0 ? walking1 : walking2);
      }
      if (stage == 1) {
        updateTA1Position();
        updateTA2Position();
      }
    }, [stage])

    const startWalkingAnimation = () => {
      if (walkingAnimationId.current) return; // 이미 돌아가는 중이면 무시
    
      walkingAnimationId.current = setInterval(() => {
        if (!rio.current) return;
    
        walkFrame.current = (walkFrame.current + 1) % 2;
        rio.current?.setAttribute('src', walkFrame.current === 0 ? walking1 : walking2);
      }, 500); // 150ms마다 교체 (애니메이션 속도)
    };
    
    const stopWalkingAnimation = () => {
      clearInterval(walkingAnimationId.current);
      walkingAnimationId.current = null;
    };

    const startTeacherAnimation = () => {
      if (teacherAnimationId.current) return; // 이미 돌아가는 중이면 무시
    
      teacherAnimationId.current = setInterval(() => {
        if (!teacher.current) return;
    
        teacherFrame.current = (teacherFrame.current + 1) % 2;
        teacher.current?.setAttribute('src', teacherFrame.current === 0 ? 교수앞 : 교수뒤);
        teacherWatch.current = (teacherFrame.current === 0 ? true: false);
      }, 2000); // 150ms마다 교체 (애니메이션 속도)
    };

    const stopTeacherAnimation = () => {
      clearInterval(teacherAnimationId.current);
      teacherAnimationId.current = null;
    };
    
    const startRidalaAnimation = () => {
      if (ridalaAnimationId.current) return; // 이미 돌아가는 중이면 무시
    
      ridalaAnimationId.current = setInterval(() => {
        if (!ridala.current) return;
    
        ridalaFrame.current = (ridalaFrame.current + 1) % 2;
        ridala.current?.setAttribute('src', ridalaFrame.current === 0 ? 리딸라 : 리딸라2);
      }, 600); // 150ms마다 교체 (애니메이션 속도)
    };

    const stopRidalaAnimation = () => {
      clearInterval(ridalaAnimationId.current);
      ridalaAnimationId.current = null;
    };

    const updateTA1Position = () => {
        const i = 0;
        let newY = taPos[i].y.get() + taVel[i];

        if (newY + taSize[1] >= gameScreenHeight) {
          ta[i].current?.setAttribute('src', 조교뒤);
          newY = taPos[i].y.get();
          taVel[i] *= -1;
        } else if (newY <= 0) {
          ta[i].current?.setAttribute('src', 조교앞);
          newY = taPos[i].y.get();
          taVel[i] *= -1;
        }
  
        taPos[i].y.set(newY);

      //ta collision
        let boxLeft = taPos[i].x.get();
        let boxRight = taPos[i].x.get()+taSize[0];
        let boxTop = taPos[i].y.get();
        let boxBottom = taPos[i].y.get()+taSize[1];

        if ( boxTop < rioPos.y.get() + rioHeight &&  boxBottom > rioPos.y.get() && rioPos.x.get() + rioWidth > boxLeft && rioPos.x.get() < boxRight){
          /*setFail(fail_TA);*/
        }



        taAnimationIdArr[i].current = requestAnimationFrame(updateTA1Position);
    };

    const updateTA2Position = () => {
      const i = 1;
      let newY = taPos[i].y.get() + taVel[i];

      if (newY + taSize[1] >= gameScreenHeight) {
        ta[i].current?.setAttribute('src', 조교뒤);
        newY = taPos[i].y.get();
        taVel[i] *= -1;
      } else if (newY <= 0) {
        ta[i].current?.setAttribute('src', 조교앞);
        newY = taPos[i].y.get();
        taVel[i] *= -1;
      }

      taPos[i].y.set(newY);

      //ta collision
      let boxLeft = taPos[i].x.get();
      let boxRight = taPos[i].x.get()+taSize[0];
      let boxTop = taPos[i].y.get();
      let boxBottom = taPos[i].y.get()+taSize[1];

      if ( boxTop < rioPos.y.get() + rioHeight &&  boxBottom > rioPos.y.get() && rioPos.x.get() + rioWidth > boxLeft && rioPos.x.get() < boxRight){
        /*setFail(fail_TA);*/
      }

      taAnimationIdArr[i].current = requestAnimationFrame(updateTA2Position);
  };

    const updatePosition = () => {
      const rioVelocity = [joystickPos.x.get(), joystickPos.y.get()];
      
      let newX = Math.min(Math.max(rioPos.x.get() + rioVelocity[0]*velocity, 0), gameScreenWidth-rioWidth);
      let newY = Math.min(Math.max(rioPos.y.get() + rioVelocity[1]*velocity, 0), gameScreenHeight-rioHeight);

      console.log(stageRef.current)

      let boxLeft;
      let boxRight;
      let boxTop;
      let boxBottom;

      //barrier
      for (let i = 0; i < stageSetting.barrier[stageRef.current].length ; i++) {
        boxLeft = stageSetting.barrier[stageRef.current][i][0];
        boxRight = stageSetting.barrier[stageRef.current][i][0]+stageSetting.barrier[stageRef.current][i][2];
        boxTop = stageSetting.barrier[stageRef.current][i][1];
        boxBottom = stageSetting.barrier[stageRef.current][i][1]+stageSetting.barrier[stageRef.current][i][3];

        if (boxRight-10 < newX && newX < boxRight&& newY + rioHeight > boxTop && newY < boxBottom) { // right collision
          if (boxTop+10 > newY + rioHeight &&  newY + rioHeight > boxTop && newX + rioWidth > boxLeft && newX < boxRight && rioVelocity[1] >= 0){
            newY = boxTop - rioHeight;
            break;
          } else if (boxBottom-10 < newY && newY < boxBottom && newX + rioWidth > boxLeft && newX < boxRight && rioVelocity[1] <= 0) {
            newY = boxBottom;
            break;
          }
          newX = boxRight;
          break;
        } else if (boxLeft+10 > newX + rioWidth && newX + rioWidth > boxLeft && newY + rioHeight > boxTop && newY < boxBottom) { // left collision
          if (boxTop+10 > newY + rioHeight &&  newY + rioHeight > boxTop && newX + rioWidth > boxLeft && newX < boxRight && rioVelocity[1] >= 0){
            newY = boxTop - rioHeight;
            break;
          } else if (boxBottom-10 < newY && newY < boxBottom && newX + rioWidth > boxLeft && newX < boxRight && rioVelocity[1] <= 0) {
            newY = boxBottom;
            break;
          }
          newX = boxLeft - rioWidth;
          break;
        }

      }

      for (let i = 0; i < stageSetting.barrier[stageRef.current].length ; i++) {
        boxLeft = stageSetting.barrier[stageRef.current][i][0];
        boxRight = stageSetting.barrier[stageRef.current][i][0]+stageSetting.barrier[stageRef.current][i][2];
        boxTop = stageSetting.barrier[stageRef.current][i][1];
        boxBottom = stageSetting.barrier[stageRef.current][i][1]+stageSetting.barrier[stageRef.current][i][3];

        if (boxTop+10 > newY + rioHeight &&  newY + rioHeight > boxTop && newX + rioWidth > boxLeft && newX < boxRight){ // top collision
          newY = boxTop - rioHeight;
          break;
        } else if (boxBottom-10 < newY && newY < boxBottom && newX + rioWidth > boxLeft && newX < boxRight){ // bottom collision
          newY = boxBottom;
          break;
        }
      }

      // event
      for (let i= 0 ; i < stageSetting.event[stageRef.current].length; i++) {
        boxLeft = stageSetting.event[stageRef.current][i][0];
        boxRight = stageSetting.event[stageRef.current][i][0]+stageSetting.event[stageRef.current][i][2];
        boxTop = stageSetting.event[stageRef.current][i][1];
        boxBottom = stageSetting.event[stageRef.current][i][1]+stageSetting.event[stageRef.current][i][3];

        if ( boxTop < newY + rioHeight &&  boxBottom > newY && newX + rioWidth > boxLeft && newX < boxRight){ // top collision
          stageSetting.event[stageRef.current][i][4]();
        }
      }


      // goal
      boxLeft = stageSetting.goal[stageRef.current][0];
      boxRight = stageSetting.goal[stageRef.current][0]+stageSetting.goal[stageRef.current][2];
      boxTop = stageSetting.goal[stageRef.current][1];
      boxBottom = stageSetting.goal[stageRef.current][1]+stageSetting.goal[stageRef.current][3];

      animationId.current = requestAnimationFrame(updatePosition);

      if ( boxTop < newY + rioHeight &&  boxBottom > newY && newX + rioWidth > boxLeft && newX < boxRight){ // top collision
        if (stageRef.current+1 < stageSetting.barrier.length) {
          if (stageRef.current == 2 && !alreadyPopUp) {
            setFail(fail_ridala)
            return;
          }
          newX = stageSetting.starting[stageRef.current+1][0];
          newY = stageSetting.starting[stageRef.current+1][1];
          if (stageRef.current == 0) {
            teacherWatch.current = false;
            stopTeacherAnimation();
            rio.current?.setAttribute('src', walking1);
          } else if (stageRef.current == 1) {
            for ( let i = 0; i < 2; i++) {
              if (taAnimationIdArr[i].current !== null) {
                cancelAnimationFrame(taAnimationIdArr[i].current);
                taAnimationIdArr[i].current = null;
              }
            }
            startRidalaAnimation();
          }
          stopWalkingAnimation();
          setStage(stageRef.current+1);
          startWalkingAnimation();
        } else {
          setIsClear(true);
          setTime(Date.now() - time);
          if (animationId.current !== null) {
            cancelAnimationFrame(animationId.current);
            animationId.current = null;
          }
        }
      }

      rioPos.x.set(newX);
      rioPos.y.set(newY);
      
    };


    const bindLogoPos = useDrag((e)=>{
      if (e.first){
        console.log('f')
        joystickPos.x.set(0);
        joystickPos.y.set(0);
        updatePosition();
      } else if (e.down){
        if (isBlocked) return;
        if (teacherWatch.current) {
          setTimeout(()=>{/*setFail(fail_teacher);*/}, 150);
        }
        // joystick setting
        const dx = e.movement[0];
        const dy = e.movement[1]; 
        const distance = Math.sqrt(dx * dx + dy * dy); 

        if (distance > joystickRadius-joystickInterRadius) {
            const angle = Math.atan2(dy, dx); 
            joystickPos.x.set(Math.cos(angle) * (joystickRadius-joystickInterRadius));
            joystickPos.y.set(Math.sin(angle) * (joystickRadius-joystickInterRadius));
        } else {
            joystickPos.x.set(e.movement[0]);
           joystickPos.y.set(e.movement[1]);
        }
        if (popUp) {
          setIsBlocked(true);
        }

      } else if (e.last) {
        console.log('ld')
        joystickPos.x.start(0, {config: {duration: 200}});
        joystickPos.y.start(0, {config: {duration: 200}});
        if (isClear){
          if (animationId.current !== null) {
            cancelAnimationFrame(animationId.current);
            animationId.current = null;
          }
        } else {
          setTimeout(()=>{
            if (animationId.current !== null) {
              cancelAnimationFrame(animationId.current);
              animationId.current = null;
            }
          }, 200);
        }
      }

        },
      {
        preventScroll: true,
        pointer: { touch: true},
      })

    const handleDragStart = (e) => {
      e.preventDefault(); 
    };
    //390 663

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {
          (stage==-1)?
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: screenWidth, height: screenHeight, borderWidth: 1, borderStyle: 'solid', borderColor: '#000000'}}>
          <text style={{fontFamily: 'fighting', fontSize: rw(90.74), color: '#ec7fbc', marginTop: rh(56)}}>출튀하고</text>
          <text style={{fontFamily: 'fighting', fontSize: rw(90.74), color: '#ec7fbc'}}>축제가기~!!</text>
          <img src={chultui_intro} style={{marginTop: rh(37), objectFit: 'cover'}} width={rw(350)} height={rh(294)}/>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: rh(72)}}>
            <img src={chultui_button} style={{objectFit: 'cover'}} width={rw(254.63)} height={rh(63.63)} ></img>
            <input
            placeholder="별명을 입력하세요"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            style={{borderWidth: 0, marginTop: rh(-47), marginBottom: rh(20),  backgroundColor: 'transparent', 
              width: rw(230), height: rh(27), color: '#ffffff', textAlign: 'center',
            fontFamily: 'Yangjin', fontSize: rw(24)}}
            />
          </div>
          <button style={{ backgroundColor: 'transparent', border: 'none', marginTop: rh(20.37), width: rw(254.63), display: 'flex', flexDirection: 'column', alignItems: 'center'
          }} onClick={()=>{
            if (!name) {
              Swal.fire( '이름을 입력해주세요!');
            } else {
              startTeacherAnimation();
              setStage(0);
              setTime(Date.now());
              startWalkingAnimation();
            }}}>
            <img style={{opacity: 1, objectFit: 'cover'}} src={chultui_button} width={rw(254.63)} height={rh(63.63)}></img>
            <text style={{fontFamily: 'Yangjin', fontSize: rw(24), color: '#ffffff', marginTop: rh(-50), height: rh(27), marginBottom: rh(23)}}>게임시작</text>
          </button>
          <button style={{ backgroundColor: 'transparent', border: 'none', marginTop: rh(20.37), width: rw(254.63), display: 'flex', flexDirection: 'column', alignItems: 'center'
          }} onClick={()=>{
            setManual(true);
          }}>
            <img style={{opacity: 1, objectFit: 'cover'}} src={chultui_button} width={rw(254.63)} height={rh(63.63)}></img>
            <text style={{fontFamily: 'Yangjin', fontSize: rw(24), color: '#ffffff', marginTop: rh(-50), height: rh(27), marginBottom: rh(23)}}>게임방법</text>
          </button>
          {(manual) && <div style={{position: 'absolute', display: 'flex', flexDirection: 'column',alignItems: 'center', width: screenWidth, height: screenHeight, opacity: 1, left: 0, top: 0, backgroundColor: 'transparent', zIndex: 2}}>
            <div style={{position: 'absolute', top: rh(279), display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ec7fbc', width: rw(350), opacity: 1, zIndex: 3, borderRadius: rw(24)}}>
              <text style={{fontFamily: 'Fighting', fontSize: rw(64),textAlign: 'center', color: '#ffffff', marginTop: rh(58), textAlign: 'center'}}>게임설명</text>
              <div style={{ whiteSpace: 'pre-line', position: 'relative', lineHeight: '1.5', fontFamily: 'Yangjin', fontSize: rw(14), textAlign: 'center', color: '#ffffff', marginTop: rh(51)}}>
                {`축제날 휴강을 안 하시는 교수님이 원망스러운`}
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <img style={{marginTop: rh(-2)}} src={리오} width={rw(19.48)} height={rh(19.48)}></img>
                <text style={{fontFamily: 'Yangjin', fontSize: rw(14), color: '#ffffff', marginLeft: rw(5), marginRight: rw(5)}}>리오와 리아</text>
                <img style={{marginTop: rh(-5), marginLeft: rw(-1)}} src={리아} width={rw(19.58)} height={rh(23.84)}></img>
              </div>
              <div style={{ whiteSpace: 'pre-line', position: 'relative', lineHeight: '1.5', fontFamily: 'Yangjin', fontSize: rw(14), textAlign: 'center', color: '#ffffff', marginBottom: rh(48) }}>
                {`축제가 너무 가고싶은 나머지 출튀를 결심하는데?
                이들을 덮치는 온갖 억까를 극복하고
                리딸라를 사서 축제에 가자!
                  
                조이스틱을 이용해서 리오를 움직일 수 있다.
                장애물을 들파하고 리딸라를 사서 무사히 잔광까지 가자`}
              </div>
            </div>
            <button style={{width: '100%', height: '100%', opacity: 0.7, backgroundColor: '#f4b9d2'}} onClick={()=>{setManual(false)}}></button>
          </div>}
        </div>
        :
        (isClear) ?
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 500, width: 500}}>
          <text style={{fontFamily: 'fighting', fontSize: rw(90.74), color: '#000000', marginTop: rh(133), zIndex: 3}} >축제도착~!!</text>
          <img style={{marginTop: rh(-42)}} src={success} width={rw(350)} height={rh(438)}></img> 
          <text>{name}</text>
          <text>{time/1000}초</text>
          <button onClick={()=>{navigate('/ranking')}}>순위 보러가기</button>
          <button onClick={()=>{
            //공유기능
          }}>공유하기</button>
        </div>
        :
        (fail) ?
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <img src={fail} style={{objectFit: 'cover'}} width={rw(350)} height={rh(438)}></img>
        </div>
        :
        <div style={{display: 'flex', flexDirection: 'column', position: 'relative', borderWidth: 1, borderStyle: 'solid', width: screenWidth, height: screenHeight, borderColor: '#000000', alignItems: 'center'}}>
          <text style={{marginTop: rh(36), fontSize: rw(40), fontFamily: 'Fighting', }}>{`스테이지 ${stage+1}`}</text>
          <div style={{position: 'relative', backgroundImage: `url(${stageSetting.bgd[stage]})`, backgroundSize: '100% 100%', width: gameScreenWidth, height: gameScreenHeight, touchAction: 'none', borderWidth: 1, borderStyle: 'solid', marginTop: rh(27)}}>
            {stageSetting.object[stage].map((pos, i)=>(pos[4] && <img src={pos.length == 6 ? pos[4].current :pos[4]} key={'barrier'+i.toString()} ref={(pos.length == 6) ? pos[4]: null} style={{ position: 'absolute', left: pos[0], top: pos[1], width: pos[2], height: pos[3],}}></img>))}
            {stageSetting.barrier[stage].map((pos, i)=>(pos[4] && <img src={pos.length == 6 ? pos[4].current :pos[4] } key={'barrier'+i.toString()} ref={(pos.length == 6) ? pos[4]: null} style={{ position: 'absolute', left: pos[0], top: pos[1], width: pos[2], height: pos[3], }}></img>))}
            {stageSetting.goal[stage][4] ? 
            <img src={stageSetting.goal[stage][4]} style={{ position: 'absolute', left: stageSetting.goal[stage][0], top: stageSetting.goal[stage][1], width: stageSetting.goal[stage][2], height: stageSetting.goal[stage][3]}}></img>
            : 
            <div style={{ position: 'absolute', left: stageSetting.goal[stage][0], top: stageSetting.goal[stage][1], width: stageSetting.goal[stage][2], height: stageSetting.goal[stage][3], borderColor: '#000000', backgroundColor: 'transparent', }}></div>}
            
            {stage == 1 &&             
            <animated.div style={{ position: 'absolute', x:taPos[0].x, y:taPos[0].y, width: taSize[0], height: taSize[1], }}>
                <animated.img ref={ta[0]} src={ta[0].current} alt={'ta1'} style={{width: '100%', height: '100%'}}></animated.img>
            </animated.div>}
            {stage == 1 &&             
            <animated.div style={{ position: 'absolute', x:taPos[1].x, y:taPos[1].y, width: taSize[0], height: taSize[1], }}>
                <animated.img ref={ta[1]} src={ta[1].current}  alt={'ta2'} style={{width: '100%', height: '100%'}}></animated.img>
            </animated.div>}

            <animated.div style={{ position: 'absolute', x:rioPos.x, y:rioPos.y, width: rioWidth, height: rioHeight, overflow: 'hidden'}}>
                <animated.img ref={rio} src={rio.current} onDragStart={handleDragStart} alt={'rio'} style={{width: rioWidth, height: rioHeight, objectFit: 'cover',}}></animated.img>
            </animated.div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', width: rw(203), height: rw(203), borderRadius: rw(203), borderColor: '#ec7fbc', backgroundColor: '#ffd3ea', borderWidth: 2, borderStyle: 'solid', marginTop: rh(35)}}>
              <animated.div {...bindLogoPos()}  style={{width: rw(76.99), height: rw(76.99), x:joystickPos.x, y:joystickPos.y, borderRadius: rw(77), background: 'transparent', alignSelf: 'center', pointerEvents: isBlocked ? 'none' : 'auto'}}>
                <img src={joystickImg} style={{width: rw(76.99), height: rw(76.99)}} draggable={false} ></img>
              </animated.div>
          </div>
          {(popUp && !alreadyPopUp) && <div style={{position: 'absolute', display: 'flex', flexDirection: 'column',alignItems: 'center', width: screenWidth, height: screenHeight, opacity: 1, left: 0, top: 0, backgroundColor: 'transparent', zIndex: 2}}>
            <img width={rw(350)} style={{ position: 'absolute', left: rw(45), top: rh(50), zIndex: 3}} src={컵홀더}></img>
            <text style={{marginTop: rh(589), fontSize: rw(60), color: '#ea7aba', fontFamily: 'Fighting', }}>리딸라 획득!</text>
            <button style={{ position: 'absolute', width: '100%', height: '100%',  borderWidth: 0, backgroundColor: 'transparent'}} onClick={()=>{setAlreadyPopUp(true);setPopUp(false); setIsBlocked(false);}}></button>
          </div>}
        </div>
        }
      </div>
    );
  }