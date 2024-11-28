export const USER = {
  COLLECTION_NAME: 'users',
  DOCUMENT_NAME: 'User',
  PREFIX: 'usr_',
  STATUS: {
    ACTIVE: 'active',
    PENDING: 'pending',
    DELETED: 'deleted',
  },
  SEX: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
  },
} as const;
