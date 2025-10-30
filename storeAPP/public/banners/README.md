# Banners Pré-dispostos

Esta pasta contém os banners pré-dispostos disponíveis para seleção na edição da loja.

## Estrutura dos Arquivos

- `banner-1.svg` - Banner Premium (gradiente azul)
- `banner-2.svg` - Banner Nature (gradiente verde)
- `banner-3.svg` - Banner Vibrant (gradiente rosa)
- `banner-4.svg` - Banner Elegant (gradiente dourado)
- `carro bonito.jpeg` - Carro Bonito (imagem de carro esportivo)

## Especificações

- **Formatos Aceitos**: SVG, JPEG, PNG
- **Dimensões Recomendadas**: 1200x400 pixels
- **Orientação**: Horizontal
- **Tamanho**: Otimizado para web

## Como Adicionar Novos Banners

1. Crie um novo arquivo na pasta `banners/`
2. Use as dimensões 1200x400 pixels (recomendado)
3. Formatos aceitos: SVG, JPEG, PNG
4. Adicione a configuração no arquivo `src/config/banners.ts`
5. Teste a visualização no seletor de banners

## Configuração

Os banners são configurados no arquivo `src/config/banners.ts` com as seguintes propriedades:

- `id`: Identificador único (sem extensão)
- `name`: Nome exibido no seletor
- `description`: Descrição do banner
- `path`: Caminho relativo para o arquivo
- `preview`: Caminho para preview (geralmente o mesmo do path)

## Uso

Os banners podem ser selecionados através do modal de customização de banners na edição da loja, oferecendo uma alternativa rápida ao upload de arquivos personalizados. 