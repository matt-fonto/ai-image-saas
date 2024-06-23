"use server";

import db from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import { ImageType } from "@/lib/schemas/image.schema";

// ADD IMAGE
export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    // connect image to user
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const newImage = await db.image.create({
      data: {
        ...image,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}

export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    const imageToUpdate = await db.image.findUnique({
      where: {
        id: image.id,
      },
    });

    if (!imageToUpdate || imageToUpdate.userId !== userId) {
      throw new Error("Image not found or unauthorized");
    }

    const updatedImage = await db.image.update({
      where: {
        id: image.id,
      },
      data: {
        ...image,
      },
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteImage(id: number) {
  try {
    const image = await db.image.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      throw new Error("Image not found");
    }

    await db.image.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}

export async function getImageById(
  id?: number
): Promise<ImageType | undefined> {
  try {
    const image = await db.image.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    console.log("image", image);

    if (!image) {
      throw new Error("Image not found");
    }

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllImages({
  limit = 9,
  page = 1,
  searchQuery,
}: GetAllImagesParams) {
  try {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = "folder=ai-image-generator";

    if (searchQuery) {
      expression += ` AND tags=${searchQuery}`;
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourcesId = resources.map((resource: any) => resource.public_id);
    let query = {};

    if (searchQuery && resourcesId.length > 0) {
      query = {
        publicId: {
          in: resourcesId,
        },
      };
    }

    const images = await db.image.findMany({
      where: query,
      include: {
        user: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: limit,
    });

    const totalImages = await db.image.count({
      where: query,
    });

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getUserImages({
  limit = 9,
  page = 1,
  userId,
}: {
  limit?: number;
  page: number;
  userId: number;
}) {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const images = await db.image.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip: skipAmount,
      take: limit,
    });

    const totalImages = await db.image.count({
      where: {
        userId,
      },
    });

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
