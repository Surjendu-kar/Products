import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
  styled,
} from "@mui/material";

const Heading = styled(Typography)(() => ({
  fontSize: "14px",
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-input": {
    padding: "7px 10px",
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  height: "38px",
  border: "1px solid #E2E8F0",
  borderRadius: "8px",
  overflow: "hidden",
  "& .MuiToggleButton-root": {
    border: "none",
    borderRadius: "0",
    padding: "8px 16px",
    color: theme.palette.text.primary,
    "&.Mui-selected": {
      backgroundColor: "#E6EEF2",
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: "#E6EEF2",
      },
    },
    "&:hover": {
      backgroundColor: "rgba(230, 238, 242, 0.5)",
    },
  },
}));

interface PriceComponentProps {
  price: number;
  discount: {
    method: "pct" | "flat";
    value: number;
  };
  onChange: (price: number, discount: PriceComponentProps["discount"]) => void;
}

function PriceComponent({ price, discount, onChange }: PriceComponentProps) {
  const [localPrice, setLocalPrice] = useState(price.toString());
  const [localDiscount, setLocalDiscount] = useState(discount.value.toString());
  const [discountType, setDiscountType] = useState<"pct" | "flat">(
    discount.method
  );

  useEffect(() => {
    setLocalPrice(price.toString());
    setLocalDiscount(discount.value.toString());
    setDiscountType(discount.method);
  }, [price, discount]);

  const handlePriceChange = (value: string) => {
    const numericValue = handleNumericInput(value);
    setLocalPrice(numericValue);
    onChange(Number(numericValue), {
      ...discount,
      value: Number(localDiscount),
    });
  };

  const handleDiscountChange = (value: string) => {
    const numericValue = handleNumericInput(value);
    setLocalDiscount(numericValue);
    onChange(Number(localPrice), {
      method: discountType,
      value: Number(numericValue),
    });
  };

  const handleDiscountTypeChange = (newDiscountType: "pct" | "flat" | null) => {
    if (newDiscountType !== null) {
      setDiscountType(newDiscountType);
      onChange(Number(localPrice), {
        method: newDiscountType,
        value: Number(localDiscount),
      });
    }
  };

  const handleNumericInput = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "500px", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Price Info
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Heading variant="body2" sx={{ mb: 1 }}>
          Price *
        </Heading>
        <StyledTextField
          fullWidth
          value={localPrice}
          onChange={(e) => handlePriceChange(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "7px 0px",
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Heading variant="body2" sx={{ mb: 1 }}>
          Discount
        </Heading>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StyledTextField
            sx={{ flexGrow: 1, mr: 1 }}
            value={localDiscount}
            onChange={(e) => handleDiscountChange(e.target.value)}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
          <StyledToggleButtonGroup
            value={discountType}
            exclusive
            onChange={handleDiscountTypeChange}
            aria-label="discount type"
          >
            <ToggleButton value="pct" aria-label="percentage">
              %
            </ToggleButton>
            <ToggleButton value="flat" aria-label="fixed amount">
              ₹
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}

export default PriceComponent;
