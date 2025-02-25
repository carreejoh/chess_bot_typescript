function getColumnLabel(n: number) {
    let label = '';
    while (n >= 0) {
        label = String.fromCharCode((n % 26) + 65) + label;
        n = Math.floor(n / 26) - 1;
    }
    return label;
}

// Generate 150 columns
const columns = [];
for (let i = 0; i < 150; i++) {
    columns.push(getColumnLabel(i));
}

// Generate 100 rows (as strings)
const rows = [];
for (let i = 1; i <= 100; i++) {
    rows.push(i.toString());
}

export const createGrid = (numRows: number, numCols: number, initialValue = 0) => {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
        const row = new Array(numCols).fill(initialValue);
        grid.push(row);
    }
    return grid;
}

export const createGridForMaze = (numRows: number, numCols: number, initialValue = 0) => {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
        const row = new Array(numCols).fill(initialValue);
        grid.push(row);
    }

    // Make walls 
    grid[0].fill(1)
    grid[35].fill(1)

    grid.forEach((row) => {
        row[0] = 1
        row[99] = 1
    })

    // Entrance and exit
    grid[0][1] = 0
    grid[35][98] = 0

    return grid;
  }