export const CBT_EXPERT_DATA: Record<string, any> = {
  // --------- 1. ANSIEDADE ---------
  "101": {
    title: "Entendendo o Alarme",
    objective: "Descobrir por que o corpo entra no modo de emergência sem motivo.",
    steps: [
      { 
        text: "Oi! Que bom que você está aqui. Respire fundo. Vamos conversar sobre aquela sensação de que algo ruim vai acontecer. Como você se sente quando a ansiedade chega?", 
        options: [
          { text: "Sinto que vou perder o controle.", feedback: "Esse medo é super comum! O seu cérebro aciona um alarme de incêndio falso. Ele quer te proteger, mas se enganou. Vamos desarmar esse alarme juntos." },
          { text: "Sinto aperto no peito ou falta de ar.", feedback: "Seu corpo está se preparando para correr de um perigo que não existe. É só adrenalina, nada de ruim vai te acontecer de verdade." },
          { text: "Meus pensamentos não param.", feedback: "Sua mente está tentando prever problemas para te manter seguro. Vamos aprender a acalmar esse falatório." }
        ]
      },
      { 
        text: "A ansiedade é como um alarme de segurança sensível demais. Antigamente, ele servia para fugir de leões. Hoje, ele toca por causa de e-mails ou conversas difíceis.", 
        options: [
          { text: "Meu cérebro está me enganando?", feedback: "Sim! Ele é apenas um cérebro superprotetor. A gente precisa mostrar para ele que você está em segurança agora." },
          { text: "Mas o medo parece muito real.", feedback: "A sensação no corpo é real, mas o perigo não é. É como um filme de terror: você se assusta, mas o monstro não pode te pegar." }
        ]
      },
      { 
        text: "Da próxima vez que o alarme tocar, tente dizer pra si mesmo: 'É só o meu cérebro sendo superprotetor. Eu estou seguro agora'. Acha que consegue?", 
        options: [
          { text: "Vou tentar falar isso comigo mesmo.", feedback: "Boa! Repetir isso em voz baixa ajuda muito. O cérebro ouve e aos poucos diminui o volume do alarme." },
          { text: "Na hora do desespero é difícil lembrar.", feedback: "Anota essa frase no celular! Quando a crise vier, é só ler. Ter um lembrete pronto é uma mão na roda." }
        ]
      }
    ],
    conclusion: "O primeiro passo é separar quem você é do que o seu corpo sente. O alarme pode tocar alto, mas você está no comando."
  },
  "102": {
    title: "Acalmando o Corpo",
    objective: "Usar a respiração para avisar o cérebro que está tudo bem.",
    steps: [
      { 
        text: "Quando a ansiedade está forte, não adianta tentar 'pensar positivo'. O corpo está no comando. Você já tentou respirar e sentiu que não ajudou?", 
        options: [
          { text: "Sim, parece que fico mais nervoso.", feedback: "Isso acontece quando tentamos respirar rápido demais. O segredo está em soltar o ar bem devagar, como se estivesse soprando uma vela sem apagar." },
          { text: "Acho difícil focar na respiração.", feedback: "Vamos fazer juntos. O foco não é o ar entrando, mas o ar saindo. Soltar o ar relaxa o coração na hora." }
        ]
      },
      { 
        text: "Vamos fazer um teste? Puxe o ar por 4 segundos e solte pela boca como um fio de fumaça por 6 segundos. Tente agora.", 
        options: [
          { text: "Consegui soltar devagar.", feedback: "Perfeito! Isso manda uma mensagem direta pro seu coração bater mais devagar. É um calmante natural." },
          { text: "Me senti um pouco melhor.", feedback: "Excelente. Repetir isso três vezes é o suficiente para o seu cérebro entender que o perigo sumiu." }
        ]
      },
      { 
        text: "Agora você tem uma ferramenta portátil. Quando sentir a ansiedade subindo, faça 3 ciclos dessa respiração antes de qualquer coisa. Vai praticar?", 
        options: [
          { text: "Vou usar isso no trabalho ou estudo.", feedback: "Boa! Ninguém percebe que você está fazendo e o efeito é imediato. É o seu calmante invisível." },
          { text: "Tenho medo de não funcionar na hora H.", feedback: "Quanto mais você treina em momentos calmos, mais automático fica na crise. Pratique todo dia ao acordar." }
        ]
      }
    ],
    conclusion: "Seu corpo é sua âncora. Quando a mente acelerar, use os pulmões para frear."
  },
  "103": {
    title: "Desafiando os Medos",
    objective: "Aprender a não acreditar em tudo o que a mente diz.",
    steps: [
      { 
        text: "Às vezes a mente cria histórias terríveis sobre o futuro. Qual desses pensamentos você ouve mais?", 
        options: [
          { text: "'Algo vai dar errado e eu vou passar vergonha.'", feedback: "Sua mente está tentando te proteger do pior, mas ela está exagerando. Nem tudo o que pensamos é verdade." },
          { text: "'Eu não vou dar conta de nada.'", feedback: "Esse pensamento ignora tudo o que você já superou até hoje. Você é mais forte do que a sua ansiedade diz." }
        ]
      },
      { 
        text: "Se esses medos fossem levados a um juiz, quais provas REAIS você teria de que o pior vai acontecer agora?", 
        options: [
          { text: "Na verdade, não tenho provas, é só um sentimento.", feedback: "Exato! Sentimento não é fato. Se não tem prova, a gente pode deixar esse pensamento ir embora e focar no agora." },
          { text: "Já deu errado antes, então vai dar de novo.", feedback: "Só porque algo falhou uma vez, não quer dizer que o destino está selado. Hoje é um novo dia e você tem novas ferramentas." }
        ]
      },
      { 
        text: "Toda vez que um pensamento assustador aparecer, pergunte: 'Isso é um fato ou uma suposição?'. Essa pergunta simples muda tudo.", 
        options: [
          { text: "Acho que a maioria dos meus medos são suposições.", feedback: "Exatamente! E suposições não merecem controlar a sua vida. Questione sempre antes de acreditar." },
          { text: "Mas alguns medos são reais.", feedback: "Sim, e pra esses, a gente age. Mas os medos imaginários? Esses a gente deixa passar como nuvens no céu." }
        ]
      }
    ],
    conclusion: "Inocentado! Se o medo não tem provas, ele não merece roubar a sua paz."
  },
  "104": {
    title: "Dividindo a Culpa",
    objective: "Parar de achar que tudo o que dá errado é sua responsabilidade.",
    steps: [
      { 
        text: "Quando algo sai do planejado, você costuma assumir 100% da culpa?", 
        options: [
          { text: "Sim, sinto que eu devia ter previsto.", feedback: "Isso é um peso enorme! Vamos dividir essa 'pizza' da culpa. Outras pessoas, o acaso e o cansaço também têm fatias nisso." },
          { text: "Tento ver o que os outros fizeram também.", feedback: "Ótimo. Ver a situação como um todo ajuda a tirar o peso dos seus ombros." }
        ]
      },
      { 
        text: "Imagina uma pizza de responsabilidades. Se você der 30% pra sua parte, quem fica com o resto? Talvez o tempo curto, a falta de informação, ou outra pessoa envolvida?", 
        options: [
          { text: "Nossa, minha fatia fica bem menor assim.", feedback: "Exatamente! Quando a gente olha os fatos de verdade, o peso nos ombros diminui bastante." },
          { text: "Ainda me sinto mal pelo que aconteceu.", feedback: "Assumir a sua parte é bom, mas carregar a fatia dos outros só te impede de seguir em frente. Devolva o que não é seu." }
        ]
      },
      { 
        text: "Da próxima vez que algo der errado, tenta fazer esse exercício: anote no celular o que aconteceu e liste todas as pessoas e fatores envolvidos. Consegue fazer isso?", 
        options: [
          { text: "Vou tentar anotar da próxima vez.", feedback: "Boa! Colocar no papel tira o peso da cabeça e te mostra que raramente a culpa é só sua." },
          { text: "Acho que vou perceber que muita coisa foge do meu controle.", feedback: "Com certeza! E perceber isso é libertador. Você não precisa carregar o mundo nas costas." }
        ]
      }
    ],
    conclusion: "Você não é o centro de todos os problemas. Aprenda a ser mais gentil consigo mesmo."
  },
    "105": {
    title: "Vencendo Medos",
    objective: "Como superar medos dando pequenos passos.",
    steps: [
      {
        text: "Evitar o que nos dá medo traz alívio na hora, mas só faz a ansiedade aumentar a longo prazo. O segredo é ir aos poucos. Qual é o seu maior desafio?",
        options: [
          { text: "Falar em público.", feedback: "Legal! Não vamos começar com um discurso. Seu primeiro passo pode ser algo bem simples, como cumprimentar sorrindo o caixa da padaria." },
          { text: "Lidar com lugares fechados.", feedback: "Vamos no seu ritmo! O nível 1 pode ser apenas imaginar a cena ou sentar rápido num carro desligado." },
          { text: "Medo gigantesco de falhar.", feedback: "O terror de errar gera procrastinação. O primeiro degrau vai ser começar uma tarefa chata por apenas 5 minutos." }
        ]
      },
      {
        text: "Imagine a sua jornada como uma escada. A regra de ouro é: não pule para o Degrau 2 se o Degrau 1 ainda te deixar muito ansioso. Faz sentido?",
        options: [
          { text: "Faz todo o sentido.", feedback: "Exato! Você controla a própria velocidade. A gente só aperta o passo quando a base estiver firme e segura." },
          { text: "E se a ansiedade num nível fácil não passar?", feedback: "Com a repetição o cérebro nota que aquela ação não tem perigo algum mais." }
        ]
      },
      {
        text: "Qual vai ser o seu Degrau 1 essa semana? Algo bem simples e baixo risco que você consegue fazer hoje.",
        options: [
          { text: "Vou escolher algo pequeno pra começar.", feedback: "Perfeito! Lembre: o objetivo não é não sentir medo, é sentir o medo e fazer assim mesmo. Vai ficar mais fácil." },
          { text: "Ainda não sei qual seria.", feedback: "Pode ser algo simples: mandar uma mensagem pra alguém, sair de casa 5 minutos, ou levantar a mão na aula. Começa por aí!" }
        ]
      }
    ],
    conclusion: "Ir aos poucos garante que você consiga crescer."
  },
  "106": {
    title: "Pausa dos 5 Sentidos",
    objective: "Voltar para o presente e sair da mente acelerada usando os sentidos.",
    steps: [
      {
        text: "Na crise, a ansiedade viaja rumo ao futuro prevendo problemas. Para te puxar de volta pro agora, ache perto de você 5 coisas e, de olhos abertos, diga a cor de cada uma.",
        options: [
          { text: "Achei algumas cores de tampas ou objetos.", feedback: "Aí sim! Forçar a visão a narrar coisas tira energia dos pensamentos negativos." },
          { text: "Acho chato focar em coisas banais.", feedback: "O segredo não é o que você vê, mas tirar a sua atenção da mente acelerada. É como um remédio rápido pro foco." }
        ]
      },
      {
        text: "E pelo tato, encontre 4 coisas diferentes. Uma bem lisa, outra bem áspera ou macia. Como você se sente ao focar na textura delas?",
        options: [
          { text: "Senti minha roupa e a temperatura da mesa...", feedback: "Muito bom! Prestar atenção no toque joga uma âncora pro cérebro se sentir no chão e seguro." },
          { text: "Isso ajuda a não ficar agitado.", feedback: "Sim! Concentre a energia no toque para frear o nervosismo." }
        ]
      },
      {
        text: "Agora feche os olhos e escute 3 sons diferentes ao seu redor. Pode ser o vento, um relógio, o barulho da rua. O que ouviu?",
        options: [
          { text: "Consegui ouvir sons que nem tinha percebido.", feedback: "Isso é ótimo! Quando você foca nos sons, a mente para de criar histórias de medo. Use isso sempre que precisar." },
          { text: "Achei difícil me concentrar.", feedback: "Normal! A mente está acostumada a correr. Com prática, você vai conseguir se ancorar em segundos." }
        ]
      }
    ],
    conclusion: "Foque nos detalhes físicos para desligar a tela mental agitada."
  },
  "107": {
    title: "Tática de Choque Frio",
    objective: "Como usar choques térmicos para parar uma crise de pânico.",
    steps: [
      {
        text: "Para picos muito altos de ansiedade e pânico, pensar não ajuda. Você precisa usar o corpo! Experimente jogar água bem gelada no seu rosto inteiro. Faria isso?",
        options: [
          { text: "Acho radical demais.", feedback: "A água fria obriga seu coração a bater mais fraco instantaneamente, por pura reação biológica instintiva. Corta muito do susto na hora!" },
          { text: "Eu já lavo o rosto nessas horas.", feedback: "Você achou naturalmente um remédio físico super potente para as crises pesadas de suor e dores do baque." }
        ]
      },
      {
        text: "Fazer exercícios muito intensos também gasta a energia do desespero. Dar pulos rápidos ou correr sem sair do lugar por 1 minuto... Toparia pra acalmar logo e dormir sussa?",
        options: [
          { text: "Sim, cansar meu corpo vai descarregar a tensão.", feedback: "Ótima solução! Isso consome a adrenalina que ficou presa na sua musculatura tensa." },
          { text: "Eu só respiro longo.", feedback: "Respirar lento também funciona muito! Combine com a água fria pra um efeito ainda mais rápido." }
        ]
      },
      {
        text: "Monte o seu 'kit de emergência física': 1) Água gelada no rosto 2) 10 pulos rápidos 3) Respiração 4-6. Consegue memorizar esses 3 passos?",
        options: [
          { text: "Vou anotar no celular.", feedback: "Boa! Ter isso salvo é como ter um extintor de incêndio emocional sempre à mão." },
          { text: "Vou tentar lembrar.", feedback: "Se puder, anota. Na hora da crise, a memória falha. O papel ou o celular lembra por você." }
        ]
      }
    ],
    conclusion: "Use o corpo a seu favor nas crises. Movimento e frio são seus aliados."
  },
  "108": {
    title: "Lista Salva Vidas",
    objective: "Preparar um kit de emergência emocional pro dia difícil.",
    steps: [
      {
        text: "No meio de uma crise forte, a gente esquece tudo o que aprendeu. É por isso que precisamos de uma 'cola' pronta. Você já tem algo anotado pra essas horas?",
        options: [
          { text: "Não tenho nada preparado.", feedback: "Vamos criar agora! Anota no celular 3 frases: 'Solte o ar devagar', 'Olhe para 5 cores na sala', 'Água gelada no rosto'." },
          { text: "Tenho algumas coisas na cabeça, mas nunca anotei.", feedback: "Anotar é o segredo. Na hora do pânico, a cabeça trava. Ter isso na tela do celular salva." }
        ]
      },
      {
        text: "Além das técnicas, ter o contato de alguém de confiança faz uma diferença enorme. Quem você ligaria numa hora de desespero?",
        options: [
          { text: "Tenho um amigo ou familiar que me escuta.", feedback: "Ótimo! Coloque o número dessa pessoa em acesso rápido. Só saber que ela está lá já acalma." },
          { text: "Não tenho ninguém pra ligar.", feedback: "Tá tudo bem. O CVV (188) funciona 24h e é gratuito. Você nunca está sozinho de verdade." }
        ]
      },
      {
        text: "Agora monta a sua lista final. Pode ser um bloco de notas no celular com: 3 técnicas de emergência + 1 contato de confiança + 1 frase que te acalma. Consegue fazer isso agora?",
        options: [
          { text: "Vou montar agora mesmo!", feedback: "Perfeito! Essa lista vai ser sua âncora nos dias mais pesados. Você está se cuidando." },
          { text: "Vou fazer mais tarde com calma.", feedback: "Combinado! Mas não deixe pra muito depois. Ter isso pronto antes da próxima crise é o que importa." }
        ]
      }
    ],
    conclusion: "Sua cola da calma está pronta. Quando o pânico bater, você não precisa pensar, só ler e seguir."
  },


  // --------- 2. AUTOCONFIANÇA ---------
  "201": {
    title: "Você não é o seu erro",
    objective: "Parar de se chicotear quando algo dá errado.",
    steps: [
      { 
        text: "Sabe quando você comete um errinho e parece que o mundo acabou? Sua confiança vai lá pro chão. O que mais te faz sentir assim?", 
        options: [
          { text: "Falhar em alguma tarefa importante.", feedback: "Você deve estar achando que seu valor depende de sempre acertar. Mas errar é apenas humano, não define quem você é." },
          { text: "Receber uma crítica ou ser ignorado.", feedback: "Dói, eu sei. Mas a opinião dos outros é apenas um ponto de vista, não é a verdade absoluta sobre você." }
        ]
      },
      { 
        text: "Se um amigo muito querido cometesse o mesmo erro que você, você daria uma bronca nele ou um abraço?", 
        options: [
          { text: "Daria um abraço e diria que está tudo bem.", feedback: "Então! Por que você é tão duro consigo mesmo? Vamos tentar ser o seu próprio melhor amigo hoje." },
          { text: "Eu cobraria o acerto, mas com carinho.", feedback: "Isso é bom, mas lembre-se: a gente aprende muito mais quando se perdoa do que quando se culpa." }
        ]
      },
      { 
        text: "Desafio: da próxima vez que errar, em vez de se xingar, diga: 'Eu errei, mas isso não me define. O que eu posso aprender com isso?'", 
        options: [
          { text: "Vou tentar trocar a bronca por aprendizado.", feedback: "Boa! Essa mudança de pensamento é pequena, mas transforma a forma como você se sente." },
          { text: "É difícil não me culpar.", feedback: "Eu sei que é. Mas cada vez que você se trata com gentileza, está quebrando um ciclo antigo. Vai ficando mais fácil." }
        ]
      }
    ],
    conclusion: "O seu valor não muda só porque você errou. Você continua sendo uma pessoa incrível."
  },
  "202": {
    title: "Seja Gentil com Você",
    objective: "Aprender a calar aquela voz chata que só critica.",
    steps: [
      { 
        text: "Sabe aquela voz na cabeça que vive dizendo que você não é bom o suficiente? Qual é o xingamento favorito dela?", 
        options: [
          { text: "'Você nunca vai conseguir nada'.", feedback: "Essa voz está mentindo! Ela é apenas um hábito antigo de cobrança. Vamos trocar esse disco." },
          { text: "'Todo mundo está te julgando'.", feedback: "Ninguém está te vigiando tanto quanto você mesmo. As pessoas estão preocupadas com os problemas delas." }
        ]
      },
      { 
        text: "Em vez de concordar com essa crítica, vamos criar um 'incentivador' interno. O que você diria para se animar hoje?", 
        options: [
          { text: "Eu diria que já venci desafios parecidos antes.", feedback: "Isso mesmo! Olhe para trás e veja o quanto você já caminhou. Você é foda!" },
          { text: "Eu diria que errar hoje me ensina a acertar amanhã.", feedback: "Essa é a mentalidade certa. O erro é apenas um feedback, não um destino final." }
        ]
      },
      { 
        text: "Toda vez que a voz crítica aparecer, imagine que ela é um rádio velho. Você não precisa ouvir. Pode abaixar o volume ou trocar de estação. O que funciona melhor pra você?", 
        options: [
          { text: "Prefiro abaixar o volume e ignorar.", feedback: "Perfeito! Com o tempo, essa voz vai ficando mais fraca. Você está no controle do rádio." },
          { text: "Quero trocar pra uma estação mais positiva.", feedback: "Boa! Troque por frases como 'Eu sou capaz' ou 'Eu já passei por coisas piores'. Mude a programação!" }
        ]
      }
    ],
    conclusion: "Abaixe o volume das críticas e aumente o som do seu próprio incentivo."
  },
  "203": {
    title: "Ninguém Repara Tanto Assim",
    objective: "Parar de achar que todo mundo está olhando para os seus erros.",
    steps: [
      { 
        text: "Você já sentiu que, se cometer uma gafe, todo mundo vai rir de você por semanas? Qual situação te dá mais vergonha?", 
        options: [
          { text: "Falar algo errado em uma reunião ou aula.", feedback: "A verdade é que as pessoas esquecem isso em 5 minutos. Elas estão ocupadas demais pensando nos próprios problemas." },
          { text: "Levar um 'não' ou ser rejeitado.", feedback: "Isso dói na hora, mas não é o fim. Um 'não' é apenas uma opinião de alguém, não um veredito sobre quem você é." }
        ]
      },
      { 
        text: "Faz um teste mental: lembra de alguma gafe que outra pessoa cometeu na semana passada? Provavelmente não, né?", 
        options: [
          { text: "Realmente, não lembro de nada.", feedback: "Pois é! Se você não lembra das gafes dos outros, eles também não lembram das suas. Respira aliviado." },
          { text: "Lembro de uma coisa, mas nem liguei muito.", feedback: "Viu? Se você nem ligou pro erro do outro, imagina os outros com o seu. Ninguém está te vigiando." }
        ]
      },
      { 
        text: "A partir de agora, quando sentir que todo mundo te julgou, pergunte a si mesmo: 'Daqui a uma semana, alguém vai lembrar disso?' A resposta quase sempre é não.", 
        options: [
          { text: "Isso me ajuda a relativizar bastante.", feedback: "Boa! Esse filtro é poderoso. Se ninguém vai lembrar, não vale a pena sofrer por isso agora." },
          { text: "Mas e se eu lembrar?", feedback: "Você lembra porque é a sua história. Os outros têm as histórias deles. Seja leve consigo." }
        ]
      }
    ],
    conclusion: "Tire o peso dos olhos dos outros. Viva para você, não para a plateia imaginária."
  },
  "204": {
    title: "Você Merece Estar Aqui",
    objective: "Combater a sensação de que você é uma farsa.",
    steps: [
      { 
        text: "Sabe aquela sensação de que você só teve 'sorte' e que logo vão descobrir que você não sabe de nada? Você sente isso às vezes?", 
        options: [
          { text: "Sim, parece que enganei todo mundo até agora.", feedback: "Sorte pode ajudar no começo, mas é o seu esforço que te mantém no lugar. Você não enganou ninguém." },
          { text: "Acho que qualquer um faria o que eu faço.", feedback: "Não é verdade. Você tem seu jeito único e suas habilidades. Pare de diminuir as suas vitórias." }
        ]
      },
      { 
        text: "Vamos fazer um exercício rápido: me conta 3 coisas que você conquistou com esforço próprio. Pode ser qualquer coisa, desde passar numa prova até aprender algo novo.", 
        options: [
          { text: "Consigo pensar em algumas coisas sim.", feedback: "Viu? Nenhuma dessas coisas caiu do céu. Você estudou, tentou e conquistou. Isso é mérito seu." },
          { text: "Tenho dificuldade de reconhecer minhas conquistas.", feedback: "Isso é muito comum em quem se cobra demais. Comece por coisas pequenas: levantar todo dia e tentar já conta." }
        ]
      },
      { 
        text: "Quando aquela voz disser 'você é uma fraude', responda assim: 'Eu estou aqui porque mereci. Se não soubesse nada, já teriam percebido'. Consegue fazer isso?", 
        options: [
          { text: "Vou tentar lembrar dessa frase.", feedback: "Ótimo! Repita isso sempre que a dúvida bater. Com o tempo, você vai acreditar de verdade." },
          { text: "É difícil acreditar nisso agora.", feedback: "Tá tudo bem. A confiança se constrói aos poucos. O importante é parar de se sabotar com pensamentos falsos." }
        ]
      }
    ],
    conclusion: "Você não é uma fraude. Suas conquistas são frutos do seu suor, não de um acaso."
  },
  "205": {
    title: "Aprenda a Dizer Não",
    objective: "Como colocar limites sem se sentir culpado.",
    steps: [
      { 
        text: "Você costuma aceitar tudo só para não chatear os outros, mesmo quando está exausto?", 
        options: [
          { text: "Sim, tenho medo de que fiquem bravos comigo.", feedback: "Dizer 'não' para os outros é dizer 'sim' para a sua saúde mental. Quem gosta de você de verdade vai entender." },
          { text: "Sinto que é minha obrigação estar sempre disponível.", feedback: "Seu valor não vem de ser 'útil' o tempo todo. Você tem o direito de descansar e cuidar de si." }
        ]
      },
      { 
        text: "Como você se imagina dizendo 'não' da próxima vez que alguém pedir algo que você não pode fazer?", 
        options: [
          { text: "Vou agradecer o convite, mas dizer que minha agenda está cheia.", feedback: "Perfeito! Ser educado e firme ao mesmo tempo é a chave. Ninguém precisa de desculpas enormes." },
          { text: "Vou ser direto e dizer que agora preciso focar no meu descanso.", feedback: "Excelente! Ser honesto sobre suas necessidades não é egoísmo, é autocuidado." }
        ]
      },
      { 
        text: "Lembra: cada 'não' que você dá para algo que te esgota é um 'sim' para algo que te faz bem. Qual 'sim' você ganharia se dissesse 'não' com mais frequência?", 
        options: [
          { text: "Teria mais tempo pra mim e pro que eu gosto.", feedback: "Isso! Proteger o seu tempo é proteger a sua energia. Você merece ter momentos só seus." },
          { text: "Dormiria mais e estaria menos irritado.", feedback: "Viu como um simples 'não' pode mudar a qualidade do seu dia inteiro? Comece aos poucos." }
        ]
      }
    ],
    conclusion: "Impor limites é um ato de amor próprio. Use o seu 'não' como um escudo para a sua paz."
  },
  "206": {
    title: "Comemorando as Vitórias",
    objective: "Aprender a focar no que deu certo para se sentir melhor.",
    steps: [
      { 
        text: "Nosso cérebro foi treinado desde as cavernas para focar nos perigos e no que dá ruim. É por isso que, no fim do dia, a gente tende a lembrar só do 1% que falhou e esquecer os 99% que deram super certo.", 
        options: [
          { text: "Sempre coloco o peso do dia no que eu não consegui terminar.", feedback: "Fazendo isso você desliga o seu sistema de recompensa e o cérebro fica viciado em ver só o estresse. Treine a sua mente para enxergar vitórias diárias." },
          { text: "Costumo focar no que os outros fizeram melhor do que eu.", feedback: "Quando olhamos muito para a jornada do outro, deixamos de reconhecer nossos pequenos progressos diários. A melhor comparação é com você mesmo ontem." },
          { text: "Ignoro as coisas boas que acontecem porque parecem insignificantes.", feedback: "Não espere grandes ventos para se sentir feliz! Celebrar os passos pequenos é o jeito mais fácil de nutrir seu cérebro com dopamina." }
        ]
      },
      { 
        text: "A solução simples é ter um ritual antes de dormir: reconhecer algo muito bom no dia, por mais bobo que pareça. Qual foi uma pequena vitória que você teve hoje ou ontem?", 
        options: [
          { text: "Continuei o dia sem desistir, mesmo depois que algo me desanimou.", feedback: "Perfeito! Celebrar essa resiliência muda a perspectiva geral de vida, fazendo você levantar amanhã mais leve e forte." },
          { text: "Consegui dizer não para algo que iria me desgastar.", feedback: "Uma vitória brilhante! Respeitar a própria paz mental exige muita coragem." },
          { text: "Fiz uma refeição boa e aproveitei uns minutinhos de conforto e paz.", feedback: "Parece básico e bobo, não é? Mas cuidar das necessidades básicas é um grande trunfo numa vida agitada." }
        ]
      },
      { 
        text: "Desafio: antes de dormir hoje, anote 3 coisas boas que aconteceram. Podem ser simples. O importante é treinar o cérebro a enxergar o positivo.", 
        options: [
          { text: "Vou começar a anotar hoje!", feedback: "Excelente! Em uma semana você já vai perceber a diferença na forma como se sente ao acordar." },
          { text: "Acho que não vou ter 3 coisas boas.", feedback: "Pode ser 'tomei um café gostoso', 'alguém sorriu pra mim', 'não choveu'. Começa pelo simples!" }
        ]
      }
    ],
    conclusion: "Parabéns por completar o módulo de Autoconfiança! Você aprendeu a ser o advogado do seu próprio valor, a desativar as cobranças, e a celebrar sua evolução."
  },

  // --------- 3. FOCO E CONCENTRAÇÃO ---------
    "301": {
    title: "Onde Fica seu Foco?",
    objective: "Proteger o seu tempo e a sua mente de distrações.",
    steps: [
      { 
        text: "Onde você mais sente que perde o seu foco durante o dia?", 
        options: [
          { text: "No celular e nas redes sociais.", feedback: "As redes são feitas para viciar. Vamos tentar deixar o celular em outro cômodo enquanto você precisa se concentrar." },
          { text: "Minha própria cabeça não para de viajar.", feedback: "Sua mente foge para o futuro tentando resolver tudo. Vamos aprender a trazê-la de volta para o agora." }
        ]
      },
      { 
        text: "Uma dica simples: antes de começar qualquer tarefa, defina em uma frase o que você quer terminar. Tipo: 'Vou ler 3 páginas'. Isso ajuda a mente a ter um alvo claro.", 
        options: [
          { text: "Faz sentido, eu nunca defino o que quero antes.", feedback: "Sem um alvo, a mente fica pulando de coisa em coisa. Com um objetivo simples, ela sabe pra onde ir." },
          { text: "Eu defino, mas me perco no meio do caminho.", feedback: "Quando isso acontecer, não se culpe. Só volte pro alvo original. É normal se perder, o importante é voltar." }
        ]
      },
      { 
        text: "Que tal testar isso agora? Escolha uma tarefa pequena que você precisa fazer hoje e defina em uma frase o que quer concluir.", 
        options: [
          { text: "Escolhi algo simples pra começar.", feedback: "Boa! Começar pequeno é a chave. Quando terminar, vai sentir uma satisfação enorme." },
          { text: "Não consigo pensar em nada agora.", feedback: "Tá tudo bem. Quando surgir a próxima tarefa, lembre dessa dica. Definir o alvo antes muda tudo." }
        ]
      }
    ],
    conclusion: "Cuidar do seu foco é cuidar da sua energia. Menos ruído, mais paz."
  },
  "302": {
    title: "Técnica Pomodoro",
    objective: "Técnica de Gestão de Cansaço para combater a fadiga mental.",
    steps: [
      { 
        text: "Nosso cérebro se cansa em estados de foco hiper-focado. Como todo músculo, ele precisa de 'descanso' entre picos de estresse. Como você faz pausas hoje?", 
        options: [
          { text: "Trabalho horas a fio e só paro quando não aguento mais.", feedback: "Isso te coloca em modo de 'Sobrevivência' e gera fadiga extrema. Pausar enquanto a energia ainda está boa é o real segredo para aguentar o dia todo." },
          { text: "Faço pequenas pausas olhando as redes sociais ou vendo notícias.", feedback: "As redes não são pausas de verdade, o cérebro continua processando muita informação. Pausa de verdade é fechar os olhos, levantar, beber água." },
          { text: "Normalmente esqueço de pausar.", feedback: "Esse engajamento contínuo pode parecer bom, mas é vilão na estafa a médio prazo. Vamos usar alarmes para tirar você da cadeira antes da dor nas costas chegar." }
        ]
      },
      { 
        text: "Topa um teste simples? O Pomodoro manda separar 25 minutos de total dedicação, seguidos de 5 minutos de pausa verdadeira (longe da tela). O que acha disso?", 
        options: [
          { text: "Vou testar agora mesmo, acho possível.", feedback: "Excelente! Quando a mente sabe que o esforço tem data e hora certa para terminar em poucos minutos, ela costuma não reclamar e mergulha direto ao trabalho." },
          { text: "25 minutos parece pouco pra pegar o ritmo.", feedback: "Tudo bem! Adapte para o que funcionar. Blocos de 50 minutos com 10 de pausa também servem, desde que a pausa te desconecte." },
          { text: "A ideia do cronômetro me dá aflição.", feedback: "O cronômetro não está te medindo, está protegendo o seu horário de descanso sagrado!" }
        ]
      },
      {
        text: "Que tal testar um Pomodoro agora? 25 minutos focado, depois 5 minutos de pausa real. Beba água, olhe pela janela, ande um pouco. Como foi?",
        options: [
          { text: "Consegui manter o foco nos 25 minutos!", feedback: "Excelente! Agora repita isso ao longo do dia com pausas entre os blocos. Sua produtividade vai disparar sem te exaurir." },
          { text: "Não consegui os 25 minutos inteiros.", feedback: "Tá tudo bem! Comece com 15 minutos e vá aumentando. O importante é criar o hábito da pausa programada." }
        ]
      }
    ],
    conclusion: "Você não é uma máquina. Produtividade saudável depende da qualidade do seu descanso."
  },
  "303": {
    title: "O Santuário de Foco",
    objective: "Reduzir o atrito e a carga cognitiva organizando um ambiente.",
    steps: [
      { 
        text: "Sua força de vontade cansa no meio do dia. Deixar o celular e outras distrações bem visíveis exige uma energia mental enorme para não olhar para eles. Onde fica seu celular enquanto estuda/trabalha?", 
        options: [
          { text: "Fica do meu lado e na minha visão, e ouço todas as notificações.", feedback: "Apenas resistir à vontade de checar o número crescendo consome aquela sua energia intelectual. Se não há barreiras físicas na tentação, focar vai ficar muito mais desgastante." },
          { text: "Até fecho tudo, mas a internet me puxa com facilidade nas abas.", feedback: "Dica de ouro: instale bloqueadores de certos sites por blocos de 2 horas. Limites aplicados por sistemas valem ouro frente à preguiça humana natural." },
          { text: "Fico no silencioso puro e bem longe da visão, em gavetas.", feedback: "Isso é perfeito! Quando você torna o esforço para ceder a um deslize algo 'caro' demais, a ação mais barata será voltar ao papel principal do foco saudável em andamento." }
        ]
      },
      { 
        text: "A sua própria mesa bagunçada no campo visual de foco puxa e rouba os neurônios para processar o lixo (e a culpa disso ser uma bagunça). Sentar em caos hoje é normal para você?", 
        options: [
          { text: "Me paralisa o medo vendo tudo do lado bagunçado e me culpa na desordem.", feedback: "O acúmulo desorienta. Limpe do campo de visão e recoloque à vista apenas uma tarefa específica, o caderno central e água. O cérebro limpo tem muito espaço no papel focado." },
          { text: "Não ligo pra bagunça, foco no que está na mão.", feedback: "Sua abstração mental te protege, mas uma limpeza rápida do campo de visão sempre revigora." },
          { text: "Arrumar tudo gasta tempo e dá preguiça.", feedback: "Não precisa limpar a casa toda! Arrume só o espaço de meio palmo na sua frente. Já alivia." }
        ]
      },
      {
        text: "Desafio: antes de começar a próxima tarefa, tire TUDO da mesa que não tem a ver com o que você vai fazer. Só deixe o essencial. Como ficou?",
        options: [
          { text: "A mesa ficou limpa e me senti mais leve.", feedback: "Viu? O cérebro respira quando não tem informação visual demais competindo pela atenção." },
          { text: "Não sabia o que era essencial.", feedback: "Regra simples: se não vai usar nos próximos 30 minutos, tira da vista. Pode colocar numa gaveta ou no chão." }
        ]
      }
    ],
    conclusion: "Seu ambiente molda seu foco. Menos bagunça visual, mais clareza mental."
  },
    "304": {
    title: "Mindfulness Descomplicado",
    objective: "Como fazer pausas curtas para voltar o foco ao presente.",
    steps: [
      {
        text: "Muitas pessoas acham que meditar é ficar uma hora em silêncio absoluto. Como você lida com a ideia de tentar apenas respirar por um minuto durante o dia agitado?",
        options: [
          { text: "Acho que sempre me enrolo ou esqueço com a correria.", feedback: "É muito comum! A mente não quer parar de pensar nos problemas. Tente colocar um alarme para apenas lembrar de suspirar rápido uma vez de tarde." },
          { text: "A ansiedade parece piorar quando fico quieto sem fazer nada.", feedback: "Se fechar o olho faz o pensamento piorar, não feche! Deixe os olhos abertos e fique reparando numa planta, no vento ou numa textura. Ajuda da mesma forma." }
        ]
      },
      {
        text: "Topa testar uma tática simples agora? Puxar o ar pelo nariz contando até 4, e assoprar contando devagar até 6. Sentiu alguma diferença no peito?",
        options: [
          { text: "Sim, soltar o ar devagar me deixou mais relaxado.", feedback: "Perfeito! Prolongar a saída do ar informa seu coração de que não existe perigo perto de você." },
          { text: "Senti falta de ar ou fiquei impaciente.", feedback: "Não tem problema. Cada organismo reage diferente. Com tempo, seu ritmo vai encaixar." }
        ]
      },
      {
        text: "Crie um 'gatilho de pausa': toda vez que pegar o copo d'água, faça uma respiração longa antes de beber. Assim você nunca esquece de pausar.",
        options: [
          { text: "Vou associar a água à respiração.", feedback: "Boa! Vincular a pausa a algo que você já faz automaticamente torna o hábito invisivel e poderoso." },
          { text: "Acho que vou esquecer.", feedback: "Coloca um post-it no copo ou garrafa com a frase 'respira'. Esse lembrete visual funciona muito bem!" }
        ]
      }
    ],
    conclusion: "A pausa precisa ser prática. O fôlego entre tarefas cansativas te salva de acabar a semana esgotado."
  },
  "305": {
    title: "Dividindo para Conquistar",
    objective: "Aprenda a focar quebrando pedras grandes em pequenos cascalhos.",
    steps: [
      {
        text: "Sabe aquela pilha gigante de trabalho que dá calafrios e ansiedade só de olhar? O seu instinto costuma ser adiar com o celular ou encarar de vez num sofrimento sem fim?",
        options: [
          { text: "Fujo bastante, deixo sempre a bomba armada pro fim do prazo.", feedback: "Uma boa tática é dividir o monstro. Fale pra si mesmo: 'Não vou fazer a tarefa toda agora, vou só abrir o arquivo e ler a primeira linha'." },
          { text: "Eu enfio a cara em tudo de uma vez até terminar.", feedback: "Tem muita força de vontade nisso! Mas o custo no corpo fica alto. Crie pausas para quebrar blocos longos." }
        ]
      },
      {
        text: "O truque é este: quebre a tarefa grande em 3 mini-tarefas. Por exemplo: em vez de 'fazer o trabalho inteiro', pense em '1) abrir o documento, 2) escrever o título, 3) fazer o primeiro parágrafo'. Consegue pensar assim?",
        options: [
          { text: "Sim, parece bem menos assustador assim.", feedback: "Exatamente! O cérebro trava com coisas grandes, mas aceita de boa as pequenas. É só ir somando as peças." },
          { text: "Tenho medo de perder o panorama geral.", feedback: "Pode ficar tranquilo. Você ainda sabe o destino final, só está escolhendo um caminho com menos ladeiras." }
        ]
      },
      {
        text: "Agora me diz: qual é aquela tarefa que você anda adiando? Tenta quebrar ela em 3 pedacinhos agora mesmo.",
        options: [
          { text: "Consegui dividir e já vou começar pelo primeiro.", feedback: "Perfeito! O primeiro pedaço é sempre o mais difícil. Depois dele, o resto flui." },
          { text: "Ainda parece muito.", feedback: "Então quebre mais! Se 3 partes parecem muito, faça 5 partes menores ainda. O tamanho ideal é aquele que não te assusta." }
        ]
      }
    ],
    conclusion: "Quando a tarefa parecer gigantesca, diminua o zoom e olhe só pro primeiro passo."
  },

  // --------- 4. FALAR EM PÚBLICO ---------
  "401": {
    title: "Conversar em Público",
    objective: "Perder o medo da plateia vendo as pessoas como amigos.",
    steps: [
      { 
        text: "Falar na frente de todos dá um frio na barriga, né? O que acontece primeiro com você?", 
        options: [
          { text: "Dá um branco total e esqueço tudo.", feedback: "Seu cérebro travou de nervoso. Respire fundo e lembre-se: ninguém ali sabe o seu roteiro, então se mudar uma palavra, ninguém vai notar." },
          { text: "Me sinto tremendo e com o coração acelerado.", feedback: "Seu corpo está cheio de energia. Em vez de lutar com isso, use essa força para falar com empolgação." }
        ]
      },
      { 
        text: "A meta não é ser um palestrante perfeito, é apenas passar uma informação. Isso te ajuda a relaxar?", 
        options: [
          { text: "Sim, tira o peso de ter que ser incrível.", feedback: "Exato! Ninguém espera perfeição. Eles só querem ouvir o que você tem a dizer." },
          { text: "Ainda fico ansioso, mas é um bom começo.", feedback: "Comece com conversas menores e vá aumentando aos poucos. Você vai ver que a plateia é feita de pessoas iguais a você." }
        ]
      },
      { 
        text: "Antes da próxima vez que precisar falar pra alguém, pratique falando sozinho em voz alta. Pode ser no espelho ou no banho. Já fez isso?", 
        options: [
          { text: "Sim, me ajuda a organizar as ideias.", feedback: "Exatamente! Falar em voz alta é como um ensaio. Quando a hora chegar, você já sabe o que dizer." },
          { text: "Acho estranho falar sozinho.", feedback: "É estranho só se alguém estiver olhando! No banho ninguém vê. E é o melhor treino que existe pra soltar a voz." }
        ]
      }
    ],
    conclusion: "Falar em público é apenas uma conversa em voz alta. Solte o peso do julgamento e conte a sua história."
  },
    "402": {
    title: "Respiração Antes do Palco",
    objective: "Aprender a respirar pela barriga para acalmar a voz.",
    steps: [
      { 
        text: "Pouca gente sabe que a voz tremida começa por causa do peito travado. Quando ficamos ansiosos, a gente prende a respiração na parte de cima. Você já notou isso?", 
        options: [
          { text: "Nunca percebi, mas minha garganta sempre fecha.", feedback: "A dica é focar em encher a barriga de ar, como se fosse um balão. Isso alivia a pressão na garganta e solta os ombros." },
          { text: "Sim, eu fico com a voz muito fina e curta.", feedback: "Tente encher a barriga antes de começar a falar. O ar profundo abaixa a aflição rapidamente." }
        ]
      },
      { 
        text: "Vamos treinar agora: coloque a mão na barriga. Puxe o ar pelo nariz e sinta a barriga empurrar sua mão pra frente. Depois solte devagar pela boca. Como foi?", 
        options: [
          { text: "Senti a barriga mexer, deu certo!", feedback: "Ótimo! Esse é o respiro correto. Faça isso 3 vezes antes de qualquer apresentação e sua voz vai sair mais firme." },
          { text: "Só o peito mexeu, não consegui.", feedback: "Tente deitar no chão e colocar um livro na barriga. O peso do livro te ajuda a sentir o movimento certo." }
        ]
      },
      { 
        text: "Dica de ouro: nos 30 segundos antes de começar a falar, faça 3 respirações longas pela barriga. Ninguém percebe e você começa muito mais calmo.", 
        options: [
          { text: "Vou usar isso na minha próxima apresentação.", feedback: "Boa! É um ritual simples que muda completamente como você se sente antes de falar." },
          { text: "E se eu esquecer na hora do nervoso?", feedback: "Anota no topo do seu roteiro: 'RESPIRAR'. Quando olhar pro papel, a primeira coisa que vai ver é o lembrete." }
        ]
      }
    ],
    conclusion: "Tire a pressão do seu peito e da sua garganta respirando fundo com a barriga. Sua voz sairá mais firme e você, mais calmo."
  },
  "403": {
    title: "Onde Focar o Olhar",
    objective: "Quebrar o nervosismo olhando para as pessoas certas.",
    steps: [
      { 
        text: "Quando você olha para a plateia inteira de uma vez, seu cérebro entende que é uma multidão te julgando. Como você lida com os olhares?", 
        options: [
          { text: "Fico muito assustado com tantas pessoas olhando.", feedback: "A melhor tática é não olhar para todos. Encontre um ou dois rostos amigáveis que estão sorrindo e apresente só para eles." },
          { text: "Olho pro chão ou pro fundo da sala.", feedback: "Se focar num colega sorridente na primeira fila, engana o cérebro, fazendo parecer uma conversa entre amigos." }
        ]
      },
      { 
        text: "Outra dica: divida a sala em 3 blocos (esquerda, centro, direita). Fale olhando pra um bloco de cada vez, como se fossem 3 conversas separadas.", 
        options: [
          { text: "Isso parece mais fácil do que encarar todo mundo.", feedback: "É muito mais fácil! O público acha que você está olhando pra todos, mas na verdade está focando em poucos." },
          { text: "Tenho vergonha de fazer contato visual.", feedback: "Comece olhando pra testa das pessoas. Elas acham que você está olhando nos olhos, mas você não está. Funciona demais!" }
        ]
      },
      { 
        text: "Na sua próxima apresentação, antes de começar, identifique 2 rostos amigáveis na plateia. Eles serão seus 'aliados' durante a fala.", 
        options: [
          { text: "Vou procurar quem está sorrindo.", feedback: "Perfeito! Essas pessoas já estão torcendo por você. Fale para elas e o nervosismo diminui muito." },
          { text: "E se ninguém estiver sorrindo?", feedback: "Sempre tem alguém neutro ou curioso. Escolha essa pessoa. Conforme você falar bem, os sorrisos vão aparecer." }
        ]
      }
    ],
    conclusion: "Faça contato visual apenas com quem está passando energia boa. Faça a palestra parecer uma conversa."
  },
  "404": {
    title: "Roteiro de Palavras-Chave",
    objective: "Aprender a usar tópicos em vez de decorar textos inteiros.",
    steps: [
      { 
        text: "Decorar o texto inteiro é uma armadilha. Se esquecer uma palavra, tudo desmorona. Você costuma memorizar frase por frase?", 
        options: [
          { text: "Sim, eu decoro tudo certinho.", feedback: "Tente trocar por palavras em tópicos. Leve um papel com 4 frases centrais pra guiar sua mente." },
          { text: "Eu faço resumos com os blocos da matéria.", feedback: "Excelente. Usar palavras-chave serve de âncora caso dê um branco. Você olha a palavra e lembra a história." }
        ]
      },
      { 
        text: "O formato ideal é: 1 cartão com no máximo 5 palavras-chave. Cada palavra representa um bloco da sua fala. Consegue montar isso pro seu próximo trabalho?", 
        options: [
          { text: "Vou tentar reduzir meu texto a 5 palavras.", feedback: "Boa! Menos é mais. Cada palavra te lembra um pedaço inteiro da apresentação." },
          { text: "Tenho medo de esquecer coisas importantes.", feedback: "As palavras-chave são gatilhos de memória. Quando você vê 'exemplo', lembra do caso que ia contar. Confie no processo." }
        ]
      },
      { 
        text: "Último passo: treine falando olhando só pro cartão de vez em quando, como quem dá uma espiadinha. Não leia, apenas use como guia. Como se sente com isso?", 
        options: [
          { text: "Me sinto mais seguro tendo algo na mão.", feedback: "O cartão é sua rede de segurança. Só de saber que ele está lá, você relaxa e fala melhor." },
          { text: "Prefiro não levar nada.", feedback: "Tudo bem! Mas leva ele no bolso. Se der branco, você sabe que tem um plano B." }
        ]
      }
    ],
    conclusion: "Use lembretes visuais ao invés de decorar textos. Apresentar não é recitar poesia, é conversar."
  },  // --------- 5. BURNOUT E ESTRESSE ---------
  "501": {
    title: "Sinais de Alerta",
    objective: "Reconhecer que o cansaço pode ser mental, e não apenas físico.",
    steps: [
      { 
        text: "O esgotamento mental não acontece da noite para o dia. Sabe aquela sensação de dormir e acordar cansado?", 
        options: [
          { text: "Sim, meu sono não recarrega mais.", feedback: "Quando o sono não ajuda, o cansaço não é muscular. A sua mente não está conseguindo desligar dos problemas." },
          { text: "Sinto falta de vontade de trabalhar.", feedback: "Isso é o cérebro puxando um freio de emergência para você parar de se desgastar." }
        ]
      },
      { 
        text: "Outros sinais são: irritação fácil, dor de cabeça frequente e sentir que nada vale a pena. Você percebe algum desses?", 
        options: [
          { text: "Ando muito irritado com coisas pequenas.", feedback: "A irritação é um grito do corpo pedindo descanso. Não é falta de paciência, é excesso de carga." },
          { text: "Me sinto vazio, como se estivesse no automático.", feedback: "Esse desligamento emocional é o corpo se protegendo. Ele para de sentir pra aguentar o peso." }
        ]
      },
      { 
        text: "O primeiro passo é aceitar: 'Estou cansado e preciso parar'. Você consegue dizer isso sem se sentir culpado?", 
        options: [
          { text: "Consigo, mas me sinto fraco.", feedback: "Reconhecer o cansaço é a coisa mais corajosa que existe. Fraco é quem ignora até cair." },
          { text: "Tenho medo de parecer preguiçoso.", feedback: "Preguiça é não querer fazer. Burnout é não conseguir mais. São coisas muito diferentes." }
        ]
      }
    ],
    conclusion: "Assumir que a bateria zerou não é fraqueza. É ter controle da situação."
  },
  "502": {
    title: "Fechando o Ciclo do Estresse",
    objective: "Como ensinar o corpo a se sentir seguro depois do trabalho.",
    steps: [
      { 
        text: "Resolvemos um problema, mas o corpo continua tenso. Você sente os ombros duros ao deitar no sofá?", 
        options: [
          { text: "Sim, meu corpo não relaxa.", feedback: "Dê um movimento para o corpo. Dar pulinhos ou alongar manda um sinal de que o dia acabou." },
          { text: "Eu deito e fico olhando o teto.", feedback: "Se exercitar levemente e focar na respiração ajuda a bateria a voltar." }
        ]
      },
      { 
        text: "Uma dica simples: ao chegar em casa, troque de roupa. Esse ritual avisa ao cérebro que o trabalho ficou pra trás. Você faz isso?", 
        options: [
          { text: "Nunca pensei nisso, mas faz sentido.", feedback: "Sim! Pequenos rituais de transição separam o 'modo trabalho' do 'modo descanso'. Tente hoje." },
          { text: "Já faço isso e realmente ajuda.", feedback: "Ótimo! Você já descobriu que o corpo precisa de um sinal claro pra desligar." }
        ]
      },
      { 
        text: "Outra opção é mexer o corpo por 5 minutos ao chegar em casa: pular, dançar ou alongar. Isso gasta a energia do estresse que ficou presa nos músculos.", 
        options: [
          { text: "Vou tentar dançar uma música.", feedback: "Boa ideia! Dançar libera energia boa e ainda coloca um sorriso no rosto." },
          { text: "Prefiro alongar no silêncio.", feedback: "Perfeito! O alongamento solta cada nó de tensão guardado no seu corpo." }
        ]
      }
    ],
    conclusion: "Não leve a tensão para o quarto. Faça o corpo se mover e avisar ao cérebro que a jornada acabou."
  },
  "503": {
    title: "Cobranças",
    objective: "Reduzir o excesso de autocobrança.",
    steps: [
      { 
        text: "Quando a sua produtividade cai, a primeira coisa que vem à cabeça é culpa?", 
        options: [
          { text: "Sim, sinto que deveria produzir sempre.", feedback: "A culpa não gera energia. Sem pausas, você não tem forças para trabalhar amanhã." },
          { text: "Tento não pensar nisso, mas foco no erro.", feedback: "Diga a si mesmo que está tudo bem fazer menos em dias ruins." }
        ]
      },
      { 
        text: "Imagina que um amigo te dissesse: 'Estou exausto, não consigo trabalhar hoje'. O que você diria pra ele?", 
        options: [
          { text: "Diria pra descansar sem culpa.", feedback: "Então por que você não diz isso pra si mesmo? Você merece a mesma gentileza que dá pros outros." },
          { text: "Diria pra ele fazer só o essencial.", feedback: "Exatamente! Aplique essa sabedoria em você: nos dias difíceis, faça só o mínimo e se perdoe." }
        ]
      },
      { 
        text: "Hoje, escolha UMA coisa para NÃO fazer. Dê a si mesmo permissão oficial de deixar algo pra amanhã. Consegue?", 
        options: [
          { text: "Vou tirar uma coisa da lista sem culpa.", feedback: "Isso é autocuidado! A lista nunca acaba, mas a sua energia sim. Priorize-se." },
          { text: "É difícil, mas vou tentar.", feedback: "O primeiro passo é o mais difícil. Amanhã vai ser mais fácil. Você está aprendendo." }
        ]
      }
    ],
    conclusion: "Seja educado com seus limites reais. Descansar é produtivo."
  },
  "504": {
    title: "A Arte de Desconectar",
    objective: "Colocar limites no uso do celular para trabalho.",
    steps: [
      { 
        text: "Ler mensagens do trabalho à noite impede você de relaxar?", 
        options: [
          { text: "Sempre dou uma olhada nas notificações.", feedback: "A luz do celular lendo pendências tira o sono. Desligue os alertas de trabalho." },
          { text: "Aprendi a desligar tudo.", feedback: "Excelente hábito. O ambiente de trabalho espera até a manhã." }
        ]
      },
      { 
        text: "Que tal definir um horário fixo pra parar de olhar o celular de trabalho? Tipo: 'Depois das 20h, o trabalho não existe'. Consegue fazer isso?", 
        options: [
          { text: "Meu chefe manda mensagem a qualquer hora.", feedback: "Se não for uma emergência real, pode esperar. Coloque o celular no silencioso e responda de manhã." },
          { text: "Já faço isso e minha noite é muito melhor.", feedback: "Parabéns! Esse limite é um dos mais importantes para a saúde mental." }
        ]
      },
      { 
        text: "Dica prática: crie um 'ritual de desligamento'. Pode ser fechar o notebook, tomar um chá ou trocar de roupa. Algo que diga: 'Acabou por hoje'.", 
        options: [
          { text: "Gostei da ideia do chá.", feedback: "Boa! O chá vira um sinal pro corpo de que o trabalho terminou. Crie essa associação." },
          { text: "Vou tentar fechar tudo num horário fixo.", feedback: "Excelente! A constância cria o hábito. Em uma semana, seu corpo já vai entender o recado." }
        ]
      }
    ],
    conclusion: "O fim de semana só começa de verdade quando você fecha as abas do projeto."
  },
  "505": {
    title: "Sentido Além do Trabalho",
    objective: "Investir tempo em atividades de lazer.",
    steps: [
      { 
        text: "O esgotamento acontece quando fazemos as tarefas sem ver propósito. Além de contas, o que te motiva?", 
        options: [
          { text: "Gosto de estar com pessoas em atividades práticas.", feedback: "Resgatar atividades pessoais no meio da semana protege a mente da rotina." },
          { text: "Ler ou caminhar longe da rotina.", feedback: "Ter esses blocos de descanso é essencial. Mantenha isso." }
        ]
      },
      { 
        text: "Quando foi a última vez que você fez algo só pelo prazer de fazer, sem obrigação nenhuma?", 
        options: [
          { text: "Faz tempo que não faço nada assim.", feedback: "Isso é um sinal de alerta. Agenda um momento essa semana só pra você, nem que seja 15 minutos." },
          { text: "Consigo encaixar alguma coisa nos fins de semana.", feedback: "Ótimo! Tente trazer um pouco disso pro meio da semana também. Não espere o sábado pra viver." }
        ]
      },
      { 
        text: "Escolha agora: qual atividade prazerosa você vai fazer nessa semana? Pode ser simples: ouvir música, cozinhar, passear.", 
        options: [
          { text: "Vou separar um tempo pra isso.", feedback: "Perfeito! Coloque no calendário como se fosse uma reunião importante. Porque é." },
          { text: "Não tenho tempo nem pra respirar.", feedback: "Se você não parar por escolha, seu corpo vai parar por necessidade. 15 minutos já fazem diferença." }
        ]
      }
    ],
    conclusion: "Mantenha passatempos que você aprecia apenas pelo prazer de fazer."
  },
  "506": {
    title: "Tipos de Descanso",
    objective: "Descobrir que existem diferentes formas de recarregar.",
    steps: [
      { 
        text: "Existem descansos físicos e mentais. Qual deles você sente mais falta?", 
        options: [
          { text: "Mental. Preciso de menos ruído.", feedback: "Procure ficar poucos minutos em total silêncio, longe de eletrônicos." },
          { text: "Descanso solto sem ter horas marcadas.", feedback: "Escutar músicas conhecidas ajuda a mente a se acalmar." }
        ]
      },
      { 
        text: "Nem todo descanso é igual. Às vezes assistir TV cansa mais do que descansa. O que realmente te recarrega?", 
        options: [
          { text: "Ficar sozinho em silêncio.", feedback: "Você precisa de descanso sensorial. Tire uns minutos por dia sem estímulos e sinta a diferença." },
          { text: "Conversar com alguém que eu gosto.", feedback: "Você recarrega com conexão! Priorize encontros leves com pessoas que te fazem bem." }
        ]
      },
      { 
        text: "Que tal testar um 'micro-descanso' agora? Feche os olhos por 60 segundos e não faça nada. Só respire. Como ficou?", 
        options: [
          { text: "Me senti um pouco melhor.", feedback: "Imagina fazer isso 3 vezes por dia! Esses micro-descansos evitam que você chegue ao fim do dia destruído." },
          { text: "Achei difícil parar.", feedback: "É normal no começo. Sua mente está viciada em fazer coisas. Com prática, vai ficar mais fácil." }
        ]
      }
    ],
    conclusion: "Aprenda a descansar durante o dia, não deixe a bateria esgotar 100%."
  },
  "507": {
    title: "Criando Regras",
    objective: "Fazer acordos de horários para a saúde mental.",
    steps: [
      { 
        text: "Qual regra inegociável você vai adotar pra proteger sua paz a partir de hoje?", 
        options: [
          { text: "Não falar de trabalho durante refeições.", feedback: "Ótima decisão. Esse limite separa a tensão do momento de descanso." },
          { text: "Me movimentar 10 minutos longe da tela.", feedback: "Ótima decisão. O exercício tira os bloqueios mentais da cadeira." }
        ]
      },
      { 
        text: "Agora pense: qual é o horário do dia em que você mais precisa dessa pausa? De manhã, à tarde ou à noite?", 
        options: [
          { text: "À tarde, quando o cansaço bate forte.", feedback: "Perfeito! Coloque um alarme pra te lembrar de parar. A tarde é quando o corpo mais precisa de recarregar." },
          { text: "À noite, antes de dormir.", feedback: "Boa! Uma pausa noturna ajuda a separar o dia do sono. Tente criar um ritual de transição." }
        ]
      },
      { 
        text: "Última etapa: conte pra alguém sobre a sua nova regra. Quando a gente fala em voz alta, o compromisso fica mais real.", 
        options: [
          { text: "Vou contar pra alguém de confiança.", feedback: "Excelente! Ter alguém que sabe da sua regra te ajuda a manter o compromisso." },
          { text: "Prefiro manter pra mim.", feedback: "Tudo bem! O importante é que VOCÊ leve isso a sério. Anota no celular como lembrete." }
        ]
      }
    ],
    conclusion: "Respeite as pausas do seu dia. Elas são inegociáveis."
  },

  // --------- 6. SONO E DESCANSO ---------
  "601": {
    title: "O Quarto Ideal",
    objective: "Entender que o espaço de dormir deve focar apenas no sono.",
    steps: [
      { 
        text: "Seu quarto virou escritório, cinema e restaurante ao mesmo tempo? Você usa o celular na cama antes de dormir?", 
        options: [
          { text: "Sim, fico rolando o celular até pegar no sono.", feedback: "A luz da tela engana o cérebro e ele acha que ainda é de dia. Por isso o sono demora a chegar." },
          { text: "Deixo o quarto escuro e sem eletrônicos.", feedback: "Excelente! Quando o quarto é só pra dormir, o cérebro associa aquele espaço ao descanso." }
        ]
      },
      { 
        text: "Uma regra simples: a cama é só pra dormir. Se você trabalha, come ou assiste TV na cama, o cérebro fica confuso sobre o que fazer ali.", 
        options: [
          { text: "Eu faço de tudo na cama mesmo.", feedback: "Tente mudar isso aos poucos. Comece tirando o notebook da cama. Só essa mudança já faz diferença no sono." },
          { text: "Já tento separar os espaços.", feedback: "Ótimo! Manter essa separação é um dos hábitos mais poderosos para dormir bem." }
        ]
      },
      { 
        text: "Dica prática pra essa noite: 30 minutos antes de deitar, desligue todas as telas. Leia algo leve ou apenas fique no escuro. Consegue testar hoje?", 
        options: [
          { text: "Vou tentar desligar o celular mais cedo.", feedback: "Boa! Você vai perceber que o sono chega mais rápido quando o cérebro tem tempo de 'desligar'." },
          { text: "Vai ser difícil, mas vou tentar.", feedback: "O primeiro dia é o mais difícil. Coloque o celular pra carregar longe da cama. Assim, a tentação diminui." }
        ]
      }
    ],
    conclusion: "Transforme seu quarto num santuário do sono. Telas desligadas, luz baixa, paz total."
  },
  "602": {
    title: "Lista de Preocupações",
    objective: "Anotar o que falta fazer para dormir sem o cérebro ficando de plantão.",
    steps: [
      { 
        text: "Quando você deita, a lista de tarefas do dia seguinte começa a rodar na sua cabeça?", 
        options: [
          { text: "Sim, fico lembrando de tudo que preciso fazer.", feedback: "Anote tudo num papel ou no celular antes de deitar. Quando está escrito, o cérebro entende que pode relaxar." },
          { text: "Fico pensando nos erros do dia.", feedback: "Tente anotar também uma coisa boa que aconteceu. Isso equilibra a balança e ajuda a dormir mais leve." }
        ]
      },
      { 
        text: "O truque é fazer uma 'descarga mental': pegue um papel e escreva TUDO que está na sua cabeça. Sem filtro, sem organização. Apenas jogue pra fora.", 
        options: [
          { text: "Parece simples o suficiente.", feedback: "E é! Depois de escrever, feche o caderno e diga pra si mesmo: 'Isso fica aqui, amanhã eu resolvo'." },
          { text: "Tenho medo de esquecer as coisas importantes.", feedback: "Justamente por isso você anota! O papel lembra por você. Sua mente pode descansar em paz." }
        ]
      },
      { 
        text: "Que tal criar um ritual? Toda noite, 15 minutos antes de deitar, faça a descarga mental. Com o tempo, o cérebro já vai saber que é hora de desligar.", 
        options: [
          { text: "Vou experimentar essa noite.", feedback: "Perfeito! Você vai dormir muito mais rápido quando a cabeça estiver vazia." },
          { text: "Tenho preguiça de escrever toda noite.", feedback: "Pode ser no celular, em áudio ou em 3 palavras-chave. O formato não importa, o que importa é esvaziar a mente." }
        ]
      }
    ],
    conclusion: "Guarde as preocupações no papel e durma com a mente leve."
  },
  "603": {
    title: "Relaxamento dos Músculos",
    objective: "Aprender a soltar a tensão do corpo antes de dormir.",
    steps: [
      { 
        text: "Sabe aquela sensação de ir deitar e perceber que o corpo inteiro está duro? A gente carrega tensão sem perceber. Onde você sente mais?", 
        options: [
          { text: "Na nuca e nos ombros.", feedback: "São os campeões de tensão! Eles ficam contraídos o dia inteiro. Vamos aprender a soltá-los." },
          { text: "Na mandíbula, fico apertando os dentes.", feedback: "Muita gente range os dentes sem perceber. A mandíbula guarda estresse o dia inteiro." }
        ]
      },
      { 
        text: "Vamos testar: feche a mão com força por 3 segundos... agora solte devagar. Sentiu a diferença entre o tenso e o relaxado?", 
        options: [
          { text: "Sim, senti os músculos soltarem!", feedback: "Isso mesmo! Contrair primeiro e depois soltar é o jeito mais rápido de relaxar qualquer parte do corpo." },
          { text: "Senti um pouquinho de diferença.", feedback: "Com prática, a diferença fica mais clara. Tente fazer com os ombros: levante até a orelha, segure, e solte." }
        ]
      },
      { 
        text: "Agora faça uma varredura: comece pelos pés, contraia por 3 segundos e solte. Suba pelas pernas, barriga, peito, mãos, ombros e rosto. Como ficou?", 
        options: [
          { text: "Me sinto muito mais leve!", feedback: "Esse é o poder do relaxamento progressivo. Faça isso toda noite antes de dormir e o sono vai vir mais rápido." },
          { text: "Achei longo demais.", feedback: "Pode fazer a versão rápida: só ombros, mãos e rosto. Em 2 minutos você já sente a diferença." }
        ]
      }
    ],
    conclusion: "Relaxar o corpo é dar permissão pro sono chegar. Solte a tensão antes de deitar."
  },
  "604": {
    title: "Quando o Sono Não Vem",
    objective: "O que fazer quando você deita e não consegue dormir.",
    steps: [
      { 
        text: "Se faz mais de 30 minutos que você está deitado e não dormiu, o que costuma fazer?", 
        options: [
          { text: "Fico rolando na cama esperando o sono.", feedback: "Ficar na cama acordado treina o cérebro a associar a cama com insônia. O melhor é sair e voltar quando sentir sono." },
          { text: "Pego o celular pra passar o tempo.", feedback: "A tela do celular espanta o sono ainda mais. Tente algo sem luz: respirar fundo ou ouvir algo calmo." }
        ]
      },
      { 
        text: "A regra dos 20 minutos: se em 20 minutos não dormiu, levante, vá pra outro cômodo e faça algo chato e monótono. Quando o sono voltar, volte pra cama.", 
        options: [
          { text: "Nunca pensei em sair da cama.", feedback: "Parece estranho, mas funciona! A cama precisa ser associada ao sono. Se você fica lá acordado, ela vira um lugar de ansiedade." },
          { text: "O que eu faria fora da cama?", feedback: "Coisas chatas: folhear uma revista velha, organizar uma gaveta, ou sentar no escuro. O tédio chama o sono." }
        ]
      },
      { 
        text: "Outra técnica: quando deitar, faça a contagem regressiva de 300 até 0, bem devagar. Se perder a conta, recomece. Isso cansa a mente de um jeito bom.", 
        options: [
          { text: "Vou testar essa noite.", feedback: "Boa! A maioria das pessoas dorme antes de chegar no 200. A mente se entedia e desliga." },
          { text: "Tenho medo de ficar mais ansioso contando.", feedback: "Se contar te estressa, tente imaginar uma cena calma e repetitiva: ondas do mar, chuva no telhado, folhas caindo." }
        ]
      }
    ],
    conclusion: "Se o sono não vem, não force. Saia, faça algo chato, e volte quando sentir sono de verdade."
  },
  "605": {
    title: "Acalmando os Pensamentos",
    objective: "Como parar a mente acelerada na hora de dormir.",
    steps: [
      { 
        text: "Quando você fecha os olhos, os pensamentos começam a gritar na sua cabeça? Tipo uma reunião barulhenta que não para?", 
        options: [
          { text: "Sim, minha mente não desliga.", feedback: "Vamos usar um truque: imagine cada pensamento como um carro passando numa estrada. Você está na calçada, só observando. Não entra em nenhum carro." },
          { text: "Consigo ficar tranquilo se tiver um som de fundo.", feedback: "Sons de chuva, ventilador ou ruído branco funcionam muito bem. Eles ocupam a mente com algo neutro." }
        ]
      },
      { 
        text: "Outro truque: imagine uma cena calma e repetitiva. Pode ser chuva no telhado, ondas do mar ou neve caindo. Foque nos detalhes da cena.", 
        options: [
          { text: "Gosto de imaginar chuva.", feedback: "Ótimo! Ouça o barulho de cada gota, sinta o cheiro da terra molhada. Quanto mais detalhes, mais rápido a mente relaxa." },
          { text: "Meus pensamentos invadem a cena.", feedback: "É normal! Quando isso acontecer, gentilmente volte pra cena. Não brigue com os pensamentos, apenas redirecione." }
        ]
      },
      { 
        text: "Se nada disso funcionar, tente focar em uma parte do corpo: sinta o peso do seu pé no colchão, a temperatura do travesseiro, a textura do lençol.", 
        options: [
          { text: "Vou tentar focar nas sensações do corpo.", feedback: "Isso puxa a atenção pra fora da mente e pro corpo. É como uma âncora que te traz pro presente." },
          { text: "Minha mente é teimosa demais.", feedback: "Seja paciente com ela. Cada vez que você redireciona, está treinando o cérebro. Com o tempo, fica mais fácil." }
        ]
      }
    ],
    conclusion: "Sua mente é como um rádio. Você pode trocar a estação dos problemas pra uma estação calma."
  },
  "606": {
    title: "Horário de Dormir",
    objective: "Manter uma rotina de sono estável.",
    steps: [
      { 
        text: "Você costuma dormir e acordar em horários muito diferentes durante a semana e o fim de semana?", 
        options: [
          { text: "No fim de semana eu durmo muito mais tarde.", feedback: "Essa bagunça confunde o corpo, é como trocar de fuso horário toda semana. Tente manter a constância." },
          { text: "Tento manter o mesmo horário todo dia.", feedback: "Excelente! Isso ajuda o sono a vir mais fácil e você acorda com mais disposição." }
        ]
      },
      { 
        text: "O ideal é não variar mais que 1 hora entre dias úteis e fins de semana. Qual horário funciona melhor pra você?", 
        options: [
          { text: "Gosto de dormir entre 22h e 23h.", feedback: "Ótimo! Tente manter esse horário nos fins de semana também. Seu corpo vai agradecer na segunda-feira." },
          { text: "Meu horário muda muito.", feedback: "Escolha um horário e comece a criar o hábito. Em 2 semanas, seu corpo já vai se ajustar naturalmente." }
        ]
      },
      { 
        text: "Dica: coloque um alarme pra te lembrar de COMEÇAR a se preparar pra dormir, não só pra acordar. 30 minutos antes do horário de dormir.", 
        options: [
          { text: "Nunca pensei em alarme pra dormir!", feedback: "É uma mudança que funciona! O alarme vira um sinal de que é hora de desacelerar." },
          { text: "Vou tentar colocar hoje.", feedback: "Boa! Com o tempo, você nem vai precisar do alarme. O corpo aprende a rotina sozinho." }
        ]
      }
    ],
    conclusion: "Seu corpo ama rotina. Mantenha horários estáveis e o sono vai virar seu aliado."
  },

  // --------- 7. RELACIONAMENTOS (CNV) ---------
  "701": {
    title: "Fale o Que Aconteceu, Não o Que Você Acha",
    objective: "Resolver conflitos descrevendo fatos em vez de atacar a pessoa.",
    steps: [
      { 
        text: "Quando alguém te chateia, qual dessas frases sai primeiro?", 
        options: [
          { text: "'Você SEMPRE faz isso!'", feedback: "Esse 'sempre' transforma um problema pontual numa acusação e a pessoa se defende na hora. Tente trocar por: 'Ontem quando aconteceu X, eu me senti mal'." },
          { text: "'Você não se importa comigo.'", feedback: "Isso é uma suposição sobre o que a pessoa sente. Em vez disso, descreva o fato: 'Quando você não respondeu minha mensagem, fiquei preocupado'." }
        ]
      },
      { 
        text: "A diferença entre 'Você é egoísta' e 'Quando você cancelou nosso plano, fiquei triste' é enorme. A segunda frase descreve o que aconteceu sem atacar.", 
        options: [
          { text: "Faz sentido, mas é difícil na hora da raiva.", feedback: "Sim! Por isso a respiração antes de falar é tão importante. 3 segundos de pausa mudam completamente o que sai da boca." },
          { text: "Eu costumo já ir atacando.", feedback: "É instinto, não é culpa sua. Mas com prática, você aprende a descrever primeiro e sentir depois. Começa aos poucos." }
        ]
      },
      { 
        text: "Desafio: na próxima conversa difícil, comece a frase com 'Quando aconteceu...' em vez de 'Você sempre...'. Topa?", 
        options: [
          { text: "Vou tentar isso na próxima discussão.", feedback: "Boa! Você vai perceber que a outra pessoa baixa a guarda quando não se sente atacada." },
          { text: "E se a pessoa não fizer o mesmo?", feedback: "Você não controla o outro, mas muda o rumo da conversa. Quando um para de atacar, o outro tende a seguir." }
        ]
      }
    ],
    conclusion: "Descreva fatos, não julgamentos. A conversa muda completamente quando ninguém se sente atacado."
  },
  "702": {
    title: "Falar dos Sentimentos",
    objective: "Aprender a dizer o que sente sem acusar o outro.",
    steps: [
      { 
        text: "Quando algo te machuca, você guarda pra si ou explode de uma vez?", 
        options: [
          { text: "Guardo até não aguentar mais.", feedback: "Guardar sentimentos é como encher um balão: uma hora estoura. Soltar aos poucos evita a explosão." },
          { text: "Explodo e depois me arrependo.", feedback: "A raiva é válida, mas a forma de expressar pode machucar quem a gente ama. Vamos achar um meio-termo." }
        ]
      },
      { 
        text: "Tente usar a fórmula: 'Eu me senti [sentimento] quando [fato]'. Exemplo: 'Eu me senti ignorado quando você mexia no celular enquanto eu falava'.", 
        options: [
          { text: "Parece meio estranho falar assim.", feedback: "No começo é esquisito mesmo, mas a outra pessoa ouve melhor quando não se sente acusada. Com prática, fica natural." },
          { text: "Eu vou tentar, mas tenho vergonha.", feedback: "Mostrar o que você sente é corajoso, não é fraqueza. A pessoa certa vai respeitar sua honestidade." }
        ]
      },
      { 
        text: "Pratique agora: pense em algo que te incomodou recentemente. Consegue montar a frase 'Eu me senti... quando...'?", 
        options: [
          { text: "Consegui montar a frase.", feedback: "Excelente! Guarde essa frase. Na próxima vez que o incômodo surgir, use-a. Vai mudar a conversa." },
          { text: "Tenho dificuldade de nomear o que sinto.", feedback: "Isso é super comum. Comece com sentimentos básicos: triste, irritado, ansioso, sozinho. Não precisa ser poético." }
        ]
      }
    ],
    conclusion: "Falar o que sente não é fraqueza, é a ferramenta mais forte pra resolver conflitos."
  },
  "703": {
    title: "Pedidos Claros",
    objective: "Pedir o que precisa de forma direta e gentil.",
    steps: [
      { 
        text: "Você já ficou chateado porque alguém não fez o que você esperava, mas nunca pediu diretamente?", 
        options: [
          { text: "Sim, acho que deviam adivinhar.", feedback: "Ninguém lê pensamento! Se você precisa de algo, diga com clareza. Isso evita muita frustração." },
          { text: "Eu peço, mas de um jeito meio vago.", feedback: "Pedidos vagos como 'Quero mais atenção' não funcionam. Tente: 'Podemos jantar juntos sem celular hoje?'." }
        ]
      },
      { 
        text: "A diferença entre um pedido e uma exigência é o tom. 'Você PRECISA fazer isso' gera resistência. 'Seria muito bom se você pudesse...' gera cooperação.", 
        options: [
          { text: "Eu costumo cobrar mesmo.", feedback: "Cobranças geram defesa. Pedidos geram parceria. Tente trocar o tom e veja a diferença na reação da pessoa." },
          { text: "Tenho medo de parecer carente pedindo.", feedback: "Pedir não é ser carente, é ser maduro. Todos temos necessidades e está tudo bem expressá-las." }
        ]
      },
      { 
        text: "Monte um pedido claro agora: 'Eu gostaria que [ação específica] porque [motivo]'. Exemplo: 'Eu gostaria que me avisasse quando for atrasar porque fico preocupado'.", 
        options: [
          { text: "Vou usar esse formato.", feedback: "Perfeito! Pedidos claros e gentis são muito mais fáceis de atender. A outra pessoa sabe exatamente o que fazer." },
          { text: "Isso parece muito formal.", feedback: "No começo pode parecer, mas com prática vira natural. O importante é ser específico sobre o que você precisa." }
        ]
      }
    ],
    conclusion: "Peça com clareza e gentileza. Ninguém é adivinho, mas quase todo mundo é prestativo quando sabe o que fazer."
  },
  "704": {
    title: "Saber Ouvir",
    objective: "Aprender a escutar sem interromper ou querer resolver tudo.",
    steps: [
      { 
        text: "Quando alguém desabafa com você, qual é o seu primeiro instinto?", 
        options: [
          { text: "Já quero dar um conselho ou resolver.", feedback: "Nem sempre a pessoa quer um conselho. Às vezes ela só precisa ser ouvida. Tente perguntar: 'Quer que eu te ajude a pensar ou só quer desabafar?'." },
          { text: "Escuto, mas fico pensando na minha resposta.", feedback: "Quando a mente está montando a resposta, você para de ouvir. Tente só prestar atenção no que a pessoa está sentindo." }
        ]
      },
      { 
        text: "Ouvir de verdade significa: manter contato visual, balançar a cabeça, e resistir à tentação de falar 'comigo também'. A conversa é sobre o outro agora.", 
        options: [
          { text: "Costumo puxar o assunto pra mim.", feedback: "É um hábito comum, mas invalida o sentimento do outro. Tente segurar essa vontade e deixe a pessoa terminar primeiro." },
          { text: "Consigo ficar em silêncio e ouvir.", feedback: "Isso é um dom! Muita gente não consegue. O silêncio atento é uma das formas mais poderosas de carinho." }
        ]
      },
      { 
        text: "Na próxima conversa importante, tente a regra do '3 segundos': quando a pessoa terminar de falar, conte até 3 antes de responder. Isso garante que ela realmente terminou.", 
        options: [
          { text: "Vou tentar os 3 segundos.", feedback: "Boa! Esses 3 segundos também te dão tempo de pensar melhor no que vai dizer." },
          { text: "Tenho medo do silêncio ficar estranho.", feedback: "O silêncio só é estranho pra quem fala. Pra quem está sendo ouvido, é um presente." }
        ]
      }
    ],
    conclusion: "Ouvir é um ato de amor. Às vezes, a pessoa só precisa saber que alguém se importa."
  },
  "705": {
    title: "Limites nos Relacionamentos",
    objective: "Aprender a dizer não sem culpa nas relações.",
    steps: [
      { 
        text: "Você já aceitou algo num relacionamento que te fez mal, só pra não criar conflito?", 
        options: [
          { text: "Sim, sempre cedo pra manter a paz.", feedback: "Ceder sempre não é paz, é acúmulo. Uma hora a conta chega. Colocar limites é saudável pra todo mundo." },
          { text: "Tenho dificuldade de saber o que me incomoda.", feedback: "Comece reparando no que te deixa com raiva ou cansaço depois. Esses são sinais de que um limite foi cruzado." }
        ]
      },
      { 
        text: "Limites não são muros. Eles são cercas com portão: você decide quem entra e quando. Qual limite você precisa colocar agora?", 
        options: [
          { text: "Preciso de mais espaço pessoal.", feedback: "Ter espaço próprio não é afastamento, é necessidade. Diga: 'Eu te amo, mas preciso de um tempo só meu'." },
          { text: "Preciso que respeitem meus horários.", feedback: "Tempo é o recurso mais precioso. Proteger ele é proteger sua saúde mental. Seja firme nisso." }
        ]
      },
      { 
        text: "Pratique dizer: 'Isso não funciona pra mim' ou 'Eu preciso que a gente converse sobre isso'. São frases curtas, firmes e respeitosas.", 
        options: [
          { text: "Vou ensaiar antes de usar.", feedback: "Boa ideia! Ensaiar tira o medo. Quando a hora chegar, as palavras vão sair mais naturais." },
          { text: "E se a pessoa ficar brava?", feedback: "Se alguém fica bravo quando você coloca um limite saudável, talvez essa pessoa esteja acostumada a não respeitar os seus." }
        ]
      }
    ],
    conclusion: "Seu limite é um ato de respeito por si mesmo. Quem te ama de verdade vai entender."
  },

  // --------- 8. COMPORTAMENTOS ---------
  "801": {
    title: "Adiar Não é Preguiça",
    objective: "Entender por que procrastinamos e como começar a agir.",
    steps: [
      { 
        text: "Quando você adia uma tarefa, o que sente? Preguiça ou medo de não fazer direito?", 
        options: [
          { text: "Medo de não ser bom o suficiente.", feedback: "Isso! Procrastinação quase nunca é preguiça. É o medo de fracassar disfarçado de 'deixa pra depois'." },
          { text: "Me sinto sem energia nenhuma.", feedback: "Às vezes o corpo adia porque está esgotado. Se for o caso, descansar primeiro é mais produtivo do que forçar." }
        ]
      },
      { 
        text: "O cérebro adia as coisas que parecem grandes ou assustadoras demais. A solução é tornar a tarefa ridiculamente pequena. Em vez de 'estudar 2 horas', pense em 'abrir o caderno'.", 
        options: [
          { text: "Isso parece fácil demais.", feedback: "Esse é o objetivo! Quando a tarefa é fácil demais, o corpo para de resistir. E quando você começa, geralmente continua." },
          { text: "Mas eu preciso fazer a coisa toda.", feedback: "E vai fazer! Mas depois de começar. O mais difícil é o primeiro passo. Dê ele bem pequeno." }
        ]
      },
      { 
        text: "Agora me diz: qual tarefa você está adiando? Transforma ela no menor passo possível. Tipo: 'ligar o computador' ou 'ler o título do trabalho'.", 
        options: [
          { text: "Quando penso assim, parece menos assustador.", feedback: "Isso é a mágica! O medo some quando o passo é pequeno. Comece agora." },
          { text: "Vou tentar isso com algo que estou adiando.", feedback: "Boa! Lembre: o objetivo não é terminar, é começar. O resto acontece naturalmente." }
        ]
      }
    ],
    conclusion: "Procrastinar não é preguiça, é proteção do cérebro contra o medo. Diminua o passo e comece."
  },
  "802": {
    title: "A Regra de Dois Minutos",
    objective: "Vencer a resistência começando qualquer coisa por apenas 2 minutos.",
    steps: [
      { 
        text: "Começar é a parte mais difícil. Se você prometer fazer só por 2 minutos, você engana a resistência do cérebro. Topa?", 
        options: [
          { text: "Vou tentar isso na próxima tarefa chata.", feedback: "Boa! O segredo é apenas começar. Depois de 2 minutos, o impulso te leva adiante." },
          { text: "2 minutos parece muito pouco.", feedback: "Esse é o ponto! O corpo para de resistir quando o esforço é mínimo. E quase nunca paramos em 2 minutos mesmo." }
        ]
      },
      { 
        text: "Funciona assim: quando a tarefa parecer pesada, diga: 'Vou fazer só 2 minutos. Se depois quiser parar, eu paro'. Na maioria das vezes, você continua.", 
        options: [
          { text: "É como enganar a minha preguiça.", feedback: "Exatamente! O cérebro aceita de boa um esforço de 2 minutos. E depois que começa, percebe que não era tão ruim." },
          { text: "E se eu realmente parar depois de 2 minutos?", feedback: "Tudo bem! 2 minutos é infinitamente melhor que zero. Amanhã você faz mais 2. Progresso é progresso." }
        ]
      },
      { 
        text: "Escolha uma tarefa agora e aplique a regra: faça apenas 2 minutos. Cronometra no celular se quiser. O que aconteceu?", 
        options: [
          { text: "Fiz mais do que 2 minutos!", feedback: "Viu? É assim que funciona! A inércia é o maior inimigo. Uma vez em movimento, o corpo continua." },
          { text: "Fiz os 2 minutos certinhos.", feedback: "Perfeito! Já é uma vitória. Amanhã tenta de novo. O hábito se constrói aos poucos." }
        ]
      }
    ],
    conclusion: "O movimento gera motivação, não o contrário. Apenas comece!"
  },
  "803": {
    title: "Feito é Melhor que Perfeito",
    objective: "Aceitar que concluir é mais importante do que ser impecável.",
    steps: [
      { 
        text: "Muitas vezes a gente para porque quer que tudo saia perfeito. Isso te trava?", 
        options: [
          { text: "Sim, demoro muito revisando tudo.", feedback: "Tente focar em 'entregar'. A perfeição é inimiga do progresso. Termine primeiro, ajuste depois." },
          { text: "Prefiro não começar se não puder fazer direito.", feedback: "Feito de qualquer jeito é melhor que não feito. Você pode melhorar depois, mas precisa existir algo pra melhorar." }
        ]
      },
      { 
        text: "Pense assim: um trabalho nota 7 entregue vale mais que um trabalho nota 10 que nunca saiu do rascunho. Consegue aceitar isso?", 
        options: [
          { text: "Faz sentido, mas doi aceitar.", feedback: "Eu sei. O perfeccionismo é um hábito difícil de quebrar. Mas cada entrega 'imperfeita' te aproxima mais do resultado." },
          { text: "Vou tentar entregar sem revisar mil vezes.", feedback: "Boa! Defina um número máximo de revisões (tipo 2) e entregue. Você vai ver que ninguém nota as 'falhas' que te atormentam." }
        ]
      },
      { 
        text: "Desafio: faça algo hoje de forma 'boa o suficiente' e entregue. Sem revisar mais uma vez. Como se sente?", 
        options: [
          { text: "Me sinto aliviado por ter terminado.", feedback: "Esse alívio é a prova de que entregar liberta. A perfeição prende. Escolha a liberdade." },
          { text: "Me sinto ansioso, mas vou tentar.", feedback: "A ansiedade vai diminuir com a prática. Cada entrega te mostra que o mundo não acaba por causa de um detalhe." }
        ]
      }
    ],
    conclusion: "Comemore o fato de ter concluído o que começou. Feito é melhor que perfeito."
  },
  "804": {
    title: "Você Chegou Lá!",
    objective: "Celebrar a conclusão de toda a jornada terapêutica.",
    steps: [
      { 
        text: "Você passou por todos os módulos! Olhe para trás e veja o quanto aprendeu sobre si mesmo. Como você se sente agora comparado ao início?", 
        options: [
          { text: "Me sinto muito mais preparado.", feedback: "E você está! Cada atividade que você completou te deu uma ferramenta nova. Agora é praticar no dia a dia." },
          { text: "Ainda tenho dificuldades, mas entendo melhor.", feedback: "Isso já é uma vitória enorme! Entender o que acontece na sua mente é o primeiro e mais importante passo." }
        ]
      },
      { 
        text: "Qual foi a técnica ou ensinamento que mais te marcou durante toda essa jornada?", 
        options: [
          { text: "Aprender a respirar e acalmar o corpo.", feedback: "A respiração é a ferramenta mais poderosa que existe. Use ela sempre que precisar. É gratuita e está sempre com você." },
          { text: "Entender que os pensamentos não são fatos.", feedback: "Esse é um divisor de águas, a mente cria histórias, mas você não precisa acreditar em todas. Continue questionando." }
        ]
      },
      { 
        text: "Lembre-se: progresso não é uma linha reta. Vai ter dias ruins, e tá tudo bem. O importante é voltar pros exercícios quando precisar. A Luna estará sempre aqui.", 
        options: [
          { text: "Obrigado por tudo, Luna!", feedback: "Eu é que agradeço pela sua coragem! Cuidar da mente é o ato mais corajoso que existe. Estou orgulhosa de você!" },
          { text: "Vou revisitar os módulos quando precisar.", feedback: "Perfeita decisão! Esses módulos são ferramentas pra vida toda. Volte sempre que quiser." }
        ]
      }
    ],
    conclusion: "Parabéns! Você finalizou toda a jornada. Continue praticando esses hábitos todos os dias. A Luna está sempre aqui por você. 💙"
  }
}
