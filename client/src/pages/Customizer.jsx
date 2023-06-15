import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config"; // use this to set up url of my backend
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState(""); // AI prompt
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return <AIPicker />;
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    // type can be a logo or full texture. Define on original state
    const decalType = DecalTypes[type]; // Квадратные скобки используются когда имена свойств объекта известны только во время выполнения и могут менятья в зависимости от условий

    // update the state ("logoDecal" and "fullDecal")
    state[decalType.stateProperty] = result;
    // meaning we want to figure out if that decal is currently active be that the logo which now breaks or the texture
    if (!activeEditorTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  // Функция для свитча между логотипом и однотонной футболкой
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logo":
        state.isLogoTexture = !activeEditorTab[tabName];
      case "stylishShirt":
        state.isFullTexture = !activeEditorTab[tabName];
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }
  };

  // To get the reader file data
  const readFile = (type) => {
    reader((result) => {
      // Here we want to pass that file to the decals of the shirt depending on the type of that image
      handleDecals(type, result);
      setActiveEditorTab(""); // it's meaning - reset it
    });
  };

  // !snap.intro - home page
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
            // {...fadeAnimation("left")} - slide from the left
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {/* call the "generateTabContent" */}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* BACK BUTTON */}
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab=""
                handleClick={() => {}}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
