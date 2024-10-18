import { Stack, styled } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";

const MainContainer = styled(Stack)(({ theme }) => ({
  width: "90%",
  margin: "0 auto",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

function App() {
  return (
    <MainContainer>
      <Navbar />
    </MainContainer>
  );
}

export default App;
