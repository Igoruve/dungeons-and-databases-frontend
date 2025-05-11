import { useContext, useEffect, useState } from "react";
import ClassContext from "../../context/ClassContext.jsx";
import { getClassFeaturesByClassId } from "../../utils/classFeatures.js";

function ClassFeatures({ onBack }) {
  const { selectedClassId } = useContext(ClassContext);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedClassId) {
      getClassFeaturesByClassId(selectedClassId)
        .then((data) => {
          setFeatures(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching class features:", error);
          setLoading(false);
        });
    }
  }, [selectedClassId]);

  if (!selectedClassId) {
    return <p>No class selected.</p>;
  }

  if (loading) {
    return <p>Loading class features...</p>;
  }

  return (
    <section className="section-card-extended bg-zinc-200 dark:bg-zinc-800">
      <button className="back-button" onClick={onBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </button>

      <h2 className="h2-list">Class Features</h2>

      <div>
        {features.map((feature) => (
          <div key={feature.id}>
            <p className="par underline underline-offset-2 uppercase pt-4">{feature.name}</p>
            <p className="par">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ClassFeatures;
