import { useNavigate } from "react-router-dom"
import 기본배경 from "../asset/dressingImages/기본배경2.svg";
import { rh, rw } from "../managements/Dimensions";
import mapPosition from "../data/mapPosition.json"

import HomeButton from "../asset/dressingImages/toHome.svg"
import plusButton from "../asset/dressingImages/plusButton.svg"
import minusButton from "../asset/dressingImages/minusButton.svg"
import xButton from "../asset/dressingImages/xButton.svg"
import 배치도 from "../asset/dressingImages/배치도.svg"
import 범례 from "../asset/dressingImages/범례.svg"
import { useEffect, useRef, useState } from "react";

import game1 from '../asset/minimapImages/game1.svg';
import game2 from '../asset/minimapImages/game2.svg';
import game3 from '../asset/minimapImages/game3.svg';
import game4 from '../asset/minimapImages/game4.svg';
import yunmarch from '../asset/minimapImages/yunmarch.svg';
import miraeasset from '../asset/minimapImages/miraeasset.svg';
import badges from '../asset/minimapImages/badges.svg';
import bandana from '../asset/minimapImages/bandana.svg';
import bitsum from '../asset/minimapImages/bitsum.svg';
import lltd from '../asset/minimapImages/lltd.PNG'; // PNG만 예외
import shine from '../asset/minimapImages/shine.svg';
import redbull from '../asset/minimapImages/redbull.svg';
import rio from '../asset/minimapImages/rio.svg';

const boothImageMap = {
  "비즈비즈 스트로비즈": game1,
  "아몬드 뻥뻥": game2,
  "이상한 나라의 알사탕": game3,
  "체리 올릴레?": game4,
  "샤운드 오브 뮤직": yunmarch,
  "미래에셋": miraeasset,
  "굿즈": bandana,
  "뱃지 모으리오": badges,
  "빗썸": bitsum,
  "대학연대 지역인재 사업단": lltd,
  "샤인": shine,
  "레드불": redbull,
  "리오랑 사진찍자~!!": rio
};

const deviceRatio = window.innerHeight / window.innerWidth;

