export const site = {
  name: "PoliXcar",
  tagline: "Estética Automotiva",
  phoneDisplay: "(61) 98412-9592",
  phoneWhatsapp: "5561984129592",
  instagramHandle: "@polixcar",
  instagramUrl: "https://instagram.com/polixcar",
  city: "Brasília-DF",
  ownLocation: "Condomínio Quintas do Sol, Jardim Botânico (Lago Sul)",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Condomínio Quintas do Sol, Jardim Botânico, Lago Sul, Brasília - DF") +
    "&output=embed",
  // Conferido no Google Maps em 09/2026: "PoliXcar Estética Automotiva - Polimento e Vitrificação"
  googleReview: {
    rating: 5.0,
    count: 97,
    url: "https://www.google.com/maps/search/?api=1&query=PoliXcar+Est%C3%A9tica+Automotiva+Polimento+e+Vitrifica%C3%A7%C3%A3o",
  },
};

export function waLink(message: string) {
  return `https://wa.me/${site.phoneWhatsapp}?text=${encodeURIComponent(message)}`;
}

export const waLinks = {
  agendar: waLink("Olá! Quero agendar um horário na PoliXcar."),
  orcamento: waLink("Olá! Gostaria de um orçamento para o meu carro."),
  duvida: waLink("Olá! Tenho uma dúvida sobre os serviços da PoliXcar."),
};

export const hours = [
  { day: "Segunda a sexta", time: "8h às 20h" },
  { day: "Sábado e domingo", time: "10h às 18h" },
];

export const hoursNote =
  "Atendimento por agendamento. Confirme o melhor horário pelo WhatsApp antes de vir.";

export type ServiceItem = {
  slug: string;
  name: string;
  description: string;
};

export type ServiceCategory = {
  category: string;
  items: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    category: "Lavagem & Descontaminação",
    items: [
      {
        slug: "lavagem-completa",
        name: "Lavagem detalhada",
        description:
          "Limpeza externa e interna com produtos e equipamentos profissionais para cada detalhe, com o foco na qualidade.",
      },
      {
        slug: "descontaminacao",
        name: "Descontaminação de pintura",
        description:
          "Tira piche, ferrugem e aqueles resíduos que a lavagem comum não dá conta, deixando a pintura pronta pro polimento.",
      },
      {
        slug: "lavagem-motor",
        name: "Lavagem de motor",
        description:
          "Limpamos o motor com cuidado, protegendo as borrachas e partes metálicas com aplicação de verniz para proteção.",
      },
    ],
  },
  {
    category: "Polimento e Vitrificação",
    items: [
      {
        slug: "polimento",
        name: "Polimento técnico",
        description:
          "Serviço de correção de pintura, tem objetivo de remover o máximo de riscos, marcas e manchas que a pintura permitir, devolvendo a vida e o brilho da pintura.",
      },
      {
        slug: "vitrificacao",
        name: "Vitrificação de pintura",
        description:
          "Aplicação de coating cerâmico para proteção e brilho da pintura por até 5 anos. Protege a pintura de raios UV e facilita o processo de lavagem, pois não deixa a sujeira ancorar na pintura.",
      },
      {
        slug: "enceramento",
        name: "Enceramento técnico",
        description:
          "Aplicação de cera limpadora com a utilização de politriz, excelente custo benefício para o cliente que busca renovar o brilho do veículo com um investimento de baixo custo.",
      },
    ],
  },
  {
    category: "Interior & Conforto",
    items: [
      {
        slug: "higienizacao-interna",
        name: "Higienização interna",
        description: "Limpeza funda em banco, forração, teto e carpete, tirando até aquela sujeira que já grudou.",
      },
      {
        slug: "hidratacao-couro",
        name: "Hidratação de bancos de couro",
        description: "Devolve a maciez do couro e evita que ele resseque e rache com o tempo.",
      },
      {
        slug: "remocao-odores",
        name: "Remoção de odores",
        description: "Tira cheiro de cigarro, mofo, pet ou comida de dentro do carro.",
      },
    ],
  },
  {
    category: "Faróis & Vidros",
    items: [
      {
        slug: "farol",
        name: "Polimento de farol",
        description: "Tira a oxidação amarelada do farol e devolve o alcance real da luz à noite.",
      },
      {
        slug: "vidros",
        name: "Cristalização de vidros",
        description: "Faz a água escorregar do para-brisa e melhora a visibilidade em dia de chuva.",
      },
    ],
  },
  {
    category: "Motos",
    items: [
      {
        slug: "moto-lavagem",
        name: "Lavagem e polimento de moto",
        description: "O mesmo cuidado da lavagem de carro, adaptado pra carenagem, cromados e as partes mais sensíveis da moto.",
      },
    ],
  },
];

export const services: ServiceItem[] = serviceCategories.flatMap((c) => c.items);

// Serviços mais pedidos, usados como opções padrão no formulário pra não
// sobrecarregar o usuário com os 12 itens de uma vez. Os demais continuam
// disponíveis nos cards de Serviços e aparecem no formulário sob demanda.
export const mainServiceSlugs = [
  "lavagem-completa",
  "polimento",
  "vitrificacao",
  "higienizacao-interna",
  "farol",
  "moto-lavagem",
];

