export const cn = (...inputs: (string | boolean | undefined)[]) => {
  return inputs.filter(Boolean).join(' ');
};

export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('id-ID', options);
};

export const formatDateTime = (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('id-ID', options);
};

export const formatCurrency = (value: number, currency: string = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
  }).format(value);
};

export const getPageFromUrl = (url: string | null): number | null => {
  if (!url) return null;
  try {
    const params = new URL(url).searchParams;
    return params.has('page') ? Number(params.get('page')) : null;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
};
