
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// ✅ Home test route
app.get('/', (req, res) => {
  res.send('🎉 Swiggy Proxy Server is Running');
});

// ✅ Restaurant list route
app.get('/api/swiggy', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7041&lng=77.1025&page_type=DESKTOP_WEB_LISTING',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://www.swiggy.com/',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching Swiggy data:', error.message);
    res.status(500).json({ error: 'Failed to fetch list data' });
  }
});

// ✅ THIS IS MISSING IN YOUR SERVER: ADD THIS 👇
app.get('/api/menu/:resId', async (req, res) => {
  const { resId } = req.params;

  const MENU_API = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}`;

  try {
    const response = await axios.get(MENU_API, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.swiggy.com/',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching Swiggy menu:', error.message);
    res.status(500).json({ error: 'Failed to fetch menu data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
