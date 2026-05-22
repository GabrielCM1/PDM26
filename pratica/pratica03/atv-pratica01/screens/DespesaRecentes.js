import DespesaSaida from '../components/despesa/DespesaSaida';

function DespesaRecentes() {
 
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date(); 
    const seteDiasAtras = new Date(); 
    seteDiasAtras.setDate(hoje.getDate() - 7); 

    return despesas.filter(despesa => {
      return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }

  const DUMMY_DESPESAS = [
    { id: '1', descricao: 'Almoço Hoje', valor: 35.00, data: new Date() },
    { id: '2', descricao: 'Mercado (10 dias atrás)', valor: 250.00, data: new Date(2026, 3, 1) }, 
    { id: '3', descricao: 'Cinema ontem', valor: 40.00, data: new Date(2026, 3, 9) },
  ];

  const despesasFiltradas = filtrarUltimos7Dias(DUMMY_DESPESAS);

  return (
    <DespesaSaida 
      despesas={despesasFiltradas} 
      periodo={'Últimos 7 dias'} 
    />
  );
}

export default DespesaRecentes;