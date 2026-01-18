import React from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { X, Trash2, Clock } from 'lucide-react-native';
import { COLORS } from '../constants/theme';
import { useCalcStore } from '../store/useCalcStore';

const HistoryDrawer = ({ visible, onClose }) => {
  const { history, clearHistory, restoreHistory } = useCalcStore();

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Clock size={20} color={COLORS.accent} />
                <Text style={styles.title}> History</Text>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity onPress={clearHistory} style={{ marginRight: 20 }}>
                    <Trash2 size={24} color={COLORS.error} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                    <X size={24} color={COLORS.textDim} />
                </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={history}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ paddingBottom: 40 }}
            ListEmptyComponent={
              <Text style={styles.empty}>No calculation history</Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.item} 
                onPress={() => { restoreHistory(item); onClose(); }}
              >
                <Text style={styles.expr}>{item.expression}</Text>
                <Text style={styles.res}>= {item.result}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  container: { 
    height: '60%', 
    backgroundColor: COLORS.surface, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 24 
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  title: { color: COLORS.text, fontSize: 20, fontWeight: 'bold' },
  item: { 
    backgroundColor: COLORS.bg, 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333'
  },
  expr: { color: COLORS.textDim, fontSize: 16, marginBottom: 4, textAlign: 'right' },
  res: { color: COLORS.accent, fontSize: 24, fontWeight: '600', textAlign: 'right' },
  empty: { color: COLORS.textDim, textAlign: 'center', marginTop: 50 }
});

export default HistoryDrawer;