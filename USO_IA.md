# Relatório de Uso de Inteligência Artificial

## 1. Identificação da atividade

**Projeto:** Habit Tracker Expo  
**Atividade:** Navegação com Expo Router e galeria de fotos  
**Ferramenta de IA utilizada:** ChatGPT, da OpenAI. O modelo utilizado nesta conversa foi identificado como GPT-6.  
**Finalidade:** apoiar a implementação, revisão e documentação de partes do aplicativo.

> **Observação:** antes da entrega, confira no Catálogo de IA do CESAR a forma exata de registrar o nome e a versão/modelo da ferramenta. Não foi possível confirmar se a nomenclatura GPT-6 corresponde exatamente à identificação exigida pelo catálogo institucional.

## 2. Como a IA foi utilizada

A IA foi utilizada como apoio durante o desenvolvimento, por meio de prompts em linguagem natural e revisão iterativa do código compartilhado. O uso se concentrou em:

- Revisar o componente da tela inicial de hábitos (`src/screens/tela-habitos.tsx`).
- Adicionar à tela inicial um link para a rota `/galeria`, mantendo os links e a navegação existentes.
- Completar o componente `MiniaturaFoto` em `src/components/miniatura-foto.tsx`, utilizando o componente `Image` do pacote `expo-image`.
- Orientar o uso de `source={{ uri: item.uri }}`, `contentFit="cover"`, `recyclingKey={item.uri}` e estilos para miniaturas quadradas.
- Conferir os requisitos da atividade e organizar uma lista de verificações para a validação final.
- Orientar a execução do comando `npx tsc --noEmit` e a realização de testes manuais no aplicativo.

O trabalho ocorreu de forma iterativa: o código existente foi compartilhado, a IA sugeriu alterações e as sugestões foram ajustadas ao contexto do projeto. A IA foi utilizada como assistente de programação, não como substituta da análise crítica e dos testes da pessoa desenvolvedora.

### 2.1. LLMs, Skills e Agents

- **LLM:** ChatGPT (OpenAI), modelo identificado nesta conversa como GPT-6.
- **Skills:** não foram utilizadas Skills específicas para implementar o aplicativo.
- **Agents:** não foi configurado nem utilizado um agente autônomo para modificar ou executar o projeto.
- **Execução automática:** a IA forneceu sugestões de código e comandos, mas não executou nem validou o aplicativo no ambiente local da pessoa desenvolvedora.

## 3. Análise crítica do código e das sugestões

### 3.1. Acertos

1. **Aderência aos requisitos apresentados:** as sugestões consideraram a necessidade de manter as telas existentes e acrescentar a navegação para `/galeria`.

2. **Organização dos arquivos:** foi reforçado que `MiniaturaFoto` deve ficar em `src/components/`, e não em `src/app/`, para evitar que o componente seja interpretado como uma rota pelo Expo Router.

3. **Uso do componente de imagem adequado:** a implementação proposta utiliza `Image` do `expo-image`, com a URI da imagem selecionada, `contentFit="cover"` e `recyclingKey`.

4. **Legibilidade e tipagem:** a versão revisada removeu artefatos de formatação que apareciam no código compartilhado, como asteriscos em identificadores e tipos TypeScript.

5. **Validação orientada por critérios:** a IA organizou os requisitos em uma lista de conferência e sugeriu verificações de TypeScript e testes manuais para diferentes quantidades de fotos.

### 3.2. Limitações e pontos que exigem revisão humana

1. **As sugestões não comprovam que o aplicativo funciona:** o código fornecido na conversa não foi executado pela IA no ambiente local. Por isso, não se deve considerar a implementação validada apenas porque o código parece correto.

2. **O layout precisa ser testado:** as propriedades `maxWidth: '33%'`, `flex: 1` e `aspectRatio: 1` foram usadas para ajudar a manter três miniaturas por linha. O resultado pode depender do tamanho da tela e do comportamento do layout. É necessário testar especialmente listas com uma, duas e quatro fotos para verificar se a última miniatura não se estica.

3. **A seleção de fotos precisa de teste real:** a configuração para permitir até seis imagens deve ser verificada no dispositivo ou emulador utilizado. Também é necessário testar o cancelamento, as permissões e o comportamento quando o usuário seleciona as fotos novamente.

4. **A revisão foi parcial:** a análise foi feita com base nos trechos de código e nos requisitos compartilhados na conversa. Não houve inspeção automática de todos os arquivos do projeto nem execução de uma suíte completa de testes.

5. **A identificação institucional da ferramenta precisa ser conferida:** o nome e o modelo exibidos na conversa podem não corresponder exatamente à forma de registro exigida pelo Catálogo de IA do CESAR.

## 4. Grau de acerto da IA

A avaliação qualitativa é de **acerto parcial a alto como apoio à implementação e revisão**, mas não como validação final do aplicativo.

A IA identificou alterações pontuais coerentes com os requisitos, como acrescentar o link da galeria e completar o componente de miniatura com as propriedades esperadas. Também ajudou a transformar os critérios da atividade em uma lista de conferência.

Entretanto, a correção definitiva depende de compilar e executar o projeto, verificar o comportamento visual da grade e testar os fluxos de seleção e cancelamento.

Assim, as respostas foram úteis para acelerar a escrita e a organização do código, mas não devem ser aceitas sem revisão. O grau de acerto funcional só poderá ser confirmado após os testes no ambiente do projeto.

## 5. Verificações recomendadas antes da entrega

- [ ] Executar `npx tsc --noEmit` e confirmar que não há erros.
- [ ] Executar o aplicativo e confirmar que a rota Galeria abre corretamente.
- [ ] Testar a galeria com zero, uma, duas, três, quatro e seis fotos.
- [ ] Confirmar que a última miniatura não ocupa indevidamente toda a linha.
- [ ] Testar o cancelamento da seleção e a seleção de imagens novamente.
- [ ] Confirmar que `src/components/miniatura-foto.tsx` permanece fora de `src/app/`.
- [ ] Conferir se a rota e seu título estão registrados em `src/app/_layout.tsx`.
- [ ] Conferir a configuração de permissões no `app.json`.
- [ ] Confirmar no Catálogo de IA do CESAR a nomenclatura exata da ferramenta e do modelo antes da entrega.

## 6. Declaração de uso de IA

> Declaro que utilizei a ferramenta de Inteligência Artificial **ChatGPT (OpenAI), modelo GPT-6 — nomenclatura a confirmar no Catálogo de IA do CESAR**, nesta atividade, com a finalidade de gerar um rascunho sobre **a implementação e revisão da navegação com Expo Router e da galeria de fotos do aplicativo Habit Tracker**, sobre o qual realizei análise crítica (curadoria) das informações apresentadas. Não tratei dados pessoais no uso desta ferramenta. Revisei criticamente o conteúdo gerado, identificando seus acertos e eventuais imprecisões, e assumo a responsabilidade integral pela versão final apresentada.