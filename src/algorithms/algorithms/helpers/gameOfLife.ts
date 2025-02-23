

// Helper function: Given a zero-indexed number, returns an Excel-style column label (e.g., 0 -> "A", 25 -> "Z", 26 -> "AA")
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

function createGrid(numRows: number, numCols: number, initialValue = 0) {
    const grid = [];
    for (let i = 0; i < numRows; i++) {
        // Create a new array for each row, initialized with a default value (like 0 or false)
        const row = new Array(numCols).fill(initialValue);
        grid.push(row);
    }
    return grid;
}

export const getGrid = () => {
    const grid = createGrid(36, 100)
    return grid
}
