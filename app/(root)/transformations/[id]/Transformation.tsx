type TransformationParams = {
  params: {
    id: string;
  };
};

export default function Transformation({
  params: { id },
}: TransformationParams) {
  return <h2>Transformation {id}</h2>;
}
