import { View, ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <View 
      className={`bg-white rounded-3xl p-6 shadow-sm border border-black/5 ${className}`} 
      {...props}
    >
      {children}
    </View>
  );
}
