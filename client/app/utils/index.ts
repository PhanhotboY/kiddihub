const getPublicId = (url?: string) => {
  return url?.split('/upload/')[1] || '';
};

export { getPublicId };
