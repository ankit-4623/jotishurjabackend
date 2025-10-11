import axios from "axios";
export const dailyhoroscope = async (req, res) => {
  try {
    const { sign } = req.query;
    const data = `https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`;
   
    const response = await axios.get(data);

    res.status(200).json({ message: "dailyhoroscope controller", data: response.data });
  } catch (error) {
    console.error("Error in dailyhoroscope controller:", error);
    res.status(500).json({ error: "dailyhoroscope Internal Server Error" });
  }
};

export const matchmaking = async (req, res) => {
  try {
    res.status(200).json({ message: "matchmaking controller" });
  } catch (error) {
    console.error("Error in matchmaking controller:", error);
    res.status(500).json({ error: "matchmaking Internal Server Error" });
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
