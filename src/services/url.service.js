import prisma from "../config/db.js";
import { checkUrlExists, saveUrl, updateUrl } from "../db/url.db.js";
import { encodeBase62 } from "../utils/base62.util.js";

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
