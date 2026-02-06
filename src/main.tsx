import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DirectoryData from './DirectoryData.tsx'
import Login from './component/Login.tsx'
import Signup from './component/Signup.tsx'
import VerifyEmail from './component/VerifyEmail.tsx'
import Allusers from './component/Allusers.tsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import Profile from './component/Profile.tsx'
import AdminUserFileAccess from './component/AdminUserFileAccess.tsx'
import DriveFiles from './component/DriveFiles.tsx'
import AllPlan from './component/AllPlan.tsx'
import { Toaster } from 'react-hot-toast'
import ManageSubscription from './component/ManageSubscription.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { Landing } from './pages/Landing.tsx'
import { PrivacyPolicy } from './pages/PrivacyPolicy.tsx'
import { TermsOfService } from './pages/TermsOfService.tsx'
import { Roadmap } from './pages/Roadmap.tsx'
import { Dashboard } from './pages/cloud-storage-dashboard'



createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: { 
                background: 'var(--toast-bg, #333)', 
                color: 'var(--toast-color, #fff)' 
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<App />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/varifyEmali' element={<VerifyEmail />}></Route>
            <Route path="/dashboard/*" element={<DirectoryData />} />
            <Route path="/demo/*" element={<Dashboard />} />
            <Route path="/adminPage" element={<Allusers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/userData/:userId" element={<AdminUserFileAccess />} />
            <Route path="/mydrive" element={<DriveFiles />} />
            <Route path="/plans" element={<AllPlan />} />
            <Route path="/manageSubscription" element={<ManageSubscription />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/features" element={<Roadmap />} />
            {/* make a feature route and component */}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
)