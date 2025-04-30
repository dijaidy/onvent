import { useState } from "react";
import  "./Dressing.css";
import { ReactComponent as Soccer } from "../asset/dressingImages/Frame 11.svg";
import { ReactComponent as Hockey } from "../asset/dressingImages/Frame 10.svg";
import { ReactComponent as Shoes1 } from "../asset/dressingImages/Frame 12.svg";
import { ReactComponent as Shoes2 } from "../asset/dressingImages/Frame 13.svg";
import { ReactComponent as Shoes3 } from "../asset/dressingImages/Frame 14.svg";
import { ReactComponent as Shoes4 } from "../asset/dressingImages/Frame 15.svg";
import { ReactComponent as Head1 } from "../asset/dressingImages/Frame 8.svg";
import { ReactComponent as Head2 } from "../asset/dressingImages/Frame 9.svg";
import { ReactComponent as Head3 } from "../asset/dressingImages/Frame 16.svg";
import { ReactComponent as Head4 } from "../asset/dressingImages/Frame 17.svg";
import { ReactComponent as Eye1 } from "../asset/dressingImages/Frame 4.svg";
import { ReactComponent as Eye2 } from "../asset/dressingImages/Frame 5.svg";
import { ReactComponent as Eye3 } from "../asset/dressingImages/Frame 6.svg";
import { ReactComponent as Eye4 } from "../asset/dressingImages/Frame 7.svg";

import { ReactComponent as SoccerPo } from "../asset/dressingImages/soccerpo.svg";
import { ReactComponent as HockeyPo } from "../asset/dressingImages/hockeypo.svg";
import { ReactComponent as Shoes1Po } from "../asset/dressingImages/shoes1po.svg";
import { ReactComponent as Shoes2Po } from "../asset/dressingImages/shoes2po.svg";
import { ReactComponent as Shoes3Po } from "../asset/dressingImages/shoes3po.svg";
import { ReactComponent as Shoes4Po } from "../asset/dressingImages/shoes4po.svg";
import { ReactComponent as Head1Po } from "../asset/dressingImages/head1po.svg";
import { ReactComponent as Head2Po } from "../asset/dressingImages/head2po.svg";
import { ReactComponent as Head3Po } from "../asset/dressingImages/head3po.svg";
import { ReactComponent as Head4Po } from "../asset/dressingImages/head4po.svg";
import { ReactComponent as Eye1Po } from "../asset/dressingImages/eye1po.svg";
import { ReactComponent as Eye2Po } from "../asset/dressingImages/eye2po.svg";
import { ReactComponent as Eye3Po } from "../asset/dressingImages/eye3po.svg";
import { ReactComponent as Eye4Po } from "../asset/dressingImages/eye4po.svg";

import { ReactComponent as RioImg } from "../asset/dressingImages/rio.svg";
import { ReactComponent as FirstRio } from "../asset/dressingImages/firstRio.svg";
import { ReactComponent as Background05 } from "../asset/dressingImages/page5.svg";
import { ReactComponent as Backgound14 } from "../asset/dressingImages/page1-4.svg";
import { ReactComponent as Title } from "../asset/dressingImages/title.svg";
import { ReactComponent as StartButton } from "../asset/dressingImages/startbutton.svg";
import { ReactComponent as FirstInfo } from "../asset/dressingImages/firstInfo.svg";
import { ReactComponent as PrevButton } from "../asset/dressingImages/prevButton.svg";
import { ReactComponent as NextButton } from "../asset/dressingImages/nextButton.svg";
import { ReactComponent as ShareButton } from "../asset/dressingImages/shareButton.svg";
import { ReactComponent as Info } from "../asset/dressingImages/info.svg";
import { ReactComponent as EnterName } from "../asset/dressingImages/enterName.svg";

import { sendNameToFirebase } from '../utils/sendNameToFirebase';

import Swal from "sweetalert2";
import { useRef, useEffect, useLayoutEffect } from "react";
import * as htmlToImage from 'html-to-image';

const svgMap = {
  soccer: Soccer,
  hockey: Hockey,
  shoes1: Shoes1,
  shoes2: Shoes2,
  shoes3: Shoes3,
  shoes4: Shoes4,
  head1: Head1,
  head2: Head2,
  head3: Head3,
  head4: Head4,
  eye1: Eye1,
  eye2: Eye2,
  eye3: Eye3,
  eye4: Eye4,

  soccerpo: SoccerPo,
  hockeypo: HockeyPo,
  shoes1po: Shoes1Po,
  shoes2po: Shoes2Po,
  shoes3po: Shoes3Po,
  shoes4po: Shoes4Po,
  head1po: Head1Po,
  head2po: Head2Po,
  head3po: Head3Po,
  head4po: Head4Po,
  eye1po: Eye1Po,
  eye2po: Eye2Po,
  eye3po: Eye3Po,
  eye4po: Eye4Po,

  rioImg: RioImg,
  firstRio: FirstRio,
  background05: Background05,
  backgound14: Backgound14,
  title: Title,
  startButton: StartButton,
  firstInfo: FirstInfo,
  prevButton: PrevButton,
  nextButton: NextButton,
  shareButton: ShareButton,
  info: Info,
  enterName: EnterName
};

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
        {closet[stage - 1].map((outfit, idx) => {
          const Image = outfit;
          return( //이미지 버튼 만들기
          <button className={stage-1 ==0 ? "options optionsT" : "options"}key={idx} onClick={() => {selectOutfit(stage - 1, outfitPutOn[stage-1][idx]);}}>
            <Image/> 
          </button>
        )})}
      </div>
    );
  }
