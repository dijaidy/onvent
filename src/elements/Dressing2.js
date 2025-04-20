import { useState } from "react";
import  "./Dressing.css";
import soccer from "../asset/dressingImages/soccer.svg";
import hockey from "../asset/dressingImages/hockey.svg";
import shoes1 from "../asset/dressingImages/shoes1.svg";
import shoes2 from "../asset/dressingImages/shoes2.svg";
import shoes3 from "../asset/dressingImages/shoes3.svg";
import shoes4 from "../asset/dressingImages/shoes4.svg";
import head1 from "../asset/dressingImages/head1.svg";
import head2 from "../asset/dressingImages/head2.svg";
import head3 from "../asset/dressingImages/head3.svg";
import head4 from "../asset/dressingImages/head4.svg";
import eye1 from "../asset/dressingImages/Frame 4.svg";
import eye2 from "../asset/dressingImages/Frame 5.svg";
import eye3 from "../asset/dressingImages/Frame 6.svg";
import eye4 from "../asset/dressingImages/Frame 7.svg";


function Call({ codi, setCodi, closet, stage }) {
    function selectOutfit(index, outfit) {
      setCodi(prevCodi => {
        const newCodi = [...prevCodi];  // 기존 배열 복사
        newCodi[index] = outfit;        // 선택한 의상 업데이트
        return newCodi;
      });
    }
  
    return (
      <div className="dressButtons">
        {closet[stage - 1].map((outfit, idx) => (
          <button className="options" key={idx} onClick={() => {selectOutfit(stage - 1, outfit);}}>
            <img src={outfit} alt={`option ${idx}`} className="dress-img"/>
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
    const [codi, setCodi] = useState(["없음", "없음", "없음", "없음"]);
  
    const closet = [
      [soccer, hockey],
      [shoes1, shoes2, shoes3, shoes4],
      [head1, head2, head3, head4],
      [eye1, eye2, eye3, eye4],
    ];
  
    return (
      <div>
        {(() => {
          if (stage === 0) {
            return (
              <div className="page">
                <div className="page0">
                  <input type="text" className="enterName"></input>
                  <button className="startbutton" onClick={() => setStage(1)}></button>
                </div>
              </div>
            );
          } else if (stage >= 1 && stage <= 4) {
            return (   
              <div className="page">
                <div className="rio">
                  <div> 
                  {[0, 0, 0, 0].map((_,i)=>(codi[i] != '없음' && <text>{codi[i]}</text>))}
                  </div>
                  {/* ✅ Call 컴포넌트 한 번만 사용 */}
                  <Call codi={codi} setCodi={setCodi} closet={closet} stage={stage} />
    
                  
                  <div className="stageButtons">
                    <PrevP stage={stage} setStage={setStage} />
                    <NextP stage={stage} setStage={setStage} />
                  </div>
                </div>
              </div>
            );
          } else if (stage === 5) {
            return (
              <div className="page">
                <h1>리옷입히기</h1>
                <div className="background">
                  {[0, 0, 0, 0, 0].map((_,i)=>(codi[i] != '없음' && <text>{codi[i]}</text>))}
                </div>
                <div className="shareButton">
                  <button className="share">공유하기</button>
                </div>
              </div>
            );
          }
          return null;
        })()}
      </div>
    );
  }
  