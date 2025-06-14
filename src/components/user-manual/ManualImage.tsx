
import React from "react";

interface ManualImageProps {
  imageName: string;
  description: string;
}

// Map manual image names to Unsplash demo photos
const PLACEHOLDERS: Record<string, string> = {
  "welcome.png": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", // woman with laptop
  "login.png": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", // login screen
  "dashboard.png": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", // dashboard
  "jobcards.png": "https://images.unsplash.com/photo-1518770660439-4636190af475", // circuit board (as a tech job example)
  "invoices.png": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // programming monitor as "invoices" illustration
  "settings.png": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", // same as dashboard for now
  "language.png": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", // same as login for now
  "signature.png": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // signature/invoice
  "support.png": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
};

/**
 * ManualImage shows either an uploaded screenshot (if provided) or a relevant Unsplash demo photo as placeholder.
 */
const ManualImage: React.FC<ManualImageProps> = ({ imageName, description }) => {
  const imgSrc = `/manual/${imageName}`;
  const [showPlaceholder, setShowPlaceholder] = React.useState(false);

  // On error loading the real image, show Unsplash/placeholder photo for this section
  const handleImgError = () => {
    setShowPlaceholder(true);
  };
  // Placeholder per imageName, fallback to default Unsplash if not mapped
  const placeholder =
    PLACEHOLDERS[imageName] ||
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"; // a generic woman laptop image

  return (
    <div className="flex flex-col items-center my-6 w-full">
      <div className="w-full flex flex-col items-center">
        <img
          src={showPlaceholder ? placeholder : imgSrc}
          alt={description}
          className="w-full max-w-md h-56 object-contain rounded shadow mb-2 border bg-white"
          onError={handleImgError}
        />
        <span className="text-xs text-muted-foreground text-center">{description}</span>
      </div>
    </div>
  );
};

export default ManualImage;
