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

import { sendNameToFirebase } from '../utils/sendNameToFirebase';
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import { useEffect } from "react";

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

    const [capturedImage, setCapturedImage] = useState(null);

    const handleCapture = async () => {
      setLoading(true);
    
      const target = document.querySelector(".captureArea");
    
      // 모든 이미지 로딩 완료
      const images = target.querySelectorAll("img");
      await Promise.all(Array.from(images).map(img =>
        new Promise((resolve) => {
          if (img.complete && img.naturalHeight !== 0) resolve();
          else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
      ));
    
      // 모든 폰트 로딩 완료
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    
      // 딜레이 살짝 추가해 렌더 완료 시간 확보
      await new Promise(resolve => setTimeout(resolve, 300));
    
      // 캡처 실행
      html2canvas(target, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      }).then(canvas => {
        const imageUrl = canvas.toDataURL("image/png");
        setCapturedImage(imageUrl);
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        alert("⚠️ 캡처 실패: " + err.message);
      });
    };
    
    
    
    
    
    
    
    

    

    

    
 


    const handleShareClick = () => {
      if (!capturedImage) {
        alert("이미지를 아직 불러오는 중입니다. 잠시 후 다시 시도해주세요!");
        return;
      }
    
      const popup = window.open("", "_blank");
      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        alert("팝업을 허용해야 이미지를 저장할 수 있습니다.");
        return;
      }
    
      popup.document.write(`
        <html><head><title></title></head>
        <body style="margin:0; display:flex; align-items:center; justify-content:center;">
          <img src="${capturedImage}" style="width:100%; height:auto;" />
        </body></html>
      `);
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  
    const getFontSizeByName = (name) => {
      const length = name.length;
      if (length <= 3) return 55;   // 아주 짧은 이름은 크게
      if (length <= 5) return 45;
      if (length <= 8) return 40;
      return 24;                    // 긴 이름은 작게
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
                      <input value={name} onChange={(e)=>{setName(e.target.value)}}type="text" className="enterName"></input>
                    </div>
                    {/*시작버튼 */}
                    <button className="startbutton" onClick={() =>{/*if(!name.trim()){Swal.fire('이름을 입력해주세요!'); return;}*/setStage(1)}}>
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
                      
                    <div className="stageButtons"> {/* 스테이지버튼튼 */}
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
                        <div className="userName" style={{ fontSize: `${getFontSizeByName(name)}px` }}>
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
                      <div className="userName" style={{ fontSize: `${getFontSizeByName(name)}px` }}>
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
                    <button className="shareButton" onClick={() => {/*sendNameToFirebase(name);*/ handleCapture();}}>
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
  