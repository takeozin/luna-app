import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { MotiView, MotiText, MotiImage } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Welcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          className="flex-col items-center w-full max-w-sm"
        >
          <MotiImage
            source={{ uri: 'https://images.unsplash.com/photo-1758274539654-23fa349cc090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG1lZGl0YXRpb24lMjB3b21hbiUyMHNpdHRpbmclMjByZWxheGVkfGVufDF8fHx8MTc3MTI5NzQ1Mnww&ixlib=rb-4.1.0&q=80&w=400' }}
            style={{ width: 256, height: 256, borderRadius: 40, marginBottom: 32 }}
            from={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'timing', duration: 600, delay: 200 }}
          />

          <Text
            className="text-3xl text-foreground text-center font-semibold mb-4"
          >
            Oi! Que bom ter você aqui.
          </Text>

          <Text
            className="text-lg text-muted-foreground text-center mb-8"
          >
            Vamos começar uma jornada de autoconhecimento? Primeiro, preciso te conhecer um pouquinho.
          </Text>

          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', delay: 800 }}
            className="w-full"
          >
            <Button
              variant="primary"
              size="lg"
              onPress={() => router.push("/anamnese")}
              className="w-full"
            >
              Começar
            </Button>
          </MotiView>
        </MotiView>
      </View>
    </View>
  );
}
