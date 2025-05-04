import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddCategoryMutation, useGetAllCategoriesQuery, useAddItemMutation } from "../../App/Services/ItemApi";

const useAddItem = () => {
  const [categories, setCategories] = useState([]);
  const { data: categoryData, refetch } = useGetAllCategoriesQuery(); // Fetch categories
  const [addCategoryMutation, { isLoading: categoryLoading }] = useAddCategoryMutation(); // Fix destructuring
  const [addItemMutation] = useAddItemMutation(); // Item mutation hook

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.map((category) => category));
    }
  }, [categoryData]);

  const addCategory = async (newCategory) => {
    if (newCategory && !categories.includes(newCategory)) {
      try {
        const response = await addCategoryMutation({ name: newCategory }).unwrap();
        console.log(categoryLoading?"Loading":"");
        console.log("Response:", response);
        alert("Added category");
        await refetch(); // Refetch categories after adding
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      imageUrl: "",
      category: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Item name is required"),
      price: Yup.number().positive("Price must be positive").required("Price is required"),
      imageUrl: Yup.string().url("Enter a valid image URL").required("Image URL is required"),
      category: Yup.string().required("Please select a category"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await addItemMutation(values).unwrap();
        console.log("Item added:", response);
        alert("Item added successfully!"); 
        resetForm();
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item. Please try again.");
      }
    },
  });

  return { formik, categories, addCategory, categoryLoading };
};

export default useAddItem;
