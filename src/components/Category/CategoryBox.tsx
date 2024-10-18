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
}));

const CategoryName = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  fontSize: "13px",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

interface CategoryBoxProps {
  name: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ name }) => {
  return (
    <CategoryContainer>
      <CategoryName>{name}</CategoryName>
    </CategoryContainer>
  );
};

export default CategoryBox;
