import { useNavigate } from "react-router-dom";
import 빗썸화면 from "../asset/dressingImages/빗썸화면.svg"
import 스프링클제목 from "../asset/dressingImages/스프링클제목.svg"
import { rh, rw } from "../managements/Dimensions";

const deviceRatio = window.innerHeight/window.innerWidth;

export default function Ranking() {
    const navigation = useNavigate();
    return (
        <button onClick={()=>{navigation('..')}} style={{backgroundColor: '#ee8aa8', borderWidth: 0, display: 'flex', width: '100%', height: window.innerHeight, justifyContent: 'flex-end', flexDirection: 'column'}}>
            <img src={스프링클제목} style={{position: 'absolute', top: 0}} width={window.innerWidth}></img>
            <img src={빗썸화면} height={Math.min(window.innerHeight - window.innerWidth*(342.02/489.84), (window.innerWidth-rw(40))*(665.7/450.04))} style={{marginBottom: rh(50)}}></img>
        </button>
    )
}