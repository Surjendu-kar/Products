import { Box, styled } from "@mui/material";

const MainContainer = styled(Box)(({ theme }) => ({
  
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

function App() {
  return <MainContainer>App</MainContainer>;
}

export default App;
