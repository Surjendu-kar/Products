import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import Products from "./pages/Products/Products";
import DevelopmentPage from "./components/DevelopmentPage/DevelopmentPage";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<DevelopmentPage pageName="Home" />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/stores"
            element={<DevelopmentPage pageName="Stores" />}
          />
          <Route
            path="/catalogue"
            element={<DevelopmentPage pageName="Catalogue" />}
          />
          <Route
            path="/promotions"
            element={<DevelopmentPage pageName="Promotions" />}
          />
          <Route
            path="/reports"
            element={<DevelopmentPage pageName="Reports" />}
          />
          <Route
            path="/docs"
            element={<DevelopmentPage pageName="Documentation" />}
          />
          <Route
            path="/settings"
            element={<DevelopmentPage pageName="Settings" />}
          />
          <Route path="*" element={<DevelopmentPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
