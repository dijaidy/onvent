import { Route, Routes } from "react-router-dom";
import MainPage from "./elements/MainPage";
import Escaping from "./elements/Escaping";
import Dressing from "./elements/Dressing2";
import Minimap from "./elements/MiniMap";


export default function Navigation() {


    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/escaping' element={<Escaping/>}/>
            <Route path='/dressing' element={<Dressing/>}/>
            <Route path='/minimap' element={<Minimap/>}/>
        </Routes>
    )
}