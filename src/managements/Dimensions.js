// based on figma design
const stdWidth = 440;
const stdHeight = 956;  //ratio = 2.17

//삼성 폴더블폰 제외 + 아이폰 중 height/width의 최대한계, 최소한계 설정
const ratioMax = 915/412;   // Samsung Galaxy S24 Ultra, ratio = 2.22
const ratioMin = 740/360;   // Galaxy S9, ratio = 2.05

const deviceWidth = window.innerWidth;
const deviceHeight = window.innerHeight;

const deviceRatio = deviceHeight/deviceWidth;


const rw = (width) => ((deviceRatio < ratioMin) ? width * deviceHeight / (stdWidth*ratioMin) : width * deviceWidth / (stdWidth));
const rh = (height) => ((deviceRatio > ratioMax)? height * deviceWidth*ratioMax / stdHeight : height * deviceHeight / stdHeight);

export { rw, rh }