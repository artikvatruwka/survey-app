import { Survey, QuestionVariants, Question, AnswerOption } from '../api/survey';
import { nanoid } from 'nanoid'
import { useLocalStorage } from "./localStorage";

const getQuestionById = (questions: Question[], id: string) =>
  questions.find((question)=>question.id === id)

export const useSurveyEditor = (id: Survey['id']) => {
  const surveyDraft = useLocalStorage<Survey | null>(`survey-${id}`, {
    id: id,
    questions: [],
    title: '',
    version: 'draft'
  })

  const setTitle = (newValue: string) => {
    if (!surveyDraft.value) return
    surveyDraft.value.title = newValue;
  }

  const addQuestion = () => {
    if (!surveyDraft.value) return
    surveyDraft.value.questions = [
      ...surveyDraft.value.questions,
      {
        id: nanoid(),
        label: '',
        variant: QuestionVariants.LikertScale,
        options: [
          {
            id: nanoid(),
            label: '',
          },
          {
            id: nanoid(),
            label: '',
          },
          {
            id: nanoid(),
            label: '',
          },
        ]
      }
    ]
  }
  const removeQuestion = (questionId: string) => {
    if (!surveyDraft.value) return
    surveyDraft.value.questions = surveyDraft.value.questions.filter(question=>question.id!== questionId)
  }

  const setQuestionProperty = <P extends keyof Question, V extends Question[P]>(questonId: string, propertyName: P, value: V) => {
    if (!surveyDraft.value) return
    const question = getQuestionById(surveyDraft.value.questions, questonId)
    if (!question) return
    question[propertyName] = value
  }

  const addAnswerOption = (questonId: string) => {
    if (!surveyDraft.value) return
    const question = getQuestionById(surveyDraft.value.questions, questonId)
    if (!question) return
    question.options = [
      ...(question.options || []),
      {
        id: nanoid(),
        label: '',
      }
    ];
  }

  const setAnswerOptionProperty =
  <
    P extends keyof AnswerOption,
    V extends AnswerOption[P]
  >(
    questonId: string,
    optionId: string,
    propertyName: P,
    value: V
  ) => {
    if (!surveyDraft.value) return;
    const question = getQuestionById(surveyDraft.value.questions, questonId);
    if (!question || !question.options) return;
    const option = question.options.find((option)=>option.id === optionId);
    if (!option) return;
    option[propertyName] = value;
  }

  const removeAnswerOption =(
    questonId: string,
    optionId: string,
  ) => {
    if (!surveyDraft.value) return;
    const question = getQuestionById(surveyDraft.value.questions, questonId);
    if (!question || !question.options) return;
    question.options = question.options.filter(option => option.id !== optionId)
  }

  return {
    surveyDraft,
    setTitle,
    addQuestion,
    removeQuestion,
    setQuestionProperty,
    addAnswerOption,
    setAnswerOptionProperty,
    removeAnswerOption
  }
}
