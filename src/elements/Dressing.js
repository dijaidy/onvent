import { useState } from "react";
import  "./Dressing.css";

export default function Dressing() {
    const [stage, setStage] = useState(0);
    const [combi, setCombi] = useState([-1, -1, -1]);
    const [combiFinished, setCombiFinished] = useState(false);

    const closet = [
        ['빨간옷', '파란옷', '노란옷'],
        ['빨간바지', '파란바지', '노란바지'],
        ['빨간모자', '파란모자', '녹색모자']
    ]
    console.log(combi)
    
    return (
        <div>
            { 
            (stage==0) ? 
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                <text style={{fontSize: 15, textAlign: 'center', marginTop: 20, marginBottom: 20}} >리오 옷입히기</text>
                <div className='RioImg'></div>
                <button 
                style={{backgroundColor: '#00ff00', borderWidth: 0, borderRadius: 5, marginTop: 20, width: 200, height: 30,}}
                onClick={()=>{
                    setStage(1);
                }}>
                    <text>시작하기</text>
                </button>
                <text style={{fontSize: 15, textAlign: 'center', marginTop: 20, marginBottom: 20}} >의상을 클릭하여 옷 입혀줘</text>
            </div>:
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <text style={{fontSize: 15, textAlign: 'center', marginTop: 20, marginBottom: 20}} >리오 옷입히기</text>
            <div className='RioImg' style={{flexDirection: 'column', display: 'flex'}}>
                {[0, 0, 0].map((_, i) => (combi[i] != -1 && <text key={'cloth'+ i.toString()}>{closet[i][combi[i]]}</text>))}
            </div>
            {(combiFinished) ?
            <text>완성</text>
            :
            <div>
            <div style={{flexDirection: 'row'}}>
                <button onClick={()=>{setCombi(combi.map((cloth, idx)=> {return idx==stage-1 ? 0 : cloth} ))}}>
                    <text style={{fontSize: 15, textAlign: 'center', marginTop: 20, marginBottom: 20, marginRight: 10, marginLeft: 10}} >{closet[stage-1][0]}</text>
                </button>
                <button onClick={()=>{setCombi(combi.map((cloth, idx)=> idx==stage-1 ? 1 : cloth))}}>
                    <text style={{fontSize: 15, textAlign: 'center', marginTop: 20, marginBottom: 20, marginRight: 10, marginLeft: 10}} >{closet[stage-1][1]}</text>
                </button>
                <button onClick={()=>{setCombi(combi.map((cloth, idx)=> idx==stage-1 ? 2 : cloth))}}>
                    <text style={{fontSize: 15, textAlign: 'center', marginTop: 20, marginBottom: 20, marginRight: 10, marginLeft: 10}} >{closet[stage-1][2]}</text>
                </button>
            </div>
            <div style={{flexDirection: 'row'}}>
                { stage >= 2 &&
                <button 
                style={{backgroundColor: '#00ff00', borderWidth: 0, borderRadius: 5, marginTop: 20, width: 200, height: 30,}}
                onClick={()=>{
                    setStage(stage-1);
                }}>
                    <text>이전</text>
                </button>
}
                <button 
                style={{backgroundColor: '#00ff00', borderWidth: 0, borderRadius: 5, marginTop: 20, width: 200, height: 30,}}
                onClick={stage==3 ? 
                    ()=>{
                        setCombiFinished(true);
                    }
                    : 
                    ()=>{
                    setStage(stage+1);
                }}>
                    <text>{stage==3 ? '완료' : '다음'}</text>
                </button>
            </div>
            </div>
}
        </div>
            }
        </div>
    )
}