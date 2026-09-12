import { GoogleGenerativeAI } from "@google/generative-ai";

import type {
    PedagogicalInput,
    LessonPlan
} from "../types/pedagogical.types.js";



const availableExperiences = [
    {
        id: "fotossintese",
        name: "Fotossíntese",
        type: "simulation",
        subject: "Biologia",
        topic: "Fotossíntese",
        description:
            "Exploração dos fatores que influenciam a fotossíntese, como luz, água e CO2."
    },
    {
        id: "separacao-misturas",
        name: "Separação de Misturas",
        type: "simulation",
        subject: "Química",
        topic: "Separação de misturas",
        description:
            "Exploração de métodos de separação de diferentes tipos de misturas."
    },
    {
        id: "eletrodinamica",
        name: "Eletrodinâmica",
        type: "simulation",
        subject: "Física",
        topic: "Eletrodinâmica",
        description:
            "Exploração de conceitos de corrente elétrica, tensão e circuitos."
    }
];

const client = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
);

const model = client.getGenerativeModel({
    model: "gemini-3.5-flash-lite"
});

export async function generateLessonPlan(
    input: PedagogicalInput
): Promise<LessonPlan> {

    const prompt = `
Você é uma IA especialista em pedagogia e design de experiências de aprendizagem.

Sua função é transformar uma situação de ensino fornecida
pelo professor em um roteiro de aula prático, claro e
pedagogicamente coerente.

Você NÃO deve simplesmente criar uma aula genérica.

Primeiro, analise internamente:

1. O que o aluno precisa aprender.
2. Qual é a principal dificuldade apresentada.
3. Qual é a necessidade cognitiva do aluno.
4. Qual metodologia pedagógica é mais adequada.
5. Qual experiência interativa é mais adequada.
6. Como essa experiência deve aparecer dentro da aula.

Não escolha uma experiência apenas porque parece tecnológica.

A experiência deve estar diretamente relacionada ao objetivo
de aprendizagem e à dificuldade apresentada.

Considere experiências como:

- quiz
- matching
- ordering
- classification
- simulation
- investigation
- challenge
- decision_scenario
- group_mission


A plataforma possui atualmente estas experiências interativas reais:

${JSON.stringify(availableExperiences, null, 2)}

IMPORTANTE:

- Você NÃO pode inventar experiências.
- Você NÃO pode inventar experienceId.
- Se uma das experiências disponíveis for adequada ao conteúdo,
  escolha essa experiência.
- Se nenhuma experiência disponível for adequada,
  use "nenhuma" como experienceId.
- A experiência escolhida deve estar relacionada ao conteúdo,
  objetivo e dificuldade informados pelo professor.





Exemplos:

Se o objetivo for memorizar ou revisar conceitos:
→ quiz, matching ou classification.

Se o objetivo for organizar etapas:
→ ordering.

Se o objetivo for aplicar conhecimento:
→ challenge.

Se o objetivo for tomar decisões:
→ decision_scenario.

Se o objetivo for investigar hipóteses:
→ investigation.

Se o objetivo for compreender relações de causa e efeito:
→ simulation.

Se o objetivo exigir colaboração:
→ group_mission.

Não escolha simulation automaticamente.

O smartphone deve possuir uma função pedagógica clara.
Não recomende uso contínuo do celular quando ele não for
necessário para a aprendizagem.

IMPORTANTE:

O roteiro deve ser aplicável por um professor em uma aula real.

Não invente informações sobre a turma além das fornecidas.

Não escreva código.

Não crie um jogo.

A experiência escolhida deve ser descrita como uma atividade
que pode ser executada pela plataforma.

A aula deve possuir:

1. Introdução
2. Explicação do conteúdo
3. Atividade interativa
4. Avaliação
5. Fechamento

Para cada etapa, informe:

- duração aproximada
- ação do professor
- ação dos alunos

Na atividade interativa, informe também:

- tipo de experiência
- ID da experiência escolhida
- instruções para os alunos

Ao final, inclua a decisão pedagógica que levou à construção
desse roteiro.

Retorne SOMENTE um JSON válido.
NÃO use Markdown.
NÃO coloque o JSON dentro de blocos \`\`\`.
NÃO escreva nenhum texto antes ou depois do JSON.

O JSON deve seguir EXATAMENTE esta estrutura:

{
  "title": "título da aula",
  "objective": "objetivo da aula",
  "methodology": "metodologia pedagógica escolhida",

  "introduction": {
    "duration": "duração",
    "teacherAction": "ação do professor",
    "studentAction": "ação dos alunos"
  },

  "explanation": {
    "duration": "duração",
    "teacherAction": "ação do professor",
    "studentAction": "ação dos alunos"
  },

  "activity": {
    "duration": "duração",
    "experienceType": "tipo de experiência",
    "experienceId": "id da experiência escolhida",
    "instructions": "instruções para os alunos",
    "teacherAction": "ação do professor",
    "studentAction": "ação dos alunos"
  },

  "assessment": {
    "duration": "duração",
    "strategy": "estratégia de avaliação"
  },

  "closure": {
    "duration": "duração",
    "teacherAction": "ação do professor",
    "studentAction": "ação dos alunos"
  },

  "pedagogicalDecision": {
    "need": "necessidade cognitiva principal",
    "methodology": "metodologia escolhida",
    "candidateExperiences": [
      "experiência 1",
      "experiência 2",
      "experiência 3"
    ],
    "experienceType": "experiência escolhida",
    "interaction": "tipo de interação",
    "groupMode": "modo de participação",
    "activityDifficulty": "dificuldade da atividade",
    "reason": "justificativa pedagógica curta"
  }
}

Situação de ensino fornecida pelo professor:

${JSON.stringify(input)}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text().trim();

    // Remove bloco Markdown caso o modelo ainda retorne ```json ... ```
    if (text.startsWith("```")) {
        text = text
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();
    }

    return JSON.parse(text) as LessonPlan;
}