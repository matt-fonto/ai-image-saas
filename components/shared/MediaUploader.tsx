import { useToast } from "../ui/use-toast";
import { CldUploadWidget } from "next-cloudinary";

const CLOUDINARY_UPLOAD_PRESET = "ai-image-generator";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: (image: string) => void;
  publicId: string;
  image: string;
  type: string;
};

export function MediaUploader({
  onValueChange,
  setImage,
  publicId,
  image,
  type,
}: MediaUploaderProps) {
  const { toast } = useToast();

  const onUploadSuccess = (result: any) => {
    toast({
      title: "Upload success",
      description: "1 credit used",
      duration: 5 * 1000,
      className: "success-toast",
    });
  };

  const onUploadError = () => {
    toast({
      title: "Upload failed",
      description: "Please try again",
      duration: 5 * 1000,
      className: "error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset={CLOUDINARY_UPLOAD_PRESET} //coming from cloudinary
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccess}
      onError={onUploadError}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>
        </div>

        // {publicId}
      )}
    </CldUploadWidget>
  );
}
