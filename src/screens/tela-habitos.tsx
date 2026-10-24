import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BotaoAcao } from '../components/botao-acao';
import { ItemHabito } from '../components/item-habito';
import { ListaVazia } from '../components/lista-vazia';
import { HABITOS } from '../data/habitos';
import {
  agrupar,
  filtrarPorTitulo,
} from '../lib/agrupar';
import { cores, espaco, tipografia } from '../theme';
import type { Habito } from '../types/habito';
import { TelaRegistrarHabito } from './tela-registrar-habito';

function Cabecalho({
  busca,
  onBuscaChange,
}: {
  busca: string;
  onBuscaChange: (busca: string) => void;
}) {
  return (
    <TextInput
      style={styles.busca}
      placeholder="Buscar hábito"
      value={busca}
      onChangeText={onBuscaChange}
    />
  );
}

export function TelaHabitos() {
  const router = useRouter();

  const [habitos, setHabitos] = useState<Habito[]>(HABITOS);
  const [busca, setBusca] = useState('');
  const [atualizando, setAtualizando] = useState(false);
  const [registrando, setRegistrando] = useState(false);

  function alternar(id: string) {
    setHabitos((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              status:
                h.status === 'pendente'
                  ? 'concluido'
                  : 'pendente',
            }
          : h,
      ),
    );
  }

  function remover(id: string) {
    setHabitos((prev) =>
      prev.filter((h) => h.id !== id),
    );
  }

  function recarregar() {
    setAtualizando(true);

    setHabitos((prev) => {
      const idsDoMock = new Set(
        HABITOS.map((h) => h.id),
      );

      const registrados = prev.filter(
        (h) => !idsDoMock.has(h.id),
      );

      return [...registrados, ...HABITOS];
    });

    setBusca('');
    setAtualizando(false);
  }

  function adicionar(novo: Habito) {
    setHabitos((prev) => [novo, ...prev]);
    setBusca('');
    setRegistrando(false);
  }

  const secoes = agrupar(
    filtrarPorTitulo(habitos, busca),
  );

  if (registrando) {
    return (
      <TelaRegistrarHabito
        onSalvar={adicionar}
        onCancelar={() => setRegistrando(false)}
      />
    );
  }

  return (
    <SafeAreaView
      style={styles.tela}
      edges={['bottom']}
    >
      <SectionList
        sections={secoes}
        renderItem={({ item }) => (
          <ItemHabito
            habito={item}
            onAlternar={alternar}
            onRemover={remover}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.cabecalhoSecao}>
            {section.title}
          </Text>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.separador} />
        )}
        ListEmptyComponent={() => (
          <ListaVazia
            primeiroAcesso={false}
            onLimparBusca={recarregar}
          />
        )}
        stickySectionHeadersEnabled
        refreshing={atualizando}
        onRefresh={recarregar}
        ListHeaderComponent={
          <Cabecalho
            busca={busca}
            onBuscaChange={setBusca}
          />
        }
        contentContainerStyle={styles.conteudo}
      />

      <BotaoAcao
        rotulo="Novo hábito"
        onPressionar={() => setRegistrando(true)}
      />

      <Pressable
        style={styles.botaoNavegacao}
        onPress={() => router.push('/registrar-foto')}
      >
        <Text style={styles.textoNavegacao}>
          Registrar foto
        </Text>
      </Pressable>

      {/* Atividade 2: link para a rota estática da galeria. */}
      <Link
        href="/galeria"
        style={styles.linkSobre}
      >
        Galeria de fotos
      </Link>

      <Link
        href="/sobre"
        style={styles.linkSobre}
      >
        Sobre o aplicativo
      </Link>
    </SafeAreaView>
  );
}

export default TelaHabitos;

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
    borderRadius: espaco.lg,
  },
  conteudo: {
    padding: espaco.md,
    paddingBottom: espaco.lg,
  },
  busca: {
    borderWidth: 1,
    borderColor: cores.textoFraco,
    borderRadius: espaco.sm,
    padding: espaco.sm,
    marginBottom: espaco.sm,
    backgroundColor: cores.cartao,
    fontSize: 16,
  },
  cabecalhoSecao: {
    ...tipografia.legenda,
    fontWeight: '700',
    textTransform: 'uppercase',
    backgroundColor: cores.fundo,
    paddingVertical: espaco.sm,
  },
  separador: {
    height: espaco.sm,
  },
  rodape: {
    padding: espaco.md,
    gap: espaco.sm,
  },
  botaoNavegacao: {
    backgroundColor: cores.cartao,
    borderWidth: 1,
    borderColor: '#f26522',
    paddingVertical: espaco.sm,
    marginHorizontal: espaco.md,
    marginBottom: espaco.sm,
    borderRadius: espaco.sm,
    alignItems: 'center',
  },
  textoNavegacao: {
    color: '#f26522',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  linkSobre: {
    color: '#f26522',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: espaco.sm,
  },
});