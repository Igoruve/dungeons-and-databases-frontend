import { useState, useEffect } from "react";
import BrowserResults from "../browserResults/BrowserResults";
import {
  getAllClasses,
  getAllItems,
  getAllSkills,
  getAllSpecies,
} from "../../utils/browser.js";

function Browser() {
  const [searchData, setSearchData] = useState({ name: "" });
  const [info, setInfo] = useState([]);
  const [clas, setClas] = useState([]);
  const [species, setSpecies] = useState([]);
  const [items, setItems] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleChange = (evt) => {
    setSearchData((currData) => ({
      ...currData,
      [evt.target.name]: evt.target.value,
    }));
  };

  useEffect(() => {
    async function fetchInfo() {
      const clasData = await getAllClasses();
      const speciesData = await getAllSpecies();
      const itemsData = await getAllItems();
      const skillsData = await getAllSkills();

      setClas(clasData);
      setSpecies(speciesData);
      setItems(itemsData);
      setSkills(skillsData);
    }
    fetchInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const classWithType = clas.map((data) => ({ data, type: "class" }));
    const skillsWithType = skills.map((data) => ({ data, type: "skills" }));
    const speciesWithType = species.map((data) => ({ data, type: "species" }));
    const itemsWithType = items.map((data) => ({ data, type: "items" }));

    const allData = [
      ...classWithType,
      ...skillsWithType,
      ...speciesWithType,
      ...itemsWithType,
    ];

    const filteredData = allData.filter((element) => {
      const name = element.data.name?.toLowerCase() || "";
      return name.includes(searchData.name.toLowerCase());
    });

    console.log("Filtered data:", filteredData);

    setInfo(filteredData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search all content..."
          required
          name="name"
          id="name"
          onChange={handleChange}
          value={searchData.name}
        />
        <button type="submit">Search</button>
      </form>
      <BrowserResults results={info} />
    </>
  );
}

export default Browser;
