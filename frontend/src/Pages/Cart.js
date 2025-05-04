import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import {
  useGetCartQuery,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useRemoveFromCartMutation,
} from "../App/Services/CartApi";
import { useStoreBillMutation } from "../App/Services/BillApi";
import {
  handleIncrease,
  handleDecrease,
  handleRemove,
} from "./Logics/CartLogic";
import "./CSS/Cart.css";

const Cart = () => {
  const { data: cart, isLoading, refetch } = useGetCartQuery();
  const [increaseQuantity] = useIncreaseQuantityMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [storeBill] = useStoreBillMutation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selectedMode, setSelectedMode] = useState("");

  useEffect(() => {
    refetch();                 
  }, [refetch]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const onIncrease = async (itemId) => {
    await handleIncrease(increaseQuantity, itemId, showSnackbar, (msg) =>
      showSnackbar(msg, "error")
    );
    refetch();
  };

  const onDecrease = async (itemId) => {
    await handleDecrease(decreaseQuantity, itemId, showSnackbar, (msg) =>
      showSnackbar(msg, "error")
    );
    refetch();
  };

  const onRemove = async (itemId) => {
    await handleRemove(removeFromCart, itemId, showSnackbar, (msg) =>
      showSnackbar(msg, "error")
    );
    refetch();
  };

  const handleCheckout = () => {
    setSelectedMode("");
    setPaymentDialog(true);
  };

  const handleConfirmPayment = async () => {
    setPaymentDialog(false);
  
    try {
      const res = await storeBill({
        billItems: cart.items,
        TotalBill: cart.totalPrice,
        paymentMode: selectedMode,
      });
  
      refetch();
      
  
      showSnackbar(res?.data?.data || "Bill stored successfully");
    } catch (error) {
      showSnackbar(error?.data?.data || "Failed to store bill", "error");
    }
  };
  
  if (isLoading) return <Typography>Loading Cart...</Typography>;

  return (
    <Box className="cart-container">
      <Typography variant="h5" className="cart-title">
        Your Cart
      </Typography>

      <Box className="cart-items-scroll">
        {cart?.items?.length > 0 ? (
          cart.items.map((item) => (
            <Box className="cart-item" key={item.itemId}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
              />

              <Box className="cart-item-details">
                <Typography className="item-name">{item.name}</Typography>
                <Typography>₹{item.price}</Typography>
              </Box>

              <Box className="button-group-mobile">
                <Box className="quantity-buttons">
                  <IconButton onClick={() => onDecrease(item.itemId)}>
                    <Remove />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton onClick={() => onIncrease(item.itemId)}>
                    <Add />
                  </IconButton>
                </Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => onRemove(item.itemId)}
                  startIcon={<Delete />}
                  className="remove-button"
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No items in cart</Typography>
        )}
      </Box>

      <Box className="cart-bottom-bar">
        <Typography className="cart-total">Total: ₹{cart?.totalPrice}</Typography>
        <Button
          variant="contained"
          color="primary"
          className="checkout-button"
          onClick={handleCheckout}
          disabled={!cart?.items?.length}
        >
          Checkout
        </Button>
      </Box>

      <Dialog open={paymentDialog} onClose={() => setPaymentDialog(false)}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose a payment mode</FormLabel>
            <RadioGroup
              name="payment-mode"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash Payment"
              />
              <FormControlLabel
                value="online"
                control={<Radio />}
                label="Online Payment"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialog(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmPayment}
            variant="contained"
            disabled={!selectedMode}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
