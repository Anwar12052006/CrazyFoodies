// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();

// app.use(cors({
//   origin: "https://crazy-foodies.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.get('/', (req, res) => {
//   res.send('🎉 Swiggy Proxy Server is Running');
// });

// app.get('/api/swiggy', async (req, res) => {
//   try {
//     const response = await axios.get(
//       'https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7041&lng=77.1025&page_type=DESKTOP_WEB_LISTING',
//       {
//         headers: {
//           'User-Agent': 'Mozilla/5.0',
//           'Referer': 'https://www.swiggy.com/',
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error('❌ Error fetching Swiggy data:', error.message);
//     res.status(500).json({ error: 'Failed to fetch list data' });
//   }
// });

// app.get('/api/menu/:resId', async (req, res) => {
//   const { resId } = req.params;

//   const MENU_API = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}`;

//   try {
//     const response = await axios.get(MENU_API, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0',
//         'Referer': 'https://www.swiggy.com/',
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('❌ Error fetching Swiggy menu:', error.message);
//     res.status(500).json({ error: 'Failed to fetch menu data' });
//   }
// });

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// ✅ CORS configuration for your frontend
const allowedOrigins = ['https://crazy-foodies.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Test route
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

// ✅ Menu route
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
