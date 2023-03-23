import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ListProduct from './ListProduct'
import AddUpdateProducts from './AddUpdateProducts'
import './styles/style1.css'
import './styles/style2.css'

const RouterComp = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate replace to='/products'/>}/>
        <Route path='/products' element={<ListProduct/>}/>
        <Route path='/products/add-product' element={<AddUpdateProducts/>}/>
        <Route path='/products/update-product/:productid' element={<AddUpdateProducts/>}/>
    </Routes>
  )
}

export default RouterComp