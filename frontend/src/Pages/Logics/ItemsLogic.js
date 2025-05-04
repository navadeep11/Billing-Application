import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useGetAllCategoriesQuery,
  useGetAllItemsQuery,
  useDeleteItemMutation,
} from "../../App/Services/ItemApi";
import {
  useAddToCartMutation,
  useDecreaseQuantityMutation,
  useIncreaseQuantityMutation,
  useGetCartQuery,
} from "../../App/Services/CartApi";

const ItemsLogic = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { data: categoryData } = useGetAllCategoriesQuery();
  const { data: cartData } = useGetCartQuery();
  const [deleteItem] = useDeleteItemMutation();
  const [addToCart] = useAddToCartMutation();
  const [increaseQuantity] = useIncreaseQuantityMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();

  const formik = useFormik({
    initialValues: {
      search: "",
      category: "",
    },
    validationSchema: Yup.object({
      search: Yup.string(),
      category: Yup.string().nullable(),
    }),
    onSubmit: () => {},
  });

  const { data, isLoading, refetch } = useGetAllItemsQuery({
    search: formik.values.search,
    category: formik.values.category,
  });

  useEffect(() => {
    if (categoryData) setCategories(categoryData);
    if (cartData) setCart(cartData.items || []);
  }, [categoryData, cartData]);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  useEffect(() => {
    refetch({ search: formik.values.search, category: formik.values.category || "" });
  }, [formik.values.search, formik.values.category, refetch]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAddToCart = async (item) => {
    try {
      const response = await addToCart({ itemId: item._id }).unwrap();
      setCart(response.items || []);
      showSnackbar(`"${item.name}" added to cart!`);
    } catch {
      showSnackbar("Failed to add item to cart.", "error");
    }
  };

  const onIncrease = async (itemId) => {
    try {
      const response = await increaseQuantity({ itemId }).unwrap();
      setCart(response.items || []);
      showSnackbar("Quantity increased!");
    } catch {
      showSnackbar("Failed to increase quantity.", "error");
    }
  };

  const onDecrease = async (itemId) => {
    try {
      const response = await decreaseQuantity({ itemId }).unwrap();
      setCart(response.items || []);
      showSnackbar("Quantity decreased!");
    } catch {
      showSnackbar("Failed to decrease quantity.", "error");
    }
  };

  const getCartItemQuantity = (itemId) => {
    const item = cart.find((i) => i.itemId === itemId);
    return item ? item.quantity : 0;
  };

  const handleDeleteItem = async (itemId) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      await deleteItem(itemId).unwrap();
      refetch();
      showSnackbar("Item deleted!");
    } catch {
      showSnackbar("Failed to delete item.", "error");
    }
  };

  return {
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
  };
};

export default ItemsLogic;
