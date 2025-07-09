import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ChevronDownIcon, ChevronRightIcon } from '../icons';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  fixedLabel?: boolean;
}

export default function Dropdown({
  label,
  options,
  selectedValue,
  onValueChange,
  fixedLabel,
}: DropdownProps) {
  const [visible, setVisible] = React.useState(false);
  const selectedLabel =
    options.find(o => o.value === selectedValue)?.label || '';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selector, visible && styles.selectorActive]}
        onPress={() => setVisible(v => !v)}
        activeOpacity={0.7}
      >
        <Text style={styles.selectedText}>
          {fixedLabel ? label : selectedLabel || label}
        </Text>
        {visible ? <ChevronRightIcon styles={styles.icon}/> : <ChevronDownIcon styles={styles.icon}/>}
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdownInline}>
          <FlatList
            data={options}
            keyExtractor={item => item.value}
            renderItem={({ item }) => (
              <View style={styles.optionGap}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === selectedValue && styles.optionSelected,
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setVisible(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === selectedValue && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    minHeight: 48,
    shadowColor: '#000',
  },
  selectorActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  label: {
    fontWeight: '400',
    fontSize: 14,
    color: '#222',
  },
  selectedText: {
    fontSize: 16,
    color: '#222',
    flex: 1,
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
  dropdownInline: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  optionGap: {
    marginBottom: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 3,
    backgroundColor: '#f8f8f8',
  },
  optionSelected: {
    backgroundColor: '#00B4E4',
  },
  optionText: {
    fontSize: 14,
    color: '#222',
  },
  optionTextSelected: {
    color: '#fff',
  },
});
