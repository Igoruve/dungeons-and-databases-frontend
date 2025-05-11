import { useContext, useEffect, useState } from "react";
import ClassContext from "../../context/ClassContext.jsx";
import { getClassFeaturesByClassId } from "../../utils/classFeatures.js";

function ClassFeatures() {
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
    <section className="section-card-extended">
      <h2 className="h2-card">Class Features</h2>
      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            <strong>{feature.name}:</strong> {feature.description}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ClassFeatures;