import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

const StyledTableContainer = styled(TableContainer)({
  boxShadow: "none",
  border: "none",
});

const StyledTable = styled(Table)({
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
});

const StyledHeading = styled(TableCell)({
  padding: "0px",
  fontSize: "12px",
  paddingLeft: "10px",
});

const StyledTableCell = styled(TableCell)({
  padding: "8px",
});

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 45,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "200ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "black",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 21,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E2E8F0",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const StyledTextField = styled(TextField)<{ $inactive: boolean }>(
  ({ theme, $inactive }) => ({
    "& .MuiInputBase-root": {
      backgroundColor: $inactive ? "#E2E8F0" : "inherit",
      "&.Mui-disabled": {
        backgroundColor: "#E2E8F0",
      },
      borderRadius: "8px",
    },
    "& .MuiInputBase-input": {
      color: $inactive ? theme.palette.text.disabled : "inherit",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: $inactive ? "none" : undefined,
    },
  })
);

interface Variant {
  option: string;
  values: string[];
}

interface CombinationsComponentProps {
  variants: Variant[];
  combinations: {
    [key: string]: {
      name: string;
      sku: string;
      quantity: number | null;
      inStock: boolean;
    };
  };
  setCombinations: (
    newCombinations: CombinationsComponentProps["combinations"]
  ) => void;
}

interface SkuState {
  [key: string]: string;
}

interface BooleanState {
  [key: string]: boolean;
}

const CombinationsComponent: React.FC<CombinationsComponentProps> = ({
  variants,
  combinations,
  setCombinations,
}) => {
  const [skus, setSkus] = useState<SkuState>({});
  const [duplicateSkus, setDuplicateSkus] = useState<BooleanState>({});

  useEffect(() => {
    if (Object.keys(combinations).length === 0) {
      generateCombinations();
    }
  }, [variants]);

  const generateCombinations = () => {
    const options = variants.map((v) => v.values);
    const combos = cartesianProduct(options);
    const newCombinations = { ...combinations };
    combos.forEach((combo) => {
      const key = combo.join("/");
      if (!newCombinations[key]) {
        newCombinations[key] = {
          name: key,
          sku: "",
          quantity: null,
          inStock: false,
        };
      }
    });
    setCombinations(newCombinations);
  };

  useEffect(() => {
    checkForDuplicateSkus();
  }, [skus]);

  const cartesianProduct = (arr: string[][]): string[][] => {
    return arr.reduce<string[][]>(
      (a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
      [[]]
    );
  };

  const checkForDuplicateSkus = () => {
    const newDuplicateSkus: BooleanState = {};
    const skuCounts: { [key: string]: number } = {};

    Object.values(skus).forEach((sku) => {
      if (sku.trim() !== "") {
        skuCounts[sku] = (skuCounts[sku] || 0) + 1;
      }
    });

    Object.entries(skus).forEach(([combo, sku]) => {
      if (sku.trim() !== "" && skuCounts[sku] > 1) {
        newDuplicateSkus[combo] = true;
      }
    });

    setDuplicateSkus(newDuplicateSkus);
  };

  const handleSkuChange = (combo: string, value: string) => {
    setSkus((prev) => ({ ...prev, [combo]: value }));

    setCombinations({
      ...combinations,
      [combo]: { ...combinations[combo], sku: value },
    });
  };

  const handleInStockChange = (combo: string) => {
    setCombinations({
      ...combinations,
      [combo]: {
        ...combinations[combo],
        inStock: !combinations[combo].inStock,
      },
    });
  };

  const handleQuantityChange = (combo: string, value: string) => {
    const numValue = value === "" ? null : Number(value.replace(/[^0-9]/g, ""));
    setCombinations({
      ...combinations,
      [combo]: { ...combinations[combo], quantity: numValue },
    });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ margin: "1rem 0" }}>
        Combinations
      </Typography>
      <StyledTableContainer>
        <StyledTable size="small">
          <TableHead>
            <TableRow>
              <StyledHeading></StyledHeading>
              <StyledHeading>SKU *</StyledHeading>
              <StyledHeading>In stock</StyledHeading>
              <StyledHeading>Quantity</StyledHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(combinations).map(([comboKey, combo]) => (
              <TableRow key={comboKey}>
                <StyledTableCell>{comboKey}</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    size="small"
                    value={combo.sku}
                    onChange={(e) => handleSkuChange(comboKey, e.target.value)}
                    helperText={duplicateSkus[comboKey] ? "Duplicate SKU" : ""}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledSwitch
                    checked={combo.inStock}
                    onChange={() => handleInStockChange(comboKey)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTextField
                    size="small"
                    value={combo.quantity || ""}
                    onChange={(e) =>
                      handleQuantityChange(comboKey, e.target.value)
                    }
                    disabled={!combo.inStock}
                    $inactive={!combo.inStock}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </Box>
  );
};

export default CombinationsComponent;
