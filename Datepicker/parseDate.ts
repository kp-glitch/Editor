import moment from 'moment';

export const parseDate = (dateString: string): Date | null => {
  const date = moment.utc(dateString).local();
  return date.isValid() ? date.toDate() : null;
}

export const formatDaate = (date:Date): string => {
  return moment(date).format('YYYY-MM-DD')
}
