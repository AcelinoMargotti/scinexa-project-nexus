import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo = ({ size = "md", className }: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn(
      "bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center",
      sizeClasses[size],
      className
    )}>
      <img 
        src={logoImage} 
        alt="SciNexa Logo" 
        className="w-[85%] h-[85%] object-contain translate-y-[2px]"
      />
    </div>
  );
};

export default Logo; 