import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/routing";

export type ExperienceEntry = {
  slug: string;
  company: string;
  logo: string;
  role: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  impact: string[];
};

export type PortfolioProject = {
  title: string;
  description: string;
  technologies: string[];
  problem: string;
  approach: string;
  impact: string;
};

function resolveLogoPath(names: string | string[]) {
  const candidates = Array.isArray(names) ? names : [names];
  const extensions = ["png", "webp", "jpg", "jpeg", "svg"];

  for (const name of candidates) {
    for (const extension of extensions) {
      const absolutePath = path.join(process.cwd(), "public", "logos", `${name}.${extension}`);
      if (fs.existsSync(absolutePath)) {
        return `/logos/${name}.${extension}`;
      }
    }
  }

  return `/logos/${candidates[0]}.svg`;
}

const logoPaths = {
  xp: resolveLogoPath(["xp", "xpinc"]),
  shape: resolveLogoPath("shape"),
  rxsense: resolveLogoPath("rxsense"),
  orchid: resolveLogoPath("orchid")
} as const;

const experienceEntriesByLocale: Record<Locale, ExperienceEntry[]> = {
  en: [
    {
      slug: "xp",
      company: "XP Inc / Clear Corretora",
      logo: logoPaths.xp,
      role: "Software Engineer / Engineering Lead",
      summary:
        "Built internal service platforms connected to WhatsApp and Salesforce CRM, later moving into the foundation of a new trading platform and the core infrastructure behind variable income operations at Clear Corretora.",
      responsibilities: [
        "Worked on internal customer service systems integrated with WhatsApp workflows and Salesforce CRM.",
        "Participated in the foundation of a new trading platform for Clear Corretora.",
        "Built infrastructure close to the trading core using FIX, RabbitMQ, gRPC, RPC, and proprietary low-level libraries.",
        "Founded and led the engineering team responsible for the corporate account onboarding platform.",
        "Drove recruitment, team formation, architecture decisions, and delivery leadership."
      ],
      technologies: ["FIX", "RabbitMQ", "gRPC", "RPC", "Low-level libraries", "Salesforce"],
      impact: [
        "Helped establish trading infrastructure in a high-stakes financial environment where reliability and latency directly affected operations.",
        "Created the technical and organizational foundation for a dedicated corporate onboarding domain.",
        "Expanded engineering ownership from implementation into team building and architectural leadership."
      ]
    },
    {
      slug: "shape",
      company: "Shape",
      logo: logoPaths.shape,
      role: "Senior Software Engineer",
      summary:
        "Worked on a large enterprise platform used by MODEC to manage performance, projects, and operational visibility, while evolving the architecture toward independently scalable services and frontends.",
      responsibilities: [
        "Led the evolution from a larger integrated platform toward microservices and microfrontends.",
        "Owned the Performance, Projects, and Digital Control Tower modules.",
        "Defined backend and frontend boundaries for complex enterprise workflows.",
        "Coordinated delivery across internal teams, MODEC stakeholders, and external consultancies."
      ],
      technologies: ["C#", ".NET", "Microservices", "Microfrontends", "SQL Server", "React"],
      impact: [
        "Improved modularity and team autonomy by decomposing the platform into clearer technical domains.",
        "Enabled Digital Control Tower capabilities around the EPCI lifecycle of offshore platforms.",
        "Built a more scalable architecture for an enterprise system used in operational decision-making."
      ]
    },
    {
      slug: "rxsense",
      company: "RxSense",
      logo: logoPaths.rxsense,
      role: "Principal Engineer",
      summary:
        "Joined to modernize core healthcare financial systems while maintaining the stability of a large monolithic platform with critical accumulator, ledger, and adjustment workflows.",
      responsibilities: [
        "Worked on accumulator systems, healthcare claim adjustments, ledger processing, and data loaders.",
        "Focused on SQL improvements, performance tuning, and batch processing reliability.",
        "Designed modernization paths that reduced risk while preserving core business continuity.",
        "Handled large dataset processing in financially sensitive healthcare systems."
      ],
      technologies: ["C#", "SQL Server", "Batch pipelines", "Large datasets", "Performance tuning"],
      impact: [
        "Improved throughput in data-intensive healthcare financial workflows.",
        "Reduced modernization risk while preserving operational stability in a critical monolith.",
        "Strengthened the technical baseline for future optimization and system evolution."
      ]
    },
    {
      slug: "orchid",
      company: "Orchid Software Solutions",
      logo: logoPaths.orchid,
      role: "Software Engineering Lead",
      summary:
        "Currently leading engineering initiatives across architecture, mentoring, and delivery while building modern web platforms with Python backends and TypeScript frontends.",
      responsibilities: [
        "Lead engineering initiatives from system design through delivery.",
        "Define architecture for backend services and modern web platforms.",
        "Mentor engineers and establish technical direction across projects.",
        "Build product platforms with Python APIs, Next.js frontends, and Vercel deployment workflows."
      ],
      technologies: ["Python", "FastAPI", "Flask", "TypeScript", "Next.js", "Vercel"],
      impact: [
        "Improved execution through clearer architecture and stronger engineering leadership.",
        "Accelerated delivery with a pragmatic full-stack approach across backend, frontend, and platform concerns.",
        "Raised consistency in technical direction, code quality, and deployment practices."
      ]
    }
  ],
  pt: [
    {
      slug: "xp",
      company: "XP Inc / Clear Corretora",
      logo: logoPaths.xp,
      role: "Software Engineer / Engineering Lead",
      summary:
        "Atuei em plataformas internas de atendimento conectadas a WhatsApp e Salesforce CRM, depois participei da fundação de uma nova plataforma de trading e da infraestrutura central de renda variável da Clear Corretora.",
      responsibilities: [
        "Trabalhei em sistemas internos de atendimento integrados com fluxos de WhatsApp e Salesforce CRM.",
        "Participei da fundação de uma nova plataforma de trading para a Clear Corretora.",
        "Construí infraestrutura próxima ao core de negociação usando FIX, RabbitMQ, gRPC, RPC e bibliotecas proprietárias de baixo nível.",
        "Fundei e liderei o time de engenharia responsável pela plataforma de onboarding de contas corporativas.",
        "Conduzi recrutamento, formação do time, decisões de arquitetura e liderança de entrega."
      ],
      technologies: ["FIX", "RabbitMQ", "gRPC", "RPC", "Bibliotecas low-level", "Salesforce"],
      impact: [
        "Ajudei a estabelecer infraestrutura de trading em um ambiente financeiro de alta criticidade, onde confiabilidade e latência afetam diretamente a operação.",
        "Criei a base técnica e organizacional para um domínio dedicado de onboarding corporativo.",
        "Ampliei o escopo de atuação de implementação para construção de time e liderança arquitetural."
      ]
    },
    {
      slug: "shape",
      company: "Shape",
      logo: logoPaths.shape,
      role: "Senior Software Engineer",
      summary:
        "Atuei em uma grande plataforma enterprise usada pela MODEC para performance, projetos e visibilidade operacional, evoluindo a arquitetura para serviços e frontends escaláveis de forma independente.",
      responsibilities: [
        "Liderei a evolução de uma plataforma integrada para uma arquitetura de microserviços e microfrontends.",
        "Assumi ownership dos módulos de Performance, Projects e Digital Control Tower.",
        "Defini limites de backend e frontend para fluxos enterprise complexos.",
        "Coordenei entrega entre times internos, stakeholders da MODEC e consultorias externas."
      ],
      technologies: ["C#", ".NET", "Microserviços", "Microfrontends", "SQL Server", "React"],
      impact: [
        "Melhorei modularidade e autonomia entre times ao decompor a plataforma em domínios técnicos mais claros.",
        "Viabilizei capacidades do Digital Control Tower para o ciclo EPCI de plataformas offshore.",
        "Construí uma arquitetura mais escalável para um sistema enterprise usado em decisões operacionais."
      ]
    },
    {
      slug: "rxsense",
      company: "RxSense",
      logo: logoPaths.rxsense,
      role: "Principal Engineer",
      summary:
        "Entrei para modernizar sistemas centrais de infraestrutura financeira em saúde, mantendo a estabilidade de uma grande plataforma monolítica com fluxos críticos de acumuladores, ledger e ajustes.",
      responsibilities: [
        "Atuei em accumulator systems, ajustes de healthcare claims, ledger processing e data loaders.",
        "Foquei em melhorias de SQL, tuning de performance e confiabilidade de batch processing.",
        "Desenhei caminhos de modernização que reduziam risco sem comprometer a continuidade do negócio.",
        "Trabalhei com processamento de grandes volumes de dados em sistemas financeiros sensíveis."
      ],
      technologies: ["C#", "SQL Server", "Pipelines batch", "Grandes datasets", "Tuning de performance"],
      impact: [
        "Melhorei throughput em fluxos financeiros de saúde intensivos em dados.",
        "Reduzi risco de modernização preservando a estabilidade operacional de um monolito crítico.",
        "Fortaleci a base técnica para futuras etapas de otimização e evolução do sistema."
      ]
    },
    {
      slug: "orchid",
      company: "Orchid Software Solutions",
      logo: logoPaths.orchid,
      role: "Software Engineering Lead",
      summary:
        "Atualmente lidero iniciativas de engenharia entre arquitetura, mentoria e entrega, construindo plataformas web modernas com backends em Python e frontends em TypeScript.",
      responsibilities: [
        "Lidero iniciativas de engenharia desde o desenho do sistema até a entrega.",
        "Defino arquitetura para serviços backend e plataformas web modernas.",
        "Mentoro engenheiros e estabeleço direção técnica entre projetos.",
        "Construo plataformas de produto com APIs em Python, frontends em Next.js e workflows de deploy na Vercel."
      ],
      technologies: ["Python", "FastAPI", "Flask", "TypeScript", "Next.js", "Vercel"],
      impact: [
        "Melhorei a execução com arquitetura mais clara e liderança de engenharia mais forte.",
        "Acelerei entregas com uma abordagem full stack pragmática entre backend, frontend e plataforma.",
        "Elevei a consistência em direção técnica, qualidade de código e práticas de deploy."
      ]
    }
  ]
};

