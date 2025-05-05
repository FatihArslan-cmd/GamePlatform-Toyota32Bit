const generateTombalaCard = () => {
  let card = Array(3)
    .fill(null)
    .map(() => Array(9).fill(null));

  const columnRanges = [
    [1, 9],   // 1-9
    [10, 19], // 10-19
    [20, 29], // 20-29
    [30, 39], // 30-39
    [40, 49], // 40-49
    [50, 59], // 50-59
    [60, 69], // 60-69
    [70, 79], // 70-79
    [80, 90], // 80-90 (Düzeltildi: 90 dahil)
  ];

  const positions1 = [
    [0, 0], [0, 2], [0, 4], [0, 6], [0, 8],
    [1, 1], [1, 3], [1, 5], [1, 7], [1, 8],
    [2, 0], [2, 2], [2, 4], [2, 6], [2, 8],
  ];

  const positions2 = [
    [0, 1], [0, 3], [0, 5], [0, 6], [0, 8],
    [1, 0], [1, 2], [1, 4], [1, 6], [1, 8],
    [2, 1], [2, 3], [2, 5], [2, 7], [2, 8],
  ];

  const positions = Math.random() < 0.5 ? positions1 : positions2;

  const columns = new Map();
  positions.forEach(([row, col]) => {
    if (!columns.has(col)) {
      columns.set(col, []);
    }
    columns.get(col).push(row);
  });

  const usedNumbers = new Set();
  const previousColumnValues = new Array(9).fill(0);

  columns.forEach((rows, col) => {
    const [min, max] = columnRanges[col];
    const totalCells = rows.length;
    let currentCellIndex = 0;

    rows.sort((a, b) => a - b); 

    rows.forEach(row => {
      let num;
      let attempts = 0;
      const remainingCells = totalCells - currentCellIndex - 1;

      do {
        const currentMin = Math.max(min, previousColumnValues[col] + 1);
        const maxPossible = max - remainingCells;
        if (currentMin > maxPossible) {
          throw new Error(`No valid number for column ${col}, row ${row}`);
        }

        num = Math.floor(Math.random() * (maxPossible - currentMin + 1)) + currentMin;
        attempts++;

        if (attempts > 100) {
          throw new Error(`Cannot generate number for column ${col} after 100 attempts`);
        }
      } while (usedNumbers.has(num));

      card[row][col] = num;
      usedNumbers.add(num);
      previousColumnValues[col] = num;
      currentCellIndex++;
    });
  });

  return card;
};

module.exports = generateTombalaCard;