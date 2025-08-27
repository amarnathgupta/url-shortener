import { getOriginalUrl, shorten } from "../services/url.service.js";

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

export async function redirectUrl(req, res) {
  try {
    const { urlCode } = req.params;
    if (!urlCode) {
      return res.status(400).json({ error: "URL code is required" });
    }

    const result = await getOriginalUrl(urlCode);
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(302).redirect(result.originalUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}
