import { Route, Routes } from "react-router-dom";
import MainPage from "./elements/MainPage";
import Escaping from "./elements/Escaping";
import Ranking from "./elements/Ranking";
import Dressing from "./elements/Dressing2";
import EscapingManual from "./elements/EscapingManual";

export default function Navigation() {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/escaping' element={<Escaping/>}/>
            <Route path='/ranking' element={<Ranking/>}/>
            <Route path='/dressing' element={<Dressing/>}/>
            <Route path='/escaping/manual' element={<EscapingManual/>}/>
        </Routes>
    )
}