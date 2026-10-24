document.querySelectorAll(".standings-sort").forEach(sortSelect => {
    const table = sortSelect.closest(".league-section").querySelector(".standings-table");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);
    const playerRows = rows.filter(row => !row.classList.contains("open-row"));
    const otherRows = rows.filter(row => row.classList.contains("open-row"));

    function cellValue(row, index) {
        return row.cells[index].textContent.trim();
    }

    function compareRank(a, b) {
        return Number.parseInt(cellValue(a, 0), 10) - Number.parseInt(cellValue(b, 0), 10);
    }

    function sortRows() {
        const sortBy = sortSelect.value;
        const columns = {
            points: { index: 6, numeric: true },
            wins: { index: 3, numeric: true },
            draws: { index: 4, numeric: true },
            losses: { index: 5, numeric: true },
            name: { index: 1, numeric: false },
            school: { index: 2, numeric: false },
        };
        const column = columns[sortBy];

        playerRows.sort((a, b) => {
            if (sortBy === "rank") {
                return compareRank(a, b);
            }

            const valueA = cellValue(a, column.index);
            const valueB = cellValue(b, column.index);
            const comparison = column.numeric
                ? Number.parseFloat(valueB) - Number.parseFloat(valueA)
                : valueA.localeCompare(valueB, undefined, { sensitivity: "base" });

            return comparison || compareRank(a, b);
        });

        const fragment = document.createDocumentFragment();
        playerRows.forEach(row => fragment.appendChild(row));
        otherRows.forEach(row => fragment.appendChild(row));
        tbody.appendChild(fragment);
    }

    sortSelect.addEventListener("change", sortRows);
});
