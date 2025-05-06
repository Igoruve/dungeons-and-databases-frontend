import { useState, useEffect, useContext } from "react";
import BrowserResults from "../browserResults/BrowserResults";
import {
  getAllClasses,
  getAllItems,
  getAllSkills,
  getAllSpecies,
} from "../../utils/browser.js";
import { AuthContext } from "../../context/AuthContext";
import RouteContext from "../../context/RouterContext";

function Browser() {
  const [searchData, setSearchData] = useState({ name: "" });
  const [info, setInfo] = useState([]);
  const [clas, setClas] = useState([]);
  const [species, setSpecies] = useState([]);
  const [items, setItems] = useState([]);
  const [skills, setSkills] = useState([]);

  const { userData } = useContext(AuthContext);
  const { onRouteChange } = useContext(RouteContext);

  useEffect(() => {
    if (!userData) {
      onRouteChange("login");
    } else {
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
    }
  }, [userData, onRouteChange]);

  const handleChange = (evt) => {
    setSearchData((currData) => ({
      ...currData,
      [evt.target.name]: evt.target.value,
    }));
  };

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
      <section className="bg-primaryBg min-h-screen py-10 mb-8">
        <h2 className="absolute text-white top-0 left-0 right-0 text-center py-4">
          Search
        </h2>
        <article className="w-100 px-4 py-8 mx-4 flex flex-row min-h-40 gap-4 rounded-md">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row w-full justify-arround gap-4"
          >
            <input
              className="bg-white bg-opacity-10 rounded-md px-4 py-2 flex-grow"
              type="text"
              placeholder="Search all content..."
              required
              name="name"
              id="name"
              onChange={handleChange}
              value={searchData.name}
            />
            <button type="submit">
              <svg
                className="w-6 h-6 mb-1 text-white"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </button>
          </form>
        </article>
        <BrowserResults results={info} />
      </section>
    </>
  );
}

export default Browser;
