import express from 'express';
import cors from 'cors';
import axios from 'axios';
import Papa from 'papaparse';

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/foodtrucks', async (req, res) => {
  const cuisineType = req.query.cuisine as string;

  try {
    const { data } = await axios.get(
      'https://raw.githubusercontent.com/peck/engineering-assessment/main/Mobile_Food_Facility_Permit.csv'
    );
    const records = Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
    }).data;

    const filteredTrucks = records.filter((record: any) => {
      if (record['Status'] !== 'APPROVED') return false;

      // If no specific cuisine is provided, return all approved trucks
      if (!cuisineType || cuisineType.trim() === '') return true;

      // If a specific cuisine is provided, only return those that match
      return record['FoodItems']
        .toLowerCase()
        .includes(cuisineType.toLowerCase());
    });

    // simple console statement to validate request went through
    console.log('requested success');
    res.json(filteredTrucks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
