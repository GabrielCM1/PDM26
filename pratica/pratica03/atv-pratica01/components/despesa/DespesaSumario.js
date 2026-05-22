import { View, Text } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  // O reduce pega o total acumulado e soma com o valor da despesa atual [cite: 1005, 1026]
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  return (
    <View>
      <Text>{periodo}</Text>
      {/* toFixed(2) garante que sempre apareçam dois números após a vírgula [cite: 1049, 1056] */}
      <Text>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

export default DespesaSumario;