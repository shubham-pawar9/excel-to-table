import React, { useState } from "react";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import "./Main.css";
const Main = () => {
  const [data, setData] = useState();
  const handleUpload = (event) => {
    const file = event.target.files[0];
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setData(() => [resp]);
      }
    });
  };

  return (
    <>
      <div className="mainDiv">
        <div class="inputDiv">
          <input type="file" name="file" onChange={handleUpload} />
        </div>
        {data && (
          <table>
            <thead>
              <tr>
                {data[0].rows[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data[0].rows.slice(1).map((row, rowIndex) =>
                // (row, rowIndex) => console.log(row[rowIndex])
                row[rowIndex] != undefined ? (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Main;
