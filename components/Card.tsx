import { View, ViewProps } from 'react-native';
import { useTheme, rawColors } from '../lib/themeContext';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "", style, ...props }: CardProps) {
  const { activeTheme } = useTheme();
  const borderColor = rawColors[activeTheme].border;

  return (
    <View 
      className={`bg-card rounded-3xl p-6 shadow-sm border ${className}`} 
      style={[{ borderColor }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
