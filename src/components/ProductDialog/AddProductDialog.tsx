import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
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
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import VariantsComponent from "./VariantsComponent";
import CombinationsComponent from "./CombinationsComponent";
import PriceComponent from "./PriceComponent";

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
interface FormattedCombination {
  name: string;
  sku: string;
  quantity: number | null;
  inStock: boolean;
}
interface ProductData {
  name: string;
  category: string;
  brand: string;
  image: string;
  variants: Variant[];
  combinations: {
    [key: string]: FormattedCombination;
  };
  priceInr: number;
  discount: {
    method: "pct" | "flat";
    value: number;
  };
}

interface Variant {
  option: string;
  values: string[];
}

const steps = ["Description", "Variants", "Combinations", "Price info"];

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onClose,
  categories,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    category: "",
    brand: "",
    image: "",
    variants: [],
    combinations: {},
    priceInr: 0,
    discount: {
      method: "pct",
      value: 0,
    },
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
      image: "",
      variants: [],
      combinations: {},
      priceInr: 0,
      discount: {
        method: "pct",
        value: 0,
      },
    });
    setActiveStep(0);
    onClose();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const formattedData = {
        products: {
          name: productData.name,
          category: productData.category,
          brand: productData.brand,
          image: productData.image,
          variants: productData.variants.map((variant) => ({
            name: variant.option,
            values: variant.values,
          })),
          combinations: Object.entries(productData.combinations).reduce(
            (
              acc: { [key: string]: FormattedCombination },
              [key, value],
              index
            ) => {
              acc[String.fromCharCode(97 + index)] = {
                name: key,
                sku: value.sku,
                quantity:
                  value.quantity === null ? null : Number(value.quantity),
                inStock: value.inStock,
              };
              return acc;
            },
            {}
          ),
          priceInr: productData.priceInr,
          discount: {
            method: productData.discount.method,
            value: productData.discount.value,
          },
        },
      };

      console.log(JSON.stringify(formattedData, null, 2));
      handleCancel();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleVariantsChange = (newVariants: Variant[]) => {
    setProductData((prevData) => ({
      ...prevData,
      variants: newVariants,
    }));
  };

  const handleCombinationsChange = (
    newCombinations: ProductData["combinations"]
  ) => {
    setProductData((prevData) => ({
      ...prevData,
      combinations: newCombinations,
    }));
  };

  const handlePriceChange = (
    price: number,
    discount: ProductData["discount"]
  ) => {
    setProductData((prevData) => ({
      ...prevData,
      priceInr: price,
      discount: discount,
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
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

            <UploadButton startIcon={<span>📎</span>}>
              Upload Image
            </UploadButton>
          </Box>
        );
      case 1:
        return (
          <VariantsComponent
            variants={productData.variants}
            setVariants={handleVariantsChange}
          />
        );
      case 2:
        return (
          <CombinationsComponent
            variants={productData.variants}
            combinations={productData.combinations}
            setCombinations={handleCombinationsChange}
          />
        );
      case 3:
        return (
          <PriceComponent
            price={productData.priceInr}
            discount={productData.discount}
            onChange={handlePriceChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md">
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent()}
      </DialogContent>
      <DialogActions>
        <StyledButton
          onClick={handleCancel}
          sx={{ backgroundColor: "#E1E7EB", color: "#1F8CD0" }}
        >
          Cancel
        </StyledButton>
        <StyledButton variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddProductDialog;
