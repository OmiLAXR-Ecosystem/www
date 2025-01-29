import React, {useState} from 'react';

const Table = ({ columns, data }) => {
    const [search, setSearch] = useState('');

    // Filter data based on search input
    const filteredData = data.filter(row =>
        columns.some(col =>
            String(row[col]).toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <div className="w-full mx-auto">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="px-4 py-2 border-b text-left">
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-4 py-2 border-b">
                                        {row[col]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-2 text-center">
                                No results found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
