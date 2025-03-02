const generateTombalaCard = () => {
    let card = Array(3)
      .fill(null)
      .map(() => Array(9).fill(null));

    const columnRanges = [
      [1, 10], [10, 20], [20, 30], [30, 40],
      [40, 50], [50, 60], [60, 70], [70, 80], [80, 90],
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
    let previousColumnValues = new Array(9).fill(0);

    positions.forEach(([row, col]) => {
      const [min, max] = columnRanges[col];
      let num;
      do {
        const currentMin = Math.max(min, previousColumnValues[col] + 1);
        num = Math.floor(Math.random() * (max - currentMin)) + currentMin;
      } while (num > max);

      card[row][col] = num;
      previousColumnValues[col] = num;
    });

    return card;
  };

  module.exports = generateTombalaCard;