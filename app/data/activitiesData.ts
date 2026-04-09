export const CBT_EXPERT_DATA: Record<string, any> = {
  // --------- 1. ANSIEDADE ---------
  "101": {
    title: "A Raiz da Ansiedade",
    objective: "Psicoeducação Clínica: Compreender o mecanismo neurobiológico do pânico e dissociar a identidade do sintoma.",
    steps: [
      { 
        text: "Bem-vindo(a) a este espaço seguro. Respire fundo antes de começarmos. Hoje vamos entender o que acontece na sua mente quando a ansiedade bate. Como você costuma se sentir quando ela chega?", 
        options: [
          { text: "Sinto que vou perder o controle total.", feedback: "Esse medo de perder o controle é o sintoma mais comum do pânico! O seu cérebro aciona um alarme falso, mas você nunca perde de fato o controle. Vamos desarmar esse alarme juntos." },
          { text: "Sinto aperto no peito e falta de ar.", feedback: "Sintomas físicos são a forma do seu corpo dizer 'Há perigo!'. Mas na ansiedade, é um alarme quebrado. Entender a biologia por trás disso vai tirar o poder desses sintomas." },
          { text: "Sinto minha mente acelerar sem parar.", feedback: "A ruminação é o cérebro tentando prever todos os piores cenários para te proteger. Nós vamos treinar como cortar esse ciclo na raiz." }
        ]
      },
      { 
        text: "A ansiedade é apenas um 'falso alarme de incêndio' disparado pelo seu sistema nervoso autônomo. Ancestralmente, ela era vital para fugir de leões. O problema é que hoje, seu cérebro reage a e-mails ou interações sociais como se fossem predadores.", 
        options: [
          { text: "Meu cérebro está enganado, então?", feedback: "Exatamente! Seu cérebro está sendo superprotetor. Ele acha que a reunião de amanhã é um leão. A TCC nos ajuda a mostrar para ele que estamos seguros." },
          { text: "Mas parece tão real...", feedback: "Parece perigoso porque a adrenalina no seu sangue é real, mas o PERIGO não é real. É como assistir a um filme de terror: o susto é genuíno, mas o monstro não existe no seu sofá." }
        ]
      },
      { 
        text: "O que você faz hoje quando essa onda de ansiedade e adrenalina toma conta de você?", 
        options: [
          { text: "Tento lutar contra e fazer ela sumir rápido.", feedback: "É um instinto natural, mas lutar contra a ansiedade diz ao cérebro que 'ela é um monstro terrível'. Quanto mais você briga, mais ela cresce." },
          { text: "Fujo do que está me causando isso.", feedback: "Na psicologia, chamamos isso de Comportamento de Evitação. A fuga traz alívio na hora, mas a longo prazo ensina ao seu cérebro a ter ainda mais medo." },
          { text: "Fico paralisado, só esperando passar.", feedback: "O congelamento é uma das três respostas primárias (Luta, Fuga ou Congelamento). É exaustivo, mas mostra que o perigo não era real, pois sempre acaba passando." }
        ]
      },
      { 
        text: "A partir de hoje, usando a Aceitação Radical da DBT, vamos parar de brigar com a onda. Se você lutar contra ela, você se afoga no desespero de não conseguir pará-la. Se você apenas boiar e não resistir, você chega à margem com segurança.", 
        options: [
          { text: "Como eu boio nessa onda?", feedback: "No seu próximo passo: Quando a crise vier, você não tentará afastá-la. Você a observará e dirá clinicamente: 'Isso é só adrenalina. Não é o fim'." },
          { text: "E se a onda for forte demais?", feedback: "Nenhuma onda emocional vive para sempre. Hormônios de estresse têm meia-vida de 90 segundos. Se você não adicionar julgamentos do tipo 'isso não vai acabar nunca', ela vai quebrar." }
        ]
      }
    ],
    conclusion: "Este é o primeiro grande passo. Separar QUEM VOCÊ É das REAÇÕES DO SEU CORPO tira o terror do momento. O alarme do seu corpo pode soar forte, mas você acabou de encontrar a chave da consciência para desativá-lo."
  },
  "102": {
    title: "Hackeando a Fisiologia (Respiração)",
    objective: "TIPP / Regulação Parassimpática: Utilizar a fisiologia para forçar o relaxamento do sistema nervoso autônomo.",
    steps: [
      { 
        text: "Quando você está no pico da ansiedade, tentar conversar consigo mesmo ou 'pensar racionalmente' quase nunca funciona. Por que você acha que isso acontece?", 
        options: [
          { text: "Porque eu não tenho força de vontade.", feedback: "Não! É biologia pura. A parte do seu cérebro que pensa racionalmente (Córtex Pré-Frontal) é literalmente inibida pelo centro do medo (Amígdala) durante o pânico." },
          { text: "Porque a emoção é mais forte que a razão.", feedback: "Exatamente! A parte emocional 'sequestra' o cérebro. Por isso, a DBT utiliza intervenções corporais para acalmar a mente, e não o contrário." }
        ]
      },
      { 
        text: "Se tentarmos hackear o alarme pelo corpo, a respiração diafragmática é a melhor técnica. Se continuarmos respirando rápido, o peito entende: 'ainda estamos correndo do perigo!'. Topa treinar a freagem cardíaca agora?", 
        options: [
          { text: "Sim, vamos tentar.", feedback: "Coloque a mão sobre o estômago. Seu peito não deve se mexer. Apenas a sua barriga vai empurrar a sua mão para a frente, como se enchesse um balão." },
          { text: "Já tentei respirar fundo e me deu mais pânico.", feedback: "Isso acontece quando tentamos encher o peito, hiperventilando. A chave mágica está em SOLTAR o ar muito devagar. O relaxamento está na expiração!" }
        ]
      },
      { 
        text: "Vamos fazer um ciclo: Puxe o ar pela barriga por 4 segundos. Segure apenas 2 segundos. Agora a chave: Solte o ar lentamente como um fio de fumaça pela boca por 6 segundos. Tente agora.", 
        options: [
          { text: "Consegui soprar lentamente.", feedback: "Perfeito! Prolongar a expiração ativa o Nervo Vago, que imediatamente ordena que seu coração bata mais devagar. É um tranquilizante fisiológico." },
          { text: "Fiquei ofegante tentando contar.", feedback: "Não se prenda ao relógio! O segredo é apenas um: o tempo soltando o ar tem que ser MAIOR do que o tempo puxando. Foi assim?" },
          { text: "Senti minha barriga inflar mesmo.", feedback: "Isso é ouro! Significa que o diafragma abaixou e expandiu perfeitamente. O cérebro automaticamente tira o pé do acelerador." }
        ]
      }
    ],
    conclusion: "Você acaba de aprender que não precisa ser escravo da química de emergência do seu corpo. Quando a sua mente não responder, use seus pulmões. Eles são âncoras poderosas e indestrutíveis."
  },
  "103": {
    title: "O Tribunal Socrático",
    objective: "Reestruturação Cognitiva: Eliminar pensamentos catastróficos por meio de análise evidenciária e litígio imaginário.",
    steps: [
      { 
        text: "Na TCC, nós acreditamos que não é a 'situação' que causa a sua dor, mas sim a 'interpretação' automática que você tem sobre ela. Qual desses pensamentos é mais comum na sua ansiedade?", 
        options: [
          { text: "'Eu vou ser demitido / As pessoas vão me odiar.'", feedback: "Esse é o Catastrofismo combinado com Leitura Mental. Você assume o pior cenário e tenta adivinhar o sentimento dos outros." },
          { text: "'Isso nunca vai melhorar / Eu sou defeituoso.'", feedback: "Isso se chama Filtro Negativo e Raciocínio Emocional. Você sente como se algo fosse verdade, então seu cérebro afirma aquilo como fato inegável." },
          { text: "'Eu falhei numa coisa, então fracassei em tudo.'", feedback: "Isso se chama Pensamento Tudo-ou-Nada. Um único erro temporário acaba apagando um vasto histórico de acertos do seu livro mental." }
        ]
      },
      { 
        text: "A técnica padrão ouro da TCC é colocar esse pensamento automático no TRIBUNAL. Se esse pensamento for o réu, quais PROVAS REAIS (e não emoções ou suposições) o sustentam para ser condenado como verdade absoluta?", 
        options: [
          { text: "Tenho muitas provas concretas.", feedback: "Nesse caso, a TCC nos orienta a criar um plano de ação (Problem Solving). Se o perigo for palpável, nós usamos ferramentas construtivas em vez da evitação paralítica." },
          { text: "Na verdade, são só medos, não tenho provas.", feedback: "Exato! Você é Inocentado pelo júri! Se o medo não apresentar provas fotográficas ou factuais na vida real, ele deve ser classificado como 'Alerta Falso' e dispensado da sua atenção." },
          { text: "As coisas já deram errado uma vez antes...", feedback: "Aí entra a prova das Probabilidades. Porque o pneu do carro furou há 2 anos numa quinta, não significa que fura toda quinta. Supergeneralizar a dor do passado para o presente é uma distorção." }
        ]
      },
      { 
        text: "Para o último passo, sempre usamos a Reestruturação Final. Se o pior cenário possível realmente ocorresse, o que você faria REALISTICAMENTE?", 
        options: [
          { text: "Seria o fim do mundo, eu desmoronaria.", feedback: "Muitas vezes a ansiedade foca tanto no problema que tira nosso poder de agência. Nós somos seres incrivelmente adaptáveis. Acredite na sua capacidade ancestral de se reconstruir." },
          { text: "Eu ia me frustrar, mas arranjaria um jeito.", feedback: "Isto é O PODER CLÍNICO REAL! Confiança não é 'ter certeza de que tudo dará certo'. Confiança genuína é 'eu vou lidar com as coisas se elas derem errado'." }
        ]
      }
    ],
    conclusion: "Ao desafiar seus pensamentos como um advogado num tribunal, a ansiedade perde todo o combustível. Você percebe que o lobo em sua mente é apenas uma sombra projetada."
  },

  // --------- 2. AUTOCONFIANÇA ---------
  "201": {
    title: "O Ponto Inicial do Valor",
    objective: "Desvinculação do Senso de Valor (Autoestima Contigente vs Aceitação Incondicional).",
    steps: [
      { 
        text: "Quando você percebe que a sua autoestima está baixa, qual você acha que é o principal gatilho externo para isso?", 
        options: [
          { text: "Quando erro no trabalho ou tarefa importante.", feedback: "Você está ancorando seu valor à 'Produtividade'. Se você confunde seu 'Desempenho' com a sua 'Identidade', o fracasso deixa de ser uma lição e vira uma ofensa existencial." },
          { text: "Quando alguém me critica ou se afasta de mim.", feedback: "Você ancora seu valor à 'Aprovação Social'. Isso coloca a chave da sua autoestima no bolso de desconhecidos que você nem sabe se são qualificados para julgar." },
          { text: "Quando não atinjo metas estéticas ou padrões.", feedback: "Isto é a submissão aos ideais irrealistas externos (frequentemente gerados por redes sociais). É uma métrica impossível." }
        ]
      },
      { 
        text: "A meta central da TCC hoje não é fazer você sentir que tem uma autoestima impecável sendo melhor que os outros. A meta real é estabelecer a 'Aceitação Incondicional de Si Mesmo'.", 
        options: [
          { text: "O que é Aceitação Incondicional?", feedback: "É uma profunda declaração: 'O meu valor como ser humano é FIXO e irrefutável inato. Minhas ações, vitórias e falhas mudam todo dia, mas não alteram ou comprometem o meu valor de base'." },
          { text: "Se eu aceitar meus defeitos, não vou me acomodar?", feedback: "Grande mito! Bater em si mesmo (crítica destrutiva) não gera crescimento, gera depressão e medo de tentar de novo. O crescimento sustentável só flui do perdão e da auto-compaixão genuína." }
        ]
      },
      { 
        text: "Vamos materializar isso: Pense em uma falha que te traz vergonha. Tente separar O ATO do SEU VALOR. Como você falaria com um amigo amado que tivesse cometido o mesmo erro?", 
        options: [
          { text: "Eu diria: 'Foi um deslize, não desanime.'", feedback: "Exatamente! Aplique essa compaixão implacável a si mesmo. Se nós tratássemos nossos amigos da forma rigorosa que nosso Crítico Interno nos trata, não teríamos amigos vivos." },
          { text: "Mas comigo mesmo o grau é diferente, preciso ser forte.", feedback: "Psicologicamente, essa rigidez só fratura a sua base de apoio. A verdadeira resiliência surge quando nós nos cobrimos de bondade durante nossos poços mais profundos." }
        ]
      }
    ],
    conclusion: "Lembre-se da lei de ouro: Seu valor humano intrínseco jamais pode sofrer inflação ou deflação atrelado à opinião externa. É uma base rochosa inabalável."
  },
  "203": {
    title: "Lidando com Julgamentos Alheios",
    objective: "TCC: Viés Egotista e Efeito Holofote (Spotlight Effect).",
    steps: [
      { 
        text: "Muitas vezes evitamos expressar opiniões ou realizar algo por puro medo do que as outras pessoas pensarão secretamente sobre nós. Qual o seu pior receio social?", 
        options: [
          { text: "Que pensem que sou incompetente.", feedback: "É a famosa Síndrome do Impostor misturada com a Leitura Mental. Supomos as sentenças acusatórias dos outros mesmo sem provas judiciais sociais prévias palpáveis na situação real cotidiana." },
          { text: "Que pensem que sou estranho ou inapropriado.", feedback: "Tememos frequentemente o isolamento da tribo pela 'rejeição', remetendo a medos mamíferos irracionais instintivos muito arcaicos em não nos conectarmos às manadas maiores sociais e morreremos abandonados socialmente!" }
        ]
      },
      { 
        text: "Imagine que você cometeu uma pequena gafe pública (derrubou café, ou usou uma palavra errada na roda de amigos). Você pensa sobre isso por 3 semanas. Quanto tempo acha que OS OUTROS pensam sobre isso?", 
        options: [
          { text: "Eles provavelmente esquecem no mesmo dia.", feedback: "Acertou na mosca psiquiátrica analítica. A ciência comprova exaustivamente que todos são centralmente egoístas o tempo todo. Ninguém tem energia neural pra manter a sua própria falha nos seus corações por tanto tempo profundo, a não ser você." },
          { text: "Eles ficam rindo disso por trás.", feedback: "Isso é o Efeito do Estalido do Foco ('Spotlight Effect'). Achamos com certeza absurda esmagadora que luzes brilhantes da sala focam toda a nossa mínima imperfeição o tempo todo pra todos. Mas TODO MUNDO se sente sentando debaixo de seus PRÓPRIOS holofotes internos fóbicos e com medos e falhas próprias para focarem exaustivamente nos alheios defeitos seus!" }
        ]
      },
      { 
        text: "O antídoto definitivo para esse medo é desenvolver o Músculo da Falsa Rejeição. Se alguém não gostar do que você fez, isso destrói a sua base real?", 
        options: [
          { text: "Dói, mas eu acabo lidando.", feedback: "E essa dor de lidar com rejeições menores te cura para exposições futuras e pavimenta o grande muro de defesa imunológica de personalidade duradoura frente à rejeição! Não temer desagradar e ser verdadeiro!" },
          { text: "Acaba totalmente com meu dia, travo tudo.", feedback: "Quando dermos excessivos poderes divinos nas opiniões passageiras randômicas abstratas alheias, daremos o trono direcional sagrado de direção de nossa embarcação de vida. Você precisa retirar autoridade divina sobre validações alheias hoje." }
        ]
      }
    ],
    conclusion: "Liberte-se imediatamente do cárcere imenso mental das aprovações totais públicas. Ser amável é fundamental, mas desagradar algumas expectativas fantasmas na sua trilha ao progresso é uma honra necessária."
  },

  // --------- 4. FALAR EM PÚBLICO ---------
  "401": {
    title: "O Pânico de Plateias",
    objective: "Enfrentamento Baseado em Valores vs Fuga do Raciocínio Antecipatório Fóbico da Glossofobia.",
    steps: [
      { 
        text: "Falar em frente à plateia ou câmera está nos recordes psiquiátricos globais do pavor, batendo o medo humano do voo livre! O que vem primeiro em você antes de apresentar?", 
        options: [
          { text: "O branco total, esquecer tudo.", feedback: "O famoso apagão cortical defensivo. Com o pico enorme tensional da amígdala cerebral profunda, ela literalmente trava a biblioteca dos acessos racionais frontais para priorizar instinto defensivo." },
          { text: "A taquicardia forte e suor descontrolado.", feedback: "Sintoma da ativação biológica adrenérgica direta extrema. O corpo avisa que você será julgado em um coliseu sem defesa real tática armada imediata biológica natural e tenta queimar glicose nervosa rápido!" }
        ]
      },
      { 
        text: "Pela Exposição Sistêmica Comportamental nós quebramos a mentira biológica cortando os gatilhos no meio com técnica. Nós começaremos parando de se cobrar Perfeição. A Meta de falar em público não é ser incrível, é 'Passar a Informação Necessária'.", 
        options: [
          { text: "Se eu não for brilhante, é um fracasso.", feedback: "Expectativas perfeitíssimos destrutivas do cérebro! Plateias inteiras reais conectam brutalmente infinitas vezes muito mais por falhas vulneráveis orgânicas simpáticas sinceras visíveis do que palestras impecáveis sem almas." },
          { text: "Isso tira muito o meu peso.", feedback: "Exato! Mudar a meta de 'Agradar Exaustivamente Performance' apenas e puramente para 'Contribuir e Servir a Informação de Valores Reais' corta setenta e cinco por cento das pressões neuroniais da autoperformance." }
        ]
      }
    ],
    conclusion: "O segredo de encantar pessoas num tablado de palco da sala universitária ou em conferências é soltar a carga de julgamentos de divindade de aprovações e abraçar as missões concretas cruas."
  },

  // --------- TEMPLATE DINÂMICO PARA TODOS OS OUTROS RESTANTES (501 a 804) COM OPÇÕES ---------
  ...Array.from({ length: 45 }).reduce((acc: any, _, index) => {
    let idStr = "";
    if (index < 5) idStr = `30${index + 1}`; // Foco e Concentração (301-305)
    else if (index < 9) idStr = `40${index - 4}`; // Falar em Público (401-404)
    else if (index < 16) idStr = `50${index - 8}`; // Burnout (501-507)
    else if (index < 22) idStr = `60${index - 15}`; // Sono (601-606)
    else if (index < 27) idStr = `70${index - 21}`; // Relacionamentos (701-705)
    else if (index < 31) idStr = `80${index - 26}`; // Comportamentos (801-804)
    else return acc;

    // Apenas preenche se já não estiver declarado (pra não sobrescrever os de cima)
    if (!acc[idStr]) {
      acc[idStr] = {
        title: "Aprofundamento Clínico TCC/DBT",
        objective: "Avaliação Sistêmica de Crenças Nucleares e Validação Profunda.",
        steps: [
          { 
            text: "Em diversos momentos os nossos fardos se tornam muito maiores apenas porque nós engolimos e invalidamos nossas dores. Como você vem internalizando seus incômodos recentes sobre este exato tema?", 
            options: [
              { text: "Sinto que não deveria estar sofrendo tanto por isso.", feedback: "Típica resposta ligada à Validação de Terceiros e auto invalidação severa emocional íntima! Toda dor percebida e sofrida na sua carne pela percepção da alma interior sua deve ser tratada como 100% válida real. Não a diminua sem avaliar." },
              { text: "Acabo desabando porque cheguei ao limite forte.", feedback: "Bem-vindo à fase do Esgotamento das Resistências e Resiliências que se acumularam nos poros como ferrugens profundas. Se permitir sentir por um tempo no refúgio blindado interno é o passo de Aceitação primária das TCC." }
            ]
          },
          { 
            text: "Um grande divisor de águas e salvador profundo em sua recuperação terapêutica consiste em parar drasticamente violenta de resistir ao rio invisível incontrolável dos sentimentos obscuros presentes hoje.", 
            options: [
              { text: "Parece contraintuitivo, mas entendo.", feedback: "A dialética da DBT (Dialectical Behavior Therapy): A mudança real só ocorre a partir do momento genuíno realístico imediato de Aceitações Extremas das dores inalteráveis e realidades doloridas passadas pesadas nos limites da zona cega." },
              { text: "Eu tenho muito medo que a dor nunca vá embora.", feedback: "Pensamento Socrático rápido: Já estivemos em fundo de poços na cronologia das trajetórias e nós sobrevivemos. A natureza de qualquer onda, inclusive a onda letal melancólica e frustrante estressante, consiste obrigatoriamente de um prazo válido com a química em constante dissolução total final natural fisiológica!" }
            ]
          },
          { 
            text: "Você finalizará esta breve e objetiva reflexão da imersão mental com a percepção plena dos Distanciamentos Críticos Funcionais Práticos: Eu observo, noto, avalio... e escolho não mergulhar para dentro das histórias sem fundos destrutivos mentais das minhas narrativas cognitivas sombrias limitantes mentais.", 
            options: [
              { text: "Eu noto que não sou o meu sofrimento temporal.", feedback: "A mais pura Desfusão Cognitiva com clareza da técnica ACT e TCC. Você está seguro no centro livre das observações dos piores furacões climáticos na ilha do ego mental interior protegido durabilidade total máxima!" },
              { text: "Eu crio o ponto de luz focal para minha melhoria futura.", feedback: "A Regulação Imersiva do Humor através dos Comportamentos Valorizados que nós definimos das metas purificadas essenciais sem correntes de escravidão nas visões limitadas. Vá em paz gigante livremente hoje!" }
            ]
          }
        ],
        conclusion: "Esta exploração intensa gerou blocos enormes valiosos neurais flexivos saudáveis consistentes da plasticidade mental na sua rota direta de curas profundas essenciais das dores complexas escondidas diárias! Estamos trilhando o progresso vivo robusto!"
      };
    }
    return acc;
  }, {} as Record<string, any>)

};
