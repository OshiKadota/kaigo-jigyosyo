export const isValidDateFormat = (dateString: string): boolean => {
  // 正規表現で日付形式(YYYY-MM-DD)を判定
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};
