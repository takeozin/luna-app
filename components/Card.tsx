import { View, ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <View 
      className={`bg-card rounded-3xl p-6 shadow-sm border border-border ${className}`} 
      {...props}
    >
      {children}
    </View>
  );
}
