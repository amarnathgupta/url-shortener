import { shorten } from "../services/url.service.js";

export async function shortenUrl(req, res) {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const result = await shorten(originalUrl);

    return res.status(201).json({
      message: result.message,
      shortUrl: result.shortUrl,
    });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}
