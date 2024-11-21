import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./composants/Header";
import StartComposant from "./composants/StartComposant";
import TestSpritePh from "./composants/TestSpritePh";
import TestSpriteThreeJS from "./composants/TestSpriteThreeJS";
import PhaserGame from "./composants/PhaserGame";
import ThreeCanvas from "./composants/ThreeCanvas";
import MenuTesterPhaser from "./composants/MenuTesterPhaser";
import MenuTesterThree from "./composants/MenuTesterThree";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<StartComposant />} />
                    <Route path="/test_sprite_ph" element={<TestSpritePh />} />
                    <Route path={"/test_sprite_three"} element={<TestSpriteThreeJS />} />
                    <Route path={"/phaser_game"} element={<PhaserGame />} />
                    <Route path="/three_canvas" element={<ThreeCanvas />} />
                    <Route path="/phaser_menu_test" element={<MenuTesterPhaser />} />
                    <Route path="/three_menu_test" element={<MenuTesterThree />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;