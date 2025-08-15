
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();

// // ✅ Explicitly allow your frontend domain + any *.vercel.app subdomain
// const allowedOrigins = [
//   "https://crazy-foodies.vercel.app",
//   /\.vercel\.app$/
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
//     if (
//       allowedOrigins.some(o =>
//         typeof o === "string" ? o === origin : o.test(origin)
//       )
//     ) {
//       return callback(null, true);
//     }
//     return callback(new Error("Not allowed by CORS"));
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true
// }));

// // ✅ Handle preflight requests
// app.options("*", cors());

// // Test route
// app.get("/", (req, res) => {
//   res.send("🎉 Swiggy Proxy Server is Running");
// });

// // Swiggy list API
// app.get("/api/swiggy", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7041&lng=77.1025&page_type=DESKTOP_WEB_LISTING",
//       {
//         headers: {
//           "User-Agent": "Mozilla/5.0",
//           "Referer": "https://www.swiggy.com/",
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Error fetching Swiggy data:", error.message);
//     res.status(500).json({ error: "Failed to fetch list data" });
//   }
// });

// // Swiggy menu API
// app.get("/api/menu/:resId", async (req, res) => {
//   const { resId } = req.params;
//   const MENU_API = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}`;

//   try {
//     const response = await axios.get(MENU_API, {
//       headers: {
//         "User-Agent": "Mozilla/5.0",
//         "Referer": "https://www.swiggy.com/",
//       },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Error fetching Swiggy menu:", error.message);
//     res.status(500).json({ error: "Failed to fetch menu data" });
//   }
// });

// module.exports = app;

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "https://crazy-foodies.vercel.app",
  /\.vercel\.app$/
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => typeof o === "string" ? o === origin : o.test(origin))) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Preflight
app.options("*", cors());

// Health check
app.get("/", (req, res) => {
  res.send("🎉 Swiggy Proxy Server is Running");
});

// Swiggy list API
app.get("/api/swiggy", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7041&lng=77.1025&page_type=DESKTOP_WEB_LISTING",
      { headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://www.swiggy.com/" } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching Swiggy data:", error.message);
    res.status(500).json({ error: "Failed to fetch list data" });
  }
});

// Swiggy menu API
app.get("/api/menu/:resId", async (req, res) => {
  try {
    const { resId } = req.params;
    const response = await axios.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${resId}`,
      { headers: { "User-Agent": "Mozilla/5.0", "Referer": "https://www.swiggy.com/" } }
    );
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching Swiggy menu:", error.message);
    res.status(500).json({ error: "Failed to fetch menu data" });
  }
});

module.exports = app;



