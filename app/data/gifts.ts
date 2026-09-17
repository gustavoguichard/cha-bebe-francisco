export type Category =
  | 'Enxoval'
  | 'Banho e higiene'
  | 'Fraldas'
  | 'Amamentação'
  | 'Saúde'
  | 'Passeio'
  | 'Brincar e crescer'
  | 'Casa e sono'

export const categories: Category[] = [
  'Enxoval',
  'Banho e higiene',
  'Fraldas',
  'Amamentação',
  'Saúde',
  'Passeio',
  'Brincar e crescer',
  'Casa e sono',
]

export interface GiftLink {
  label: string
  url: string
  price?: string
}

export interface Gift {
  slug: string
  name: string
  category: Category
  description: string
  note?: string
  quantity: number
  unit: { one: string; many: string }
  links: GiftLink[]
  image?: string
  illustration?: string
}

const un = { one: 'unidade', many: 'unidades' }
const pct = { one: 'pacote', many: 'pacotes' }

export const gifts: Gift[] = [
  {
    slug: 'algodao-quadrado',
    name: 'Algodão quadrado grande',
    category: 'Banho e higiene',
    description:
      'Quadrados de algodão macio para a limpeza do rostinho, das dobrinhas e das trocas de fralda dos primeiros dias.',
    note: 'Qualquer marca, desde que seja só o algodão, sem loção.',
    quantity: 4,
    unit: pct,
    links: [],
    illustration: 'cotton',
  },
  {
    slug: 'aspirador-nasal',
    name: 'Kit aspirador e lavador nasal Buba',
    category: 'Saúde',
    description:
      'Aspirador de sucção com lavador nasal em silicone. Alívio rápido para narizinhos entupidos, fácil de limpar.',
    quantity: 1,
    unit: un,
    links: [
      {
        label: 'Ver no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/kit-nasal-para-bebes-com-aspirador-e-lavador--buba/up/MLBU3816219728',
        price: 'R$ 54',
      },
    ],
    image: '/products/aspirador-nasal.webp',
  },
  {
    slug: 'baba-eletronica',
    name: 'Babá eletrônica',
    category: 'Casa e sono',
    description:
      'Para ouvir (ou ver) o Francisco dormindo enquanto a casa segue. Um empréstimo é muito bem-vindo.',
    note: 'Pode ser usada, e podemos devolver depois!',
    quantity: 1,
    unit: un,
    links: [],
    illustration: 'monitor',
  },
  {
    slug: 'capa-carrinho',
    name: 'Capa de carrinho com abraçadeiras',
    category: 'Passeio',
    description:
      'Capa de algodão que forra o carrinho e vem com abraçadeiras para prender. Deixa o passeio mais fresquinho e fácil de lavar.',
    note: 'Qualquer marca, não precisa ser essa :)',
    quantity: 1,
    unit: un,
    links: [
      {
        label: 'Ver na Shopee',
        url: 'https://shopee.com.br/product/821374546/22793488093',
      },
    ],
    image: '/products/capa-carrinho.jpg',
  },
  {
    slug: 'cobertinha',
    name: 'Cobertinha',
    category: 'Enxoval',
    description: 'Cobertor pequeno e macio para o berço, o carrinho e o colo nos dias frios de Porto Alegre.',
    note: 'Qualquer marca ou modelo.',
    quantity: 2,
    unit: un,
    links: [],
    illustration: 'blanket',
  },
  {
    slug: 'colchonete-bebe-conforto',
    name: 'Colchonete para bebê conforto',
    category: 'Passeio',
    description:
      'Redutor acolchoado que deixa o bebê conforto mais aconchegante e firme para o recém-nascido.',
    quantity: 1,
    unit: un,
    links: [
      {
        label: 'Ver na Shopee',
        url: 'https://shopee.com.br/product/1204012787/58251005008',
      },
    ],
    image: '/products/colchonete-bebe-conforto.jpg',
  },
  {
    slug: 'coletor-de-leite',
    name: 'Coletor de leite materno',
    category: 'Amamentação',
    description:
      'Bomba manual de silicone que coleta o leite que escapa do outro lado enquanto o bebê mama. Simples e sem desperdício.',
    quantity: 1,
    unit: un,
    links: [
      {
        label: 'Ver no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/bomba-coletor-de-leite-materno-manual-silicone-buba/up/MLBU3911383755',
        price: 'R$ 39',
      },
    ],
    image: '/products/coletor-de-leite.webp',
  },
  {
    slug: 'creme-assaduras-weleda',
    name: 'Creme de assaduras Weleda',
    category: 'Banho e higiene',
    description:
      'Creme de calêndula que protege a pele a cada troca de fralda. Vale 2 potes de 120 ml ou 3 a 4 de 30 ml.',
    note: 'Pode ser 2 de 120 ml ou 3/4 de 30 ml.',
    quantity: 2,
    unit: un,
    links: [
      {
        label: '120 ml no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/weleda-baby-creme-para-assadura-de-bebe-calendula-120ml/up/MLBU3528240647',
        price: 'R$ 100',
      },
      {
        label: '30 ml no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/creme-de-assaduras-babycreme-calendula-30ml-weleda/p/MLB53206303',
        price: 'R$ 32',
      },
    ],
    image: '/products/creme-assaduras-weleda.webp',
  },
  {
    slug: 'fralda-de-pano-cueiro',
    name: 'Fralda de pano tipo cueiro 70×70',
    category: 'Enxoval',
    description:
      'As fraldas de pano grandes servem para tudo: enrolar, forrar, secar e proteger o ombro. De preferência 100% algodão.',
    note: 'Qualquer marca, não precisa ser essa :) Só dar preferência para algodão.',
    quantity: 3,
    unit: pct,
    links: [
      {
        label: 'Cremer Luxo no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/fralda-de-pano-estampada-cremer-luxo/p/MLB20893960',
        price: 'R$ 43',
      },
    ],
    image: '/products/fralda-de-pano-cueiro.webp',
  },
  {
    slug: 'fralda-pampers-p',
    name: 'Fralda Pampers Premium Care, tamanho P',
    category: 'Fraldas',
    description: 'Pacotes de fralda tamanho P para as semanas seguintes, quando o Francisco crescer um pouquinho.',
    note: 'Tem em farmácia também.',
    quantity: 2,
    unit: pct,
    links: [
      {
        label: 'Ver no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/fralda-pampers-premium-care-tamanho-p-40-unidades/up/MLBU3762760556',
        price: 'R$ 93',
      },
    ],
    image: '/products/fralda-pampers-p.webp',
  },
  {
    slug: 'fralda-huggies-rn',
    name: 'Fralda Huggies Natural Care, tamanho RN',
    category: 'Fraldas',
    description: 'Fralda de recém-nascido, com 34 unidades por pacote, para os primeiros dias em casa.',
    note: 'Tem em farmácia também.',
    quantity: 2,
    unit: pct,
    links: [
      {
        label: 'Ver no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/fralda-huggies-natural-care-rn-34-unidades-recemnascido/up/MLBU1098722356',
        price: 'R$ 30',
      },
    ],
    image: '/products/fralda-huggies-rn.webp',
  },
  {
    slug: 'pano-de-boca',
    name: 'Fraldinha de pano tipo pano de boca 35×35',
    category: 'Enxoval',
    description: 'Paninhos pequenos de algodão para limpar a boquinha, aparar golfadas e forrar o colo.',
    note: 'Qualquer marca, não precisa ser essa :) Só dar preferência para algodão.',
    quantity: 3,
    unit: pct,
    links: [
      {
        label: 'Cremer Luxo no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/panos-de-boca-bebe-cremer-luxo-100-algodao-35x35cm-c3/p/MLB20969885',
        price: 'R$ 25',
      },
    ],
    image: '/products/pano-de-boca.webp',
  },
  {
    slug: 'lenco-de-higiene',
    name: 'Lenço de higiene Cremer',
    category: 'Banho e higiene',
    description:
      'Toalhinhas descartáveis e macias para banho e higiene do recém-nascido. Pode ser 1 kit com 4 pacotes ou 4 pacotes avulsos.',
    note: '1 kit com 4 pacotes ou 4 avulsos.',
    quantity: 4,
    unit: pct,
    links: [
      {
        label: 'Kit com 4 no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/kit-c-4-lenco-para-higiene-e-banho-multiuso-bebe-recem/p/MLB2048345283',
        price: 'R$ 111',
      },
      {
        label: 'Pacote avulso no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/lenco-higiene-cremer-toalha-banho-descartavel-wipes-30x28cm/up/MLBU4629680638',
        price: 'R$ 25',
      },
    ],
    image: '/products/lenco-de-higiene.webp',
  },
  {
    slug: 'lenco-umedecido-huggies',
    name: 'Lenço umedecido Huggies recém-nascido',
    category: 'Banho e higiene',
    description: 'Lenços umedecidos suaves para as trocas. Pode ser 3 pacotes de 48 ou 1 kit com 4.',
    note: '3 pacotes de 48 ou 1 kit do link. Tem em farmácia também.',
    quantity: 3,
    unit: pct,
    links: [
      {
        label: 'Kit com 4 no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/lencos-umedecidos-huggies-recem-nascido-pack-c4-192-un/p/MLB18392845',
        price: 'R$ 28',
      },
    ],
    image: '/products/lenco-umedecido-huggies.webp',
  },
  {
    slug: 'livrinho-interativo',
    name: 'Livrinho interativo',
    category: 'Brincar e crescer',
    description: 'Livros de pano, de banho ou com texturas e sons, para as primeiras descobertas do Francisco.',
    note: 'Qualquer marca ou modelo.',
    quantity: 2,
    unit: un,
    links: [],
    illustration: 'book',
  },
  {
    slug: 'locao-dersani-baby',
    name: 'Loção Dersani Baby',
    category: 'Banho e higiene',
    description: 'Loção oleosa que hidrata e ajuda a prevenir assaduras. Vem em kit com 2 frascos de 50 ml.',
    note: 'Tem em farmácia também.',
    quantity: 1,
    unit: un,
    links: [
      {
        label: 'Ver no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/kit-locao-dersani-baby-antiassaduras-c-2un-de-50ml-cada/p/MLB2107650344',
        price: 'R$ 67',
      },
    ],
    image: '/products/locao-dersani-baby.webp',
  },
  {
    slug: 'mantinha',
    name: 'Mantinha para cobrir',
    category: 'Enxoval',
    description: 'Manta leve para cobrir o Francisco no colo, no carrinho e nas sonecas de tarde.',
    note: 'Qualquer marca ou modelo.',
    quantity: 2,
    unit: un,
    links: [],
    illustration: 'blanket',
  },
  {
    slug: 'mosquiteiro-carrinho',
    name: 'Mosquiteiro para carrinho',
    category: 'Passeio',
    description: 'Rede fininha que cobre o carrinho e deixa os passeios à beira do rio livres de mosquitos.',
    note: 'Qualquer marca.',
    quantity: 1,
    unit: un,
    links: [
      {
        label: 'Ver no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/mosquiteiro-para-carrinho-de-bebe-contra-mosquitos-e-insetos-cor-palha/p/MLB75636898',
        price: 'R$ 30',
      },
    ],
    image: '/products/mosquiteiro-carrinho.webp',
  },
  {
    slug: 'mustela-gel-lavante',
    name: 'Mustela gel lavante de abacate',
    category: 'Banho e higiene',
    description: 'Gel de banho suave para corpo e cabelo, com abacate. O frasco de 500 ml rende muitos banhos.',
    quantity: 2,
    unit: un,
    links: [
      {
        label: 'Ver no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/gel-lavante-suave-corpo-e-cabelo-500ml--mustela/up/MLBU2954293817',
        price: 'R$ 100',
      },
    ],
    image: '/products/mustela-gel-lavante.webp',
  },
  {
    slug: 'rosquinha-amamentacao',
    name: 'Rosquinha de amamentação',
    category: 'Amamentação',
    description: 'Discos absorventes que vão dentro do sutiã e protegem a roupa dos vazamentos de leite.',
    note: 'Qualquer marca, não precisa ser essa :)',
    quantity: 1,
    unit: { one: 'kit', many: 'kits' },
    links: [
      {
        label: 'Kit com 6 no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/rosquinha-para-amamentacao-cor-branco-kit-6-yulababy/p/MLB68520050',
        price: 'R$ 25',
      },
    ],
    image: '/products/rosquinha-amamentacao.webp',
  },
  {
    slug: 'roupinhas-9-12-meses',
    name: 'Roupinhas de 9 a 12 meses',
    category: 'Enxoval',
    description:
      'Bodies, macacões, calças e casaquinhos para quando o Francisco já estiver engatinhando por aí.',
    note: 'Qualquer marca ou modelo. Na etiqueta costuma ser o tamanho GG (9 a 12 meses), e peças quentinhas de algodão são muito bem-vindas.',
    quantity: 6,
    unit: { one: 'peça', many: 'peças' },
    links: [],
    illustration: 'clothes',
  },
  {
    slug: 'ruido-branco',
    name: 'Aparelho de ruído branco',
    category: 'Casa e sono',
    description: 'Um som constante e suave que lembra o útero e ajuda o bebê a pegar no sono.',
    note: 'Qualquer marca.',
    quantity: 1,
    unit: un,
    links: [],
    illustration: 'sound',
  },
  {
    slug: 'tapete-de-atividades',
    name: 'Tapete de atividades',
    category: 'Brincar e crescer',
    description: 'Tapete dobrável e acolchoado para o Francisco rolar, alcançar e brincar no chão em segurança.',
    note: 'Qualquer marca, não precisa ser essa :)',
    quantity: 1,
    unit: un,
    links: [
      {
        label: 'Buba Dino no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/tapete-de-atividades-dobrabel-dupla-face-dino-18092-buba/p/MLB39967754',
        price: 'R$ 163',
      },
    ],
    image: '/products/tapete-de-atividades.webp',
  },
  {
    slug: 'termometro-testa',
    name: 'Termômetro digital de testa',
    category: 'Saúde',
    description: 'Mede a temperatura sem contato, em segundos, sem acordar o bebê.',
    note: 'Qualquer marca.',
    quantity: 1,
    unit: un,
    links: [],
    illustration: 'thermometer',
  },
  {
    slug: 'termometro-rapido',
    name: 'Termômetro rápido',
    category: 'Saúde',
    description: 'Termômetro digital de leitura rápida, para ter sempre na bolsa e na gaveta.',
    note: 'Qualquer marca.',
    quantity: 1,
    unit: un,
    links: [],
    illustration: 'thermometer',
  },
  {
    slug: 'toalha-com-capuz',
    name: 'Toalha com capuz',
    category: 'Banho e higiene',
    description: 'Toalha macia com capuz para enrolar o Francisco quentinho depois do banho.',
    note: 'Qualquer marca ou modelo.',
    quantity: 2,
    unit: un,
    links: [],
    illustration: 'towel',
  },
  {
    slug: 'torre-de-aprendizado',
    name: 'Torre de aprendizado Montessori',
    category: 'Brincar e crescer',
    description:
      'Mesinha e cadeirão de madeira que viram torre de aprendizado. Para quando o Francisco quiser participar da cozinha.',
    quantity: 1,
    unit: un,
    links: [],
    illustration: 'tower',
  },
  {
    slug: 'trocador-impermeavel',
    name: 'Trocador impermeável grande',
    category: 'Banho e higiene',
    description: 'Trocador portátil e impermeável, grande o bastante para trocar fralda em qualquer lugar.',
    note: 'Qualquer marca.',
    quantity: 1,
    unit: un,
    links: [],
    illustration: 'changer',
  },
  {
    slug: 'xampu-calendula-weleda',
    name: 'Xampu e sabonete de calêndula Weleda',
    category: 'Banho e higiene',
    description: 'Xampu e sabonete líquido 2 em 1, com calêndula, para o banho dos primeiros meses.',
    quantity: 1,
    unit: un,
    links: [
      {
        label: 'Ver no Mercado Livre',
        url: 'https://www.mercadolivre.com.br/weleda-baby-calendula--shampoo-e-sabonete-200ml/up/MLBU726972301',
        price: 'R$ 66',
      },
    ],
    image: '/products/xampu-calendula-weleda.webp',
  },
]

export function findGift(slug: string) {
  return gifts.find((gift) => gift.slug === slug)
}
