
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

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: { background: '#333', color: '#fff' },
          }}
        />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/varifyEmali' element={<VerifyEmail />}></Route>
          <Route path="/*" element={<DirectoryData />} />
          <Route path="/adminPage" element={<Allusers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userData/:userId" element={<AdminUserFileAccess />} />
          <Route path="/mydrive" element={<DriveFiles />} />
          <Route path="/plans" element={<AllPlan />} />
          <Route path="/manageSubscription" element={<ManageSubscription />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
)
