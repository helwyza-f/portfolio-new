import React, { useEffect, useState } from "react";
import projects from "../data/projects"; // Impor data proyek dari file yang di-hardcode
import certificates from "../data/certificates"; // Impor data sertifikat dari file yang di-hardcode
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Data untuk tech stack
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${
            isShowingMore
              ? "group-hover:-translate-y-0.5"
              : "group-hover:translate-y-0.5"
          }
        `}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = (type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  };

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
          >
            <Tab
              icon={
                <Code className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Projects"
              sx={{
                bgcolor:
                  value === 0 ? "rgba(255, 255, 255, 0.1)" : "transparent",
                color: value === 0 ? "white" : "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
                borderRadius: "10px",
                transition: "background-color 0.3s",
              }}
            />
            <Tab
              icon={
                <Award className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Certificates"
              sx={{
                bgcolor:
                  value === 1 ? "rgba(255, 255, 255, 0.1)" : "transparent",
                color: value === 1 ? "white" : "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
                borderRadius: "10px",
                transition: "background-color 0.3s",
              }}
            />
            <Tab
              icon={
                <Boxes className="mb-2 w-5 h-5 transition-all duration-300" />
              }
              label="Tech Stack"
              sx={{
                bgcolor:
                  value === 2 ? "rgba(255, 255, 255, 0.1)" : "transparent",
                color: value === 2 ? "white" : "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
                borderRadius: "10px",
                transition: "background-color 0.3s",
              }}
            />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                      ? "fade-up"
                      : "fade-up-left"
                  }
                  data-aos-duration={
                    index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                  }
                >
                  <CardProject
                    Img={project.Img}
                    Title={project.Title}
                    Description={project.Description}
                    Link={project.Link}
                    id={project.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {projects.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore("projects")}
                isShowingMore={showAllProjects}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                      ? "fade-up"
                      : "fade-up-left"
                  }
                  data-aos-duration={
                    index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                  }
                >
                  <Certificate ImgSertif={certificate.Img} />
                </div>
              ))}
            </div>
          </div>
          {certificates.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore("certificates")}
                isShowingMore={showAllCertificates}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                      ? "fade-up"
                      : "fade-up-left"
                  }
                  data-aos-duration={
                    index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                  }
                >
                  <TechStackIcon
                    TechStackIcon={stack.icon}
                    Language={stack.language}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
