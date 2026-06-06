import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Button from "../../components/Button";
import CategoryPicker from "../../components/CategoryPicker";
import CurrencyInput from "../../components/CurrencyInput";
import MonthYearFilter from "../../components/MonthYearFilter";
import TransactionItem from "../../components/TransactionItem";
import { colors } from "../../constants/colors";
import { MoneyContext } from "../../contexts/GlobalState";
import { globalStyles } from "../../styles/globalStyles";

export default function Transactions() {
  const {
    categories = [],
    error,
    filteredTransactions,
    loading,
    refresh,
    removeTransaction,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    transactions,
    updateTransaction,
    user,
  } = useContext(MoneyContext);

  const transactionsToShow = filteredTransactions ?? transactions;

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({
    description: "",
    value: 0,
    date: new Date().toISOString(),
    categoryId: "",
  });

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);

    setEditForm({
      description: transaction.description,
      value: Number(transaction.value),
      date: transaction.date,
      categoryId: transaction.categoryId,
    });
  };

  const handleUpdateTransaction = async () => {
    if (!editingTransaction) return;

    if (!editForm.description.trim()) {
      Alert.alert("Informe uma descrição.");
      return;
    }

    if (!editForm.categoryId) {
      Alert.alert("Selecione uma categoria.");
      return;
    }

    try {
      await updateTransaction(editingTransaction.id, {
        description: editForm.description.trim(),
        value: Number(editForm.value),
        date: editForm.date,
        categoryId: editForm.categoryId,
      });

      setEditingTransaction(null);
    } catch (currentError) {
      Alert.alert(
        "Erro ao atualizar",
        currentError.message ?? "Tente novamente."
      );
    }
  };

  const handleDeleteTransaction = () => {
    if (!editingTransaction) return;

    Alert.alert(
      "Excluir transação",
      `Deseja excluir "${editingTransaction.description}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await removeTransaction(editingTransaction.id);
              setEditingTransaction(null);
            } catch (currentError) {
              Alert.alert(
                "Erro ao excluir",
                currentError.message ?? "Tente novamente."
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading && transactions.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
        <Text style={globalStyles.primaryText}>Carregando transações...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={globalStyles.primaryText}>Não foi possível carregar.</Text>
        <Text style={globalStyles.secondaryText}>{error}</Text>

        <TouchableOpacity style={styles.retry} onPress={refresh}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.screenContainer}>
      <FlatList
        data={transactionsToShow}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => openEditModal(item)}>
            <TransactionItem
              category={item.category}
              date={item.date}
              description={item.description}
              value={item.value}
            />
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.welcome}>
              Olá, {user?.name ?? "usuário"}!
            </Text>

            {selectedMonth &&
              selectedYear &&
              setSelectedMonth &&
              setSelectedYear && (
                <MonthYearFilter
                  selectedMonth={selectedMonth}
                  setSelectedMonth={setSelectedMonth}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                />
              )}
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Ainda não há nenhum item!</Text>
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        contentContainerStyle={globalStyles.content}
      />

      <Modal visible={!!editingTransaction} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar transação</Text>

            <View>
              <Text style={globalStyles.inputLabel}>Descrição</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Descrição"
                value={editForm.description}
                onChangeText={(description) =>
                  setEditForm((currentForm) => ({
                    ...currentForm,
                    description,
                  }))
                }
              />
            </View>

            <CurrencyInput form={editForm} setForm={setEditForm} />

            <CategoryPicker
              categories={categories}
              form={editForm}
              setForm={setEditForm}
            />

            <Button onPress={handleUpdateTransaction}>
              Salvar alterações
            </Button>

            <Button onPress={handleDeleteTransaction}>
              Excluir transação
            </Button>

            <Button onPress={() => setEditingTransaction(null)}>
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    marginTop: 24,
    color: colors.secondaryText,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 24,
    backgroundColor: colors.background,
  },

  retry: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },

  retryText: {
    color: colors.primaryContrast,
    fontWeight: "600",
  },

  welcome: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primaryText,
    marginBottom: 8,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
  },

  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.primaryText,
    marginBottom: 8,
  },
});