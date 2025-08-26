import prisma from "../config/db.js";

export async function checkUrlExists(originalUrl) {
  const url = await prisma.link.findUnique({
    where: { originalUrl: originalUrl },
  });

  if (url) {
    return {
      success: true,
      message: "URL already exists",
      data: {
        shortCode: url.shortCode,
      },
    };
  }

  return {
    success: false,
    message: "URL does not exist",
    data: null,
  };
}

export async function saveUrl(originalUrl, tx) {
  const prismaClient = tx || prisma;
  const newUrl = await prismaClient.link.create({
    data: {
      originalUrl,
    },
  });

  return {
    success: true,
    data: {
      id: newUrl.id,
    },
    message: "URL saved successfully",
  };
}

export async function updateUrl(id, data, tx) {
  const prismaClient = tx || prisma;
  const updatedUrl = await prismaClient.link.update({
    where: { id },
    data: {
      ...data,
    },
  });

  return {
    success: true,
    message: "URL updated successfully",
    data: updatedUrl,
  };
}
