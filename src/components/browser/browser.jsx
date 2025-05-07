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
      <section className="bg-zinc-50 dark:bg-zinc-800 min-h-screen py-10 mb-8">
        <h2 className="h2-list text-zinc-900 dark:text-zinc-100">Search</h2>
        <article className=" py-8 flex flex-row min-h-40 gap-4 sticky top-0 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 max-w-screen-lg mx-auto mb-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row w-full justify-around gap-4 px-4"
          >
            <input
              className="bg-zinc-200 dark:bg-zinc-600 dark:bg-opacity-30 rounded-md px-4 py-2 flex-grow text-zinc-900 dark:text-zinc-100 shadow-inner"
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
                className="w-6 h-6 mb-1 text-zinc-300 dark:text-zinc-100"
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
