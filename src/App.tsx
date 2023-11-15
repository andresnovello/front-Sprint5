import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";


import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    
    <>
      <Router>
        <Header/>
            <AppRoutes />
        <Footer/>
      </Router>
    </>

  )
}

export default App




