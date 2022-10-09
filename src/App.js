import React, { useState } from 'react'
import Navbar  from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 20
  const apiKey = process.env.REACT_APP_NEWS_API
 
  const [progress, setProgress] = useState(0)

  // setProgress = (progress) => {
  //   setState({progress:progress})
  // }

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          {/* <RouterProvider router={router} /> */}
          <Routes>
            <Route path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />} />
            <Route path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" />} />
            <Route path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
            <Route path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" />} />
            <Route path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science" />} />
            <Route path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" />} />
            <Route path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>


      </div>
    )
  }

export default App