import React from "react";
import Description from "./Description";
import MainData from "./MainData";

import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-section">
        <h1>Background</h1>
        <p>
          Starting the journey of higher education can be a daunting experience.
          From choosing a path that could define your future career, to figuring
          out suitable institutions to even start applying to, it can feel
          overwhelming. Universities also set high admission standards, which
          can feel like the odds are stacked against you before you even start.
        </p>
        <p>
          However, the landscape of college admissions is changing. More
          universities are broadening their admission criteria, aiming for a
          diverse and inclusive student body. Despite these positive changes,
          many students remain unaware of the multitude of paths available to
          them for gaining admission.
        </p>
      </div>
      <div className="about-section">
        <h1>Our Goals</h1>
        <p>
          At Admission Compass, our goal is to help potential students with the
          admissions process. Our mission is to empower students with clear,
          accessible information, ensuring that students have the knowledge they
          need about the different admissions requirements available to them.
        </p>
      </div>
    </div>
  );
};

export default About;
