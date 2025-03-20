import { useState } from "react";
import  "./Dressing.css";

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
          <button key={idx} onClick={() => {
            selectOutfit(stage - 1, outfit);
            
            }}>
            {outfit}
          </button>
        ))}
      </div>
    );
  }
  function PrevP({stage, setStage}){ //이전버튼 
    return(
        <button onClick={()=>setStage(stage-1)}>
            이전
        </button>
    )
}
function NextP({stage, setStage}){ //다음버튼
    return(
        <button onClick={()=>setStage(stage+1)}>
            다음
        </button>
    )
}
  
export default function Dressing() {
    const [stage, setStage] = useState(0);
    const [codi, setCodi] = useState(["없음", "없음", "없음", "없음", "없음"]);
  
    const closet = [
      ["soccer", "hockey"],
      ["pants1", "pants2", "pants3"],
      ["shoes1", "shoes2", "shoes3"],
      ["head1", "head2", "head3"],
      ["eye1", "eye2", "eye3"]
    ];
  
    return (
      <div>
        {(() => {
          if (stage === 0) {
            return (
              <div className="page">
                <h1>리옷입히기</h1>
                <div className="rioImg"></div>
                <button className="start" onClick={() => setStage(1)}>
                  게임시작!
                </button>
                <p>의상을 클릭하여 옷을 입혀주세요!</p>
              </div>
            );
          } else if (stage >= 1 && stage <= 5) {
            return (   
              <div className="page">
                <h1>리옷입히기</h1>
                <div className="rioImg">
                  {[0, 0, 0, 0, 0].map((_,i)=>(codi[i] != '없음' && <text>{codi[i]}</text>))}
                </div>
                {/* ✅ Call 컴포넌트 한 번만 사용 */}
                <Call codi={codi} setCodi={setCodi} closet={closet} stage={stage} />
  
                
                <div className="stageButtons">
                  <PrevP stage={stage} setStage={setStage} />
                  <NextP stage={stage} setStage={setStage} />
                </div>
              </div>
            );
          } else if (stage === 6) {
            return (
              <div className="page">
                <h1>리옷입히기</h1>
                <div className="rioImg">

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
  