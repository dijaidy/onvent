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
import { sendNameToFirebase } from '../utils/sendNameToFirebase';
import html2canvas from "html2canvas";
import Swal from "sweetalert2";

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
          <button className="options" key={idx} onClick={() => {selectOutfit(stage - 1, outfitPutOn[stage-1][idx]);}}>
            <img src={outfit} alt={`option ${idx}`}/> 
          </button>
        ))}
      </div>
    );
  }
function PrevP({stage, setStage}){ //이전버튼 
    return(
        <button className="prevButton" onClick={()=>setStage(stage-1)}></button>
    )
}
function NextP({stage, setStage}){ //다음버튼
    return(
        <button className="nextButton" onClick={()=>setStage(stage+1)}></button>
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

    const handleDownloadImg = async () => {
      const target = document.querySelector(".page5");
      const shareButton = document.querySelector(".shareButton");
    
      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (!target) return;
    
      if (shareButton) shareButton.style.visibility = "hidden";
    
      const canvas = await html2canvas(target, { useCORS: true });
      const picture_url = canvas
        .toDataURL("image/png")
        .replace(/^data:image\/png/, "data:application/octet-stream");
    
      if (!isMobile) {
        // ✅ PC: 자동 다운로드
        const link = document.createElement("a");
        link.download = `Rio_${new Date().toLocaleString()}.png`;
        link.href = picture_url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
        Swal.fire("코디가 저장되었습니다!");
      } else {
        // ✅ 모바일: 터치 이벤트 등록
        const share_y = canvas.height * 0.9;
        const share_height = canvas.height * 0.1;
    
        canvas.addEventListener("touchstart", (e) => {
          const x = e.changedTouches[0].pageX * window.devicePixelRatio;
          const y = e.changedTouches[0].pageY * window.devicePixelRatio;
    
          if (0.17 * canvas.width <= x && x <= 0.83 * canvas.width) {
            if (share_y - share_height / 2 <= y && y <= share_y) {
              // ⬇ 이미지 다운로드
              const picture_download = document.createElement("a");
              picture_download.setAttribute(
                "download",
                `Rio_${new Date().toLocaleString()}.png`
              );
              picture_download.setAttribute("href", picture_url);
              document.body.appendChild(picture_download);
              picture_download.click();
              alert("리오, 내 마음속에 저장🩷");
            } else if (share_y < y && y <= share_y + share_height / 2) {
              // ⬇ 링크 복사
              navigator.clipboard.writeText(window.location.href);
              alert("링크가 복사되었다리오!");
            }
          }
        });
    
        document.body.appendChild(canvas); // 필요하다면 이미지 화면에 삽입
        alert("화면 하단을 터치하여 저장하거나 링크 복사할 수 있어요!");
      }
    
      if (shareButton) shareButton.style.visibility = "visible";
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
                <div className="page">
                  <div className="page0">

                    <div className="title"></div>

                    <div className="firstRio"></div>

                    <div className='enterNameDiv'> {/*이름입력*/}                  
                      <input value={name} onChange={(e)=>{setName(e.target.value)}}type="text" className="enterName"></input>
                    </div>
                    {/*시작버튼 */}
                    <button className="startbutton" onClick={() =>{/*if(!name.trim()){Swal.fire('이름을 입력해주세요!'); return;}*/setStage(1)}}></button>

                    <div className="firstInfo"></div>
                  </div>
                </div>
              </div>
            );
          } else if (stage >= 1 && stage <= 4) {
            return ( 
              <div className="background14">  
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
                      
                    
                    <div className="rio"></div>
                      
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
                  
                    <div className="rio"></div>
                    {/**공유, 이름 저장, 이미지 저장 */}
                    <button className="shareButton" onClick={() => {sendNameToFirebase(name); handleDownloadImg();}} ></button>
                    {/**축제정보 */}
                    <div className="info"></div> 
                    
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
  