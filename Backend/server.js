import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import axios from "axios";

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors()); 

const users = [{ email: "user1@nasa.com", password: bcrypt.hashSync("user1", 10) }];
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const PORT = process.env.PORT
const API_KEY = process.env.API_KEY
const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";
const NASA_MARS_URL = "https://api.nasa.gov/mars-photos/api/v1";


app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});


app.get("/api/protected", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Invalid token" });
        res.json({ message: `Welcome ${decoded.email.split("@")[0]}` });
    });
});


app.get("/api/apod", async (req, res) => {
    try {
        const { searchBy, date, count, thumbs } = req.query;

        const params = {
            api_key: API_KEY,
            ...(searchBy === "date" && date && { date }),
            ...(searchBy === "range" && date && { start_date: date }),
            ...(searchBy === "random" && count && { count }),
            thumbs: thumbs === "true",
        };

        const response = await axios.get(NASA_APOD_URL, { params });
        res.json(response.data);
    } catch (error) {
        console.error("APOD API Error:", error.message);
        res.status(500).json({ error: "Failed to fetch APOD data" });
    }
});


app.get("/api/mars-photos", async (req, res) => {
    try {
        const { rover, sol, earth_date, camera, page } = req.query;
        if (!rover) return res.status(400).json({ error: "Rover name is required." });

        let url = `${NASA_MARS_URL}/rovers/${rover}/photos?api_key=${API_KEY}`;
        if (sol) url += `&sol=${sol}`;
        if (earth_date) url += `&earth_date=${earth_date}`;
        if (camera) url += `&camera=${camera}`;
        if (page) url += `&page=${page}`;

        const response = await axios.get(url);
        res.json(response.data.photos);
    } catch (error) {
        console.error("Error fetching Mars photos:", error.message);
        res.status(500).json({ error: "Failed to fetch Mars Rover photos." });
    }
});


app.get("/api/mars-manifest", async (req, res) => {
    try {
        const { rover } = req.query;
        if (!rover) return res.status(400).json({ error: "Rover name is required." });

        const url = `${NASA_MARS_URL}/manifests/${rover}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data.photo_manifest);
    } catch (error) {
        console.error("Error fetching Mars manifest:", error.message);
        res.status(500).json({ error: "Failed to fetch Mars Rover manifest." });
    }
});

app.post("/api/chatbot", async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ response: "Please ask a question!" });

    let responseText = "I couldn't find relevant data.";
    const userInput = question.toLowerCase().trim();
 

    try {
        if (userInput.includes("astronomy picture") || userInput.includes("apod")) {
            console.log("Fetching APOD data...");
            const apod = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`);
            responseText = `📷 NASA's Astronomy Picture of the Day: ${apod.data.title}. Explanation: ${apod.data.explanation}`;
        } else if (userInput.includes("mars rover") || userInput.includes("curiosity")) {
            console.log("Fetching Mars Rover data...");
            const mars = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}`);
            responseText = `🚀 Mars Rover Image: ${mars.data.photos[0].img_src}`;
        } else if (userInput.includes("epic") || userInput.includes("earth")) {
            console.log("Fetching EPIC Earth image...");
            const epic = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.API_KEY}`);
            responseText = `🌍 Latest EPIC Earth Image: https://api.nasa.gov/EPIC/archive/natural/${epic.data[0].date.split('-').join('/')}/png/${epic.data[0].image}.png?api_key=${process.env.API_KEY}`;
        }

        console.log(responseText);
        res.json({ response: responseText });

    } catch (error) {
        console.error("Error in chatbot API:", error.message);
        res.status(500).json({ response: "Error fetching data from NASA API." });
    }
});


app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
