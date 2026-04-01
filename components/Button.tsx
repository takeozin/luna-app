import { Text, Pressable, PressableProps, View } from 'react-native';
import { forwardRef } from 'react';

export interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "emergency";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
}

export const Button = forwardRef<View, ButtonProps>(({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  textClassName = "",
  ...props
}, ref) => {
  const baseStyles = "rounded-2xl font-medium transition-colors flex flex-row items-center justify-center";
  
  const variants = {
    primary: "bg-primary active:opacity-80 text-primary-foreground",
    secondary: "bg-secondary active:opacity-80 text-primary",
    outline: "border-2 border-primary bg-transparent text-primary",
    ghost: "bg-transparent active:opacity-60 text-primary",
    emergency: "bg-[#FFE5E5] active:opacity-80",
  };
  
  const textVariants = {
    primary: "text-primary-foreground font-semibold",
    secondary: "text-primary font-semibold",
    outline: "text-primary font-semibold",
    ghost: "text-primary font-semibold",
    emergency: "text-[#d4183d] font-semibold",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm",
    md: "h-14 px-8 text-base",
    lg: "h-16 px-10 text-lg",
  };

  const width = fullWidth ? "w-full" : "";
  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];
  const textVariantStyle = textVariants[variant];

  // We map the sizing into the Pressable, and text styles to the Text child.
  return (
    <Pressable
      ref={ref}
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${width} ${className}`}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className={`${textVariantStyle} ${textClassName}`}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
});
