// GALERIA → PEDIR: abrir o seletor do sistema
//          LER: URI da imagem selecionada
//          PARAR: cancelar sem alterar a foto anterior
//
// CÂMERA  → PEDIR: permissão de câmera
//          LER: URI da foto capturada
//          PARAR: cancelar sem alterar a foto anterior

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

type Falha = 'camera-negada' | 'camera-bloqueada';

const MENSAGENS: Record<Falha, string> = {
  'camera-negada':
    'A permissão da câmera foi negada. Você pode permitir o acesso quando solicitado novamente ou escolher uma foto da galeria.',
  'camera-bloqueada':
    'O acesso à câmera está bloqueado. Abra as Configurações do aparelho, encontre o Habit Tracker e habilite a câmera. Você também pode escolher uma foto da galeria.',
};

const OPÇÕES_FOTO: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.7,
};

export default function TelaRegistrarFoto() {
  const router = useRouter();
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [falha, setFalha] = useState<Falha | null>(null);

  async function tirarFoto() {
    setFalha(null);

    const permissao =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      setFalha(
        permissao.canAskAgain
          ? 'camera-negada'
          : 'camera-bloqueada',
      );
      return;
    }

    const resultado =
      await ImagePicker.launchCameraAsync(OPÇÕES_FOTO);

    if (resultado.canceled) return;

    const uri = resultado.assets[0]?.uri;
    if (uri) setFotoUri(uri);
  }

  async function escolherDaGaleria() {
    setFalha(null);

    const resultado =
      await ImagePicker.launchImageLibraryAsync(OPÇÕES_FOTO);

    // Não apague a foto anterior se o usuário cancelar.
    if (resultado.canceled) return;

    const uri = resultado.assets[0]?.uri;
    if (uri) setFotoUri(uri);
  }

  return (
    <View style={estilos.tela}>
      {fotoUri ? (
        <Image
          source={{ uri: fotoUri }}
          style={estilos.previa}
          contentFit="cover"
          transition={300}
        />
      ) : (
        <View style={[estilos.previa, estilos.semFoto]}>
          <Text>Nenhuma foto ainda</Text>
        </View>
      )}

      <Pressable onPress={tirarFoto} style={estilos.botao}>
        <Text style={estilos.textoBotao}>Tirar foto</Text>
      </Pressable>

      <Pressable
        onPress={escolherDaGaleria}
        style={estilos.botaoSecundario}
      >
        <Text style={estilos.textoBotaoSecundario}>
          Escolher da galeria
        </Text>
      </Pressable>

      {falha && (
        <Text style={estilos.erro}>
          {MENSAGENS[falha]}
        </Text>
      )}

      <Pressable
        onPress={() => router.back()}
        disabled={!fotoUri}
        style={[
          estilos.botao,
          !fotoUri && estilos.desligado,
        ]}
      >
        <Text style={estilos.textoBotao}>Concluir</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, padding: 24, gap: 16 },
  previa: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
  },
  semFoto: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    backgroundColor: '#f26522',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoSecundario: {
    borderWidth: 2,
    borderColor: '#f26522',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  textoBotaoSecundario: {
    color: '#f26522',
    fontWeight: '700',
    fontSize: 16,
  },
  desligado: { opacity: 0.4 },
  erro: {
    fontSize: 15,
    color: '#b00020',
  },
});
