import prisma from "../config/db.js";
import {
  checkUrlExists,
  getUrlByCode,
  saveUrl,
  updateUrl,
} from "../db/url.db.js";
import { encodeBase62 } from "../utils/base62.util.js";
import { cacheGet, cacheSet } from "../utils/cache.util.js";

export async function shorten(originalUrl) {
  const result = await checkUrlExists(originalUrl);
  if (result.success) {
    return {
      message: result.message,
      shortUrl: `${process.env.BASE_URL}/${result.data.shortCode}`,
    };
  }

  //   transaction block
  const shortUrl = await prisma.$transaction(async (tx) => {
    const newUrl = await saveUrl(originalUrl, tx);
    const id = newUrl.data.id;

    const shortCode = encodeBase62(id);

    await updateUrl(id, { shortCode }, tx);
    return `${process.env.BASE_URL}/${shortCode}`;
  });

  return {
    message: "URL shortened successfully",
    shortUrl,
  };
}

export async function getOriginalUrl(urlCode) {
  try {
    const cachedUrl = await cacheGet(urlCode);
    if (cachedUrl) {
      return {
        success: true,
        originalUrl: cachedUrl,
        message: "URL fetched from cache",
      };
    }

    const { success, message, data } = await getUrlByCode(urlCode);
    if (!success || !data) {
      return {
        success: false,
        originalUrl: null,
        message,
      };
    }

    await cacheSet(urlCode, data.originalUrl);

    return {
      success: true,
      originalUrl: data.originalUrl,
      message,
    };
  } catch (error) {
    console.error("Error in getOriginalUrl service:", error);
    throw error;
  }
}
