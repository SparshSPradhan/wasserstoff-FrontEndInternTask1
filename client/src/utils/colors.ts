export const userColors = [
    '#FF5733', // Coral
    '#33FF57', // Light Green
    '#3357FF', // Blue
    '#FF33D1', // Pink
    '#33FFF5', // Turquoise
    '#FFFF33', // Yellow
    '#FF33FF', // Magenta
    '#33FFFF', // Cyan
    '#FF5733', // Orange
    '#AB33FF', // Purple
  ];
  
  export const getRandomColor = (): string => {
    const index = Math.floor(Math.random() * userColors.length);
    return userColors[index];
  };