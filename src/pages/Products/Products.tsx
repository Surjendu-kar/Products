import React, { useState } from "react";
import { styled, Box, Snackbar, Alert } from "@mui/material";
import CategoryBox from "../../components/Category/CategoryBox";
import AddProductDialog from "../../components/ProductDialog/AddProductDialog";
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

interface Product {
  name: string;
  price: number;
  brand: string;
  image: string;
  category: string;
}

interface CategoryData {
  name: string;
  products: Product[];
}

function Products() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const handleAddCategory = (categoryName: string) => {
    const trimmedName = categoryName.trim();
    if (
      categories.some(
        (cat) => cat.name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      showWarning("Category name already exists. Please choose a unique name.");
    } else {
      setCategories([...categories, { name: trimmedName, products: [] }]);
    }
  };

  const handleOpenProductDialog = () => {
    if (categories.length === 0) {
      showWarning("Please add a category before adding a product.");
    } else {
      setIsProductDialogOpen(true);
    }
  };

  const handleCloseProductDialog = (newProduct?: Product) => {
    if (newProduct) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.name === newProduct.category
            ? { ...category, products: [...category.products, newProduct] }
            : category
        )
      );
    }
    setIsProductDialogOpen(false);
  };

  const showWarning = (message: string) => {
    setWarningMessage(message);
    setWarningOpen(true);
  };

  const handleCloseWarning = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setWarningOpen(false);
  };

  return (
    <MainContainer>
      <Header
        onAddCategory={handleAddCategory}
        onAddProduct={handleOpenProductDialog}
      />
      <CategoriesContainer>
        {categories.map((category, index) => (
          <CategoryBox
            key={index}
            name={category.name}
            products={category.products}
          />
        ))}
      </CategoriesContainer>

      <AddProductDialog
        open={isProductDialogOpen}
        onClose={handleCloseProductDialog}
        categories={categories.map((cat) => cat.name)}
      />

      <Snackbar
        open={warningOpen}
        autoHideDuration={3000}
        onClose={handleCloseWarning}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseWarning}
          severity="warning"
          sx={{ width: "80%" }}
        >
          {warningMessage}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
}

export default Products;
