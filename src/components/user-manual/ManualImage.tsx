
import React from "react";

interface ManualImageProps {
  imageName: string;
  description: string;
}

/**
 * ManualImage shows either an uploaded screenshot (if provided) or a call to upload the image.
 * Place your image files in the project and update the `imageName` prop in the manual steps!
 */
const ManualImage: React.FC<ManualImageProps> = ({ imageName, description }) => {
  // Assume all images go into the `public` folder (e.g. public/manual/dashboard.png)
  // Try to load image dynamically or fallback to upload prompt
  const imgSrc = `/manual/${imageName}`;

  // We can't truly test image existence at build time, so always try to show the image;
  // if you upload it to /public/manual/imageName, it'll work
  return (
    <div className="flex flex-col items-center my-6 w-full">
      <div className="w-full flex flex-col items-center">
        <img
          src={imgSrc}
          alt={description}
          className="w-full max-w-md h-56 object-contain rounded shadow mb-2 border bg-white"
          onError={(e) => {
            // @ts-ignore
            e.target.onerror = null;
            // @ts-ignore
            e.target.src = "/placeholder.svg";
          }}
        />
        {/* If the image is the placeholder, prompt user to upload the real one */}
        <span className="text-xs text-muted-foreground text-center">
          {description}
          <br />
          <span className="italic">({imageName}: upload this screenshot to <b>public/manual/{imageName}</b> for the real image.)</span>
        </span>
      </div>
    </div>
  );
};

export default ManualImage;
