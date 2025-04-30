import { Link, useNavigate } from "react-router-dom";
import 기본배경 from "../asset/dressingImages/기본배경.svg";
import 출튀버튼 from "../asset/dressingImages/출튀버튼.svg"
import 리옷버튼 from "../asset/dressingImages/리옷버튼.svg"
import 빗썸버튼 from "../asset/dressingImages/빗썸버튼.svg"
import 빗썸화면 from "../asset/dressingImages/빗썸화면.svg"
import 스프링클제목 from "../asset/dressingImages/스프링클제목.svg"
import { rh, rw } from "../managements/Dimensions";
import { useState } from "react";

const deviceRatio = window.innerHeight/window.innerWidth;

export default function MainPage() {
    const navigate = useNavigate();
    const [bithumb, setBithumb] = useState(false);
    
    return (
        <div style={{overflow: 'hidden'}}>
        { (bithumb) &&
            <button onClick={(e)=>{e.preventDefault();setBithumb(false);}} style={{position: 'absolute', backgroundColor: '#ee8aa8', borderWidth: 0, display: 'flex', width: window.innerWidth, height: window.innerHeight, justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center', touchAction: 'none', zIndex: 2}}>
            <img src={스프링클제목} style={{position: 'absolute', top: 0, zIndex: 2}} width={(window.innerWidth > 1.35* rw(440) ? 1.35* rw(440) : (window.innerWidth))}></img>
            <img src={빗썸화면} height={Math.min(window.innerHeight - (window.innerWidth > 1.35* rw(440) ? 1.35* rw(440) : (window.innerWidth))*(342.02/489.84)+rh(10), (window.innerWidth-rw(40))*(665.7/450.04))} style={{marginBottom: rh(40), zIndex: 3}}></img>
            <text style={{position: 'absolute', color: '#ffffff', bottom: rh(10), fontSize: rw(15), fontFamily: 'Romance'}}>터치해서 뒤로가기</text>
        </button>
}
        <div style={{ backgroundColor: '#ee8aa8', display: bithumb ? 'none'    : 'flex', flexDirection: 'column', alignItems: 'center', touchAction: 'none',}}>
            <img src={기본배경} width={deviceRatio>=2 ? 'auto' : (window.innerWidth > 1.35* rw(440) ? 1.35* rw(440) : (window.innerWidth))} height={deviceRatio>=2 ? window.innerHeight: 'auto'} ></img>
            <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <button onClick={()=>{
                    navigate('/escaping')
                }} style={{width: rw(339.94), height: rw(59.17), alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: rw(60), backgroundColor: 'transparent', borderWidth: 0, marginTop: rh(418.62)}}>
                    <img src={출튀버튼} width={rw(339.94)} height={rw(59.17)} ></img>
                </button>
                <button onClick={()=>{
                    navigate('/dressing')
                }} style={{width: rw(339.94), height: rw(59.17), alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: rw(60), backgroundColor: 'transparent', borderWidth: 0, marginTop: rh(35.53)}}>
                    <img src={리옷버튼} width={rw(339.94)} height={rw(59.17)} ></img>
                </button>
                <button onClick={()=>{
                    setBithumb(true);
                }} style={{width: rw(339.94), height: rw(59.17), alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: rw(60), backgroundColor: 'transparent', borderWidth: 0, marginTop: rh(35.53)}}>
                    <img src={빗썸버튼} width={rw(339.94)} height={rw(59.17)} ></img>
                </button>
            </div>
        </div>
        </div>
    )
}