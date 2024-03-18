import { apiClient } from "../../../api/client"; // would make that ~/api/client as cleanup

export interface AnswerOption {
  id: string;
  label: string;
}

export enum QuestionVariants  {
  LikertScale = 'likert-scale',
  OpenQuestion = 'open-question'
}

export type Question = {
  id: string;
  label: string;
  variant: QuestionVariants
  options?: AnswerOption[]
}

export type Survey = {
  id: string;
  title: string;
  questions: Question[];
  version: string;
}
// this is just example to sync endpoints
export const getSurvey = (id: Survey['id']) =>
  apiClient.get<Survey>(`/edit-survey/${id}`)

export const saveSurvey = (survey: Survey) =>
  apiClient.post<null>(`/edit-survey/${survey.id}`, survey)
