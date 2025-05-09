import { useState } from "react";
import ClassCard from "../classCard/classCard";
import ItemCard from "../itemCard/itemCard";
import SkillsCard from "../skillsCard/skillsCard";
import SpeciesCard from "../SpeciesCard/SpeciesCard";

function BrowserResults({ results }) {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {results.map((i) => {
        const key = `${i.type}-${
          i.data.class_id ||
          i.data.id ||
          i.data.item_id ||
          i.data.species_id ||
          "unknown"
        }-${i.data.name || "unknown"}`;

        return (
          <>
            <section
              className="w-full bg-zinc-100 dark:bg-zinc-800 min-h-40 gap-4 rounded-md mb-4"
              key={key}
            >
              {i.type === "class" && <ClassCard data={i.data} />}
              {i.type === "items" && <ItemCard data={i.data} />}
              {i.type === "skills" && <SkillsCard data={i.data} />}
              {i.type === "species" && <SpeciesCard data={i.data} />}
            </section>
            <hr className="border-t border-zinc-500 w-full" />
          </>
        );
      })}
    </div>
  );
}

export default BrowserResults;
