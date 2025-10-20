const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const isWeekend = (dateStr: string | null = null): boolean => {
  if (dateStr) {
    const date = new Date(dateStr);
    const day = date.getDay();
    return day === 0 || day === 6;
  }
  const today = new Date();
  const day = today.getDay();
  return day === 0 || day === 6;
};

export { delay, isWeekend };
