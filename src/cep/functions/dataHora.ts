export default function dataHora() {
  const horario: Date = new Date();
  const diaSemana: string = horario.toLocaleString(undefined, {
    weekday: 'long',
  });
  const dia: string = horario.toLocaleString('default', {day: '2-digit'});
  const mes: string = horario.toLocaleString('default', {month: 'long'});
  const ano: string = horario.toLocaleString('default', {year: 'numeric'});
  const hora: string = horario.toLocaleString('default', {hour: 'numeric'});
  const minutos: string = horario
    .toLocaleString('default', {
      minute: 'numeric',
    })
    .padStart(2, '0');
  const segundos: string = horario
    .toLocaleString('default', {
      second: 'numeric',
    })
    .padStart(2, '0');
  return `${diaSemana}, ${dia} de ${mes} de ${ano},  ${hora}:${minutos}:${segundos}`;
}
