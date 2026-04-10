import { View, Text, Pressable, StyleSheet } from 'react-native';

// Função para transformar o objeto Date em uma string legível (DD/MM/AAAA)
function getDataFormatada(data) {
  // Somamos 1 ao mês porque o JavaScript conta os meses de 0 a 11
  return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}

function DespesaItem({ item }) {
  return (
    <Pressable>
      <View style={styles.itemContainer}>
        {/* Coluna da Data */}
        <View style={styles.itemText}>
          <Text>{getDataFormatada(item.data)}</Text>
        </View>
        
        {/* Coluna da Descrição */}
        <View style={styles.itemText}>
          <Text>{item.descricao}</Text>
        </View>
        
        {/* Coluna do Valor */}
        <View style={styles.itemText}>
          <Text>R$ {item.valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1, // Ocupa o espaço disponível
    padding: 10, // Espaçamento interno
    marginVertical: 5, // Espaço entre um item e outro
    marginHorizontal: 5, // Espaço nas laterais
    backgroundColor: 'lightgray', // Cor de fundo cinza claro
    flexDirection: 'row', // Alinha as colunas lado a lado
    borderRadius: 6, // Arredonda as bordas
  },
  itemText: {
    flex: 1, // Faz com que as 3 colunas tenham o mesmo tamanho
  },
});