export default interface IMensagem {
  tipo: 'erro' | 'aviso' | 'sucesso' | 'info';
  titulo: string;
  conteudo: string;
}
