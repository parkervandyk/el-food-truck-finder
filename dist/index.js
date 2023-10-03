"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const papaparse_1 = __importDefault(require("papaparse"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.get('/foodtrucks', async (req, res) => {
    const cuisineType = req.query.cuisine;
    try {
        const { data } = await axios_1.default.get('https://raw.githubusercontent.com/peck/engineering-assessment/main/Mobile_Food_Facility_Permit.csv');
        const records = papaparse_1.default.parse(data, {
            header: true,
            skipEmptyLines: true,
        }).data;
        const filteredTrucks = records.filter((record) => {
            if (record['Status'] !== 'APPROVED')
                return false;
            // If no specific cuisine is provided, return all approved trucks
            if (!cuisineType || cuisineType.trim() === '')
                return true;
            // If a specific cuisine is provided, only return those that match
            return record['FoodItems']
                .toLowerCase()
                .includes(cuisineType.toLowerCase());
        });
        // simple console statement to validate request went through
        console.log('requested success');
        res.json(filteredTrucks);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});
app.use(express_1.default.static('public'));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
