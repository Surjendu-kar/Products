import React from "react";
import { Box, Typography, styled } from "@mui/material";

const CategoryContainer = styled(Box)(({ theme }) => ({
  width: "250px",
  height: "600px",
  borderRadius: "14px",
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  overflowY: "auto",
}));

const CategoryName = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

const ProductCard = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  display: "flex",
  alignItems: "center",
}));

const ProductImage = styled("img")({
  width: "60px",
  height: "60px",
  objectFit: "cover",
  marginRight: "12px",
  borderRadius: "4px",
});

const ProductInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ProductName = styled(Typography)({
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "capitalize",
});

const ProductPrice = styled(Typography)({
  fontSize: "12px",
  color: "#333",
});

const ProductBrand = styled(Typography)(() => ({
  fontSize: "10px",
  color: "#1F8CD0",
  backgroundColor: "#ECF7FF",
  borderRadius: "6px",
  padding: "2px 4px",
  display: "inline-block",
  marginTop: "10px",
  textAlign: "center",
  textTransform: "capitalize",
  fontWeight: "bold",
}));

interface Product {
  name: string;
  price: number;
  brand: string;
  image: string;
}

interface CategoryBoxProps {
  name: string;
  products: Product[];
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ name, products }) => {
  return (
    <CategoryContainer>
      <CategoryName>{name}</CategoryName>
      {products.map((product, index) => (
        <ProductCard key={index}>
          <ProductImage src={product.image} alt={product.name} />
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>₹{product.price.toLocaleString()}</ProductPrice>
            <ProductBrand>{product.brand}</ProductBrand>
          </ProductInfo>
        </ProductCard>
      ))}
    </CategoryContainer>
  );
};

export default CategoryBox;
