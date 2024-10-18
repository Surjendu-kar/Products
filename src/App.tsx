import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import { Box, Typography } from "@mui/material";
import Products from "./pages/Products/Products";

const DevelopmentPage = () => (
  <Box>
    <Typography>This section is under development</Typography>
    <Typography>Please check back later!</Typography>
  </Box>
);

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<DevelopmentPage />} />
      </Routes>
    </Box>
  );
}

export default App;
