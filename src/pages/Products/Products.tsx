import { useState } from "react";
import { styled, Box } from "@mui/material";
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

  const handleAddCategory = (categoryName: string) => {
    setCategories([...categories, { name: categoryName, products: [] }]);
  };

  const handleOpenProductDialog = () => {
    setIsProductDialogOpen(true);
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
    </MainContainer>
  );
}

export default Products;
