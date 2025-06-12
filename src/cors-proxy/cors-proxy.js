// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());

// app.get('/proxy', async (req, res) => {
//   const targetUrl = req.query.url;

//   try {
//     const response = await fetch(targetUrl, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0',
//         'Accept': '*/*',
//         'referer': 'https://www.swiggy.com/',
//         'origin': 'https://www.swiggy.com',
//       },
//     });

//     const contentType = response.headers.get('content-type');

//     if (contentType && contentType.includes('application/json')) {
//       const data = await response.json();
//       res.json(data);
//     } else {
//       const data = await response.text();
//       res.send(data);
//     }
//   } catch (error) {
//     console.error('Error fetching from Swiggy:', error.message);
//     res.status(500).json({ error: 'Failed to fetch from Swiggy' });
//   }
// });

// app.listen(8080, () => {
//   console.log('Proxy server running on http://localhost:8080');
// });


const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;

  // ✅ Check if targetUrl is valid
  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing URL parameter' });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*',
        'referer': 'https://www.swiggy.com/',
        'origin': 'https://www.swiggy.com',
      },
    });

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.json(data);
    } else {
      const data = await response.text();
      res.send(data);
    }
  } catch (error) {
    console.error('Error fetching from Swiggy:', error.message);
    res.status(500).json({ error: 'Failed to fetch from Swiggy' });
  }
});

app.listen(8080, () => {
  console.log('Proxy server running on http://localhost:8080');
});