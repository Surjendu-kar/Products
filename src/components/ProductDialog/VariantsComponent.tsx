import React, { useState, KeyboardEvent } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Chip,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";

const OptionRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    paddingRight: "8px",
  },
  "& .MuiInputLabel-root": {
    position: "relative",
    transform: "none",
    fontSize: "0.75rem",
    marginBottom: "4px",
  },
  "& .MuiInputBase-root": {
    marginTop: "0",
  },
}));

const AddOptionButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const InlineChip = styled(Chip)(() => ({
  margin: "2px",
  height: "24px",
}));

interface Variant {
  option: string;
  values: string[];
}

interface VariantsComponentProps {
  variants: Variant[];
  setVariants: (newVariants: Variant[]) => void;
}

const VariantsComponent: React.FC<VariantsComponentProps> = ({
  variants,
  setVariants,
}) => {
  const [inputValues, setInputValues] = useState<string[]>(
    variants.map(() => "")
  );

  const handleOptionChange = (index: number, value: string) => {
    const newVariants = [...variants];
    newVariants[index].option = value;
    setVariants(newVariants);
  };

  const handleValueAdd = (index: number, value: string) => {
    if (value.trim()) {
      const newVariants = [...variants];
      newVariants[index].values.push(value.trim());
      setVariants(newVariants);
      setInputValues((prev) => {
        const newInputValues = [...prev];
        newInputValues[index] = "";
        return newInputValues;
      });
    }
  };

  const handleValueRemove = (variantIndex: number, valueIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].values.splice(valueIndex, 1);
    setVariants(newVariants);
  };

  const handleAddOption = () => {
    setVariants([...variants, { option: "", values: [] }]);
    setInputValues([...inputValues, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
    setInputValues(inputValues.filter((_, i) => i !== index));
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleValueAdd(index, inputValues[index]);
    }
  };

  return (
    <Box>
      <Typography
        sx={{ fontSize: "15px", fontWeight: 600, margin: "1rem 0 0.5rem" }}
      >
        Variants
      </Typography>
      {variants.map((variant, index) => (
        <OptionRow key={index}>
          <Box sx={{ flex: 1 }}>
            <StyledTextField
              label="Option *"
              value={variant.option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              error={variant.option === ""}
              fullWidth
              size="small"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <StyledTextField
              label="Values *"
              value={inputValues[index]}
              onChange={(e) => {
                const newInputValues = [...inputValues];
                newInputValues[index] = e.target.value;
                setInputValues(newInputValues);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: variant.values.map((value, valueIndex) => (
                  <InlineChip
                    key={valueIndex}
                    label={value}
                    onDelete={() => handleValueRemove(index, valueIndex)}
                    deleteIcon={<CloseIcon style={{ fontSize: "16px" }} />}
                  />
                )),
              }}
            />
          </Box>
          <IconButton
            onClick={() => handleRemoveOption(index)}
            color="error"
            size="small"
          >
            <DeleteOutlineIcon />
          </IconButton>
        </OptionRow>
      ))}
      <AddOptionButton startIcon={<AddIcon />} onClick={handleAddOption}>
        ADD OPTION
      </AddOptionButton>
    </Box>
  );
};

export default VariantsComponent;
