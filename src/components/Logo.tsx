import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  linkTo?: string;
  showText?: boolean;
}

const Logo = ({ size = "md", className, linkTo, showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const LogoContent = () => (
    <div className="flex items-center space-x-2">
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
      {showText && (
        <span className={cn(
          "font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent",
          textSizes[size]
        )}>
          SciNexa
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="hover:opacity-90 transition-opacity">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

export default Logo; 