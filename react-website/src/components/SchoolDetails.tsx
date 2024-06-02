import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Plotly from "plotly.js-dist";
import axios from "axios";
import "./SchoolDetails.css";
import "./Form.css";

interface FeatureImportance {
  Feature: string;
  Total_Importance: number;
}
interface Institution {
  ID: number;
  Name: string;
}

interface Degree {
  ID: number;
  Name: string;
}

interface Type {
  TypeId: number;
  Type: string;
}
interface sqlTable {
  minAvgGrade: number;
  maxAvgGrade: number;
}

const SchoolDetails: React.FC = () => {
  const { selectedNameId, selectedType, selectedDegreeId } = useParams<{
    selectedNameId?: string;
    selectedType?: string;
    selectedDegreeId?: string;
  }>();
  const [nameData, setNameData] = useState<Institution[]>([]);
  const [typeData, setTypeData] = useState<Type[]>([]);
  const [degreeData, setDegreeData] = useState<Degree[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [table1, setTable1] = useState<sqlTable[]>([]);
  const [table2, setTable2] = useState<sqlTable[]>([]);
  const [table3, setTable3] = useState<sqlTable[]>([]);
  const [table4, setTable4] = useState<sqlTable[]>([]);
  const [table5, setTable5] = useState<sqlTable[]>([]);
  const [bagrutOnly, setBagrutOnly] = useState<sqlTable[]>([]);
  const [bagruPsyOnly, setBagrutPsyOnly] = useState<sqlTable[]>([]);
  const [bagruPsyPrepOnly, setBagrutPsyPrepOnly] = useState<sqlTable[]>([]);
  const [bagruAcaPrepOnly, setBagrutAcaPrepOnly] = useState<sqlTable[]>([]);
  const [bagruAcaDegPrepOnly, setBagrutAcaDegPrepOnly] = useState<sqlTable[]>(
    []
  );
  const [allStuff, setAll] = useState<sqlTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const response = await axios.get<Institution[]>(
          `http://localhost:8800/results1/${selectedNameId}`
        );
        setNameData(response.data);
        console.log(nameData);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    const fetchType = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const response = await axios.get<Type[]>(
          `http://localhost:8800/results2/${selectedType}`
        );
        setTypeData(response.data);
        console.log(typeData);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    const fetchDegree = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const response = await axios.get<Degree[]>(
          `http://localhost:8800/results3/${selectedDegreeId}`
        );
        setDegreeData(response.data);
        console.log(degreeData);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    const fetchTable1 = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQL/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setTable1(response.data);

        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    const fetchTable2 = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLP/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setTable2(response.data);
        console.log(response.data);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };

    const fetchTable3 = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLPr/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setTable3(response.data);
        console.log(response.data);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };

    const fetchTable4 = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLAc/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setTable4(response.data);
        console.log(response.data);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    const fetchTable5 = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLDe/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setTable5(response.data);
        console.log(response.data);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    const fetchBagrutOnly = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLBagOnly/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setBagrutOnly(response.data);
        console.log(response.data);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };

    const fetchBagrutPsychOnly = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLBagPsyOnly/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setBagrutPsyOnly(response.data);
        console.log(response.data);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };

    const fetchBagrutPsychPrepOnly = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLBagPsyPrepOnly/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setBagrutPsyPrepOnly(response.data);
        console.log(response.data);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };

    const fetchBagrutAcaPrepOnly = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLBagAcaPrepOnly/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setBagrutAcaPrepOnly(response.data);
        console.log(response.data);

        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    const fetchBagrutAcaDegPrepOnly = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLBagAcaDegPrepOnly/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setBagrutAcaDegPrepOnly(response.data);
        console.log(response.data);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    const fetchAll = async () => {
      setLoading(true); // Set loading state to true before fetching data
      try {
        const typeName =
          selectedType === "1"
            ? "B.Sc."
            : selectedType === "2"
            ? "M.Sc."
            : selectedType === "3"
            ? "B.A."
            : selectedType === "4"
            ? "M.A."
            : "";
        console.log(typeName);
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/resultsSQLAll/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );

        setAll(response.data);
        console.log(response.data);
        console.log(allStuff);
        setLoading(false); // Set loading state to false after successful data fetch
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false); // Set loading state to false in case of error
      }
    };
    if (selectedNameId && selectedNameId && selectedType) {
      fetchAll();
      fetchBagrutAcaDegPrepOnly();
      fetchBagrutAcaPrepOnly();
      fetchBagrutPsychPrepOnly();
      fetchBagrutPsychOnly();
      fetchBagrutOnly();
      fetchTable5();
      fetchTable4();
      fetchTable3();
      fetchTable2();
      fetchTable1();
      fetchData();
      fetchType();
      fetchDegree();
    }
  }, [selectedNameId, selectedType, selectedDegreeId]);

  useEffect(() => {
    if (selectedNameId && selectedType && selectedDegreeId) {
      console.log("Params:", {
        selectedNameId,
        selectedType,
        selectedDegreeId,
      });
      handleShapAnalysis();
    } else {
      console.error("One or more parameters are undefined.");
    }
  }, [selectedNameId, selectedType, selectedDegreeId]);

  const handleShapAnalysis = async () => {
    try {
      console.log("Sending data to backend:", {
        degree_id: selectedDegreeId,
        institution_id: selectedNameId,
        Type: selectedType,
      });

      const response = await fetch("http://localhost:5000/shap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          degree_id: selectedDegreeId ? parseInt(selectedDegreeId) : undefined,
          institution_id: selectedNameId ? parseInt(selectedNameId) : undefined,
          Type: selectedType ? parseInt(selectedType) : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: FeatureImportance[] = await response.json();
      console.log("Received data from backend:", data);

      const top5Features = data.slice(0, 5);
      const featureImportances = [
        {
          x: top5Features.map((entry) => entry.Feature),
          y: top5Features.map((entry) => entry.Total_Importance),
          type: "bar" as Plotly.PlotType,
        },
      ];

      Plotly.newPlot("graph", featureImportances, {
        title: "Most Influential Academic Factors at this School",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p>
        {nameData.length > 0 && nameData[0].Name} -{" "}
        {typeData.length > 0 && typeData[0].Type} -{" "}
        {degreeData.length > 0 && degreeData[0].Name}
      </p>
      <div>
        {nameData.length > 0 &&
          typeData.length > 0 &&
          degreeData.length > 0 && (
            <div>
              <p>Bagrut Averages</p>
              <div className="container">
                <div
                  className="skills html"
                  style={{
                    width: `100%`,
                    backgroundColor: "#ddd",
                    position: "relative",
                    color: "white", // Set text color for values
                  }}
                >
                  <div
                    className="green-bar"
                    style={{
                      marginLeft: `${table1[0].minAvgGrade}%`,
                      width: `${
                        table1[0].maxAvgGrade - table1[0].minAvgGrade
                      }%`,
                      backgroundColor: "#04AA6D",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Align text to the ends
                      alignItems: "center", // Center vertically
                      padding: "0 5px", // Add padding for better readability
                    }}
                  >
                    <span>{table1[0].minAvgGrade}</span>
                    <span>{table1[0].maxAvgGrade}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div>
        {nameData.length > 0 &&
          typeData.length > 0 &&
          degreeData.length > 0 && (
            <div>
              <p>Psychometric Scores</p>
              <div className="container">
                <div
                  className="skills html"
                  style={{
                    width: `100%`,
                    backgroundColor: "#ddd",
                    position: "relative",
                    color: "white", // Set text color for values
                  }}
                >
                  <div
                    className="green-bar"
                    style={{
                      marginLeft: `${(table2[0].minAvgGrade - 200) / 6}%`, // Adjusted for range 200-800
                      width: `${
                        (table2[0].maxAvgGrade - table2[0].minAvgGrade) / 6
                      }%`, // Adjusted for range 200-800
                      backgroundColor: "#04AA6D",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Align text to the ends
                      alignItems: "center", // Center vertically
                      padding: "0 5px", // Add padding for better readability
                    }}
                  >
                    <span>{table2[0].minAvgGrade}</span>
                    <span>{table2[0].maxAvgGrade}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div>
        {nameData.length > 0 &&
          typeData.length > 0 &&
          degreeData.length > 0 && (
            <div>
              <p>Preparatory Courses Averages</p>
              <div className="container">
                <div
                  className="skills html"
                  style={{
                    width: `100%`,
                    backgroundColor: "#ddd",
                    position: "relative",
                    color: "white", // Set text color for values
                  }}
                >
                  <div
                    className="green-bar"
                    style={{
                      marginLeft: `${table3[0].minAvgGrade}%`,
                      width: `${
                        table3[0].maxAvgGrade - table3[0].minAvgGrade
                      }%`,
                      backgroundColor: "#04AA6D",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Align text to the ends
                      alignItems: "center", // Center vertically
                      padding: "0 5px", // Add padding for better readability
                    }}
                  >
                    <span>{table3[0].minAvgGrade}</span>
                    <span>{table3[0].maxAvgGrade}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div>
        {nameData.length > 0 &&
          typeData.length > 0 &&
          degreeData.length > 0 && (
            <div>
              <p>Academic Courses Averages</p>
              <div className="container">
                <div
                  className="skills html"
                  style={{
                    width: `100%`,
                    backgroundColor: "#ddd",
                    position: "relative",
                    color: "white", // Set text color for values
                  }}
                >
                  <div
                    className="green-bar"
                    style={{
                      marginLeft: `${table4[0].minAvgGrade}%`,
                      width: `${
                        table4[0].maxAvgGrade - table4[0].minAvgGrade
                      }%`,
                      backgroundColor: "#04AA6D",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Align text to the ends
                      alignItems: "center", // Center vertically
                      padding: "0 5px", // Add padding for better readability
                    }}
                  >
                    <span>{table4[0].minAvgGrade}</span>
                    <span>{table4[0].maxAvgGrade}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div>
        {nameData.length > 0 &&
          typeData.length > 0 &&
          degreeData.length > 0 && (
            <div>
              <p>Degree Averages</p>
              <div className="container">
                <div
                  className="skills html"
                  style={{
                    width: `100%`,
                    backgroundColor: "#ddd",
                    position: "relative",
                    color: "white", // Set text color for values
                  }}
                >
                  <div
                    className="green-bar"
                    style={{
                      marginLeft: `${table5[0].minAvgGrade}%`,
                      width: `${
                        table5[0].maxAvgGrade - table5[0].minAvgGrade
                      }%`,
                      backgroundColor: "#04AA6D",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between", // Align text to the ends
                      alignItems: "center", // Center vertically
                      padding: "0 5px", // Add padding for better readability
                    }}
                  >
                    <span>{table5[0].minAvgGrade}</span>
                    <span>{table5[0].maxAvgGrade}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div>
        {nameData.length > 0 &&
          typeData.length > 0 &&
          degreeData.length > 0 && (
            <div>
              <p>Students were Accepted in these Ways</p>
              <div className="container">
                <p>
                  Bagrut, Psychometric, Preparatory Courses, Academic Courses,
                  Previous Degree: {allStuff[0].minAvgGrade}
                </p>
                <p>Bagrut: {bagrutOnly[0].minAvgGrade}</p>
                <p>Bagrut, Psychometric: {bagruPsyOnly[0].minAvgGrade}</p>
                <p>
                  Bagrut, Psychometric, Preparatory Courses:{" "}
                  {bagruPsyPrepOnly[0].minAvgGrade}
                </p>
                <p>
                  Bagrut, Preparatory Courses, Academic Courses:{" "}
                  {bagruAcaPrepOnly[0].minAvgGrade}
                </p>
                <p>
                  Bagrut, Preparatory Courses, Academic Courses, Previous
                  Degree: {bagruAcaDegPrepOnly[0].minAvgGrade}
                </p>
              </div>
            </div>
          )}
      </div>
      {nameData.length > 0 && typeData.length > 0 && degreeData.length > 0 && (
        <div id="graph"></div>
      )}
    </div>
  );
};

export default SchoolDetails;
