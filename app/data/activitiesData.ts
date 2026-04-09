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
  "104": {
    title: "Gráfico de Pizza das Responsabilidades",
    objective: "TCC: Reduzir a personalização excessiva e a culpa por eventos fora do controle do usuário.",
    steps: [
      { 
        text: "Muitas vezes, quando algo dá errado, nossa mente ansiosa assume 100% da culpa. Vamos analisar um evento estressante recente. Quanto da culpa você sente que é sua?", 
        options: [
          { text: "Sinto que foi tudo minha culpa.", feedback: "Isso se chama 'Personalização'. Vamos quebrar essa pizza em fatias reais. Quem mais estava envolvido? O azar? O cansaço? A falta de informação?" },
          { text: "Sinto que eu poderia ter evitado.", feedback: "A ilusão de controle é um grande motor de ansiedade. Vamos ver quais fatores externos (clima, outras pessoas, sistema) também tiveram uma fatia nessa situação." }
        ]
      },
      { 
        text: "Imagine um gráfico de pizza. Se você dar 30% para a sua falha, quem fica com o resto? Talvez 20% para a falta de tempo, 20% para a falha de comunicação de terceiros e 30% para o acaso. Como o gráfico ficaria agora?", 
        options: [
          { text: "Minha parte fica bem menor assim.", feedback: "Exatamente! Ver os fatos como eles são, e não como a sua culpa os pinta, alivia o peso nos seus ombros imediatamente." },
          { text: "Ainda me sinto mal pelo que fiz.", feedback: "Assumir sua responsabilidade é bom para crescer, mas carregar a fatia dos outros só te impede de caminhar. Devolva aos outros o que pertence a eles." }
        ]
      }
    ],
    conclusion: "Você não é o centro gravitacional de todos os problemas do mundo. Aprender a dividir a responsabilidade é aprender a ter compaixão por si mesmo."
  },
  "105": {
    title: "A Escada do Enfrentamento",
    objective: "Exposição Gradual: Criar uma hierarquia de medos para dessensibilização sistemática.",
    steps: [
      { 
        text: "Evitar o que nos dá medo faz a ansiedade diminuir na hora, mas crescer amanhã. O segredo é enfrentar, mas de degrau em degrau. Qual seria o seu maior medo hoje?", 
        options: [
          { text: "Um medo social (falar com estranhos, ser julgado).", feedback: "Vamos construir a sua escada. O primeiro degrau não é dar uma palestra, mas talvez apenas dar 'bom dia' para o porteiro ou caixa." },
          { text: "Um medo de fracasso ou de situações novas.", feedback: "Vamos começar com algo pequeno que você possa controlar. O que seria um teste 'seguro' para você hoje?" }
        ]
      },
      { 
        text: "Para cada degrau que você sobe, sua mente aprende: 'Eu sobrevivi e não foi tão ruim assim'. Qual o primeiro degrau que você se compromete a subir esta semana?", 
        options: [
          { text: "Vou fazer algo pequeno que estava adiando.", feedback: "Ótimo! Sinta o frio na barriga, mas não pare. Esse frio é apenas a sua coragem se aquecendo." },
          { text: "Ainda estou com muito medo de começar.", feedback: "Tudo bem. Então o seu primeiro degrau é apenas mentalizar você fazendo a tarefa com sucesso. Isso já conta como treino!" }
        ]
      }
    ],
    conclusion: "A coragem não é a ausência de medo, é o julgamento de que algo é mais importante que o medo. Um degrau por vez, você conquista o topo."
  },
  "106": {
    title: "A Técnica 5-4-3-2-1",
    objective: "Mindfulness/Ancoragem: Trazer a atenção do futuro (ansiedade) para o presente (sentidos).",
    steps: [
      { 
        text: "A ansiedade vive no futuro, no 'e se...'. O Mindfulness nos traz de volta para o 'aqui e agora'. Vamos usar seus 5 sentidos para te ancorar?", 
        options: [
          { text: "Sim, estou pronto.", feedback: "Primeiro, olhe ao redor. Identifique 5 coisas que você pode VER agora. Diga os nomes delas mentalmente." },
          { text: "Minha mente está muito agitada para isso.", feedback: "É exatamente por isso que vamos focar nos olhos e não nos pensamentos. Tente achar apenas 1 objeto azul agora." }
        ]
      },
      { 
        text: "Agora, note 4 coisas que você pode TOCAR (a textura da roupa, a cadeira), 3 sons que pode OUVIR, 2 cheiros e 1 sabor (ou apenas note sua respiração). Como se sente?", 
        options: [
          { text: "Me sinto mais presente e calmo.", feedback: "Perfeito. Você acabou de forçar seu cérebro a sair do 'modo sobrevivência' para o 'modo observação'. O mundo real é muito mais seguro que o mundo mental ansioso." },
          { text: "Ainda sinto um pouco de tensão.", feedback: "Normal. Repita o processo focando apenas nas texturas que você toca. O contato físico com a realidade é o melhor remédio para a vertigem mental." }
        ]
      }
    ],
    conclusion: "O presente é o único lugar onde você tem poder real. Sempre que a mente fugir para o futuro sombrio, use o 5-4-3-2-1 para puxá-la de volta."
  },
  "107": {
    title: "SOS: O Protocolo TIPP",
    objective: "DBT Crisis Survival: Mudança drástica na química corporal para interromper o pânico.",
    steps: [
      { 
        text: "Se você estiver em um pico de pânico total, o raciocínio não funciona. Precisamos de um choque no sistema. O 'T' do TIPP é de Temperatura. Você tem acesso a água gelada agora?", 
        options: [
          { text: "Sim, posso pegar.", feedback: "Lave o rosto com água gelada ou segure um cubo de gelo nas mãos. Isso ativa o 'Reflexo de Mergulho', que bruscamente desacelera o ritmo cardíaco." },
          { text: "Não posso agora.", feedback: "Então vamos para o 'P': Pressão Muscular. Aperte todos os músculos do corpo com força por 5 segundos e solte tudo de uma vez. Repita 3 vezes." }
        ]
      },
      { 
        text: "O objetivo é dizer ao seu sistema biológico: 'Houve uma mudança de ambiente, saia do modo pânico'. Já sentiu uma leve alteração no foco?", 
        options: [
          { text: "Sim, o gelo/pressão me despertou.", feedback: "Excelente. Você saiu do loop mental. Agora, respire lentamente, soltando o ar pelo dobro do tempo que puxar." },
          { text: "Ainda sinto o coração acelerado.", feedback: "Continue a pressão muscular: contraia e solte. O seu corpo não consegue manter o pico de adrenalina se você forçar o relaxamento muscular repetidamente." }
        ]
      }
    ],
    conclusion: "Em crises extremas, use o corpo para comandar a mente. O protocolo TIPP é o seu botão de 'reset' de emergência."
  },
  "108": {
    title: "Cartão de Enfrentamento",
    objective: "Prevenção de Recaídas: Criar um plano de ação para momentos de vulnerabilidade futura.",
    steps: [
      { 
        text: "Dias ruins vão acontecer, e está tudo bem. Ter um 'Plano de Crise' escrito evita que você se sinta perdido quando a névoa voltar. O que mais te ajudou nestas sessões?", 
        options: [
          { text: "As técnicas de respiração e ancoragem.", feedback: "Anote no seu 'Cartão Mental': 1. Respirar (Expirar longo). 2. Ver 5 objetos. 3. Lembrar que é apenas adrenalina." },
          { text: "Desafiar os pensamentos catastróficos.", feedback: "Anote no seu 'Cartão Mental': 1. Qual a prova disso? 2. Eu já superei isso antes. 3. O que eu diria a um amigo?" }
        ]
      },
      { 
        text: "Uma recaída não é o fim do caminho, é apenas um desvio. Você aprendeu as ferramentas; elas não sumiram. Você confia que pode usá-las novamente?", 
        options: [
          { text: "Sim, sinto que tenho um kit de ferramentas agora.", feedback: "Essa é a base da resiliência. Você não é mais a pessoa sem recursos que começou esta trilha. Você é um mestre da sua própria regulação." },
          { text: "Tenho medo de esquecer tudo na hora H.", feedback: "Por isso o Cartão de Enfrentamento é físico ou digital. Deixe-o fácil no celular. No pânico, a gente não pensa, a gente lê e executa." }
        ]
      }
    ],
    conclusion: "Você completou a jornada da ansiedade! Agora, você não apenas entende o seu monstro, você sabe como domá-lo. O caminho para o autoconhecimento continua em você."
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
  "202": {
    title: "O Advogado do Diabo vs Crítico",
    objective: "TCC: Identificar a 'voz' da autocrítica e criar um Contra-Argumento Compasivo.",
    steps: [
      { 
        text: "Todos temos uma voz interna que julga cada passo. Qual o insulto favorito do seu Crítico Interno?", 
        options: [
          { text: "'Você não é bom o suficiente / Nunca vai conseguir.'", feedback: "Essa voz não é a sua 'consciência', é apenas um padrão de pensamento aprendido. Vamos dar um nome a ela? Que tal 'O Sabotador'?" },
          { text: "'As pessoas estão fingindo que gostam de você.'", feedback: "Isso é Leitura Mental negativa. O seu crítico está tentando te proteger da rejeição, mas de um jeito muito cruel. Vamos desafiá-lo." }
        ]
      },
      { 
        text: "A técnica é: quando o Crítico falar, você responde como um Advogado de Defesa. 'Sim, eu errei essa parte, mas eu também acertei X e Y'. O que você pode dizer em sua defesa agora?", 
        options: [
          { text: "Eu fiz o melhor que pude com o que eu sabia.", feedback: "Essa é uma verdade clínica potente. Ninguém acorda querendo falhar. Você agiu com os recursos que tinha no momento. Perdoe-se." },
          { text: "Meu erro não apaga minhas qualidades.", feedback: "Exato! Um borrão em um quadro não destrói a obra inteira. O seu crítico foca no borrão, o advogado foca na tela completa." }
        ]
      }
    ],
    conclusion: "Diminuir o volume do Crítico Interno exige prática. Quanto mais você defende a si mesmo, mais fraca a voz do julgamento se torna."
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
  "204": {
    title: "Vencendo o Impostor",
    objective: "TCC: Coleta de Dados Factuais contra o sentimento de fraude.",
    steps: [
      { 
        text: "A Síndrome do Impostor é o medo constante de ser 'descoberto' como uma fraude. Você sente que suas conquistas foram apenas sorte?", 
        options: [
          { text: "Sim, parece que eu dei sorte e logo vão perceber.", feedback: "A sorte pode ter aberto uma porta, mas FOI VOCÊ quem passou por ela e se manteve lá. Vamos listar 3 coisas que só você fez para chegar onde está." },
          { text: "Sinto que não sou tão bom quanto pensam.", feedback: "Isso é uma distorção de comparação. Você conhece seus bastidores, mas só vê o palco dos outros. Todos se sentem impostores às vezes, até os gênios." }
        ]
      },
      { 
        text: "O antídoto é o 'Arquivo de Provas'. Se fôssemos a um tribunal hoje, quais fatos (diplomas, elogios, projetos entregues) provam que você é competente?", 
        options: [
          { text: "Tenho resultados reais que entreguei.", feedback: "Resgate esses resultados sempre que a dúvida vier. O sentimento é mentiroso, os dados são verdadeiros. Você não é uma fraude, você é um trabalhador em evolução." },
          { text: "Ainda acho que qualquer um faria o mesmo.", feedback: "Pode ser, mas foi VOCÊ quem fez. E você fez do seu jeito único. Reconhecer seu esforço é o primeiro passo para a autoconfiança." }
        ]
      }
    ],
    conclusion: "Você não precisa ser perfeito para ser legítimo. Ocupe o seu lugar com orgulho: você trabalhou duro para estar nele."
  },
  "205": {
    title: "O Poder do 'Não'",
    objective: "Treino de Assertividade: Estabelecer limites saudáveis sem culpa excessiva.",
    steps: [
      { 
        text: "Dizer 'sim' para tudo é, na verdade, dizer 'não' para você mesmo. O que te impede de impor limites às pessoas?", 
        options: [
          { text: "Medo de magoar os outros ou ser egoísta.", feedback: "Limites não são muros para separar, são pontes para proteger a sua energia. Pessoas que te amam vão respeitar o seu 'não'. Quem não respeita, é quem mais precisava ouvir." },
          { text: "Medo de parecer grosseiro ou entrar em conflito.", feedback: "Existe uma diferença entre ser agressivo e ser assertivo. Você pode dizer não com gentileza e firmeza ao mesmo tempo. Vamos treinar?" }
        ]
      },
      { 
        text: "Tente esta frase: 'Agradeço o convite/pedido, mas no momento não consigo assumir mais este compromisso'. Como soa para você?", 
        options: [
          { text: "Soa educado e libertador.", feedback: "Perfeito! Você não deu uma desculpa, deu um fato. Você é o gestor do seu tempo e da sua saúde mental." },
          { text: "Sinto que ainda precisaria dar uma explicação longa.", feedback: "Explicações longas parecem pedidos de desculpas por ter um limite. 'Não' é uma frase completa. Tente manter Curto, Claro e Gentil." }
        ]
      }
    ],
    conclusion: "Sua paz vale mais do que a aprovação de quem ultrapassa os seus limites. Pratique o 'não' como um ato de amor próprio."
  },
  "206": {
    title: "O Diário de Vitórias",
    objective: "Foco Positivo: Reabilitar o cérebro a notar progressos, por menores que sejam.",
    steps: [
      { 
        text: "Nossa mente é programada para focar no que falta. Vamos treinar o olhar para o que JÁ EXISTE. Qual foi a sua pequena vitória de hoje?", 
        options: [
          { text: "Fiz uma tarefa que estava adiando.", feedback: "Isso é excelente! Comemore o esforço, não apenas o resultado final. O sucesso é a soma dessas pequenas vitórias diárias." },
          { text: "Consegui lidar com uma emoção difícil.", feedback: "Essa é a maior vitória de todas! Regular-se emocionalmente é uma habilidade de elite. Você está se tornando um especialista em si mesmo." }
        ]
      },
      { 
        text: "À noite, antes de dormir, tente listar 3 coisas que deram certo. Não precisam ser grandes coisas. Pode ser um café gostoso ou uma conversa boa. Topa o desafio?", 
        options: [
          { text: "Vou tentar fazer isso hoje.", feedback: "Com o tempo, seu cérebro vai começar a 'procurar' essas vitórias durante o dia para ter o que anotar. Isso muda a química da sua felicidade." },
          { text: "Minha vida está muito difícil para ver vitórias.", feedback: "Entendo. Nesses dias, a sua vitória é 'Eu sobrevivi a um dia difícil'. Isso por si só já demonstra uma força imensa." }
        ]
      }
    ],
    conclusion: "Você concluiu o módulo de Autoconfiança! Você agora tem a base para se aceitar, se defender e se valorizar. Você é a sua melhor aliança."
  },

    conclusion: "Você concluiu o módulo de Autoconfiança! Você agora tem a base para se aceitar, se defender e se valorizar. Você é a sua melhor aliança."
  },

  // --------- 3. FOCO E CONCENTRAÇÃO ---------
  "301": {
    title: "A Economia da Atenção",
    objective: "Psicoeducação: Entender a atenção como um recurso finito e aprender a gerenciá-la.",
    steps: [
      { 
        text: "Sua atenção é o seu bem mais precioso, mas vivemos em um mundo feito para roubá-la. Onde você sente que mais 'perde' o seu foco?", 
        options: [
          { text: "Notificações de celular e redes sociais.", feedback: "As notificações geram pequenos picos de dopamina que viciam o cérebro em interrupções. Vamos aprender a 'limpar' esse ruído." },
          { text: "Interrupções de outras pessoas ou ambiente barulhento.", feedback: "O ambiente molda o comportamento. Se o ambiente é caótico, a mente reflete isso. Precisamos criar 'Santuários de Foco'." }
        ]
      },
      { 
        text: "Mudar de tarefa (multitasking) custa caro para o cérebro. Levamos até 20 minutos para voltar ao foco profundo após uma interrupção. Sabia disso?", 
        options: [
          { text: "Não fazia ideia que demorava tanto.", feedback: "Pois é! Se você olha o WhatsApp a cada 10 minutos, você nunca entra em estado de Flow. O segredo é o 'Bloco Único' de tarefa." },
          { text: "Eu sinto que sou produtivo fazendo várias coisas.", feedback: "Na verdade, você está apenas alternando rápido, o que gera cansaço mental dobrado. Vamos testar o poder de fazer UMA coisa por vez." }
        ]
      }
    ],
    conclusion: "Proteger sua atenção é um ato de respeito pelo seu tempo e sua inteligência. Escolha onde colocar sua luz hoje."
  },
  "302": {
    title: "Pomodoro Clínico",
    objective: "Técnica de Gestão de Tempo: Alternar foco intenso com descanso real para evitar fadiga.",
    steps: [
      { 
        text: "O cérebro é como um músculo: ele cansa após 25-50 minutos de esforço intenso. O Pomodoro sugere 25 min de foco e 5 min de pausa. Como você costuma fazer suas pausas?", 
        options: [
          { text: "Eu não faço pausas, sigo até exaurir.", feedback: "Isso gera o 'Burnout de Curto Prazo'. A sua qualidade cai drasticamente após a primeira hora sem descanso. Pausar é investir na próxima hora." },
          { text: "Eu descanso olhando o celular/notícias.", feedback: "Isso não é descanso, é 'consumo'. O cérebro continua processando informação. Pausa real é olhar para longe, levantar ou beber água." }
        ]
      },
      { 
        text: "Vamos testar o 'Sprint de Foco'? Defina uma tarefa pequena, coloque o cronômetro para 25 minutos e ignore o resto do mundo. Topa?", 
        options: [
          { text: "Vou testar agora mesmo.", feedback: "Ótimo. Quando o alarme tocar, levante-se. Não olhe para telas. Sinta o seu cérebro 'esfriar' antes da próxima rodada." },
          { text: "Acho que 25 minutos é pouco tempo.", feedback: "Se você estiver bem, pode fazer 50 minutos com 10 de pausa. O importante é o Ritmo: Tensão e Relaxamento." }
        ]
      }
    ],
    conclusion: "Produtividade não é sobre quanto você faz, mas sobre a qualidade da sua presença no que está fazendo."
  },
  "303": {
    title: "O Ritual do Ambiente",
    objective: "Controle de Estímulos: Configurar o ambiente físico para reduzir a carga cognitiva.",
    steps: [
      { 
        text: "Sua força de vontade é limitada. Se o celular está na mesa, você gasta energia NÃO olhando para ele. Onde está o seu celular agora?", 
        options: [
          { text: "Está aqui do meu lado, na mesa.", feedback: "Dica de ouro: Coloque-o em outro cômodo ou dentro de uma gaveta. Fora da visão, fora da mente. Economize sua vontade para o trabalho." },
          { text: "Está longe, em modo silencioso.", feedback: "Excelente! Você já configurou o 'Sucesso de Foco'. Note como a ansiedade de olhar para ele diminui quando ele não é visível." }
        ]
      }
    ],
    conclusion: "Não confie na sua disciplina, confie no seu design. Desenhe um ambiente onde o foco seja o caminho de menor resistência."
  },
  "304": {
    title: "Micro-Meditação de Ancoragem",
    objective: "Mindfulness: Exercício de 1 minuto para resetar a mente dispersa.",
    steps: [
      { 
        text: "Sua mente vai fugir, e está tudo bem. Meditar não é 'limpar a mente', é notar que ela fugiu e trazê-la de volta. Vamos tentar por 10 respirações?", 
        options: [
          { text: "Sim, vamos fechar os olhos.", feedback: "Apenas conte: 1 (puxa), 1 (solta)... até 10. Se perder a conta, comece de novo sem se julgar." },
          { text: "Sinto que não consigo ficar parado.", feedback: "Então foque apenas na sola dos seus pés tocando o chão. Sinta o peso do seu corpo. Isso é meditação de ancoragem." }
        ]
      }
    ],
    conclusion: "Atenção plena é um músculo. Cada vez que você volta para o agora, você fica mais forte."
  },
  "305": {
    title: "Entrando no Flow",
    objective: "Estado de Fluxo: Encontrar o equilíbrio entre desafio e habilidade.",
    steps: [
      { 
        text: "O 'Flow' acontece quando a tarefa é difícil o suficiente para engajar, mas não tão difícil que te desespere. O que você vai fazer agora está em qual nível?", 
        options: [
          { text: "Está muito fácil, estou entediado.", feedback: "Dica: Aumente o desafio! Tente fazer mais rápido ou com mais qualidade técnica. Transforme em um jogo." },
          { text: "Está muito difícil, estou ansioso.", feedback: "Dica: Quebre em pedaços menores. Peça ajuda ou estude a base primeiro. Reduza a pressão." }
        ]
      }
    ],
    conclusion: "O Flow é onde o tempo desaparece e a excelência acontece. Encontre o seu equilíbrio."
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
  "402": {
    title: "A Técnica da Âncora Social",
    objective: "Regulação Emocional: Usar o contato visual seletivo para reduzir a ansiedade social.",
    steps: [
      { 
        text: "Olhar para uma multidão de rostos pode ser opressor. O segredo é achar 'âncoras' amigáveis. Quem você procura na plateia?", 
        options: [
          { text: "Procuro alguém que esteja sorrindo ou balançando a cabeça.", feedback: "Excelente! Foque nessas 2 ou 3 pessoas. Fale 'para elas'. O seu cérebro vai entender que você está em uma conversa amigável, não em um julgamento." },
          { text: "Tento não olhar para ninguém, olho para o fundo.", feedback: "Olhar para o fundo pode te desconectar e fazer você parecer robótico. Tente olhar para a 'testa' das pessoas se o olho for demais. Eles acharão que você está olhando nos olhos!" }
        ]
      }
    ],
    conclusion: "O público não é um monstro de mil cabeças, é apenas um grupo de indivíduos que quer que você vá bem (para eles não ficarem entediados!)."
  },
  "403": {
    title: "Linguagem Corporal de Poder",
    objective: "Feedback Bio-comportamental: Usar a postura para alterar a química interna (cortisol vs testosterona).",
    steps: [
      { 
        text: "Seu corpo fala com a plateia, mas também fala com o seu próprio cérebro. Posturas encolhidas aumentam o cortisol (estresse). Vamos testar a 'Posição de Poder'?", 
        options: [
          { text: "Como eu faço essa posição?", feedback: "Fique em pé, mãos nos quadris, ombros para trás e queixo levemente erguido. Segure por 2 minutos. Isso engana o cérebro a se sentir mais confiante." },
          { text: "Sinto-me bobo fazendo isso.", feedback: "Pode parecer bobo, mas os hormônios não mentem. Faça isso no banheiro antes de entrar. Saia de lá sentindo-se um gigante." }
        ]
      }
    ],
    conclusion: "Não espere se sentir confiante para agir com confiança. Aja com confiança e o sentimento virá atrás."
  },
    conclusion: "O silêncio é onde a sua mensagem cria raízes na mente dos outros. Não tenha medo dele: domine-o."
  },

  // --------- 5. BURNOUT E ESTRESSE ---------
  "501": {
    title: "Sinais de Alerta",
    objective: "Psicoeducação: Identificar os estágios do esgotamento antes do colapso total.",
    steps: [
      { 
        text: "O Burnout não acontece da noite para o dia. É uma erosão lenta. Você sente que está 'correndo no vazio' ultimamente?", 
        options: [
          { text: "Sim, me sinto exausto mesmo após dormir.", feedback: "Isso é 'Exaustão Emocional'. Quando o sono não restaura, o problema não é físico, é a carga mental que não desliga. Precisamos de 'Pausas Cognitivas'." },
          { text: "Sinto que nada do que eu faço importa mais.", feedback: "Isso é 'Despersonalização' ou cinismo. É uma defesa do cérebro para parar de sofrer com a pressão. Vamos resgatar o seu propósito aos poucos." }
        ]
      }
    ],
    conclusion: "Reconhecer que você chegou ao limite não é fraqueza, é inteligência estratégica. O primeiro passo da cura é a pausa."
  },
  "502": {
    title: "O Ciclo do Estresse",
    objective: "Biologia do Estresse: Completar o ciclo fisiológico para sinalizar segurança ao corpo.",
    steps: [
      { 
        text: "Lidar com o estressor (o problema) é diferente de lidar com o estresse (a química no corpo). O seu corpo ainda está em modo 'Luta ou Fuga'?", 
        options: [
          { text: "Sim, sinto o corpo tenso e alerta.", feedback: "Para fechar o ciclo, o corpo precisa de movimento. 10 agachamentos, um abraço longo ou uma corrida curta dizem ao cérebro: 'Saímos do perigo'." },
          { text: "Não, me sinto apenas 'desconectado'.", feedback: "Isso pode ser o estado de 'Congelamento'. Tente respirações profundas e lentas para reativar o sistema parassimpático com gentileza." }
        ]
      }
    ],
    conclusion: "Não leve o estresse do trabalho para o travesseiro. Feche o ciclo físico antes de tentar descansar a mente."
  },
  "503": {
    title: "Autocompaixão no Trabalho",
    objective: "TCC: Substituir a auto-exigência crítica por um diálogo interno funcional.",
    steps: [
      { 
        text: "Você se sente culpado quando não está sendo produtivo?", 
        options: [
          { text: "Sim, sinto que estou ficando para trás.", feedback: "Essa culpa é o combustível do Burnout. Lembre-se: Descanso é parte do trabalho. Sem recarga, não há entrega." },
          { text: "Tento não sentir, mas a pressão é grande.", feedback: "A pressão externa é real, mas a interna é opcional. Tente ser o seu 'chefe compassivo' por um dia. O que ele diria?" }
        ]
      }
    ],
    conclusion: "Você é um ser humano, não um recurso humano. Trate-se com a dignidade que você merece."
  },
  "504": {
    title: "Desconexão Digital",
    objective: "Saneamento Mental: Criar limites claros entre vida online e offline.",
    steps: [
      { 
        text: "As notificações de trabalho após o horário impedem o cérebro de entrar em 'Modo Recuperação'. Você checa e-mails à noite?", 
        options: [
          { text: "Sim, sempre 'só uma olhadinha'.", feedback: "Essa olhadinha ativa o córtex pré-frontal e bloqueia a melatonina. Defina um horário de 'Morte Digital' às 20h ou 21h." },
          { text: "Não, eu desligo tudo.", feedback: "Excelente! Você está protegendo a sua sanidade. O mundo não vai acabar se você responder apenas amanhã de manhã." }
        ]
      }
    ],
    conclusion: "O direito de estar offline é o luxo mais necessário da era moderna. Recupere o seu tempo."
  },
  "505": {
    title: "Reavaliando Valores",
    objective: "ACT (Terapia de Aceitação e Compromisso): Alinhar ações diárias com o que realmente importa.",
    steps: [
      { 
        text: "Muitas vezes o Burnout vem de trabalhar muito em algo que não acreditamos. Se o dinheiro não fosse o foco, o que te daria satisfação hoje?", 
        options: [
          { text: "Ajudar pessoas ou criar algo novo.", feedback: "Isso mostra um valor de 'Contribuição'. Tente injetar 10% disso no seu trabalho atual ou hobby. Isso protege contra o vazio." },
          { text: "Ter mais tempo para minha família/hobbies.", feedback: "Seu valor é 'Conexão'. O trabalho é o meio, não o fim. Não sacrifique o destino (família) pela jornada (carreira)." }
        ]
      }
    ],
    conclusion: "Trabalhar com sentido é o melhor antídoto para o cansaço da alma."
  },
  "506": {
    title: "Recuperação Ativa",
    objective: "Fisiologia da Recuperação: Entender que lazer não é 'não fazer nada'.",
    steps: [
      { 
        text: "Existem 7 tipos de descanso. Qual você mais precisa hoje: Físico, Mental, Social, Criativo, Emocional, Espiritual ou Sensorial?", 
        options: [
          { text: "Mental e Sensorial (silêncio e sem telas).", feedback: "Vá para um lugar sem luz artificial e sem barulho. Deixe o cérebro 'desfragmentar' os dados do dia." },
          { text: "Criativo (ver algo belo, sem pressão).", feedback: "Leia um livro, ouça música ou observe a natureza. Alimente a alma sem esperar nenhum resultado produtivo." }
        ]
      }
    ],
    conclusion: "Descanse antes de estar exausto. A prevenção é muito mais curta que a cura."
  },
  "507": {
    title: "Plano de Sustentabilidade",
    objective: "Prevenção: Criar um 'Contrato de Bem-Estar' consigo mesmo.",
    steps: [
      { 
        text: "Para não voltar ao ciclo do esgotamento, precisamos de 'Não-Negociáveis'. Qual será o seu?", 
        options: [
          { text: "Não trabalhar nos finais de semana.", feedback: "Ótimo! Bloqueie isso na agenda. É o seu tempo sagrado de reconstrução celular e mental." },
          { text: "Fazer uma atividade física 3x por semana.", feedback: "O exercício limpa o cortisol e aumenta a resiliência nervosa. É o seu seguro de vida contra o estresse." }
        ]
      }
    ],
    conclusion: "Você concluiu o módulo de Burnout! Você agora tem as ferramentas para apagar o incêndio e reconstruir sua casa com materiais mais resistentes."
  },

  // --------- 6. SONO E DESCANSO ---------
  "601": {
    title: "Higiene do Sono 101",
    objective: "Regulação Circadiana: Ajustar os gatilhos biológicos para a indução natural do sono.",
    steps: [
      { 
        text: "O seu quarto é um santuário ou um escritório? Existem telas ou luzes acesas nele?", 
        options: [
          { text: "Uso o celular na cama até pegar no sono.", feedback: "A luz azul engana o cérebro fazendo-o pensar que é dia. Tente ler um livro físico ou ouvir um podcast calmo em luz baixa." },
          { text: "Meu quarto é escuro e fresco.", feedback: "Perfeito! O corpo precisa de uma queda de temperatura e escuridão total para liberar melatonina de qualidade." }
        ]
      }
    ],
    conclusion: "O sono começa 2 horas antes de você fechar os olhos. Prepare o caminho."
  },
  "602": {
    title: "A Técnica do 'Brain Dump'",
    objective: "TCC: Descarregar preocupações no papel para evitar a insônia ansiosa.",
    steps: [
      { 
        text: "Você deita e a sua mente começa a fazer a lista de tarefas de amanhã?", 
        options: [
          { text: "Sim, perco o sono planejando tudo.", feedback: "Técnica: Escreva tudo em um papel 'fora' do quarto. Diga ao cérebro: 'Está anotado, não precisamos mais lembrar disso agora'." },
          { text: "Fico remoendo coisas que aconteceram hoje.", feedback: "Use o diário de gratidão ou vitórias (que vimos antes). Substitua o 'E se...' por 'O que foi bom'." }
        ]
      }
    ],
    conclusion: "Seu cérebro é uma máquina de processamento, não de armazenamento. Esvazie o cache antes de desligar."
  },
  "603": {
    title: "Relaxamento Progressivo",
    objective: "Técnica de Jacobson: Reduzir a tensão muscular para sinalizar relaxamento ao SNC.",
    steps: [
      { 
        text: "Muitas vezes não percebemos o quanto o corpo está tenso. Vamos tentar? Contraia os dedos dos pés com força por 5 segundos e solte.", 
        options: [
          { text: "Senti um alívio imediato ao soltar.", feedback: "Agora faça o mesmo com as panturrilhas, coxas, abdômen e ombros. Suba até o rosto. O relaxamento físico força o mental." },
          { text: "Acho que já estou relaxado.", feedback: "Tente focar na sua mandíbula. Ela está travada? Solte-a. Frequentemente guardamos tensão nos dentes sem notar." }
        ]
      }
    ],
    conclusion: "Um corpo relaxado é o convite mais irresistível para um sono profundo."
  },
  "604": {
    title: "A Regra dos 20 Minutos",
    objective: "Controle de Estímulo: Quebrar a associação negativa entre cama e insônia.",
    steps: [
      { 
        text: "Se você estiver na cama há mais de 20 minutos sem sono, o que você faz?", 
        options: [
          { text: "Fico rolando de um lado para o outro.", feedback: "Erro comum! Isso treina o cérebro a associar a cama com frustração. Levante-se, vá para outro lugar no escuro, e só volte quando o sono vier." },
          { text: "Levanto e vou fazer algo calmo.", feedback: "Exato! Leia algo chato ou ouça música suave. Deixe o 'impulso de sono' carregar novamente fora da cama." }
        ]
      }
    ],
    conclusion: "A cama deve ser um lugar de apenas duas coisas: sono e intimidade. Proteja essa associação."
  },
  "605": {
    title: "Meditação das Nuvens",
    objective: "Desfusão Cognitiva: Observar pensamentos sem se engajar neles à noite.",
    steps: [
      { 
        text: " Imagine que seus pensamentos são nuvens passando no céu. Você não precisa subir em nenhuma delas.     conclusion: "Você concluiu o módulo de Sono! Que suas noites sejam portos seguros e seus dias repletos de vitalidade renovada."
  },

  // --------- 7. RELACIONAMENTOS (CNV) ---------
  "701": {
    title: "Observação vs Julgamento",
    objective: "CNV (Comunicação Não-Violenta): Aprender a descrever fatos sem adicionar rótulos ou críticas.",
    steps: [
      { 
        text: "Muitas brigas começam porque julgamos em vez de observar. Qual frase soa menos agressiva para você?", 
        options: [
          { text: "'Você é uma pessoa desatenta e nunca me ouve'.", feedback: "Isso é um Julgamento Moralizador. Ele faz o outro se defender e atacar de volta. A comunicação trava aqui." },
          { text: "'Notei que você olhou o celular enquanto eu falava'.", feedback: "Isso é uma Observação Pura. É um fato irrefutável. É muito mais difícil brigar com um fato do que com um insulto." }
        ]
      }
    ],
    conclusion: "A observação é o terreno neutro onde a comunicação pode florescer. Comece pelo que aconteceu, não pelo que você achou."
  },
  "702": {
    title: "Expressando Sentimentos",
    objective: "CNV: Conectar-se com a vulnerabilidade para facilitar a empatia.",
    steps: [
      { 
        text: "Dizer 'Eu me sinto ignorado' parece um sentimento, mas na verdade é um julgamento sobre o outro. Sente a diferença para 'Eu me sinto triste'?", 
        options: [
          { text: "Parece mais difícil dizer 'estou triste'.", feedback: "Sim, porque nos deixa vulneráveis. Mas a vulnerabilidade é o que gera conexão real. Tente nomear a emoção básica." },
          { text: "Entendi, vou focar no que EU sinto por dentro.", feedback: "Perfeito! Quando você fala da sua dor, ninguém pode dizer que você está 'errado'. O seu sentimento é legítimo." }
        ]
      }
    ],
    conclusion: "Sentimentos são bússolas. Quando você os compartilha com clareza, você convida o outro a entrar no seu mundo."
  },
  "703": {
    title: "Pedidos Assertivos",
    objective: "CNV: Transformar reclamações em solicitações claras e realizáveis.",
    steps: [
      { 
        text: "Em vez de dizer 'Quero que você me respeite', o que seria um pedido concreto e positivo?", 
        options: [
          { text: "'Gostaria que você me deixasse terminar de falar sem me interromper'.", feedback: "Exato! Isso é realizável e específico. O outro agora sabe exatamente o que fazer para te agradar." },
          { text: "'Quero que você seja mais carinhoso'.", feedback: "Isso ainda é vago. O que é 'ser carinhoso' para você? Pode ser um abraço ao chegar ou uma mensagem de bom dia. Seja específico!" }
        ]
      }
    ],
    conclusion: "Quem não pede com clareza, recebe qualquer coisa. Dê ao outro o mapa para chegar ao seu coração."
  },
  "704": {
    title: "A Escuta Atenta",
    objective: "Empatia: Ouvir para entender, não para responder.",
    steps: [
      { 
        text: "Quando alguém te conta um problema, qual o seu primeiro impulso?", 
        options: [
          { text: "Dar um conselho ou solução logo de cara.", feedback: "Apesar da boa intenção, isso pode invalidar o sentimento. Muitas vezes a pessoa só quer ser ouvida. Tente dizer: 'Parece que isso foi difícil para você'." },
          { text: "Contar uma história parecida que aconteceu comigo.", feedback: "Cuidado com a 'competição de dor'. Traga o foco de volta para o outro. Deixe-o terminar de esvaziar o peito antes de falar de você." }
        ]
      }
    ],
    conclusion: "Ouvir é um presente. Às vezes, o seu silêncio empático é a cura que o outro precisava."
  },
  "705": {
    title: "Limites em Relações",
    objective: "DBT: Efetividade Interpessoal (DEAR MAN).",
    steps: [
      { 
        text: "Colocar um limite pode dar medo de perder a pessoa. Mas qual o custo de NÃO colocar o limite?", 
        options: [
          { text: "O custo é eu me sentir ressentido e infeliz.", feedback: "E o ressentimento destrói a relação de dentro para fora. Um limite claro hoje salva a relação amanhã. Seja firme no pedido e gentil na forma." },
          { text: "Tenho medo de brigar e a pessoa ir embora.", feedback: "Pessoas que vão embora porque você tem limites não eram seguras para você. Quem te valoriza, respeita as suas bordas." }
        ]
      }
    ],
    conclusion: "Relacionamentos saudáveis são construídos com 'sins' sinceros e 'nãos' respeitados. Você completou o módulo de Relações!"
  },

  // --------- 8. COMPORTAMENTOS ---------
  "801": {
    title: "O Medo da Procrastinação",
    objective: "TCC: Entender que procrastinar é sobre regulação emocional, não sobre preguiça.",
    steps: [
      { 
        text: "Por que você acha que adia aquela tarefa difícil?", 
        options: [
          { text: "Porque sou preguiçoso ou desorganizado.", feedback: "Mito! Procrastinamos o que nos dá medo, tédio ou insegurança. É uma fuga emocional da tarefa, não falta de vontade." },
          { text: "Tenho medo de não fazer bem feito (perfeccionismo).", feedback: "Bingo! O perfeccionismo é o pai da procrastinação. Se não posso ser perfeito, prefiro nem começar. Vamos quebrar esse ciclo." }
        ]
      }
    ],
    conclusion: "A tarefa não é o problema, é a sua relação emocional com ela. Vamos torná-la menos assustadora."
  },
  "802": {
    title: "A Regra dos 2 Minutos",
    objective: "Mudança de Hábito: Vencer a inércia com metas ridiculamente fáceis.",
    steps: [
      { 
        text: "O cérebro odeia mudanças grandes. Se você quiser meditar 20 minutos, comece prometendo 2 minutos. Topa?", 
        options: [
          { text: "Sim, 2 minutos parece fácil demais.", feedback: "Essa é a ideia! Quando é 'fácil demais', a resistência some. Uma vez que você começou, é muito mais provável que continue." },
          { text: "Acho que 2 minutos não faz diferença.", feedback: "No resultado imediato não, mas no HÁBITO faz toda a diferença. Treine o seu cérebro a APENAS COMEÇAR." }
        ]
      }
    ],
    conclusion: "Feito é melhor que perfeito. E começado é melhor que planejado."
  },
  "803": {
    title: "Perfeccionismo vs Excelência",
    objective: "TCC: Diferenciar o padrão saudável da auto-punição excessiva.",
    steps: [
      { 
        text: "O Perfeccionista foca no que falta. O Excelente foca no que pode ser melhorado. Onde você está?", 
        options: [
          { text: "Estou sempre focado no erro, nunca estou satisfeito.", feedback: "Isso é Perfeccionismo Mal-adaptativo. Ele te paralisa e retira o prazer da conquista. Tente a meta dos '80%': entregue o que é bom, não o impossível." },
          { text: "Busco fazer o meu melhor, mas aceito falhas.", feedback: "Isso é Busca por Excelência. É um motor potente de crescimento sem o chicote da culpa. Continue assim!" }
        ]
      }
    ],
    conclusion: "A perfeição é uma miragem que te impede de caminhar. A excelência é o passo que você dá hoje."
  },
  "804": {
    title: "O Poder do Reforço",
    objective: "Behaviorismo: Recompensar pequenos passos para manter a motivação.",
    steps: [
      { 
        text: "Você se parabeniza quando consegue fazer o que planejou?", 
        options: [
          { text: "Não, só sinto que fiz minha obrigação.", feedback: "Isso é um erro biológico! Sem recompensa (dopamina), o cérebro deixa de querer repetir o esforço. Diga a si mesmo: 'Bom trabalho' toda vez que terminar algo." },
          { text: "Sim, tento me dar um pequeno prêmio.", feedback: "Excelente! Um café, 5 minutos de descanso ou apenas um 'check' na lista são reforços poderosos. Vicie o seu cérebro em progresso." }
        ]
      }
    ],
    conclusion: "Seja o seu maior incentivador. Você concluiu o módulo de Comportamentos e finalizou toda a Biblioteca Clínica Luna! O mundo é o seu laboratório agora."
  }
};
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
