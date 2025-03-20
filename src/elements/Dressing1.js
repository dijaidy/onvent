import { useState } from "react";
import  "./Dressing.css";
import Rio from '../asset/행.jpg.jpg'

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
/*function Call({codi, setCodi, closet, stage}){
    return(
        <button  onClick={()=>setCodi(codi.map((stage,codi)=>{return 0}))}>
            <text>{closet[stage-1][0]}</text>
        </button>
    )
}*/




export default function Dressing() {
    const [stage, setStage] = useState(0);
    const [codi, setCodi] = useState([0,0,0,0,0])
    const closet=[
        ["soccer","hockey"],
        ["pants1","pants2","pants3"],
        ["shoes1","shoes2","shoes3"],
        ["head1","head2","head3"],
        ["eye1","eye2","eye3"]
    ]

    return (
        <div>
            {(() => {
                if (stage === 0) {
                    return (
                        <div className="page">
                            <h1>리옷입히기</h1>
                            <div className="rioImg"></div>
                            <button className="start" onClick={()=>setStage(1)}>
                                게임시작!
                            </button>
                            <text>의상을 클릭하여 옷을 입혀주세요!</text>
                        </div>
                    );
                } else if (stage===1){
                            return(
                                <div className="page">
                                    <h1>리옷입히기</h1>
                                    <div className="rioImg"></div>
                                    <div className="dressButtons">
                                       
                                    </div>
                                    <div className="stageButtons">
                                        <PrevP stage={stage} setStage={setStage}></PrevP>
                                        <NextP stage={stage} setStage={setStage}></NextP>
                                    </div>
                                </div>
                            );
                } else if (stage===2){
                    return(
                        <div className="page">
                            <h1>리옷입히기</h1>
                            <div className="rioImg"></div>
                            <div className="dressButtons">
                                <button className="option"></button>
                                <button className="option"></button>
                                <button className="option"></button>
                                <button className="option"></button>
                            </div>
                            <div className="stageButtons">
                                <PrevP stage={stage} setStage={setStage}></PrevP>
                                <NextP stage={stage} setStage={setStage}></NextP>
                            </div>
                        </div>
                    )
                } else if (stage===3){
                    return(
                        <div className="page">
                            <h1>리옷입히기</h1>
                            <div className="rioImg"></div>
                            <div className="dressButtons">
                                <button className="option"></button>
                                <button className="option"></button>
                                <button className="option"></button>
                                <button className="option"></button>
                            </div>
                            <div className="stageButtons">
                                <PrevP stage={stage} setStage={setStage}></PrevP>
                                <NextP stage={stage} setStage={setStage}></NextP>
                            </div>
                        </div>
                    )
                } else if (stage===4){
                    return(
                        <div className="page">
                            <h1>리옷입히기</h1>
                            <div className="rioImg"></div>
                            <div className="dressButtons">
                                <button className="option">
                                    <img src={Rio} className="optionImage"></img>
                                </button>
                                <button className="option"></button>
                                <button className="option"></button>
                                <button className="option"></button>
                            </div>
                            <div className="stageButtons">
                                <PrevP stage={stage} setStage={setStage}></PrevP>
                                <NextP stage={stage} setStage={setStage}></NextP>
                            </div>
                        </div>
                    )
                } else if (stage===5){
                    return(
                        <div className="page">
                            <h1>리옷입히기</h1>
                            <div className="rioImg"></div>
                            <div className="dressButtons">
                                <button className="option"></button>
                                <button className="option"></button>
                                <button className="option"></button>
                                <button className="option"></button>
                            </div>
                            <div className="stageButtons">
                                <PrevP stage={stage} setStage={setStage}></PrevP>
                                <NextP stage={stage} setStage={setStage}></NextP>
                            </div>
                        </div>
                    )
                } else if (stage===6){
                    return(
                        <div className="page">
                            <h1>리옷입히기</h1>
                            <div className="rioImg"></div>
                            <div className="shareButton">
                                <button className="share">공유하기</button>
                            </div>
                        </div>
                    )
                }
                return null;
            })()}
        </div>
    );

}