export type GalleryItem = {
  slug: string;
  src: string;
  title: string;
  serviceSlug: string;
};

export const galleryItems: GalleryItem[] = [
  { slug: "lavagem", src: "/gallery/lavagem.jpg", title: "Lavagem Detalhada", serviceSlug: "lavagem-completa" },
  { slug: "motor", src: "/gallery/motor.jpg", title: "Lavagem de motor", serviceSlug: "lavagem-motor" },
  { slug: "descontaminacao", src: "/gallery/descontaminacao.jpg", title: "Descontaminação de pintura", serviceSlug: "descontaminacao" },
  { slug: "farol", src: "/gallery/farol.jpg", title: "Polimento de farol", serviceSlug: "farol" },
  { slug: "interna", src: "/gallery/interna.jpg", title: "Higienização interna", serviceSlug: "higienizacao-interna" },
  { slug: "moto", src: "/gallery/moto.jpg", title: "Lavagem e polimento de moto", serviceSlug: "moto-lavagem" },
];

export const steps = [
  { title: "Agende pelo WhatsApp", description: "Você manda mensagem, a gente confirma horário e serviço." },
  { title: "Combine local e horário", description: "Atendemos no nosso espaço no Jardim Botânico ou combinamos buscar e entregar o carro." },
  { title: "Serviço realizado", description: "Fazemos o serviço com calma, usando o produto certo em cada etapa." },
  { title: "Carro entregue", description: "Você recebe o carro pronto, no local combinado." },
];

// Avaliações reais do Google (conferidas em 09/2026 via print do próprio
// usuário), copiadas na íntegra, inclusive com pequenas informalidades de digitação.
export type Testimonial = {
  name: string;
  badge?: string;
  timeAgo: string;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Gustavo Rocha",
    badge: "Local Guide",
    timeAgo: "3 meses atrás",
    text: "Excelente serviço da Polixcar! Fiz a lavagem detalhada e fiquei muito satisfeito com o resultado. O carro ficou muito bem limpo, com ótimo acabamento e cuidado nos detalhes. Atendimento profissional, serviço caprichado e de qualidade. Recomendo!",
  },
  {
    name: "Samuel Arataca (Sri Gopala Dasa)",
    badge: "Local Guide",
    timeAgo: "3 meses atrás",
    text: "Excelente serviço. Paulo é muito educado, agradável e um grande entusiasta de carros e motos. Ele realmente sabe como executar a estética automotiva e deixar seu veículo com uma aparência incrível. Usa produtos de primeira qualidade e trata cada veículo como deve ser tratado. Com certeza levarei minha moto novamente.",
  },
  {
    name: "Carolina Hartman",
    timeAgo: "8 meses atrás",
    text: "O serviço do Paulo é detalhista e caprichoso. Como só tenho um carro em casa, tive dificuldade em conciliar os compromissos com o tempo que ele precisava, então ele mesmo me ajudou, auxiliando na busca e devolução. O carro ficou impecável — ele é de 2014 e nunca tinha visto uma higienização por dentro assim.",
  },
  {
    name: "Márcia MS",
    badge: "Local Guide",
    timeAgo: "4 meses atrás",
    text: "Super indico o trabalho da PoliXcar Automotiva. Meu carro estava com manchas de sujeira que já não saíam com limpeza simples. O resultado foi nota mil — achei que não teria jeito, mas com eles tem jeito sim. Aprovadíssimo o serviço!",
  },
  {
    name: "Dinah Nazareth Varanda Paz",
    timeAgo: "6 meses atrás",
    text: "Excelente profissional! Paulo é atencioso, detalhista e cuidadoso no trabalho. O carro ficou maravilhoso! Vale muito a pena tratar com quem entende do assunto. Só tenho a agradecer!",
  },
  {
    name: "Julio Cesar Fontela de Queiroz Filho",
    timeAgo: "7 meses atrás",
    text: "Paulo é extremamente cuidadoso e detalhista. Meu carro ficou mais novo do que quando comprei em 2023. Somente elogios!",
  },
];

export const faqs = [
  {
    question: "Vocês atendem em domicílio?",
    answer:
      "Atendemos principalmente no nosso espaço no Condomínio Quintas do Sol, Jardim Botânico (Lago Sul). Também topamos ir até sua casa ou buscar e entregar o carro em outros pontos de Brasília. Chama no WhatsApp que a gente combina certinho.",
  },
  {
    question: "Quanto tempo demora cada serviço?",
    answer:
      "Depende do estado do carro e do serviço escolhido. A lavagem costuma ser mais rápida. Polimento e vitrificação levam mais tempo porque são feitos em etapas. No agendamento já te passamos um prazo estimado.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer: "Pergunta pelo WhatsApp mesmo, a gente te passa as formas de pagamento na hora.",
  },
  {
    question: "Como faço para agendar?",
    answer:
      "Preencha o formulário aqui do site ou chama direto no WhatsApp (61) 98412-9592. A gente combina serviço, data e local na hora.",
  },
];
