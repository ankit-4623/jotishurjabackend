import axios from "axios";
import { json } from "express";
export const dailyhoroscope = async (req, res) => {
  try {
    const { sign } = req.query;
    const data = `https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`;

    const response = await axios.get(data);

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
    res.status(200).json({ message: "freekundli controller" });
  } catch (error) {
    console.error("Error in freekundli controller:", error);
    res.status(500).json({ error: "freekundli Internal Server Error" });
  }
};
