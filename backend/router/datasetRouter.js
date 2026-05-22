const express = require('express');
const router = express.Router();
const Dataset = require('../models/datasetModel');
const auth = require('../middleware/auth'); // Import your new auth middleware

// --- Create a new dataset (PROTECTED) ---
// The 'auth' middleware will run first. If the token is valid, it passes control to the next function.
router.post('/add', auth, (req, res) => {
    // Create a data object from the request body
    const datasetData = { ...req.body };
    
    // Securely set the owner from the authenticated user token, overriding any potential input
    datasetData.owner = req.user.userId;

    // Map the 'cover' field from the frontend to the 'coverImage' field in the model
    if (datasetData.cover) {
        datasetData.coverImage = datasetData.cover;
        delete datasetData.cover; // Clean up the object to avoid saving an extra 'cover' field
    }

    const newDataset = new Dataset(datasetData);

    newDataset.save()
        .then(savedDataset => {
            console.log('Dataset created:', savedDataset);
            res.status(201).json(savedDataset);
        })
        .catch(err => {
            // Provide more specific feedback for validation errors
            if (err.name === 'ValidationError') {
                return res.status(400).json({ message: 'Validation failed', error: err.message });
            }
            console.error(err);
            res.status(500).json({ message: 'Error creating dataset' });
        });
});

// --- NEW: Get a single dataset by its ID (PUBLIC) ---
router.get('/getbyid/:id', (req, res) => {
    Dataset.findById(req.params.id).populate('owner')
        .then(dataset => {
            if (!dataset) {
                return res.status(404).json({ message: "Dataset not found" });
            }
            res.status(200).json(dataset);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error fetching dataset" });
        });
});

// --- Get all datasets for a specific user (PROTECTED) ---
router.get('/getbyuser/:userid', auth, (req, res) => {
    // Security check: Ensure the logged-in user is only requesting their own datasets
    if (req.user.userId !== req.params.userid) {
        return res.status(403).json({ message: 'Forbidden: You can only access your own datasets.' });
    }

    Dataset.find({ owner: req.params.userid })
        .then(datasets => {
            res.status(200).json(datasets);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching datasets' });
        });
});

// --- NEW: Get datasets by category (PUBLIC) ---
router.get('/getbycategory/:category', (req, res) => {
    Dataset.find({ category: req.params.category })
        .then(datasets => {
            res.status(200).json(datasets);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching datasets by category' });
        });
});

// --- Get all datasets (PUBLIC) ---
// This route does not have the 'auth' middleware, so anyone can access it.
router.get('/getall', (req, res) => {
    Dataset.find().populate('owner')
        .then(datasets => {
            res.status(200).json(datasets);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error fetching all datasets' });
        });
});

// --- Search for datasets (PUBLIC) ---
router.get('/search/:term', (req, res) => {
    const searchTerm = req.params.term;
    const searchRegex = new RegExp(searchTerm, 'i');

    Dataset.find({
        $or: [
            { name: searchRegex },
            { description: searchRegex }
        ]
    })
        .then(datasets => {
            res.status(200).json(datasets);
        })
        .catch(err => {
            console.error('Error during search:', err);
            res.status(500).json({ message: 'Error searching for datasets' });
        });
});


module.exports = router;

