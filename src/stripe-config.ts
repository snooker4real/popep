export const products = {
  'POPEP Distance': {
    id: 'prod_SJgUBjmzLSTXCt',
    priceId: 'price_1RP37yCQLuYBkFrFJ4VzDqYS',
    description: 'Découvrez notre jeu de cartes unique, spécialement conçu pour les couples en relation à distance, qui permet de surmonter les obstacles de la distance tout en renforçant vos liens émotionnels. Avec quatre thèmes enrichissants—Apprendre à se connaître en profondeur, Questions légères et fun, Notre évolution et notre futur, et Les défis et la gestion de la relation à distance—ce jeu vous offre des opportunités précieuses pour explorer, discuter et célébrer votre amour.',
    mode: 'payment',
    price: 24.99
  },
  'POPEP Love&Couches': {
    id: 'prod_SJgU1EXdZ8YWQF',
    priceId: 'price_1RP37QCQLuYBkFrFeMX3U31Z',
    description: 'Partage des Émotions : Créez un espace sûr pour exprimer vos sentiments face aux défis et joies de la parentalité, favorisant compréhension et soutien mutuel.',
    mode: 'payment',
    price: 24.99
  },
  'POPEP Friends': {
    id: 'prod_SJgTpeJakfSz1t',
    priceId: 'price_1RP36ZCQLuYBkFrFWMVBdRSb',
    description: 'Découvrez notre jeu de cartes dynamique conçu pour les soirées entre amis, qui promet des moments inoubliables et des échanges authentiques. Avec quatre thèmes captivants—Fun, Introspection, Aventure & Expériences, et Débats—ce jeu encourage à partager, rire et réfléchir ensemble.',
    mode: 'payment',
    price: 24.99
  },
  'POPEP Couple': {
    id: 'prod_SJgSeHRcMYClCe',
    priceId: 'price_1RP359CQLuYBkFrFrvsAaiZS',
    description: 'Popep Jeu T\'adore - Versione En Couple - Découvrez notre jeu de cartes unique pour couples, conçu pour enrichir votre relation et favoriser des échanges authentiques.',
    mode: 'payment',
    price: 24.99
  }
} as const;

export type ProductId = keyof typeof products;