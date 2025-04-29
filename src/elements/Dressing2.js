import { useState } from "react";
import  "./Dressing.css";
import soccer from "../asset/dressingImages/Frame 11.svg";
import hockey from "../asset/dressingImages/Frame 10.svg";
import shoes1 from "../asset/dressingImages/Frame 12.svg";
import shoes2 from "../asset/dressingImages/Frame 13.svg";
import shoes3 from "../asset/dressingImages/Frame 14.svg";
import shoes4 from "../asset/dressingImages/Frame 15.svg";
import head1 from "../asset/dressingImages/Frame 8.svg";
import head2 from "../asset/dressingImages/Frame 9.svg";
import head3 from "../asset/dressingImages/Frame 16.svg";
import head4 from "../asset/dressingImages/Frame 17.svg";  
import eye1 from "../asset/dressingImages/Frame 4.svg";
import eye2 from "../asset/dressingImages/Frame 5.svg";
import eye3 from "../asset/dressingImages/Frame 6.svg";
import eye4 from "../asset/dressingImages/Frame 7.svg";
import soccerpo from"../asset/dressingImages/soccerpo.svg";
import hockeypo from"../asset/dressingImages/hockeypo.svg";
import shoes1po from"../asset/dressingImages/shoes1po.svg";
import shoes2po from"../asset/dressingImages/shoes2po.svg";
import shoes3po from"../asset/dressingImages/shoes3po.svg";
import shoes4po from"../asset/dressingImages/shoes4po.svg";
import head1po from"../asset/dressingImages/head1po.svg";
import head2po from"../asset/dressingImages/head2po.svg";
import head3po from"../asset/dressingImages/head3po.svg";
import head4po from"../asset/dressingImages/head4po.svg";
import eye1po from"../asset/dressingImages/eye1po.svg";
import eye2po from"../asset/dressingImages/eye2po.svg";
import eye3po from"../asset/dressingImages/eye3po.svg";
import eye4po from"../asset/dressingImages/eye4po.svg";
import rioImg from "../asset/dressingImages/rio.svg";
import firstRio from "../asset/dressingImages/firstRio.svg";
import background05 from "../asset/dressingImages/page5.svg";
import backgound14 from "../asset/dressingImages/page1-4.svg";
import title from "../asset/dressingImages/title.svg";
import startButton from "../asset/dressingImages/startbutton.svg";
import firstInfo from "../asset/dressingImages/firstInfo.svg";
import prevButton from "../asset/dressingImages/prevButton.svg";
import nextButton from "../asset/dressingImages/nextButton.svg";
import shareButton from "../asset/dressingImages/shareButton.svg";
import info from "../asset/dressingImages/info.svg";
import enterName from '../asset/dressingImages/enterName.svg';

import { sendNameToFirebase } from '../utils/sendNameToFirebase';

import Swal from "sweetalert2";
import { useRef, useEffect, useLayoutEffect } from "react";
import * as htmlToImage from 'html-to-image';

function Call({ codi, setCodi, closet, stage, outfitPutOn }) {
    function selectOutfit(index, outfit) {
      setCodi(prevCodi => {
        const newCodi = [...prevCodi];  // 기존 배열 복사
        newCodi[index] = outfit;        // 선택한 의상 업데이트
        return newCodi;
      });
    }
  
    return (
      <div className="dressButtons">
        {closet[stage - 1].map((outfit, idx) => ( //이미지 버튼 만들기
          <button className={stage-1 ==0 ? "options optionsT" : "options"}key={idx} onClick={() => {selectOutfit(stage - 1, outfitPutOn[stage-1][idx]);}}>
            <img src={outfit} alt={`option ${idx}`}/> 
          </button>
        ))}
      </div>
    );
  }
