import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const HomeScreen = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    eventType: '',
    location: '',
    time: '',
    publisher: '',
    attend: false,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const parsedEvents = data.slice(0, 3).map((event, index) => ({
        id: event.id,
        name: `Evento ${index + 1}`,
        date: '8 de Diciembre, 2024',
        eventType: 'Música',
        location: 'Lugar Genérico',
        time: '7:00 PM',
        publisher: 'Publicador X',
        attend: false,
      }));
      setEvents(parsedEvents);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };

  const saveEvent = async (event) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      const savedEvent = await response.json();
      setEvents((prevEvents) => [...prevEvents, { ...event, id: savedEvent.id }]);
    } catch (error) {
      console.error('Error al guardar evento:', error);
    }
  };

  const handleAddEvent = () => {
    saveEvent(newEvent);
    setNewEvent({
      name: '',
      date: '',
      eventType: '',
      location: '',
      time: '',
      publisher: '',
      attend: false,
    });
    setIsAddEventModalVisible(false);
  };

  const markAttendance = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, attend: !event.attend } : event
      )
    );
    setSelectedEvent(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Próximos Eventos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddEventModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Agregar Evento</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => setSelectedEvent(event)}
          >
            <View style={[styles.card, event.attend && styles.attendedCard]}>
              <Text style={styles.name}>{event.name}</Text>
              <Text style={styles.date}>{event.date}</Text>
              <Text style={styles.type}>{event.eventType}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal para detalles del evento */}
      {selectedEvent && (
        <Modal
          transparent={true}
          visible={true}
          animationType="slide"
          onRequestClose={() => setSelectedEvent(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedEvent.name}</Text>
              <Text>Fecha: {selectedEvent.date}</Text>
              <Text>Tipo: {selectedEvent.eventType}</Text>
              <Text>Ubicación: {selectedEvent.location}</Text>
              <Text>Hora: {selectedEvent.time}</Text>
              <Text>Publicado por: {selectedEvent.publisher}</Text>
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => markAttendance(selectedEvent.id)}
              >
                <Text style={styles.btnText}>
                  {selectedEvent.attend ? 'Cancelar Asistencia' : 'Asistir'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnCerrar}
                onPress={() => setSelectedEvent(null)}
              >
                <Text style={styles.btnText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para agregar evento */}
      <Modal
        transparent={true}
        visible={isAddEventModalVisible}
        animationType="slide"
        onRequestClose={() => setIsAddEventModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Nuevo Evento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={newEvent.name}
              onChangeText={(text) => setNewEvent({ ...newEvent, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha"
              value={newEvent.date}
              onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo de Evento"
              value={newEvent.eventType}
              onChangeText={(text) => setNewEvent({ ...newEvent, eventType: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Ubicación"
              value={newEvent.location}
              onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora"
              value={newEvent.time}
              onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Publicado por"
              value={newEvent.publisher}
              onChangeText={(text) => setNewEvent({ ...newEvent, publisher: text })}
            />

            <TouchableOpacity
              style={styles.btnAdd}
              onPress={handleAddEvent}
            >
              <Text style={styles.btnText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCerrar}
              onPress={() => setIsAddEventModalVisible(false)}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    padding: 8,
    fontSize: 16,
  },
  btnAdd: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnCerrar: {
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  attendedCard: {
    backgroundColor: 'rgba(0, 128, 0, 0.2)', // Fondo verde claro
  },
});

export default HomeScreen;
