import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { RestaurantsContextProvider } from './context/RestaurantsContext'
import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import Update from './pages/Update'

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/restaurants/:id/update" element={<Update/>}/>
                        <Route path="/restaurants/:id" element={<RestaurantDetail/>}/>
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App
