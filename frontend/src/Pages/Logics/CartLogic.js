// src/Components/Logics/CartLogic.js

export const handleIncrease = async (mutationFn, itemId, onSuccess, onError) => {
    try {
      await mutationFn({ itemId });
      console.log("Item quantity increased!");
      onSuccess("Item quantity increased!");
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      onError("Failed to increase quantity!");
    }
  };
  
  export const handleDecrease = async (mutationFn, itemId, onSuccess, onError) => {
    try {
      await mutationFn({ itemId });
      console.log("Item quantity decreased!");
      onSuccess("Item quantity decreased!");
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      onError("Failed to decrease quantity!");
    }
  };
  
  export const handleRemove = async (mutationFn, itemId, onSuccess, onError) => {
    try {
      await mutationFn(itemId);
      onSuccess("Item removed from cart!");
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      onError("Failed to remove item from cart!");
    }
  };
  