const portfolioProjectsByLocale: Record<Locale, PortfolioProject[]> = {
  en: [
    {
      title: "Trading Infrastructure Platform",
      description:
        "Core infrastructure work for a variable income trading environment at Clear Corretora.",
      technologies: ["FIX", "RabbitMQ", "gRPC", "RPC", "Low-level libraries"],
      problem:
        "The trading stack required reliable low-latency communication and resilient infrastructure in a highly sensitive brokerage environment.",
      approach:
        "Worked close to the platform core with messaging protocols and proprietary low-level libraries, shaping transport layers and service interactions suitable for trading workflows.",
      impact:
        "Contributed to the foundation and evolution of infrastructure supporting business-critical trading operations."
    },
    {
      title: "Corporate Account Onboarding Platform",
      description:
        "A dedicated onboarding platform created for corporate account registration and ownership.",
      technologies: ["Architecture", "Leadership", "Backend services", "Workflow systems"],
      problem:
        "Corporate onboarding needed stronger product ownership, scalable architecture, and a dedicated engineering team to support growth.",
      approach:
        "Founded the team, drove recruitment, designed the platform architecture, and established the engineering direction for delivery and long-term maintainability.",
      impact:
        "Created a clearer technical and organizational structure for the onboarding domain, improving ownership and scalability."
    },
    {
      title: "Enterprise Platform for MODEC",
      description:
        "A large enterprise platform supporting performance management, project management, and digital operational visibility.",
      technologies: ["C#", ".NET", "Microservices", "Microfrontends", "SQL Server", "React"],
      problem:
        "The platform had to support multiple complex enterprise domains while remaining adaptable to new operational and project-management demands.",
      approach:
        "Led the move toward microservices and microfrontend architecture, owning critical modules and coordinating architectural alignment with stakeholders and consultancies.",
      impact:
        "Improved modularity, delivery autonomy, and maintainability for a platform used in complex offshore operational contexts."
    },
    {
      title: "Healthcare Accumulator Processing Systems",
      description:
        "Modernization and performance work across accumulators, claim adjustments, ledger processing, and data loaders.",
      technologies: ["C#", "SQL Server", "Batch processing", "Large datasets", "Performance tuning"],
      problem:
        "Core healthcare financial systems needed performance and modernization improvements without risking the stability of a critical monolithic environment.",
      approach:
        "Focused on SQL optimization, batch-processing efficiency, and incremental modernization paths that preserved operational continuity.",
      impact:
        "Improved throughput and maintainability in large-scale healthcare financial processing while reducing delivery risk."
    },
    {
      title: "Orchid JMS",
      description:
        "Journey management software for surrogacy, egg donation, and sperm donation agencies, built as a workflow-heavy operational platform.",
      technologies: ["TypeScript", "Next.js", "Vercel"],
      problem:
        "Agencies handling third-party reproductive journeys needed a secure system to manage intake, screening, matching, case management, custom workflows, and operational reporting without relying on fragmented manual processes.",
      approach:
        "Built a full-stack operational platform around TypeScript, Next.js, and configurable workflow structures, supporting custom data fields, task-oriented process control, reporting, and end-to-end case visibility.",
      impact:
        "Improved operational control across complex agency workflows, reduced manual coordination, and created a more scalable system for intake, screening, matching, and case management."
    }
  ],
  pt: [
    {
      title: "Trading Infrastructure Platform",
      description:
        "Trabalho de infraestrutura central para um ambiente de trading de renda variável na Clear Corretora.",
      technologies: ["FIX", "RabbitMQ", "gRPC", "RPC", "Bibliotecas low-level"],
      problem:
        "A stack de trading precisava de comunicação confiável de baixa latência e infraestrutura resiliente em um ambiente de corretora altamente sensível.",
      approach:
        "Atuei próximo ao core da plataforma com protocolos de mensageria e bibliotecas proprietárias de baixo nível, ajudando a estruturar camadas de transporte e interações entre serviços adequadas ao fluxo de negociação.",
      impact:
        "Contribui para a fundação e evolução da infraestrutura que suporta operações de trading críticas para o negócio."
    },
    {
      title: "Corporate Account Onboarding Platform",
      description:
        "Plataforma dedicada ao registro é onboarding de contas corporativas com ownership de engenharia próprio.",
      technologies: ["Arquitetura", "Liderança", "Serviços backend", "Workflow systems"],
      problem:
        "O onboarding corporativo precisava de ownership mais claro, arquitetura escalável e um time de engenharia dedicado para sustentar o crescimento.",
      approach:
        "Fundei o time, conduzi recrutamento, desenhei a arquitetura da plataforma e estabeleci a direção de engenharia para entrega e sustentacao no longo prazo.",
      impact:
        "Criei uma estrutura técnica e organizacional mais clara para o domínio de onboarding, melhorando ownership e escalabilidade."
    },
    {
      title: "Enterprise Platform for MODEC",
      description:
        "Grande plataforma enterprise para gestão de performance, projetos e visibilidade operacional digital.",
      technologies: ["C#", ".NET", "Microserviços", "Microfrontends", "SQL Server", "React"],
      problem:
        "A plataforma precisava suportar vários domínios enterprise complexos, mantendo capacidade de evolução para novas demandas operacionais e de gestão de projetos.",
      approach:
        "Liderei a migração para uma arquitetura de microserviços e microfrontends, com ownership de módulos críticos e alinhamento arquitetural com stakeholders e consultorias.",
      impact:
        "Melhorei modularidade, autonomia de entrega e manutenção para uma plataforma usada em contextos offshore complexos."
    },
    {
      title: "Healthcare Accumulator Processing Systems",
      description:
        "Modernizacao e performance em acumuladores, ajustes de claims, ledger processing e data loaders.",
      technologies: ["C#", "SQL Server", "Processamento batch", "Grandes datasets", "Tuning de performance"],
      problem:
        "Os sistemas centrais financeiros de healthcare precisavam evoluir em performance e modernização sem colocar em risco a estabilidade de um ambiente monolitico crítico.",
      approach:
        "Foquei em otimização de SQL, eficiencia de batch processing e caminhos incrementais de modernização que preservassem a continuidadé operacional.",
      impact:
        "Melhorei throughput e manutenção em fluxos financeiros de saúde de larga escala, reduzindo risco de entrega."
    },
    {
      title: "Orchid JMS",
      description:
        "Journey management software para agências de barriga de aluguel, doação de óvulos e doação de sêmen, construído como uma plataforma operacional orientada a workflows.",
      technologies: ["TypeScript", "Next.js", "Vercel"],
      problem:
        "Agências que operam jornadas reprodutivas de terceiros precisavam de um sistema seguro para intake, screening, matching, case management, workflows customizados e reporting operacional, sem depender de processos manuais fragmentados.",
      approach:
        "Construí uma plataforma full stack em Next.js e estruturas configuráveis de workflow, suportando campos customizados, controle orientado a tarefas, reporting e visibilidade ponta a ponta dos casos.",
      impact:
        "Melhorei o controle operacional de fluxos complexos da agência, reduzi coordenação manual e criei uma base mais escalável para intake, screening, matching e case management."
    }
  ]
};

export function getExperienceEntries(locale: Locale) {
  return experienceEntriesByLocale[locale];
}

export function getPortfolioProjects(locale: Locale) {
  return portfolioProjectsByLocale[locale];
}
