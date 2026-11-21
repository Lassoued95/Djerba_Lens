export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageContent = {
  path: string;
  title: string;
  pageTitle: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  paragraphs: string[];
  included: string[];
  process: string[];
  faqs: ServiceFaq[];
};

export const servicePages: Record<string, ServicePageContent> = {
  couple: {
    path: '/photographe-couple-djerba',
    title: 'Séance photo de couple à Djerba',
    pageTitle: 'Photographe couple à Djerba | DjerbaLens',
    description:
      'Offrez-vous une séance photo de couple à Djerba : une expérience naturelle, des lieux choisis ensemble et des souvenirs qui vous ressemblent.',
    intro:
      'Une parenthèse à deux, guidée avec douceur et photographiée dans les décors de Djerba.',
    image: '/assets/images/tourists/1.jpg',
    imageAlt: 'Couple en séance photo sur l’île de Djerba',
    imageWidth: 1280,
    imageHeight: 918,
    paragraphs: [
      'Djerba offre un cadre généreux pour raconter votre histoire à deux : une lumière changeante, des chemins paisibles, des façades pleines de caractère et des paysages ouverts sur la mer. La séance est pensée pour vous, que vous soyez en voyage, que vous célébriez une étape importante ou que vous souhaitiez simplement garder de belles images ensemble. Nous échangeons d’abord sur l’ambiance que vous aimez et sur les souvenirs que vous souhaitez conserver, afin que les photos restent personnelles plutôt que figées.',
      'Vous n’avez pas besoin d’être habitués à poser devant un appareil. Je vous accompagne avec des indications simples, tout en laissant de la place aux gestes spontanés, aux rires et aux moments de complicité. Une promenade, une conversation ou une pause à deux peuvent devenir de belles images quand vous vous sentez à l’aise. Les poses sont proposées comme des repères, jamais comme une obligation : l’objectif est de vous reconnaître dans les photos et de profiter du moment.',
      'Avant la séance, nous choisissons ensemble un lieu adapté à votre envie et aux conditions du jour. Plage, ruelle, architecture locale ou autre décor de l’île : chaque option apporte une atmosphère différente. Nous pouvons prévoir un seul cadre ou discuter d’un changement de lieu selon le temps disponible. La durée exacte reste à confirmer selon votre projet — TODO : préciser ici la durée habituelle d’une séance couple et les éventuels frais de déplacement.',
      'Après la prise de vue, les images sont sélectionnées et travaillées avec soin pour conserver des couleurs naturelles et une ambiance cohérente. La livraison se fait sous forme de fichiers numériques en haute définition, selon les modalités convenues avant la réservation. Le délai dépend de la période et du volume demandé — TODO : confirmer le délai de livraison habituel. Le tarif et le nombre final de photos sont communiqués avant validation, sans surprise.',
      'Pour préparer votre séance, choisissez des vêtements dans lesquels vous pouvez bouger et qui vous ressemblent. Des teintes coordonnées, sans être identiques, fonctionnent bien dans les paysages de l’île. Si vous avez une idée, une préférence de lumière ou un endroit qui compte pour vous, partagez-la : cette préparation nous aide à créer une expérience détendue. La réservation se fait par WhatsApp ou via le formulaire de contact, après échange sur la date, le lieu et vos attentes.',
    ],
    included: [
      'Un échange préalable sur vos envies et l’ambiance recherchée',
      'Des conseils simples pour vous sentir à l’aise devant l’objectif',
      'Une sélection de photos travaillées et livrées en numérique',
      'Un lieu choisi ensemble selon votre projet et les conditions du jour',
    ],
    process: [
      'Nous échangeons sur vos idées, votre date et les lieux possibles à Djerba.',
      'Nous définissons ensemble la durée — TODO : confirmer la durée habituelle.',
      'La séance se déroule à votre rythme, avec des indications naturelles.',
      'Vos photos sont préparées puis livrées — TODO : confirmer le délai.',
    ],
    faqs: [
      {
        question: 'Faut-il savoir poser pour participer ?',
        answer:
          'Non. Je vous guide avec des indications faciles et privilégie les gestes naturels pour que vous restiez vous-mêmes.',
      },
      {
        question: 'Où se déroule la séance photo ?',
        answer:
          'Nous choisissons ensemble un lieu à Djerba selon l’ambiance souhaitée, la lumière et vos déplacements.',
      },
      {
        question: 'Combien de temps dure la séance ?',
        answer:
          'La durée dépend du projet. TODO : confirmer la durée habituelle avant publication.',
      },
      {
        question: 'Quand recevons-nous les photos ?',
        answer:
          'Les images sont livrées après sélection et retouche. TODO : confirmer le délai de livraison.',
      },
    ],
  },
  family: {
    path: '/photographe-famille-djerba',
    title: 'Séance photo famille à Djerba',
    pageTitle: 'Photographe famille à Djerba | DjerbaLens',
    description:
      'Réunissez votre famille pour une séance photo à Djerba : des images naturelles, un rythme adapté et des souvenirs partagés.',
    intro:
      'Une séance familiale détendue pour conserver les liens, les expressions et les petits moments qui vous rassemblent.',
    image: '/assets/images/tourists/3.jpeg',
    imageAlt: 'Séance photo de famille à Djerba',
    imageWidth: 1066,
    imageHeight: 1600,
    paragraphs: [
      'Les vacances, les retrouvailles et les journées ordinaires offrent autant de bonnes raisons de réunir la famille devant l’objectif. À Djerba, nous pouvons créer des images dans un décor qui vous plaît, sans demander à chacun de rester immobile ou de sourire sur commande. Les photos les plus précieuses sont souvent celles où l’on se reconnaît : une main tenue, un enfant qui explore, un éclat de rire partagé ou un portrait de groupe qui rassemble toutes les générations.',
      'La séance est organisée en tenant compte des personnes présentes et de leur rythme. Nous pouvons commencer par quelques portraits de groupe, puis prendre le temps de photographier les petits groupes et les moments spontanés. Pour les enfants, des pauses et des activités simples aident à garder une atmosphère légère. Si un proche préfère rester discret, nous adaptons les propositions. L’idée est de profiter d’un moment ensemble et de créer une variété d’images qui raconte vraiment votre famille.',
      'Le lieu se choisit en amont : plage, extérieur ombragé, cadre architectural ou endroit qui a une signification pour vous. Nous prenons en compte les déplacements et les conditions de lumière pour que chacun soit à l’aise. La durée exacte doit être définie selon la taille de votre groupe — TODO : préciser les durées habituelles et la capacité recommandée. Nous pouvons aussi discuter d’un horaire plus calme pour les jeunes enfants ou les personnes qui préfèrent éviter la forte lumière.',
      'Après la séance, les photos sont sélectionnées et retouchées pour présenter une série homogène. Vous recevez les fichiers numériques selon le mode de livraison convenu. Le nombre d’images, le tarif et le délai exact sont confirmés avant la réservation — TODO : renseigner les forfaits famille et le délai de livraison. Les images peuvent servir à partager vos souvenirs avec vos proches ou à créer un album personnel, selon les droits et modalités convenus.',
      'Pour bien préparer ce moment, prévoyez des tenues confortables et adaptées au lieu choisi. Des couleurs complémentaires donnent une belle harmonie sans uniformiser tout le monde. Apportez, si vous le souhaitez, un petit objet ou une activité familière pour les enfants ; cela peut les aider à se sentir en confiance. Avant de réserver, indiquez le nombre de participants, les âges des enfants et toute contrainte utile. Nous préparerons ensemble une séance simple, agréable et adaptée à votre séjour.',
    ],
    included: [
      'Un échange préalable sur la composition du groupe et vos attentes',
      'Des portraits de groupe et des moments plus spontanés',
      'Un rythme ajusté aux enfants et aux personnes présentes',
      'Une sélection d’images retouchées livrées en format numérique',
    ],
    process: [
      'Vous partagez le nombre de personnes, la date et vos préférences.',
      'Nous sélectionnons un lieu accessible et une durée adaptée — TODO.',
      'La séance alterne portraits, petits groupes et moments naturels.',
      'Les photos sélectionnées sont livrées — TODO : confirmer le délai.',
    ],
    faqs: [
      {
        question: 'Les enfants peuvent-ils bouger pendant la séance ?',
        answer:
          'Oui. La séance privilégie un rythme souple et des moments naturels, avec des pauses si nécessaire.',
      },
      {
        question: 'Peut-on inclure plusieurs générations ?',
        answer:
          'Bien sûr. Indiquez le nombre de participants en amont pour organiser les portraits de groupe et les petits groupes.',
      },
      {
        question: 'Quel lieu choisir à Djerba ?',
        answer:
          'Nous choisissons ensemble un cadre selon vos envies, les déplacements et le confort de votre famille.',
      },
      {
        question: 'Quel est le tarif d’une séance famille ?',
        answer:
          'Le tarif dépend du format choisi. TODO : ajouter les tarifs réels ou inviter à demander un devis.',
      },
    ],
  },
  hotelVilla: {
    path: '/photographe-hotel-villa-djerba',
    title: 'Photographie d’hôtel et de villa à Djerba',
    pageTitle: 'Photographe hôtel et villa à Djerba | DjerbaLens',
    description:
      'Des photos professionnelles pour hôtels et villas à Djerba : espaces, détails et ambiance présentés avec cohérence.',
    intro:
      'Des visuels soignés pour présenter l’identité et les espaces de votre établissement ou de votre hébergement.',
    image: '/assets/images/villas/5.JPG',
    imageAlt: 'Villa photographiée à Djerba pour présenter ses espaces',
    imageWidth: 4000,
    imageHeight: 6000,
    paragraphs: [
      'Les images donnent souvent le premier aperçu d’un hôtel, d’une maison d’hôtes ou d’une villa. Elles aident les visiteurs à comprendre l’atmosphère d’un lieu avant leur arrivée : la lumière d’une chambre, les espaces partagés, les détails de décoration et le lien entre intérieur et extérieur. Une séance photo réfléchie permet de présenter ces éléments avec une série cohérente, adaptée à votre site, à vos supports de réservation et à votre communication.',
      'Nous préparons le projet en fonction de vos priorités. Cela peut inclure les pièces principales, les chambres, les équipements, les espaces extérieurs, les détails de décoration ou les vues disponibles. La liste est définie avec vous pour que la séance reflète ce qui est réellement proposé sur place. Nous pouvons également envisager des images d’ambiance, avec une mise en scène légère, à condition de convenir des disponibilités et des personnes représentées avant la prise de vue.',
      'Avant le jour des photos, nous échangeons sur l’accès aux espaces, les horaires possibles, les pièces à préparer et les usages prévus pour les images. Le choix du moment dépend des fenêtres, de l’orientation et de la lumière disponible. La durée varie selon la taille du lieu et le nombre de vues attendues — TODO : confirmer les durées et le périmètre des prestations. Une bonne préparation réduit les interruptions et nous permet de travailler efficacement dans le respect de l’activité de l’établissement.',
      'Après la prise de vue, une sélection est travaillée pour harmoniser l’exposition, les couleurs et la présentation des espaces tout en restant fidèle au lieu. Les fichiers numériques sont préparés selon les usages prévus : site web, plateformes de réservation ou réseaux sociaux. Les formats, le nombre de photos, les droits d’utilisation, le tarif et le délai sont à confirmer dans le devis — TODO : préciser les conditions réelles. Toute retouche doit conserver une représentation honnête des équipements et des espaces.',
      'Pour organiser votre séance, partagez quelques informations : le type d’établissement, le nombre approximatif de pièces, les espaces à mettre en avant, les dates possibles et la destination des images. Nous pourrons alors définir une liste réaliste, les conditions d’accès et le temps nécessaire. Si votre établissement accueille des clients pendant la séance, nous prévoyons ensemble les zones et horaires afin de respecter leur intimité et de limiter les perturbations. La réservation est confirmée après accord sur le devis et le calendrier.',
    ],
    included: [
      'Préparation d’une liste de vues avec votre équipe',
      'Photographies d’espaces intérieurs, extérieurs et détails convenus',
      'Sélection et retouche cohérente des images',
      'Fichiers numériques adaptés aux usages définis dans le devis',
    ],
    process: [
      'Nous échangeons sur le lieu, les espaces, les objectifs et les usages.',
      'Nous préparons l’accès et définissons la durée — TODO : confirmer.',
      'La prise de vue suit la liste convenue, selon la lumière disponible.',
      'Les images sont sélectionnées et livrées — TODO : confirmer le délai.',
    ],
    faqs: [
      {
        question: 'Quels espaces peut-on photographier ?',
        answer:
          'Les espaces intérieurs, extérieurs et détails que nous aurons définis ensemble dans la préparation.',
      },
      {
        question: 'Faut-il préparer le logement avant votre venue ?',
        answer:
          'Oui, une préparation simple des pièces et des surfaces aide à présenter fidèlement le lieu et évite les interruptions.',
      },
      {
        question: 'Puis-je utiliser les photos sur les plateformes de réservation ?',
        answer:
          'Les usages et droits sont précisés dans le devis avant la séance. Indiquez les plateformes concernées lors de votre demande.',
      },
      {
        question: 'Combien coûte une séance pour une villa ?',
        answer:
          'Le tarif dépend du lieu, du nombre de vues et des usages prévus. TODO : fournir votre grille tarifaire réelle.',
      },
    ],
  },
  photoVideo: {
    path: '/contenu-photo-video-djerba',
    title: 'Création de contenu photo et vidéo à Djerba',
    pageTitle: 'Contenu photo et vidéo à Djerba | DjerbaLens',
    description:
      'Créez des contenus photo et vidéo à Djerba pour votre activité : images cohérentes, préparation claire et livraison adaptée.',
    intro:
      'Des contenus visuels utiles à votre communication, préparés selon votre activité, votre public et vos supports.',
    image: '/assets/images/food/2.png',
    imageAlt: 'Contenu visuel réalisé pour une activité à Djerba',
    imageWidth: 1537,
    imageHeight: 1023,
    paragraphs: [
      'Une communication visuelle cohérente aide une entreprise à présenter son activité de manière claire et reconnaissable. À Djerba, je réalise des photos et des vidéos pour les hébergements, restaurants, commerces et projets locaux qui souhaitent mettre en valeur leurs espaces, leurs produits ou leur savoir-faire. Nous partons de vos besoins concrets : présenter une nouveauté, renouveler vos images, alimenter vos réseaux sociaux ou créer des visuels pour votre site et vos supports de réservation.',
      'Chaque projet commence par une conversation sur votre activité, les personnes que vous souhaitez atteindre et l’utilisation finale des contenus. Nous pouvons préparer une liste de scènes, de produits ou de moments à capturer, ainsi qu’un style visuel cohérent avec votre identité existante. Pour la photographie culinaire, la présentation et la lumière sont préparées avec soin. Pour une vidéo, nous convenons du sujet, du format, des lieux et des éléments de narration avant le tournage.',
      'Le déroulement dépend du contenu demandé. Une courte séance de photos ne nécessite pas la même préparation qu’une vidéo ou qu’une série destinée à plusieurs supports. Le lieu, les disponibilités de votre équipe et les conditions de prise de vue sont confirmés ensemble. La durée et le calendrier de production doivent être établis dans le devis — TODO : préciser les durées et délais habituels pour chaque format. Aucun résultat de performance ou volume de publication n’est garanti ; le service porte sur la création des contenus convenus.',
      'Après la prise de vue, les images et séquences prévues sont sélectionnées et travaillées. Les livrables, formats, éventuels sous-titres, déclinaisons verticales et droits d’utilisation dépendent du projet, et sont précisés avant validation. Nous pouvons définir des versions adaptées aux supports que vous utilisez, comme un site ou des réseaux sociaux, si cela fait partie de la demande. Les prix, le volume final et le délai sont confirmés au devis — TODO : renseigner vos tarifs et modalités réels.',
      'Pour préparer votre demande, indiquez le type d’activité, le contenu souhaité, vos supports de diffusion, votre calendrier et les exemples visuels qui vous inspirent. Si des produits, des espaces ou des membres de votre équipe doivent apparaître, nous organisons leur disponibilité en amont. Cette préparation permet de consacrer le temps de prise de vue à la création plutôt qu’aux décisions de dernière minute. Contactez-moi par WhatsApp ou via le formulaire pour discuter du projet et recevoir une proposition adaptée.',
    ],
    included: [
      'Échange sur les objectifs, les formats et les supports de diffusion',
      'Préparation d’un déroulé adapté au contenu convenu',
      'Prise de vue photo, vidéo ou combinée selon le devis',
      'Sélection et préparation des livrables convenus',
    ],
    process: [
      'Nous définissons ensemble le besoin, le public et les formats souhaités.',
      'Le devis précise la durée et les étapes — TODO : confirmer vos délais.',
      'La prise de vue se déroule dans le lieu convenu avec votre équipe.',
      'Les livrables sont préparés puis transmis selon le calendrier convenu.',
    ],
    faqs: [
      {
        question: 'Quels types d’activités peuvent demander ce contenu ?',
        answer:
          'Hébergements, restaurants, commerces et projets locaux peuvent demander des contenus liés à leur activité.',
      },
      {
        question: 'Pouvez-vous réaliser des photos et une vidéo dans le même projet ?',
        answer:
          'Oui, si le périmètre est défini ensemble. Le devis précise les prises de vue et les livrables prévus.',
      },
      {
        question: 'Les formats pour les réseaux sociaux sont-ils inclus ?',
        answer:
          'Les formats et déclinaisons sont précisés dans le devis selon vos supports et le contenu demandé.',
      },
      {
        question: 'Quel est le délai de livraison ?',
        answer:
          'Le calendrier dépend du volume et du type de contenu. TODO : confirmer les délais habituels.',
      },
    ],
  },
};