function PrevP({stage, setStage}){ //이전버튼 

    return(
        <button className="prevButton" onClick={()=>setStage(stage-1)}>
          <PrevButton className="imgInserted"/>
        </button>
    )
}
function NextP({stage, setStage}){ //다음버튼
    return(
        <button className="nextButton" onClick={()=>setStage(stage+1)}>
          <NextButton className="imgInserted"/>
        </button>
    )
}










  
export default function Dressing() {
    const [stage, setStage] = useState(0);
    const [codi, setCodi] = useState([null, null, null, null]);
  
    const closet = [ // 버튼용 이미지 저장
      [svgMap.soccer, svgMap.hockey],
      [svgMap.shoes1, svgMap.shoes2, svgMap.shoes3, svgMap.shoes4],
      [svgMap.head1, svgMap.head2, svgMap.head3, svgMap.head4],
      [svgMap.eye1, svgMap.eye2, svgMap.eye3, svgMap.eye4],
    ];

    const outfitPutOn = [ //입혀진 이미지
      [
       {src: svgMap.soccerpo, className: "soccerChosen"}, 
       {src: svgMap.hockeypo, className: "hockeyChosen"}
      ],
      [
       {src: svgMap.shoes1po, className: "shoes1Chosen"},
       {src: svgMap.shoes2po, className: "shoes2Chosen"},
       {src: svgMap.shoes3po, className: "shoes3Chosen"},
       {src: svgMap.shoes4po, className: "shoes4Chosen"}
      ],
      [
       {src: svgMap.head1po, className: "head1Chosen"}, 
       {src: svgMap.head2po, className: "head2Chosen"},
       {src: svgMap.head3po, className: "head3Chosen"},
       {src: svgMap.head4po, className: "head4Chosen"}
      ],
      [
       {src: svgMap.eye1po, className: "eye1Chosen"}, 
       {src: svgMap.eye2po, className: "eye2Chosen"},
       {src: svgMap.eye3po, className: "eye3Chosen"},
       {src: svgMap.eye4po, className: "eye4Chosen"}
      ]
    ];
    const [name, setName] = useState('');
    const textRef = useRef();
    const [fontSize, setFontSize] = useState(50);
    const hasSubmitted = useRef(false);
    const [canShare, setCanShare] = useState(false); // 상단에 추가

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












    useEffect(() => {
      if (stage === 5) {
        window.alert("코드반영테스트트")
        console.log("⏱️ Stage 5 진입 - 버튼 3초 잠금 시작");
        setCanShare(false);
        const timer = setTimeout(() => {
          console.log("✅ 3초 지남 - 버튼 활성화");
          setCanShare(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [stage]);
    



    
    async function waitForFontFullyRendered(selector, targetFont, timeout = 3000) {
      const start = Date.now();
      while (Date.now() - start < timeout) {
        const el = document.querySelector(selector);
        if (el) {
          const computed = window.getComputedStyle(el);
          const font = computed.fontFamily;
          const width = el.scrollWidth;
          const height = el.offsetHeight;
    
          console.log(`⏱️ 폰트 상태 체크: ${font}, size: ${width}x${height}`);
    
          if (font.includes(targetFont) && width > 0 && height > 0) {
            console.log('✅ 폰트 완전 적용 + 렌더 완료');
            return true;
          }
        }
        await new Promise(r => setTimeout(r, 100));
      }
      console.warn('⚠️ 폰트 렌더 타임아웃');
      return false;
    }
    
    





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
          pixelRatio: 2,
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











    async function ensureElementRendered(selector, timeout = 3000) {
      const start = Date.now();
    
      while (Date.now() - start < timeout) {
        const el = document.querySelector(selector);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            return true;
          }
        }
        await new Promise(r => setTimeout(r, 100));
      }
    
      console.warn('⚠️ 엘리먼트 렌더 타임아웃');
      return false;
    }

    









    const handleShareAndCapture = async () => {
      Swal.fire({
        title: '이미지 불러오는 중',
        html: '잠시만 기다려주리오!<br>저장된 코디를 인스타에 공유하리오~',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    
      await new Promise(resolve => setTimeout(resolve, 800));
    
      // 🔥 1. 폰트 적용 완료 검사
      const fontReady = await waitForFontFullyRendered('.userName', 'Romance');
      if (!fontReady) {
        Swal.fire({
          icon: 'error',
          title: '폰트 적용 실패',
          html: '폰트가 적용되지 않아 캡처를 중단하리오!<br>잠시 후 다시 시도해주리오 🙏',
        });
        return;
      }
    
      // 🔥 1.5 실제 렌더 상태 확인
      const rendered = await ensureElementRendered('.userName');
      if (!rendered) {
        Swal.fire({
          icon: 'error',
          title: '렌더 지연 발생',
          html: '텍스트가 완전히 표시되지 않아 캡처를 중단하리오!',
        });
        return;
      }
    
      // 🔥 2. 이름 보내기 (처음 1회만)
      /*if (!hasSubmitted.current) {
        try {
          await handleShareName(); // 내부에서만 성공 후 hasSubmitted = true
          hasSubmitted.current = true;
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: '이름 저장 실패',
            html: '문제가 발생했다리오ㅠㅠ <br> 다시 시도해주리오!',
          });
          return;
        }
      }*/
    
      // 🔥 3. 캡처 진행
      const dataUrl = await handleCapture();
    
      if (dataUrl) {
        const img = new Image();
        img.src = dataUrl;
    
        img.onload = () => {
          Swal.fire({
            title: '길게 눌러 저장하리오!',
            html: `<div style="max-height:60vh; overflow:auto; touch-action:none;">
                    <img src="${dataUrl}" className="capture" style="width:100%; height:auto; "/>
                  </div>`,
            confirmButtonText: '확인',
          });
        };
      }
    };
    
    
    

  










  
    return (
      <div className="mainContainer" style={{touchAction: 'none'}}>
        {(() => {
          if (stage === 0) {
            return (
              <div className="background05">
                <div style={{width: window.innerWidth, position: 'absolute', top: 0}}>
                  <Background05 className="backgroundImgs"/>
                </div>
                <div className="page">
                  <div className="page0">

                    <div className="title">
                      <Title className="imgInserted"/>
                    </div>

                    <div className="firstRio">
                      <FirstRio className="imgInserted" />
                    </div>

                    <div className='enterNameDiv'> {/*이름입력*/}                  
                      <EnterName width={`100%`} height={`100%`}/>           
                      <input value={name} onChange={(e)=>{setName(e.target.value)}}type="text" className="enterName" style={{zIndex: 2}}></input>
                    </div>
                    {/*시작버튼 */}
                    <button className="startbutton" onClick={() =>{/*if(!name.trim()){Swal.fire('이름을 입력해주리오!'); return;}*/setStage(1);window.scrollTo(0, 0);}}>
                      <StartButton className="imgInserted" />
                    </button>

                    <div className="firstInfo">
                      <FirstInfo className="imgInserted"/>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (stage >= 1 && stage <= 4) {
            return ( 
              <div className="background14">
                <div style={{width: window.innerWidth, position: 'absolute', top: 0}}>
                  <Backgound14 className="backgroundImgs"/> 
                </div>
                <div className="page">
                  <div className="page1-4">
                    
                    {codi.map( //선택된 의상 입히기
                      (item, i) =>
                      {
                        let Image = null;
                        if (item) {
                          Image = item.src;
                        }
                        return(
                        item && (
                          <Image
                            className={item.className}
                            key={i}
                            style={{ position: "absolute" }}
                          />
                        )
                      )
                      }
                    )}
                      
                    
                    <div className="rio">
                      <RioImg className="imgInserted"/>
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
                <div style={{width: window.innerWidth, position: 'absolute', top: 0}}>
                <Background05 className="backgroundImgs"/>
                </div>
                <div className="captureArea">
                  <Background05 className="backgroundImgs"/>
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
                        (item, i) =>{
                          let Image;
                          if (item){
                            Image = item.src;
                          }
                          return (item && (
                            <Image
                              className={item.className}
                              key={i}
                              style={{ position: "absolute" }}
                               crossOrigin="anonymous"
                            />
                          ))
                        }
                      )}

                      <div className="rio">
                        <RioImg className="imgInserted" crossOrigin="anonymous"/>
                      </div>
                              
                      <div className="info">
                        <Info className="imgInserted" crossOrigin="anonymous"/>
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
                      (item, i) =>{
                        let Image;

                        if (item) {
                          Image = item.src;
                        }
                        return(
                        item && (
                          <Image
                            className={item.className}
                            key={i}
                            style={{ position: "absolute" }}
                          />
                        ))}
                    )}
                    
                    <div className="rio">
                      <RioImg className="imgInserted"/>
                    </div>
                      {/**공유, 이름 저장, 이미지 저장 */}
                    <button
                      className="shareButton"
                      onClick={(e) => {
                        if (!canShare) {
                          e.preventDefault();
                          return;
                        }
                        handleShareAndCapture();
                      }}
                      disabled={!canShare}
                    >
                      <ShareButton className="imgInserted"/>
                    </button>

                      {/**축제정보 */}
                    <div className="info">
                      <Info className="imgInserted"/>
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
  