export default function Minimap() {
    const navigate = useNavigate();

    const [scale, setScale] = useState(1.5);
    const [detail, setDetail] = useState(false);
    const [booth, setBooth] = useState('');
    const [description, setDescription] = useState('');
    const scrollRef = useRef(null);

    const buttonArr = Object.entries(mapPosition).map(([key, value]) =>
        <button className='MinimapButton' style={{
            position: 'absolute',
            fontSize: 10,
            opacity: 0,
            WebkitTapHighlightColor: 'transparent',
            left: ((window.innerHeight - rh(300)) / 1210.43) * (value.x + (value.height / 2) * Math.sin(value.rotate * (Math.PI / 180)) + (value.width / 2) * Math.cos(value.rotate * (Math.PI / 180)) - (value.width / 2)),
            top: ((window.innerHeight - rh(300)) / 1210.43) * (value.y + (value.height / 2) * Math.cos(value.rotate * (Math.PI / 180)) + (value.width / 2) * Math.sin(value.rotate * (Math.PI / 180)) - (value.height / 2)),
            width: ((window.innerHeight - rh(300)) / 1210.43) * (value.width),
            height: ((window.innerHeight - rh(300)) / 1210.43) * (value.height),
            transform: `rotate(${value.rotate}deg)`,
            borderRadius: 0,
            borderWidth: 0
        }}
            onClick={() => {
                setDetail(true);
                setBooth(key);
                setDescription(value.description);
                console.log('slsl')
            }}>
        </button>
    )

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // 확대되기 전의 중앙 위치로 이동
        setTimeout(() => {
            el.scrollTop = rh(150);
            el.scrollLeft = rw(500);
        }, 300)
    }, []);

    const handleZoomIn = () => {
        const newScale = Math.min(scale + 0.3, 2.5); // 최대 3배
        setScale(newScale);
    };

    const handleZoomOut = () => {
        const newScale = Math.max(scale - 0.3, 1); // 최소 0.5배
        setScale(newScale);
    };

    return (<div style={{ touchAction: 'none', overflow: 'hidden', width: window.innerWidth, height: window.innerHeight, backgroundColor: '#ee8aa8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={기본배경} width={deviceRatio >= 2 ? 'auto' : (window.innerWidth > 1.35 * rw(440) ? 1.35 * rw(440) : (window.innerWidth))} height={deviceRatio >= 2 ? window.innerHeight : 'auto'} style={{ zIndex: 0, position: 'absolute' }} ></img>
        <text style={{fontFamily: 'romance', fontSize: rw(20), color: '#ffffff', zIndex: 5, marginTop: rh(20), marginBottom: rh(-30)}}>부스를 눌러 설명을 확인하세요!</text>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <button style={{ zIndex: 2, backgroundColor: 'transparent', width: rw(50), height: rw(50), alignSelf: 'flex-start', marginLeft: rw(40), marginTop: rh(50), marginBottom: rh(-20), borderWidth: 0 }} onClick={() => { navigate('..'); }}>
                <img src={HomeButton} width={rw(56)} height={rw(50)}></img>
            </button>
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-end' }}>
                <button style={{ zIndex: 2, backgroundColor: 'transparent', marginRight: rw(-5), marginBottom: rh(-30), borderWidth: 0, width: rw(60), height: rw(60) }} onClick={() => { handleZoomIn() }}>
                    <img src={plusButton} width={rw(40)} height={rw(40)}></img>
                </button>
                <button style={{ zIndex: 2, backgroundColor: 'transparent', marginRight: rw(40), marginBottom: rh(-30), borderWidth: 0, width: rw(60), height: rw(60) }} onClick={() => { handleZoomOut() }}>
                    <img src={minusButton} width={rw(40)} height={rw(40)}></img>
                </button>
            </div>
        </div>
        <div style={{ backgroundColor: '#c85f81', alignSelf: 'stretch', position: 'relative', marginLeft: rw(40), marginRight: rw(40), marginBottom: rh(100), marginTop: rh(40), zIndex: 1, flexGrow: 1, borderRadius: rw(30), overflow: 'hidden' }}>
            <div ref={scrollRef} className="scrollDiv"
                style={{
                    overflowY: 'auto', overflowX: 'auto', touchAction: 'pan-x pan-y',
                    width: '100%', height: '100%',
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease-out',
                    display: 'inline-block',  // 중요: 컨텐츠 크기만큼만 차지
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ minWidth: rw(170), minHeight: rh(20) }}></div>
                    <div>
                        <div style={{ height: rh(220), width: rw(20) }}></div>
                        <div style={{ position: 'relative' }}>
                            <img src={배치도} height={window.innerHeight - rh(300)}></img>
                            {buttonArr}
                        </div>
                        <div style={{ height: rh(220), width: rw(20) }}></div>
                    </div>
                    <div style={{ minWidth: rw(170), minHeight: rh(20) }}></div>
                </div>
            </div>
            {(!detail) && <img src={범례} style={{ zIndex: 4, position: 'absolute', bottom: rh(15), left: rw(20) }} width={rw(250)}></img>}
            {(detail) &&
                <button onClick={() => { setDetail(false); }} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: rw(30), width: '100%', height: '100%', backgroundColor: '#ffafc7', zIndex: 3, position: 'absolute', left: 0, top: 0, borderWidth: 0, WebkitTapHighlightColor: 'transparent' }}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: rh(40) }}>
                        <text style={{ color: '#F8FBA6', fontSize: rw(35), fontFamily: 'Romance', textShadow: '0px 3px 4px rgba(117, 47, 56, 0.15)' }}>{booth}</text>
                        <span style={{
                            fontFamily: 'Pretendard-Semibold', color: '#ffffff', fontSize: rw(23), marginTop: rh(60), whiteSpace: 'pre-line', marginLeft: rw(20), marginRight: rw(20), letterSpacing: rw(-0.8), textShadow: '0px 3px 2px rgba(117, 47, 56, 0.15)'
                        }}>{description}</span>
                        {mapPosition[booth]?.imageName && (
                            <img
                                src={boothImageMap[booth]}
                                style={{
                                    height: rh(190),
                                    width: (booth == 'JC안과' || booth == '빗썸' || booth == '미래에셋') ? window.innerWidth-rw(200) : 'auto',
                                    marginTop: rh(60),
                                    marginBottom: rh(-40),
                                    alignSelf: 'center'
                                }}
                            />
                        )}
                    </div>
                </button>}
        </div>
    </div>)
}
