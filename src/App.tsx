import { useState } from "react";
import { Stack, styled, Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import CategoryBox from "./components/Category/CategoryBox";

const MainContainer = styled(Stack)(({ theme }) => ({
  width: "90%",
  margin: "0 auto",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const CategoriesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

function App() {
  const [categories, setCategories] = useState<string[]>([]);

  const handleAddCategory = (categoryName: string) => {
    setCategories([...categories, categoryName]);
  };

  return (
    <MainContainer>
      <Navbar onAddCategory={handleAddCategory} />
      <CategoriesContainer>
        {categories.map((category, index) => (
          <CategoryBox key={index} name={category} />
        ))}
      </CategoriesContainer>
    </MainContainer>
  );
}

export default App;
