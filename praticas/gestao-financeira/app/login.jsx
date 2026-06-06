import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Button from "../components/Button";
import { colors } from "../constants/colors";
import { MoneyContext } from "../contexts/GlobalState";
import { globalStyles } from "../styles/globalStyles";

export default function Login() {
  const { login } = useContext(MoneyContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!name.trim()) {
      Alert.alert("Informe o nome de usuário.");
      return;
    }

    if (password !== "123456") {
      Alert.alert("Acesso negado", "Senha inválida.");
      return;
    }

    login(name.trim());
    router.replace("/(tabs)");
  };

 return (
  <KeyboardAvoidingView
    style={styles.keyboard}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
  >
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Gestão Financeira</Text>
        <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

        <View style={styles.field}>
          <Text style={globalStyles.label}>Usuário</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={globalStyles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button onPress={handleLogin}>Entrar</Button>

        <Text style={styles.helper}>Senha de teste: 123456</Text>
      </View>
    </View>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  card: {
    gap: 16,
    backgroundColor: colors.primaryContrast,
    borderRadius: 16,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.primaryText,
    textAlign: "center",
  },

  subtitle: {
    color: colors.secondaryText,
    textAlign: "center",
    marginBottom: 8,
  },

  field: {
    gap: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.secondaryText,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.background,
  },

  helper: {
    textAlign: "center",
    color: colors.secondaryText,
    fontSize: 12,
  },
});