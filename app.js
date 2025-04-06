const greymassEndpoint = 'https://wax.greymass.com';

// Function to fetch data from Greymass API
async function fetchTableData(tableName) {
    try {
        const response = await fetch(`${greymassEndpoint}/v1/chain/get_table_rows`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: 'prospectors',
                scope: 'prospectors',
                table: tableName,
                json: true,
                limit: 100
            })
        });
        const data = await response.json();
        return data.rows;
    } catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return [];
    }
}

// Initialize page-specific logic when DOM is ready
$(document).ready(async function() {
    const path = window.location.pathname;

    // Resources Page
    if (path.includes('resources.html')) {
        const resources = await fetchTableData('resources');
        const tbody = $('#resourcesBody');
        resources.forEach(resource => {
            tbody.append(`
                <tr>
                    <td>${resource.id || 'N/A'}</td>
                    <td>${resource.type || 'Unknown'}</td>
                    <td>${resource.amount || 0}</td>
                </tr>
            `);
        });
        $('#resourcesTable').DataTable();
    }

    // Workers Page
    if (path.includes('workers.html')) {
        const workers = await fetchTableData('workers');
        const tbody = $('#workersBody');
        workers.forEach(worker => {
            tbody.append(`
                <tr>
                    <td>${worker.id || 'N/A'}</td>
                    <td>${worker.owner || 'Unknown'}</td>
                    <td>${worker.location || 'N/A'}</td>
                </tr>
            `);
        });
        $('#workersTable').DataTable();
    }

    // Land History Page
    if (path.includes('land-history.html')) {
        const lands = await fetchTableData('lands');
        const tbody = $('#landsBody');
        lands.forEach(land => {
            tbody.append(`
                <tr>
                    <td>${land.id || 'N/A'}</td>
                    <td>${land.owner || 'Unknown'}</td>
                    <td>${land.price || 'N/A'}</td>
                </tr>
            `);
        });
        $('#landsTable').DataTable();
    }

    // Tools Page (Bank History as an example)
    if (path.includes('tools.html')) {
        const bankData = await fetchTableData('bank'); // Adjust table name as needed
        const tbody = $('#bankBody');
        bankData.forEach(transaction => {
            tbody.append(`
                <tr>
                    <td>${transaction.id || 'N/A'}</td>
                    <td>${transaction.amount || 0}</td>
                    <td>${transaction.date || 'N/A'}</td>
                </tr>
            `);
        });
        $('#bankTable').DataTable();
    }
});
