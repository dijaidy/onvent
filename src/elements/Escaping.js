import React, { useEffect, useRef, useState } from "react";
import rio from '../asset/Doraemon.jpg';
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import { rh, rw } from "../managements/Dimensions";
import { data, useNavigate } from "react-router-dom";
import '../index.css';
import Swal from 'sweetalert2';

import chultui_intro from "../asset/dressingImages/chultui_intro.svg";
import chultui_button from "../asset/dressingImages/chultui_button.svg"

const screenWidth = rw(440);
const screenHeight = rh(956);
const rioWidth = 100;
const rioHeight = 100;
const joystickRadius = 50;
const joystickInterRadius = 25;
const velocity = 0.1;
const stageSetting = {
  starting: [[0, 0], [50, 600]],
  barrier: [
    [[140, 140, 50, 200], [240, 140, 50, 50]], 
    [[40, 140, 50, 200], [140, 140, 50, 50]]
  ],
  goal: [[140, 540, 50, 50], [50, 50, 50, 50]]
}
const barrier = [[140, 140, 50, 200], [240, 140, 50, 50]];

export default function Escaping() {
    const [stage, setStage] = useState(-1);
    const stageRef = useRef(stage);
    const animationId = useRef(null);
    const [name, setName] = useState('');
    const [isClear, setIsClear] = useState(false);
    const [time, setTime] = useState(0);
    const [manual, setManual] = useState(false);

    const navigate = useNavigate();

    const joystickPos = useSpring({x: 0, y: 0});
    const rioPos = useSpring({x: 0, y: 0});

    useEffect(()=>{
      stageRef.current = stage;
    }, [stage])

    const updatePosition = () => {
      const rioVelocity = [joystickPos.x.get(), joystickPos.y.get()];
      
      let newX = Math.min(Math.max(rioPos.x.get() + rioVelocity[0]*velocity, 0), screenWidth-rioWidth);
      let newY = Math.min(Math.max(rioPos.y.get() + rioVelocity[1]*velocity, 0), screenHeight-rioHeight);

      console.log(stageRef.current)

      let boxLeft;
      let boxRight;
      let boxTop;
      let boxBottom;

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

      boxLeft = stageSetting.goal[stageRef.current][0];
      boxRight = stageSetting.goal[stageRef.current][0]+stageSetting.goal[stageRef.current][2];
      boxTop = stageSetting.goal[stageRef.current][1];
      boxBottom = stageSetting.goal[stageRef.current][1]+stageSetting.goal[stageRef.current][3];

      animationId.current = requestAnimationFrame(updatePosition);

      if ( boxTop < newY + rioHeight &&  boxBottom > newY && newX + rioWidth > boxLeft && newX < boxRight){ // top collision
        if (stageRef.current+1 < stageSetting.barrier.length) {
          newX = stageSetting.starting[stageRef.current+1][0];
          newY = stageSetting.starting[stageRef.current+1][1];
          setStage(stageRef.current+1);
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
              setStage(0);
              setTime(Date.now());
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
          {(manual) && <div style={{position: 'absolute', width: screenWidth, height: screenHeight, opacity: 1, left: 0, top: 0, backgroundColor: 'transparent', zIndex: 2}}>
            <div style={{position: 'absolute', top: rh(279), backgroundColor: '#ec7fbc', opacity: 1, zIndex: 3}}>
              <text style={{fontFamily: 'Yangjin', fontSize: rw(64),textAlign: 'center', color: '#ffffff',}}>게임설명</text>
            </div>
            <div style={{width: '100%', height: '100%', opacity: 0.7, backgroundColor: '#f4b9d2'}}></div>
          </div>}
        </div>
        :
        (isClear) ?
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 500, width: 500}}>
          <text>축제 도착</text>
          <text>{name}</text>
          <text>{time/1000}초</text>
          <button onClick={()=>{navigate('/ranking')}}>순위 보러가기</button>
          <button onClick={()=>{
            //공유기능
          }}>공유하기</button>
        </div>
        :
        <div style={{position: 'relative', width: screenWidth, height: screenHeight, borderWidth: 1, borderStyle: 'solid', borderColor: '#000000', touchAction: 'none'}}>
          <animated.div style={{ x:rioPos.x, y:rioPos.y, width: 100, height: 100}}>
              <img src={rio} onDragStart={handleDragStart} alt={'rio'} style={{width: rioWidth, height: rioHeight, }}></img>
          </animated.div>
          <div style={{display: 'flex', justifyContent: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: '#000000', opacity: 0.3, position: 'absolute', right: 50, bottom: 50}}>
            <animated.div {...bindLogoPos()}  style={{width: 50, height: 50, x:joystickPos.x, y:joystickPos.y, borderRadius: 25, background: '#ffffff', alignSelf: 'center', pointerEvents: 'auto'}}>
            </animated.div>
          </div>
          {stageSetting.barrier[stage].map((pos, i)=><div key={'barrier'+i.toString()} style={{ position: 'absolute', left: pos[0], top: pos[1], width: pos[2], height: pos[3], borderColor: '#000000', borderWidth: 1, borderStyle: 'solid',}}></div>)}
          {<div style={{ position: 'absolute', left: stageSetting.goal[stage][0], top: stageSetting.goal[stage][1], width: stageSetting.goal[stage][2], height: stageSetting.goal[stage][3], borderColor: '#000000', backgroundColor: '#0000ff', borderWidth: 1, borderStyle: 'solid',}}></div>}
        </div>
        }
      </div>
    );
  }