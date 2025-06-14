
import React from "react";

/**
 * Props for ManualImage component.
 * @param description Text to show below the placeholder image.
 */
interface ManualImageProps {
  description: string;
}

export const ManualImage: React.FC<ManualImageProps> = ({ description }) => (
  <div className="flex flex-col items-center my-6 w-full">
    <div className="w-full h-48 bg-gray-200 rounded shadow-inner flex items-center justify-center text-gray-500 text-lg mb-2">
      <span>Image placeholder</span>
    </div>
    <span className="text-xs text-muted-foreground text-center">
      {description}
    </span>
  </div>
);

export default ManualImage;
