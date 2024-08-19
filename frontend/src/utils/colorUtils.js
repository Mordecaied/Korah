// src/utils/colorUtils.js
export const colorOptions = [
    { name: 'blue', hex: '#3B82F6' },
    { name: 'green', hex: '#10B981' },
    { name: 'yellow', hex: '#F59E0B' },
    { name: 'red', hex: '#EF4444' },
    { name: 'purple', hex: '#8B5CF6' },
    { name: 'pink', hex: '#EC4899' },
    { name: 'indigo', hex: '#6366F1' },
    { name: 'gray', hex: '#6B7280' },
  ];
  
  export const getColorByName = (name) => {
    const color = colorOptions.find(c => c.name === name);
    return color ? color.hex : '#6B7280'; // default to gray if not found
  };