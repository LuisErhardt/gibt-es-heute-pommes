const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const isWeekend = (): boolean => {
  const today = new Date();
  const day = today.getDay();
  return day === 0 || day === 6;
};

export { delay, isWeekend };
