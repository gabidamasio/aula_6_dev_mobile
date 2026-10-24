import { Image } from 'expo-image';
import type { ImagePickerAsset } from 'expo-image-picker';
import { StyleSheet } from 'react-native';

type MiniaturaFotoProps = {
  item: ImagePickerAsset;
};

export function MiniaturaFoto({ item }: MiniaturaFotoProps) {
  return (
    <Image
      source={{ uri: item.uri }}
      contentFit="cover"
      recyclingKey={item.uri}
      style={estilos.miniatura}
    />
  );
}

const estilos = StyleSheet.create({
  miniatura: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    maxWidth: '33%', // Impede a última foto de esticar pela linha inteira.
  },
});