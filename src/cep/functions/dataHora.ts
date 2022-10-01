export function dataHora(): string {
  const horario: Date = new Date();

  const dataHora = horario.toLocaleTimeString('default', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return `${dataHora}`;
}
export function periodoDia(): string {
  let periodo: string;

  const horario: Date = new Date();
  const momento = horario.toLocaleTimeString('pt-BR');
  if (momento >= '06:00' && momento <= '18:00') {
    periodo = 'day';
  } else {
    periodo = 'night';
  }
  return periodo;
}
