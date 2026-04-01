import React from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  variant?: "linear" | "circular";
}

export function ProgressBar({ value, max, className = "", variant = "linear" }: ProgressBarProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  if (variant === "circular") {
    // Basic fallback for now, as linear is the main usage
    return (
      <View className={`items-center justify-center ${className}`}>
        <Text className="text-sm font-semibold text-foreground">{value}/{max}</Text>
      </View>
    );
  }

  return (
    <View className={`w-full bg-[#F0F0F0] rounded-full h-2 overflow-hidden ${className}`}>
      <MotiView
        className="bg-[#B8E0D2] h-full rounded-full"
        from={{ width: "0%" }}
        animate={{ width: `${percentage}%` }}
        transition={{ type: "timing", duration: 500 }}
      />
    </View>
  );
}
