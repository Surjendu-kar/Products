import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";

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
}));

const AddCategoryBtn = styled(AddProductBtn)(() => ({
  background: "#E1E7EB",
  color: "#1F8CD0",
  border: "none",
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "550px",
    height: "255px",
    padding: theme.spacing(2),
  },
  "& .MuiDialogTitle-root": {
    padding: theme.spacing(2, 2, 1),
    "& .MuiTypography-root": {
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1, 2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1, 2, 2),
  },
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "10px 14px",
  },
}));

interface NavbarProps {
  onAddCategory: (categoryName: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddCategory }) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryName("");
  };

  const handleSave = () => {
    if (categoryName.trim()) {
      onAddCategory(categoryName.trim());
      handleClose();
    }
  };

  return (
    <NavContainer>
      <Box>
        <Heading>Products</Heading>
      </Box>

      <ButtonGroup>
        <AddCategoryBtn variant="outlined" onClick={handleClickOpen}>
          Add Category
        </AddCategoryBtn>
        <AddProductBtn variant="contained">Add Product</AddProductBtn>
      </ButtonGroup>

      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Add category</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Category name *
          </Typography>
          <StyledTextField
            autoFocus
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <AddCategoryBtn
            onClick={handleClose}
            color="primary"
            variant="outlined"
          >
            Cancel
          </AddCategoryBtn>
          <AddProductBtn
            onClick={handleSave}
            color="primary"
            variant="contained"
          >
            Save
          </AddProductBtn>
        </DialogActions>
      </StyledDialog>
    </NavContainer>
  );
};

export default Navbar;
