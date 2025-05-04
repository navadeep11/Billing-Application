const Category=require("../Models/CategoryModel");
const Item = require("../Models/ItemModel");


// Add Category Method

exports.AddCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const newCategory = new Category({
            name,
            userId: req.user.id // authentication middleware sets req.user
        });

        await newCategory.save();
        res.status(201).json({ message: 'Category added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get All Categories Method

exports.GetAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ userId: req.user.id }).distinct("name");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



// Add a new item
exports.addItem = async (req, res) => {
    try {
        const { name, price, imageUrl, category } = req.body;

        if (!name || !price || !imageUrl || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newItem = new Item({ name, price, imageUrl, category,userId: req.user.id });
        await newItem.save();
        res.status(201).json({ message: "Item added successfully", item: newItem });
    } catch (error) {
        res.status(400).json({ message: "Error adding item", error: error.message });
    }
};



// Get all items with optional filtering
exports.getAllItems = async (req, res) => {
    try {
        const { search, category } = req.query;
        const userId = req.user?.id; // Get user ID from request

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Base filter: Ensures we only fetch items belonging to the user
        let filter = { userId };

        // Apply category filter only if it's provided and not empty
        if (category && category.trim() !== "" && category !== "all") {
            filter.category = category;
        }

        // Apply search filter only if it's provided and non-empty
        if (search && search.trim() !== "") {
            filter.name = { $regex: search.trim(), $options: "i" };
        }


        // Fetch items
        const items = await Item.find(filter);


        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Error fetching items", error: error.message });
    }
};



// Delete an item by ID
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
};
