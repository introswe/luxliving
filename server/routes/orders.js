const express = require('express');
const router = express.Router();

// Dynamically import node-fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Route: Orders
router.get('/', async (req, res) => {
    const API_KEY = process.env.Pixabay_API;
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent('bedroom')}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        // Debugging: Log the total hits to see if we are getting any results
        console.log(`Total Hits: ${data.totalHits}`);

        if (parseInt(data.totalHits) > 0) {
            // Map each hit to an object containing the name and URL
            const imagesInfo = data.hits.map(hit => ({
                name: hit.tags, // Using 'tags' as the name/title. Adjust if there's a more suitable field.
                url: hit.webformatURL || hit.largeImageURL
            }));

            // Debugging: Log the images info to the console
            console.log('Images Info:', imagesInfo);

            res.json({ message: 'This is the Orders Page.', images: imagesInfo });
        } else {
            console.log('No hits');
            res.json({ message: 'No hits found.' });
        }
    } catch (error) {
        console.error('Error fetching image data:', error);
        res.status(500).json({ message: 'Error fetching image data.' });
    }
});

module.exports = router;
