
export const Signature = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`text-center text-sm text-muted-foreground ${className}`}>
      <p>Made by Elton Niati</p>
      <div className="flex justify-center items-center gap-2 text-xs mt-1">
        <span>eaglevision.dev30.com</span>
        <span>•</span>
        <span>WhatsApp: 027659132527</span>
        <span>•</span>
        <span>Facebook: eaglevisiondev30</span>
        <span>•</span>
        <span>Twitter: eaglevisiondev30</span>
      </div>
    </div>
  );
};
