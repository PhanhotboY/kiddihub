const EXCERPT_LENGTH = 150;

const getExcerpt = (content: string): string => {
  if (!content) {
    return '';
  }

  const { blocks, ...attrs } = JSON.parse(content || '{}');
  let excerpt = '';
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].type === 'paragraph') {
      excerpt = blocks[i].data.text;

      if (excerpt.length > 100) {
        excerpt = excerpt.slice(0, EXCERPT_LENGTH);
        excerpt += '...';
        break;
      }
    }
  }

  return JSON.stringify({
    blocks: [{ type: 'paragraph', data: { text: excerpt } }],
    ...attrs,
  });
};

export { getExcerpt };
