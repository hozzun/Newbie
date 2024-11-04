import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClubRecommendPage from './pages/cheerteam/ClubRecommend'


const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/club-recommend" element={<ClubRecommendPage />} />
      </Routes>
    </Router>
  );
}

export default Index;
