import { useState, useEffect } from "react";
import "./App.css";

import type { Country } from "./types/country";
import { getCountries } from "./services/countryServicio";
import CountryTable from "./components/CountryTable/CountryTable";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Country>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredCountries(filtered);
  }, [search, countries]);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const data = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (err) {
      setError("Error fetching countries");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: keyof Country) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";

    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredCountries].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return order === "asc" ? aValue - bValue : bValue - aValue;
      }

      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

    setFilteredCountries(sorted);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Countries</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
      <CountryTable
        countries={filteredCountries}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </div>
  );
}

export default App;
