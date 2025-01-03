import { format } from 'date-fns';

export const convertToDate = (dateString:any) => {
  const date = new Date(dateString);
  return format(date, 'yyyy-MM-dd');
};