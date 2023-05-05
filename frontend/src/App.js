import React from 'react'
import { Route, Routes } from "react-router-dom"
import Login from './components/login';
import Dashboard from './pages/admin/dashboard';
import Pemesanan from './pages/admin/pemesanan';
import ListPemesanan from './pages/owner/listPemesanan';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/pemesanan' element={<Pemesanan/>}/>
      <Route path='/listPemesanan' element={<ListPemesanan/>}/>
    </Routes>
  )
}
export default App;
