import { useState, useContext } from "react";
import { motion } from "framer-motion";
import RouteContext from "../../context/RouterContext.jsx";
import ClassContext from "../../context/ClassContext.jsx";

function ClassCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  const { onRouteChange } = useContext(RouteContext);
  const { setSelectedClassId } = useContext(ClassContext);

  console.log("Data in ClassCard:", data);

  const handleNavigate = () => {
    console.log("Selected Class ID:", data.class_id); // Cambiado a data.class_id
    setSelectedClassId(data.class_id); // Cambiado a data.class_id
    onRouteChange("classFeatures");
  };

  return (
    <section className="section-card">
      <div className="div-card" onClick={() => setExpanded(!expanded)}>
        <h2 className="h2-card-browser">
          <strong>{data.name}</strong>
        </h2>
        <p className="par-low-opacity pb-3">{data.description}</p>

        <motion.div
          className="div-card-content"
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={{
            maxHeight: expanded ? "1000px" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          style={{
            overflow: "hidden",
          }}
        >
          <p className="par">
            <strong>Hit Die:</strong> {data.hit_die}.
          </p>
          <p className="par">
            <strong>Main Stat:</strong> {data.main_stat}.
          </p>
          <p className="par">
            <strong>Caster:</strong> {data.caster === 1 ? "yes" : "no"}.
          </p>
          <button
            className="text-red-500 text-lg font-bold underline mt-4"
            onClick={handleNavigate}
          >
            View Class Features
          </button>
        </motion.div>
      </div>
      <div className="div-card-button">
        <button className="button-card" onClick={() => setExpanded(!expanded)}>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#ef4444"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </motion.svg>
        </button>
      </div>
    </section>
  );
}

export default ClassCard;
