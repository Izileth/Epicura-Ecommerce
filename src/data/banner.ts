import type { FeaturedItem } from "@/components/common/banner";

export const FeaturesData: FeaturedItem[] = [
    {
        id: '1',
        title: 'Cordeiro das Dunas',
        subtitle: 'Assado lento com especiarias do deserto',
        description:
        'Um ritual gastronômico: cordeiro marinado por 12 horas em mel de tâmaras, açafrão azul e pimenta negra de Arakh. Servido com purê de raiz-do-tempo e flores comestíveis.',
        badge: 'Exclusivo',
        priority: 'high',
        ctaText: 'Provar agora',
        ctaPath: '/menu/cordeiro-das-dunas',
        tags: ['Luxo', 'Exótico', 'Especialidade'],
        publishDate: '2025-06-01',
        author: {
        name: 'Chef Kalil Enrah',
        },
    },
    {
        id: '2',
        title: 'Néctar de Jasmin & Figo',
        subtitle: 'Sobremesa celestial aromatizada',
        description:
        'Delicadeza e intensidade em um só prato. Mousse de figo preto infusionado com jasmin imperial e crosta de cristal de mel. Uma explosão mística em cada colherada.',
        badge: 'Novidade',
        priority: 'high',
        ctaText: 'Experimentar',
        ctaPath: '/menu/doce-nectar',
        tags: ['Sobremesa', 'Perfume', 'Sensualidade'],
        publishDate: '2025-05-28',
        author: {
        name: 'Chef Aurora Milán',
        },
    },
    {
        id: '3',
        title: 'Areias do Éter',
        subtitle: 'Prato aromático com especiarias ancestrais',
        description:
        'Uma base de arroz negro com molho dourado de anis e noz-moscada, servido com tiras crocantes de tahine caramelizado. Uma viagem ao Oriente perdido.',
        badge: 'Místico',
        priority: 'medium',
        ctaText: 'Saborear',
        ctaPath: '/menu/areias-do-eter',
        tags: ['Especiarias', 'Exótico', 'Vegetariano'],
        publishDate: '2025-05-26',
        author: {
        name: 'Chef Samir El-Khalil',
        },
    },
    {
        id: '4',
        title: 'Brisa do Oásis',
        subtitle: 'Refresco de flores e frutas raras',
        description:
        'Infusão gelada de pétalas de rosa, lichia cristalizada, folhas de hortelã prateada e gelo de lavanda azul. Um bálsamo para os sentidos.',
        badge: 'Refrescante',
        priority: 'medium',
        ctaText: 'Refrescar-se',
        ctaPath: '/menu/brisa-do-oasis',
        tags: ['Bebida', 'Aromática', 'Leveza'],
        publishDate: '2025-05-20',
        author: {
        name: 'Mixologista Zahra Noor',
        },
    },
];
