import type { Country } from "../../types/country";

interface Props {
  countries: Country[];
  onSort: (field: keyof Country) => void;
  sortField: keyof Country;
  sortOrder: "asc" | "desc";
}

const CountryTable: React.FC<Props> = ({
  countries,
  onSort,
  sortField,
  sortOrder,
}) => {
  const renderSortIcon = (field: keyof Country) => {
    if (sortField !== field) return " ⇅";

    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  return (
    <div
      style={{
        overflowX: "auto",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        marginTop: "20px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "1100px",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#1e293b",
              color: "white",
              textAlign: "left",
            }}
          >
            <th style={{ ...thStyle, width: "22%" }}>Name</th>

            <th style={{ ...thStyle, width: "16%" }}>Capital</th>

            <th
              style={{ ...thStyle, width: "16%" }}
              onClick={() => onSort("continent")}
            >
              Continent{renderSortIcon("continent")}
            </th>

            <th style={{ ...thStyle, width: "10%" }}>FIFA Code</th>

            <th style={{ ...thStyle, width: "10%" }}>Area</th>

            <th style={{ ...thStyle, width: "12%" }}>Language</th>

            <th style={{ ...thStyle, width: "14%" }}>Population</th>
          </tr>
        </thead>

        <tbody>
          {countries.map((country, index) => (
            <tr
              key={country.name}
              style={{
                backgroundColor: index % 2 === 0 ? "#f8fafc" : "#ffffff",
                transition: "0.2s",
              }}
            >
              <td style={tdStyle}>{country.name}</td>

              <td style={tdStyle}>{country.capital}</td>

              <td style={tdStyle}>{country.continent}</td>

              <td style={tdStyle}>{country.fifaCode}</td>

              <td style={tdStyle}>{country.area.toLocaleString()}</td>

              <td style={tdStyle}>{country.language}</td>

              <td style={tdStyle}>{country.population.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: "16px",
  fontSize: "14px",
  fontWeight: "bold",
  cursor: "pointer",
  userSelect: "none",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderBottom: "1px solid #e2e8f0",
  fontSize: "14px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export default CountryTable;
