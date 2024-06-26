import { getImageById } from "@/actions/image.actions";
import { getUserById } from "@/actions/user.actions";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Header } from "@/components/shared/Header";
import { TransformedImage } from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
import { getImageSize } from "@/lib/utils/getImageSize";
import { getSession } from "@/services/getSession";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type TransformationParams = {
  params: {
    id: string;
  };
};

export default async function TransformationPage({
  params: { id },
}: TransformationParams) {
  const session = await getSession();
  const user = await getUserById(session?.user.id ?? "");
  const image = await getImageById(parseInt(id));

  if (!image) {
    notFound();
  }

  return (
    <>
      <Header title={image.title} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className=" capitalize text-purple-400">
            {image.transformationType}
          </p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            <Image
              width={getImageSize(image.transformationType, image, "width")}
              height={getImageSize(image.transformationType, image, "height")}
              src={image.secureUrl}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {user?.id === image.userId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/transformations/${image.id}/update`}>
                Update Image
              </Link>
            </Button>

            {image.id && <DeleteConfirmation imageId={image.id} />}
          </div>
        )}
      </section>
    </>
  );
}
