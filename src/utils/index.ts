export const cn = (...inputs: (string | boolean | undefined)[]) => {
  return inputs.filter(Boolean).join(' ');
};
