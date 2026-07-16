import { AnimatePresence, motion } from "motion/react";
import "./TrashZone.css";

function TrashZone({ isDragging, isActive }) {
  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          className={
            isActive
              ? "trash-zone trash-zone-active"
              : "trash-zone"
          }
          initial={{
            opacity: 0,
            scale: 0.8,
            x: 30,
          }}
          animate={{
            opacity: 1,
            scale: isActive ? 1.08 : 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            x: 30,
          }}
        >
          <span className="trash-icon">🗑️</span>
          <span>
            {isActive ? "Release to delete" : "Drag here"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TrashZone;