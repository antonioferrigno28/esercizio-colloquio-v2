import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { GlobalContextProvider } from "./context/globalContext";

//LAYOUTS
import DefaultLayout from "./layouts/DefaultLayout";

//PAGES
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index Component={HomePage} />
          <Route path="/orders" Component={OrdersPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
