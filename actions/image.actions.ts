"use server";

import db from "@/lib/db";
import { handleError } from "@/lib/utils/handleError";
import { revalidatePath } from "next/cache";

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

    return {
      image: newImage,
      error: null,
    };
  } catch (error) {
    handleError(error);
  }
}

export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    const imageToUpdate = await db.image.findUnique({
      where: {
        id: image._id,
      },
    });

    if (!imageToUpdate || imageToUpdate.userId !== userId) {
      throw new Error("Image not found or unauthorized");
    }

    const updatedImage = await db.image.update({
      where: {
        id: image._id,
      },
      data: {
        ...image,
      },
    });

    revalidatePath(path);

    return {
      image: updatedImage,
      error: null,
    };
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

    revalidatePath(path);

    return {
      image,
      error: null,
    };
  } catch (error) {
    handleError(error);
  }
}
