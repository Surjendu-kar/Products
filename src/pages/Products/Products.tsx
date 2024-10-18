import { styled, Box } from "@mui/material";
import CategoryBox from "../../components/Category/CategoryBox";
import AddProductDialog from "../../components/ProductDialog/AddProductDialog";
import { useState } from "react";
import Header from "../../components/Header/Header";

const MainContainer = styled(Box)(() => ({
  width: "100%",
  margin: "0 auto",
}));

const CategoriesContainer = styled(Box)(({ theme }) => ({
  width: "95%",
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

function Products() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const handleAddCategory = (categoryName: string) => {
    setCategories([...categories, categoryName]);
  };

  const handleOpenProductDialog = () => {
    setIsProductDialogOpen(true);
  };

  const handleCloseProductDialog = () => {
    setIsProductDialogOpen(false);
  };

  return (
    <MainContainer>
      <Header
        onAddCategory={handleAddCategory}
        onAddProduct={handleOpenProductDialog}
      />
      <CategoriesContainer>
        {categories.map((category, index) => (
          <CategoryBox key={index} name={category} />
        ))}
      </CategoriesContainer>

      <AddProductDialog
        open={isProductDialogOpen}
        onClose={handleCloseProductDialog}
        categories={categories}
      />
    </MainContainer>
  );
}

export default Products;
