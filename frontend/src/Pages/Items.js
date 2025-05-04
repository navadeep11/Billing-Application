import React from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Remove, ShoppingCart, Delete } from "@mui/icons-material";
import ItemsLogic from "./Logics/ItemsLogic";
import "./CSS/Items.css";

function Items() {
  const {
    formik,
    categories,
    items,
    cart,
    isLoading,
    snackbar,
    getCartItemQuantity,
    handleAddToCart,
    onIncrease,
    onDecrease,
    handleDeleteItem,
    handleCloseSnackbar,
  } = ItemsLogic();

  return (
    <Box className="items-wrapper">
      <div className="search-container">
        <TextField
          label="Search Items"
          variant="outlined"
          fullWidth
          className="search-bar"
          value={formik.values.search}
          onChange={(e) => formik.setFieldValue("search", e.target.value)}
        />
        <Autocomplete
          options={categories}
          value={formik.values.category}
          onChange={(event, newValue) => formik.setFieldValue("category", newValue || "")}
          renderInput={(params) => (
            <TextField {...params} label="Select Category" className="category-bar" />
          )}
        />
      </div>

      <Box className="items-container">
        {isLoading ? (
          <Typography variant="body1" align="center">Loading items...</Typography>
        ) : items.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {items.map((item) => {
              const quantity = getCartItemQuantity(item._id);
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <Card className="item-card">
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      alt={item.name}
                      className="item-image"
                    />
                    <CardContent className="item-content">
                      <Typography variant="body1" className="item-name">{item.name}</Typography>
                      <Typography variant="body2" className="item-price">₹{item.price}</Typography>
                      <Box className="item-buttons">
                        {quantity > 0 ? (
                          <Box className="quantity-box">
                            <IconButton color="primary" onClick={() => onDecrease(item._id)}>
                              <Remove />
                            </IconButton>
                            <Typography sx={{ minWidth: "20px", textAlign: "center" }}>{quantity}</Typography>
                            <IconButton color="primary" onClick={() => onIncrease(item._id)}>
                              <Add />
                            </IconButton>
                          </Box>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className="add-to-cart-button"
                            startIcon={<ShoppingCart fontSize="small" />}
                            onClick={() => handleAddToCart(item)}
                          >
                            Add To Cart
                          </Button>
                        )}
                        <IconButton color="error" size="small" onClick={() => handleDeleteItem(item._id)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography variant="body1" align="center">No items found</Typography>
        )}
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Items;
