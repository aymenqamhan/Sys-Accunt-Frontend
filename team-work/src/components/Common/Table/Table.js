import React from 'react';
import './Table.css';


const Table = ({ columns, data }) => {
  if (!data || data.length === 0) {
    return <p>لا توجد بيانات لعرضها.</p>;
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>

            ))}
          </tr>
        </thead>
        <tbody>
          {
            data.map((row, rowIndex) => (
              <tr key={row.user_id || rowIndex}>
                {columns.map((col) => (

                  <td key={`${col.key}-${row.user_id || rowIndex}`}>
                    {/* التحقق من وجود دالة عرض مخصصة للعمود */}
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;