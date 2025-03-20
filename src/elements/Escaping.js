import React, { useEffect, useRef, useState } from "react";
import rio from '../asset/Doraemon.jpg';
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";

const screenWidth = 350;
const screenHeight = 500;
const rioWidth = 100;
const rioHeight = 100;
const joystickRadius = 50;
const joystickInterRadius = 25;
const velocity = 0.1;
const barrier = [[40, 140, 50, 200], [140, 140, 50, 50]];

export default function Escaping() {
    const joystickPos = useSpring({x: 0, y: 0});
    const rioPos = useSpring({x: 0, y: 0});
    let animationId;

    const updatePosition = () => {
      const rioVelocity = [joystickPos.x.get(), joystickPos.y.get()];
      let newX = Math.min(Math.max(rioPos.x.get() + rioVelocity[0]*velocity, 0), screenWidth-rioWidth);
      let newY = Math.min(Math.max(rioPos.y.get() + rioVelocity[1]*velocity, 0), screenHeight-rioHeight);

      let barrierLeft;
      let barrierRight;
      let barrierTop;
      let barrierBottom;

      for (let i = 0; i < barrier.length ; i++) {
        barrierLeft = barrier[i][0];
        barrierRight = barrier[i][0]+barrier[i][2];
        barrierTop = barrier[i][1];
        barrierBottom = barrier[i][1]+barrier[i][3];

        if (barrierRight-10 < newX && newX < barrierRight&& newY + rioHeight > barrierTop && newY < barrierBottom) { // right collision
          if (barrierTop+10 > newY + rioHeight &&  newY + rioHeight > barrierTop && newX + rioWidth > barrierLeft && newX < barrierRight && rioVelocity[1] >= 0){
            newY = barrierTop - rioHeight;
            break;
          } else if (barrierBottom-10 < newY && newY < barrierBottom && newX + rioWidth > barrierLeft && newX < barrierRight && rioVelocity[1] <= 0) {
            newY = barrierBottom;
            break;
          }
          newX = barrierRight;
          break;
        } else if (barrierLeft+10 > newX + rioWidth && newX + rioWidth > barrierLeft && newY + rioHeight > barrierTop && newY < barrierBottom) { // left collision
          if (barrierTop+10 > newY + rioHeight &&  newY + rioHeight > barrierTop && newX + rioWidth > barrierLeft && newX < barrierRight && rioVelocity[1] >= 0){
            newY = barrierTop - rioHeight;
            break;
          } else if (barrierBottom-10 < newY && newY < barrierBottom && newX + rioWidth > barrierLeft && newX < barrierRight && rioVelocity[1] <= 0) {
            newY = barrierBottom;
            break;
          }
          newX = barrierLeft - rioWidth;
          break;
        } else if (barrierTop+10 > newY + rioHeight &&  newY + rioHeight > barrierTop && newX + rioWidth > barrierLeft && newX < barrierRight){ // top collision
          newY = barrierTop - rioHeight;
          break;
        } else if (barrierBottom-10 < newY && newY < barrierBottom && newX + rioWidth > barrierLeft && newX < barrierRight){ // bottom collision
          newY = barrierBottom;
          break;
        }

      }

        
      rioPos.x.set(newX);
      rioPos.y.set(newY);

      animationId = requestAnimationFrame(updatePosition);
    };

    const bindLogoPos = useDrag((e)=>{
      if (e.first){
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
        joystickPos.x.start(0, {config: {duration: 200}});
        joystickPos.y.start(0, {config: {duration: 200}});
        setTimeout(()=>{cancelAnimationFrame(animationId)}, 200);
      }

        },
      {
        preventScroll: true,
        pointer: { touch: true},
      })

    const handleDragStart = (e) => {
      e.preventDefault(); 
    };


    return (
      <div style={{position: 'relative', width: screenWidth, height: screenHeight, borderWidth: 1, borderStyle: 'solid', borderColor: '#000000', touchAction: 'none'}}>
        <animated.div style={{ x:rioPos.x, y:rioPos.y, width: 100, height: 100}}>
            <img src={rio} onDragStart={handleDragStart} alt={'rio'} style={{width: rioWidth, height: rioHeight, }}></img>
        </animated.div>
        <div style={{display: 'flex', justifyContent: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: '#000000', opacity: 0.3, position: 'absolute', right: 50, bottom: 50}}>
          <animated.div {...bindLogoPos()}  style={{width: 50, height: 50, x:joystickPos.x, y:joystickPos.y, borderRadius: 25, background: '#ffffff', alignSelf: 'center', pointerEvents: 'auto'}}>
          </animated.div>
        </div>
        {barrier.map((pos, i)=><div key={'barrier'+i.toString()} style={{ position: 'absolute', left: pos[0], top: pos[1], width: pos[2], height: pos[3], borderColor: '#000000', borderWidth: 1, borderStyle: 'solid',}}></div>)}
      </div>
    );
  }