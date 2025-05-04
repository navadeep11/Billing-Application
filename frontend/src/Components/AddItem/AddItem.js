import React, { useState } from "react";
import { TextField, Button, MenuItem, IconButton, CircularProgress } from "@mui/material";
import { Plus, Image } from "lucide-react";
import "./AddItem.css";
import useAddItem from "./AddItemLogic";

const AddItem = () => {
  const { formik, categories, addCategory, categoryLoading } = useAddItem();
  const [newCategory, setNewCategory] = useState("");

  return (
    <div className='container'>
      <h2>Add New Item</h2>
      <form onSubmit={formik.handleSubmit} className='form'>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          {...formik.getFieldProps("price")}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          {...formik.getFieldProps("imageUrl")}
          error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
          helperText={formik.touched.imageUrl && formik.errors.imageUrl}
          InputProps={{
            startAdornment: <Image size={20} />,
          }}
        />
        <div className='categoryContainer'>
          <TextField
            select
            label="Category"
            fullWidth
            {...formik.getFieldProps("category")}
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="New Category"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <IconButton
            onClick={() => {
              addCategory(newCategory);
              setNewCategory("");
            }}
            disabled={categoryLoading}
            className='addCategoryButton'
          >
            {categoryLoading ? <CircularProgress /> : <Plus />}
          </IconButton>
        </div>
        <Button variant="contained" type="submit" className='submitButton'>
          Add Item
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
