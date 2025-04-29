import { Link, useNavigate } from "react-router-dom";
import 기본배경 from "../asset/dressingImages/기본배경.svg";
import 출튀버튼 from "../asset/dressingImages/출튀버튼.svg"
import 리옷버튼 from "../asset/dressingImages/리옷버튼.svg"
import 빗썸버튼 from "../asset/dressingImages/빗썸버튼.svg"
import { rh, rw } from "../managements/Dimensions";

const deviceRatio = window.innerHeight/window.innerWidth;

export default function MainPage() {
    const navigate = useNavigate();
    
    return (
        <div style={{backgroundColor: '#ee8aa8', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={기본배경} width={deviceRatio>=2 ? 'auto' : window.innerWidth} height={deviceRatio>=2 ? window.innerHeight: 'auto'} ></img>
            <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <button onClick={()=>{
                    navigate('/escaping')
                }} style={{width: rw(339.94), height: rw(59.17), alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: rw(60), backgroundColor: 'transparent', borderWidth: 0, marginTop: rh(388.62)}}>
                    <img src={출튀버튼} width={rw(339.94)} height={rw(59.17)} ></img>
                </button>
                <button onClick={()=>{
                    navigate('/dressing')
                }} style={{width: rw(339.94), height: rw(59.17), alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: rw(60), backgroundColor: 'transparent', borderWidth: 0, marginTop: rh(35.53)}}>
                    <img src={리옷버튼} width={rw(339.94)} height={rw(59.17)} ></img>
                </button>
                <button onClick={()=>{
                    navigate('/bithumb')
                }} style={{width: rw(339.94), height: rw(59.17), alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: rw(60), backgroundColor: 'transparent', borderWidth: 0, marginTop: rh(35.53)}}>
                    <img src={빗썸버튼} width={rw(339.94)} height={rw(59.17)} ></img>
                </button>
            </div>
        </div>
    )
}