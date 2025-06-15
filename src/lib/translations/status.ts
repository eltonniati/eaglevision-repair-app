
import { Language, StatusTranslations } from './types';

export const statusTranslations: Record<Language, StatusTranslations> = {
  en: {
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    waitingForParts: 'Waiting for Parts',
  },
  fr: {
    pending: 'En attente',
    inProgress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
    waitingForParts: 'En attente de pièces',
  },
  pt: {
    pending: 'Pendente',
    inProgress: 'Em Andamento',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    waitingForParts: 'Esperando Peças',
  },
  es: {
    pending: 'Pendiente',
    inProgress: 'En Progreso',
    completed: 'Completado',
    cancelled: 'Cancelado',
    waitingForParts: 'Esperando Repuestos',
  },
  ln: {
    pending: 'Ezali kozela',
    inProgress: 'Ezali kosálema',
    completed: 'Esilisi',
    cancelled: 'Ekatami',
    waitingForParts: 'Ezali kozela biloko',
  },
  kg: {
    pending: 'Ikalanga',
    inProgress: 'Isalanga',
    completed: 'Imana',
    cancelled: 'Itululu',
    waitingForParts: 'Ikalanga bima',
  },
  sw: {
    pending: 'Inasubiri',
    inProgress: 'Inaendelea',
    completed: 'Imekamilika',
    cancelled: 'Imeghairiwa',
    waitingForParts: 'Inasubiri Vipande',
  },
  ts: {
    pending: 'Cilindile',
    inProgress: 'Cisalela',
    completed: 'Cimana',
    cancelled: 'Cikanidi',
    waitingForParts: 'Cilindile bintu',
  },
};
