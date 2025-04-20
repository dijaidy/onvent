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
        {closet[stage - 1].map((outfit, idx) => (
          <button className="options" key={idx} onClick={() => {selectOutfit(stage - 1, outfitPutOn[stage-1][idx]);}}>
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
    const [codi, setCodi] = useState([null, null, null, null]);
  
    const closet = [
      [soccer, hockey],
      [shoes1, shoes2, shoes3, shoes4],
      [head1, head2, head3, head4],
      [eye1, eye2, eye3, eye4],
    ];

    const outfitPutOn = [
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
                <div className="page1-4">
                   
                {codi.map(
                  (item, i) =>
                    item && (
                      <img
                        src={item.src}
                        className={`outfitChosen ${item.className}`}
                        key={i}
                        style={{ position: "absolute" }}
                      />
                    )
                )}
                  
                  <div className="rio"></div>
                    
                    {/* ✅ Call 컴포넌트 한 번만 사용 */}
                  <Call codi={codi} setCodi={setCodi} closet={closet} stage={stage} outfitPutOn={outfitPutOn} />      
                    
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
                <div className="page5">
                   
                {codi.map(
                  (item, i) =>
                    item && (
                      <img
                        src={item.src}
                        className={`outfitChosen ${item.className}`}
                        key={i}
                        style={{ position: "absolute" }}
                      />
                    )
                )}
                 
                  <div className="rio"></div>

                  <button className="shareButton"></button>
                  <div className="info"></div>

                </div>
              </div>
            );
          }
          return null;
        })()}
      </div>
    );
  }
  