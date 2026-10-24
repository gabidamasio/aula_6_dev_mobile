
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MiniaturaFoto } from '../components/miniatura-foto';

// A seleção múltipla não combina com allowsEditing:
// o recorte é destinado à edição de uma imagem por vez.
function ListaVazia() {
  return (
    <Text style={estilos.vazio}>
      Nenhuma foto escolhida ainda.
    </Text>
  );
}

export default function TelaGaleria() {
  const [fotos, setFotos] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);

  async function escolherFotos() {
    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: 6,
        quality: 0.7,
      });

    // Cancelar preserva a seleção anterior.
    if (resultado.canceled) return;

    setFotos(resultado.assets);
  }

  return (
    <View style={estilos.tela}>
      <Pressable
        onPress={escolherFotos}
        style={estilos.botao}
      >
        <Text style={estilos.textoBotao}>
          Escolher até 6 fotos
        </Text>
      </Pressable>

      <FlatList
        data={fotos}
        keyExtractor={(foto) => foto.uri}
        renderItem={({ item }) => (
          <MiniaturaFoto item={item} />
        )}
        numColumns={3}
        columnWrapperStyle={estilos.linha}
        contentContainerStyle={estilos.grade}
        ListEmptyComponent={ListaVazia}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  botao: {
    backgroundColor: '#f26522',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  grade: { gap: 8 },
  linha: { gap: 8 },
  vazio: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
  },
});