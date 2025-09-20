import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import Home from './pages/public/Home.jsx';
import Faqs from './pages/public/Faqs.jsx';
import HowItWorks from './pages/public/HowItWorks.jsx';
import OurStory from './pages/public/OurStory.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import Search from './pages/app/Search.jsx';
import Saved from './pages/app/Saved.jsx';
import Account from './pages/app/Account.jsx';
import Profile from './pages/app/Profile.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AuthContainer from './pages/auth/AuthContainer.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route element={<PublicLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/faqs' element={<Faqs />} />
            <Route path='/how-it-works' element={<HowItWorks />} />
            <Route path='/our-story' element={<OurStory />} />
          </Route>

          {/* Auth */}
          <Route element={<AuthContainer />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>

          {/* Protected app */}
          <Route element={<ProtectedRoute />}>
            <Route path='/app' element={<AppLayout />}>
              <Route index element={<Navigate to='search' replace />} />
              <Route path='search' element={<Search />} />
              <Route path='saved' element={<Saved />} />
              <Route path='account' element={<Account />} />
              <Route path='profile' element={<Profile />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
