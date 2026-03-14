import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { titulo } from './util';
import titulo_padrao from './util.js';

export default function App() {
  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>{titulo_padrao}</Text>
      <Text style={styles.subtitle}>{titulo}</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Adicionar uma nova tarefa..." 
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        
        <View style={styles.card}>
          <Text style={styles.cardText}>Estudar para a Prática 02</Text>
          <TouchableOpacity>
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>

  
        <View style={styles.card}>
          <Text style={styles.cardText}>Configurar o ambiente Android</Text>
          <TouchableOpacity>
            <Text style={styles.deleteText}>X</Text>
          </TouchableOpacity>
        </View>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, 
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EEE',
    elevation: 1,
  },
  cardText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  deleteText: {
    color: '#FF5252',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});