import Image, { StaticImageData } from "next/image";
import { ContentBlock } from "../core/content-block";
import PageTitle from "../layout/page-title";
import { CardContent } from "../ui/card";
import { FileUploader } from "./image-upload";

export function AIImageProcessingPage({
  title,
  renderImage,
  input,
  output,
}: {
  title: string;
  renderImage: (image: string) => void;
  input: StaticImageData;
  output: StaticImageData;
}) {
  return (
    <>
      <PageTitle
        title={title}
        subTitle="$1 per image. Pay after viewing the result."
      />

      <div className="h-8"></div>

      <ContentBlock>
        <CardContent>
          <div className="flex flex-col">
            <p className="text-lg py-8">
              Upload your image, and let the magic happen. Your privacy
              matters—all uploaded content and processed images are wiped hourly
              from our systems.
            </p>

            <FileUploader onUploadComplete={renderImage} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg text-bold py-8">Before</p>
                <Image src={input} alt={title} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg text-bold py-8">After</p>
                <Image src={output} alt={title} />
              </div>
            </div>
          </div>
        </CardContent>
      </ContentBlock>
    </>
  );
}