function PrevP({stage, setStage}){ //이전버튼 
    return(
        <button className="prevButton" onClick={()=>setStage(stage-1)}>
          <img src={prevButton} className="imgInserted"/>
        </button>
    )
}
function NextP({stage, setStage}){ //다음버튼
    return(
        <button className="nextButton" onClick={()=>setStage(stage+1)}>
          <img src={nextButton} className="imgInserted"/>
        </button>
    )
}










  
export default function Dressing() {
    const [stage, setStage] = useState(0);
    const [codi, setCodi] = useState([null, null, null, null]);
  
    const closet = [ // 버튼용 이미지 저장
      [soccer, hockey],
      [shoes1, shoes2, shoes3, shoes4],
      [head1, head2, head3, head4],
      [eye1, eye2, eye3, eye4],
    ];

    const outfitPutOn = [ //입혀진 이미지
      [
       {src: soccerpo, className: "soccerChosen"}, 
       {src: hockeypo, className: "hockeyChosen"}
      ],
      [
       {src: shoes1po, className: "shoes1Chosen"},
       {src: shoes2po, className: "shoes2Chosen"},
       {src: shoes3po, className: "shoes3Chosen"},
       {src: shoes4po, className: "shoes4Chosen"}
      ],
      [
       {src: head1po, className: "head1Chosen"}, 
       {src: head2po, className: "head2Chosen"},
       {src: head3po, className: "head3Chosen"},
       {src: head4po, className: "head4Chosen"}
      ],
      [
       {src: eye1po, className: "eye1Chosen"}, 
       {src: eye2po, className: "eye2Chosen"},
       {src: eye3po, className: "eye3Chosen"},
       {src: eye4po, className: "eye4Chosen"}
      ]
    ];
    const [name, setName] = useState('');
    const textRef = useRef();
    const [fontSize, setFontSize] = useState(50);
    const hasSubmitted = useRef(false);
    

    useLayoutEffect(() => {
      if (stage !== 5) return;
    
      const el = textRef.current;
      if (!el || !el.parentElement) {
        console.log('❌ useLayoutEffect에서도 ref 안 잡힘');
        return;
      }
    
      el.style.fontSize = '50px';
      const parentWidth = el.parentElement.clientWidth;
    
      document.fonts.ready.then(() => {
        const actualWidth = el.scrollWidth;
        const ratio = parentWidth / actualWidth;
        const newFontSize = ratio < 1 ? 50 * ratio : 50;
    
        setFontSize(newFontSize);
        console.log(`✅ useLayoutEffect에서 폰트 크기 설정됨: ${newFontSize}px`);
      });
    }, [name, stage]);
  

    const handleCapture = async () => {
      const node = document.querySelector('.captureArea');
      
      if (!node) {
        alert("❌ 캡쳐 대상이 없습니다!");
        return null;
      }

      try {
        if (document.fonts && document.fonts.ready) { 
          await document.fonts.ready;
        }

        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        await new Promise(resolve => setTimeout(resolve, 400));

        const dataUrl = await htmlToImage.toPng(node, {
          backgroundColor: '#ffffff',
          cacheBust: true,
        });

        return dataUrl; // ✅ 캡처된 이미지 URL 반환

      } catch (error) {
        console.error('캡쳐 실패 😱', error);
        alert("⚠️ 캡쳐에 실패했습니다. 다시 시도해 주세요!");
        return null;
      }
    };

    const handleShareName = async () => {
      if (hasSubmitted.current) return;

      hasSubmitted.current = true;

      try {
        await sendNameToFirebase(name);
      } catch (err) {
        hasSubmitted.current = false;
        Swal.fire({
          icon: 'error',
          title: '이름 저장 실패',
          html: '문제가 발생했다리오 <br> 다시 시도해 주리오ㅠㅠㅠ',
        });
      }
    };

    const handleShareAndCapture = async () => {
      // 🔥 이름 저장은 첫 클릭만
      if (!hasSubmitted.current) {
        hasSubmitted.current = true;
    
        try {
          //await handleShareName(); // ✅ 이름 저장
    
          Swal.fire({
            html: '이미지를 불러오는 중이리오..<br> 잠시만 기다려주리오!<br>저장된 코디를 인스타에 공유하리오~',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
    
          await new Promise(resolve => setTimeout(resolve, 800));
    
          const dataUrl = await handleCapture();
    
          if (dataUrl) {
            Swal.fire({
              title: '길게 눌러 저장하리오!',
              html: `<div style="max-height:60vh; overflow:auto;">
                       <img src="${dataUrl}" style="width:100%; height:auto;"/>
                     </div>`,
              confirmButtonText: '확인',
            });
          }
    
        } catch (err) {
          hasSubmitted.current = false;
          Swal.fire({
            icon: 'error',
            title: '이름 저장 실패',
            html: '문제가 발생했다리오ㅠㅠ <br> 다시 시도해주리오!',
          });
        }
    
      } else {
        // ✅ 두 번째 클릭부터는 이름 저장 없이 바로 캡처만
        Swal.fire({
          html: '이미지를 다시 불러오는 중이리오!',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
    
        await new Promise(resolve => setTimeout(resolve, 800));
    
        const dataUrl = await handleCapture();
    
        if (dataUrl) {
          Swal.fire({
            title: '길게 눌러 저장하리오!',
            html: `
              <div style="max-height:60vh; overflow:auto;">
                <img src="${dataUrl}" style="width:100%; height:auto;"/>
              </div>
            `,
            confirmButtonText: '확인',
          });
        }
      }
    };
    

  










  
    return (
      <div className="mainContainer">
        {(() => {
          if (stage === 0) {
            return (
              <div className="background05">
                <img src={background05} className="backgroundImgs"/>
                
                <div className="page">
                  <div className="page0">

                    <div className="title">
                      <img src={title} className="imgInserted"/>
                    </div>

                    <div className="firstRio">
                      <img src={firstRio} className="imgInserted"/>
                    </div>

                    <div className='enterNameDiv'> {/*이름입력*/}                  
                      <img src={enterName} width={`100%`} height={`100%`}></img>            
                      <input value={name} onChange={(e)=>{setName(e.target.value)}}type="text" className="enterName" style={{zIndex: 2}}></input>
                    </div>
                    {/*시작버튼 */}
                    <button className="startbutton" onClick={() =>{/*if(!name.trim()){Swal.fire('이름을 입력해주리오!'); return;}*/setStage(1)}}>
                      <img src={startButton} className="imgInserted"/>
                    </button>

                    <div className="firstInfo">
                      <img src={firstInfo} className="imgInserted"/>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (stage >= 1 && stage <= 4) {
            return ( 
              <div className="background14">
                <img src={backgound14} className="backgroundImgs"/> 
                <div className="page">
                  <div className="page1-4">
                    
                    {codi.map( //선택된 의상 입히기
                      (item, i) =>
                        item && (
                          <img
                            src={item.src}
                            className={item.className}
                            key={i}
                            style={{ position: "absolute" }}
                          />
                        )
                    )}
                      
                    
                    <div className="rio">
                      <img src={rioImg} className="imgInserted"/>
                    </div>
                      
                      {/* ✅ Call 컴포넌트 한 번만 사용 */}
                    <Call codi={codi} setCodi={setCodi} closet={closet} stage={stage} outfitPutOn={outfitPutOn} />      
                      
                    <div className="stageButtons"> {/* 스테이지버튼 */}
                      <PrevP stage={stage} setStage={setStage} />
                      <NextP stage={stage} setStage={setStage} />
                    </div>
                  
                  </div>
                </div>
              </div>
            );
          } else if (stage === 5) {
            return (
              <div className="background05">
                <img src={background05} className="backgroundImgs"/>
                <div className="captureArea">
                  <img src={background05} className="backgroundImgs"/>
                  <div className="captureContainer">
                    <div className="captureContents">
                      
                      <div className="userNameBox"> {/** 상단 메시지지 */}
                        <div className="userName" ref={textRef} 
                        style={{
                          fontFamily: "'Romance', saneserif", 
                          fontSize: `${fontSize}px`,
                          WebkitTextStroke: '1.3px white',
                          color: '#d73e8a',
                          whiteSpace: 'nowrap' }}>
                          {name}의 코디!
                        </div>  
                      </div>

                      {codi.map( //옷입은 리오모습
                        (item, i) =>
                          item && (
                            <img
                              src={item.src}
                              className={item.className}
                              key={i}
                              style={{ position: "absolute" }}
                               crossOrigin="anonymous"
                            />
                          )
                      )}

                      <div className="rio">
                        <img src={rioImg} className="imgInserted" crossOrigin="anonymous"/>
                      </div>
                              
                      <div className="info">
                        <img src={info} className="imgInserted" crossOrigin="anonymous"/>
                      </div>
                    </div>  
                  </div>
                </div>

                <div className="page">
                  <div className="page5">
                  
                    <div className="userNameBox"> {/** 상단 메시지지 */}
                      <div className="userName" ref={textRef} 
                      style={{ 
                        fontFamily: "'Romance', sans-serif", 
                        fontSize: `${fontSize}px`, 
                        WebkitTextStroke: '1.3px white', 
                        color: '#d73e8a', 
                        whiteSpace: 'nowrap' }}>
                        {name}의 코디!
                      </div>  
                    </div>

                    {codi.map( //옷입은 리오모습
                      (item, i) =>
                        item && (
                          <img
                            src={item.src}
                            className={item.className}
                            key={i}
                            style={{ position: "absolute" }}
                          />
                        )
                    )}
                    
                    <div className="rio">
                      <img src={rioImg} className="imgInserted"/>
                    </div>
                      {/**공유, 이름 저장, 이미지 저장 */}
                    <button className="shareButton" onClick={() => {handleShareAndCapture()}}>
                      <img src={shareButton} className="imgInserted"/>
                    </button>
                      {/**축제정보 */}
                    <div className="info">
                      <img src={info} className="imgInserted"/>
                    </div> 
                  
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}
      </div>
    );
  }
  