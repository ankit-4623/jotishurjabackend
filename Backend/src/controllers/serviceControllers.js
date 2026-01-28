import axios from "axios";
import { json } from "express";
export const dailyhoroscope = async (req, res) => {
  try {
    const { sign } = req.query;
    if (!sign) {
      return res.status(400).json({ error: "Zodiac sign is required" });
    }
    const data = `https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`;

    const response = await axios.get(data, {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY || ''
      }
    });

    res
      .status(200)
      .json({ message: "dailyhoroscope controller", data: response.data });
  } catch (error) {
    console.error("Error in dailyhoroscope controller:", error);
    res.status(500).json({ error: "dailyhoroscope Internal Server Error" });
  }
};



export const matchmaking = async (req, res) => {
  try {
    const { male, female } = req.body;
 

    const { data } = await axios.post(
      "https://json.freeastrologyapi.com/match-making/ashtakoot-score",
      {
        male,
        female,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.MATCHMAKING_API_KEY,
        },
      }
    );

    res.status(200).json({
      message: "Matchmaking success",
      data,
    });
  } catch (error) {
    console.error(
      "Error in matchmaking controller:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Matchmaking Internal Server Error",
      details: error.response?.data || error.message,
    });
  }
};


export const freekundli = async (req, res) => {
  try {
    const { name, dob, birthTime, birthPlace, gender } = req.body;
    
    if (!name || !dob || !birthTime || !birthPlace) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Parse date and time
    const [year, month, day] = dob.split('-').map(Number);
    const [hour, minute] = birthTime.split(':').map(Number);

    // Call free astrology API for kundali
    const { data } = await axios.post(
      "https://json.freeastrologyapi.com/planets",
      {
        year,
        month,
        date: day,
        hours: hour,
        minutes: minute,
        seconds: 0,
        latitude: 28.6139, // Default to Delhi, can be improved with geocoding
        longitude: 77.2090,
        timezone: 5.5,
        settings: {
          observation_point: "topocentric",
          ayanamsha: "lahiri"
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.KUNDALI_API_KEY || process.env.MATCHMAKING_API_KEY,
        },
      }
    );

    res.status(200).json({ 
      message: "Kundali generated successfully",
      data: {
        name,
        dob,
        birthTime,
        birthPlace,
        gender,
        planets: data
      }
    });
  } catch (error) {
    console.error("Error in freekundli controller:", error.response?.data || error.message);
    res.status(500).json({ error: "freekundli Internal Server Error", details: error.response?.data || error.message });
  }
};
