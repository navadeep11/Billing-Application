import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  CardActionArea,
} from "@mui/material";
import {
  ShoppingCart,
  ReceiptLong,
  Insights,
} from "@mui/icons-material";

const features = [
  {
    icon: <ShoppingCart fontSize="large" color="primary" />,
    title: "Add Items",
    description: "Easily manage inventory and streamline your shop's stock.",
  },
  {
    icon: <ReceiptLong fontSize="large" color="primary" />,
    title: "Generate Bills",
    description: "Quick and hassle-free billing with instant records.",
  },
  {
    icon: <Insights fontSize="large" color="primary" />,
    title: "View Analytics",
    description: "Gain insights into your sales and track performance trends.",
  },
];

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        pt: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
          Welcome to Involtix
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6 }}
        >
          Smart billing and analytics for your shop.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea sx={{ p: 3 }}>
                  <Box mb={2}>{feature.icon}</Box>
                  <Typography variant="h5" fontWeight="600" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
