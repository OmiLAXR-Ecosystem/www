import React from 'react';

// Rendered as static HTML; the search box is wired up by src/scripts/interactions.ts (data-table).
const Table = ({ columns, data }) => {
    return (
        <div className="w-full mx-auto" data-table>
            {/* Search Input */}
            <input
                type="search"
                placeholder="Search..."
                aria-label="Search table"
                data-table-search
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
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} data-table-row className="hover:bg-gray-50">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-4 py-2 border-b">
                                    {row[col]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr data-table-empty hidden={data.length > 0}>
                        <td colSpan={columns.length} className="px-4 py-2 text-center">
                            No results found
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
