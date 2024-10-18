import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  styled,
  SelectChangeEvent,
} from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    width: "550px",
    padding: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(() => ({
  borderRadius: "8px",
  textTransform: "capitalize",
}));

const UploadButton = styled(Button)(({ theme }) => ({
  border: "1px dashed #1F8CD0",
  color: "#1F8CD0",
  borderRadius: "8px",
  padding: theme.spacing(1, 2),
  textTransform: "none",
  marginTop: theme.spacing(2),
}));

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  categories: string[];
}

interface ProductData {
  name: string;
  category: string;
  brand: string;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onClose,
  categories,
}) => {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    category: "",
    brand: "",
  });

  const handleTextChange =
    (field: keyof ProductData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProductData({
        ...productData,
        [field]: event.target.value,
      });
    };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setProductData({
      ...productData,
      category: event.target.value,
    });
  };

  const handleCancel = () => {
    setProductData({
      name: "",
      category: "",
      brand: "",
    });
    onClose();
  };

  const handleNext = () => {
    console.log("Product Data:", productData);
    onClose();
    setProductData({
      name: "",
      category: "",
      brand: "",
    });
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle sx={{ fontWeight: "bold" }}>Add Product</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Product name *
          </Typography>
          <TextField
            fullWidth
            value={productData.name}
            onChange={handleTextChange("name")}
            sx={{ mb: 3 }}
          />

          <Typography variant="body2" color="textSecondary" gutterBottom>
            Category *
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Select
              value={productData.category}
              onChange={handleSelectChange}
              displayEmpty
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="body2" color="textSecondary" gutterBottom>
            Brand *
          </Typography>
          <TextField
            fullWidth
            value={productData.brand}
            onChange={handleTextChange("brand")}
            sx={{ mb: 2 }}
          />

          <UploadButton startIcon={<span>📎</span>}>Upload Image</UploadButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <StyledButton
          onClick={handleCancel}
          sx={{ backgroundColor: "#E1E7EB", color: "#1F8CD0" }}
        >
          Cancel
        </StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleNext}>
          Next
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddProductDialog;
