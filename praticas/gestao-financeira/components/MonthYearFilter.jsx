import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";

const months = [
  { label: "Janeiro", value: 1 },
  { label: "Fevereiro", value: 2 },
  { label: "Março", value: 3 },
  { label: "Abril", value: 4 },
  { label: "Maio", value: 5 },
  { label: "Junho", value: 6 },
  { label: "Julho", value: 7 },
  { label: "Agosto", value: 8 },
  { label: "Setembro", value: 9 },
  { label: "Outubro", value: 10 },
  { label: "Novembro", value: 11 },
  { label: "Dezembro", value: 12 },
];

const years = [2024, 2025, 2026, 2027];

export default function MonthYearFilter({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={globalStyles.label}>Mês</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(value) => setSelectedMonth(Number(value))}
          >
            {months.map((month) => (
              <Picker.Item
                key={month.value}
                label={month.label}
                value={month.value}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={globalStyles.label}>Ano</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(value) => setSelectedYear(Number(value))}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={String(year)} value={year} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  field: {
    flex: 1,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.secondaryText,
    borderRadius: 8,
    backgroundColor: colors.primaryContrast,
    overflow: "hidden",
  },
});