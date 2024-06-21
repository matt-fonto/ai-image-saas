import { notFound, redirect } from "next/navigation";

import { transformationTypes } from "@/constants";
import { getSession } from "@/services/getSession";
import { getUserById } from "@/actions/user.actions";
import { getImageById } from "@/actions/image.actions";
import { Header } from "@/components/shared/Header";
import { TransformationForm } from "@/components/shared/TransformationForm";

export default async function UpdateTransformationPage({
  params: { id },
}: SearchParamProps) {
  const session = await getSession();
  const user = await getUserById(session?.user.id ?? "");
  const image = await getImageById(parseInt(id));

  if (!user) {
    redirect("/sign-in");
  }

  if (!image) {
    notFound();
  }

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subtitle} />

      <section className="mt-10">
        <TransformationForm
          action="update"
          userId={user.id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={user.creditBalance ?? 0}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
}
