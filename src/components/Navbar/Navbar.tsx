import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const NavContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "24px",
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  "& > *:not(:last-child)": {
    marginRight: theme.spacing(2),
  },
}));

const AddProductBtn = styled(Button)(() => ({
  borderRadius: "8px",
  textTransform: "capitalize",
  fontWeight: 550,
}));

const AddCategoryBtn = styled(AddProductBtn)(() => ({
  background: "#E1E7EB",
  color: "#1F8CD0",
  border: "none",
}));

function Navbar() {
  return (
    <NavContainer>
      <Box>
        <Heading>Products</Heading>
      </Box>
      <ButtonGroup>
        <AddCategoryBtn variant="outlined">Add Category</AddCategoryBtn>
        <AddProductBtn variant="contained">Add Product</AddProductBtn>
      </ButtonGroup>
    </NavContainer>
  );
}

export default Navbar;
