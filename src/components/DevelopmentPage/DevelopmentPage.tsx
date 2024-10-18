import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Stack } from "@mui/material";

interface DevelopmentPageProps {
  pageName?: string;
}

const DevelopmentPage: React.FC<DevelopmentPageProps> = ({ pageName }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {pageName ? `${pageName} Page` : "This Page"} is Under Development
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          We're working hard to bring you new features. Please check back later!
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => navigate("/products")}
            color="primary"
          >
            View Products
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default DevelopmentPage;
