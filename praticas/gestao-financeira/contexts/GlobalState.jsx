import { createContext, useCallback, useEffect, useState } from "react"
import { api } from "../services/api"

export const MoneyContext = createContext()

export default function GlobalState({ children }) {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

      const login = useCallback((name) => {
      setUser({ name });
      setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
      setUser(null);
      setIsAuthenticated(false);
    }, []);

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [nextCategories, nextTransactions] = await Promise.all([
        api.listCategories(),
        api.listTransactions(),
      ])

      setCategories(nextCategories)
      setTransactions(nextTransactions)
    } catch (currentError) {
      setError(currentError.message ?? "Falha ao carregar dados do servidor")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const addTransaction = useCallback(async (data) => {
    const created = await api.createTransaction(data)
    setTransactions((currentTransactions) => [created, ...currentTransactions])
    return created
  }, [])

  const updateTransaction = useCallback(async (id, transaction) => {
  setLoading(true);
  setError(null);

  try {
    const updatedTransaction = await api.updateTransaction(id, transaction);

    setTransactions((currentTransactions) =>
      currentTransactions.map((item) =>
        item.id === id ? updatedTransaction : item
      )
    );

    return updatedTransaction;
  } catch (err) {
    setError("Não foi possível atualizar a transação.");
    throw err;
  } finally {
    setLoading(false);
  }
}, []);

  const removeTransaction = useCallback(async (id) => {
    await api.deleteTransaction(id)
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id),
    )
  }, [])

  const addCategory = useCallback(async (data) => {
    const created = await api.createCategory(data)
    setCategories((currentCategories) =>
      [...currentCategories, created].sort((a, b) =>
        a.displayName.localeCompare(b.displayName),
      ),
    )
    return created
  }, [])

  const removeCategory = useCallback(async (id) => {
    await api.deleteCategory(id)
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.id !== id),
    )
  }, [])

  const filteredTransactions = transactions.filter((transaction) => {
  const transactionDate = new Date(transaction.date);

    return (
      transactionDate.getMonth() + 1 === selectedMonth &&
      transactionDate.getFullYear() === selectedYear
    );
  });

  return (
    <MoneyContext.Provider
      value={{
        transactions,
        categories,
        loading,
        error,
        user,
        isAuthenticated,
        login,
        logout,
        refresh,
        updateTransaction,
        addTransaction,
        removeTransaction,
        addCategory,
        removeCategory,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        filteredTransactions,
      }}
    >
      {children}
    </MoneyContext.Provider>
  )
}
