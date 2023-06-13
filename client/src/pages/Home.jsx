import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = () => {
  const snap = useSnapshot(state);
  // "AnimatePresence" компонент framer-motion, который используется для появления анимации в React-приложениях. Выступает как обёртка объектов, которые должны быть анимированы при добавлении и удалении и DOM.
  return (
    <AnimatePresence>
      {/* If we are on the the snap.intro in that case we can render the home page data */}
      {snap.intro && (
        // motion.div применяется к div, позволяет определить различные свойства анимации (initial, animate, exit)
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT.
              </h1>
            </motion.div>
            <motion.div>
              <p>
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                and define your own style.
              </p>
            </motion.div>
          </motion.div>
          {/* div */}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
