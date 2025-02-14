import GameList from './games/GameList';
import GameCreate from './games/GameCreate';
import GameView from './games/GameView';
import GameEdit from './games/GameEdit';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<GameList />} />
            <Route path="/games/list" element={<GameList />} />
            <Route path="/games/create" element={<GameCreate />} />
            <Route path="/games/view/:id" element={<GameView />} />
            <Route path="/games/edit/:id" element={<GameEdit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
