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
interface schoolData {
  Name: string;
  Location: string;
  general_information: string;
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
  const [schoolData, setSchoolData] = useState<schoolData[]>([]);
  const total = [
    allStuff,
    bagrutOnly,
    bagruPsyPrepOnly,
    bagruPsyOnly,
    bagruAcaPrepOnly,
    bagruAcaDegPrepOnly,
  ].reduce((sum, array) => {
    if (array.length > 0) {
      return sum + array[0].minAvgGrade;
    }
    return sum;
  }, 0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Institution[]>(
          `http://localhost:8800/results1/${selectedNameId}`
        );
        setNameData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    const fetchSchoolInfo = async () => {
      try {
        const response = await axios.get<schoolData[]>(
          `http://localhost:8800/resultsInstitution/${selectedNameId}`
        );
        setSchoolData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    const fetchType = async () => {
      try {
        const response = await axios.get<Type[]>(
          `http://localhost:8800/results2/${selectedType}`
        );
        setTypeData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    const fetchDegree = async () => {
      try {
        const response = await axios.get<Degree[]>(
          `http://localhost:8800/results3/${selectedDegreeId}`
        );
        setDegreeData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    const fetchSQLData = async (
      endpoint: string,
      setData: React.Dispatch<React.SetStateAction<sqlTable[]>>
    ) => {
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
        const response = await axios.get<sqlTable[]>(
          `http://localhost:8800/${endpoint}/${selectedNameId}/${typeName}/${selectedDegreeId}`
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    const fetchAllData = async () => {
      if (selectedNameId && selectedType && selectedDegreeId) {
        await fetchData();
        await fetchType();
        await fetchSchoolInfo();
        await fetchDegree();
        await fetchSQLData("resultsSQL", setTable1);
        await fetchSQLData("resultsSQLP", setTable2);
        await fetchSQLData("resultsSQLPr", setTable3);
        await fetchSQLData("resultsSQLAc", setTable4);
        await fetchSQLData("resultsSQLDe", setTable5);
        await fetchSQLData("resultsSQLBagOnly", setBagrutOnly);
        await fetchSQLData("resultsSQLBagPsyOnly", setBagrutPsyOnly);
        await fetchSQLData("resultsSQLBagPsyPrepOnly", setBagrutPsyPrepOnly);
        await fetchSQLData("resultsSQLBagAcaPrepOnly", setBagrutAcaPrepOnly);
        await fetchSQLData(
          "resultsSQLBagAcaDegPrepOnly",
          setBagrutAcaDegPrepOnly
        );
        await fetchSQLData("resultsSQLAll", setAll);
        await handleShapAnalysis();
      }
    };

    fetchAllData();
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
        title: {
          text: "<b>Most Influential Academic Factors for Acceptance were -</b>",
          x: 0.05,
          y: 0.9,
          font: {
            family: "Segoe UI",
            size: 16,
          },
        },
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
      <div className="resultsstrip">
        <p className="resultssmall">
          {nameData.length > 0 && nameData[0].Name} -{" "}
          {typeData.length > 0 && typeData[0].Type} -{" "}
          {degreeData.length > 0 && degreeData[0].Name}
        </p>
      </div>
      <div className="resultsouter">
        <div className="resultsouter2">
          {schoolData.length > 0 && schoolData[0].Name}
        </div>
        <div className="resultsouter3">
          {schoolData.length > 0 && schoolData[0].Location}
        </div>
        <div className="resultsouter3">
          {schoolData.length > 0 && schoolData[0].general_information}
        </div>
      </div>
      {nameData.length > 0 && typeData.length > 0 && degreeData.length > 0 && (
        <p
          style={{
            fontWeight: "bold",
            paddingTop: "40px",
            marginLeft: "200px",
          }}
        >
          Accepted Students at {nameData[0].Name} Studying {degreeData[0].Name},{" "}
          {typeData[0].Type} had -
        </p>
      )}
      <div className="resultsouter5a">
        <div className="resultsouter5">
          <div className="resultsouter4">
            {nameData.length > 0 &&
              typeData.length > 0 &&
              degreeData.length > 0 &&
              table1.length > 0 && (
                <div>
                  <p>Bagrut Averages</p>
                  <div className="container">
                    <div
                      className="skills html"
                      style={{
                        width: `100%`,
                        backgroundColor: "#ddd",
                        position: "relative",
                        color: "white",
                      }}
                    >
                      <div
                        className="green-bar"
                        style={{
                          marginLeft: `${table1[0].minAvgGrade}%`,
                          width: `${
                            table1[0].maxAvgGrade - table1[0].minAvgGrade
                          }%`,
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
          <div className="resultsouter4">
            {nameData.length > 0 &&
              typeData.length > 0 &&
              degreeData.length > 0 &&
              table2.length > 0 && (
                <div>
                  <p>Psychometric Scores</p>
                  <div className="container">
                    <div
                      className="skills html"
                      style={{
                        width: `100%`,
                        backgroundColor: "#ddd",
                        position: "relative",
                        color: "white",
                      }}
                    >
                      <div
                        className="green-bar"
                        style={{
                          marginLeft: `${(table2[0].minAvgGrade - 200) / 6}%`,
                          width: `${
                            (table2[0].maxAvgGrade - table2[0].minAvgGrade) / 6
                          }%`,
                          backgroundColor: "#04AA6D",
                          height: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 5px",
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
          <div className="resultsouter4">
            {nameData.length > 0 &&
              typeData.length > 0 &&
              degreeData.length > 0 &&
              table3.length > 0 && (
                <div>
                  <p>Preparatory Courses Averages</p>
                  <div className="container">
                    <div
                      className="skills html"
                      style={{
                        width: `100%`,
                        backgroundColor: "#ddd",
                        position: "relative",
                        color: "white",
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
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 5px",
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
          <div className="resultsouter4">
            {nameData.length > 0 &&
              typeData.length > 0 &&
              degreeData.length > 0 &&
              table4.length > 0 && (
                <div>
                  <p>Academic Courses Averages</p>
                  <div className="container">
                    <div
                      className="skills html"
                      style={{
                        width: `100%`,
                        backgroundColor: "#ddd",
                        position: "relative",
                        color: "white",
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
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 5px",
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
          <div className="resultsouter4">
            {nameData.length > 0 &&
              typeData.length > 0 &&
              degreeData.length > 0 &&
              table5.length > 0 && (
                <div>
                  <p>Degree Averages</p>
                  <div className="container">
                    <div
                      className="skills html"
                      style={{
                        width: `100%`,
                        backgroundColor: "#ddd",
                        position: "relative",
                        color: "white",
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
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 5px",
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
        </div>
        <div className="resultsouter5">
          <div className="circle-container">
            {allStuff.length > 0 && allStuff[0].minAvgGrade > 0 && (
              <div className="circle-container2">
                <div
                  className="circle1"
                  style={{
                    width: `Math.min(${allStuff[0].minAvgGrade * 30}, 100)px`,
                    height: `Math.min(${allStuff[0].minAvgGrade * 30}, 100)px`,
                  }}
                >
                  <div className="circle-text">
                    {Math.floor((allStuff[0].minAvgGrade / total) * 100)}%
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Bagrut, Psychometric, Preparatory Courses, Academic Courses,
                  and Degree
                </div>
              </div>
            )}
            {bagrutOnly.length > 0 && bagrutOnly[0].minAvgGrade > 0 && (
              <div className="circle-container2">
                <div
                  className="circle2"
                  style={{
                    width: `Math.min(${bagrutOnly[0].minAvgGrade * 30}, 100)px`,
                    height: `Math.min(${
                      bagrutOnly[0].minAvgGrade * 30
                    }, 100)px`,
                  }}
                >
                  <div className="circle-text">
                    {Math.floor((bagrutOnly[0].minAvgGrade / total) * 100)}%
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Bagrut
                </div>
              </div>
            )}
            {bagruPsyPrepOnly.length > 0 &&
              bagruPsyPrepOnly[0].minAvgGrade > 0 && (
                <div className="circle-container2">
                  <div
                    className="circle3"
                    style={{
                      width: `Math.min(${
                        bagruPsyPrepOnly[0].minAvgGrade * 30
                      }, 100)px`,
                      height: `Math.min(${
                        bagruPsyPrepOnly[0].minAvgGrade * 30
                      }, 100)px`,
                    }}
                  >
                    <div className="circle-text">
                      {Math.floor(
                        (bagruPsyPrepOnly[0].minAvgGrade / total) * 100
                      )}
                      %
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Bagrut, Psychometric, Preparatory Courses
                  </div>
                </div>
              )}
            {bagruPsyOnly.length > 0 && bagruPsyOnly[0].minAvgGrade > 0 && (
              <div className="circle-container2">
                <div
                  className="circle4"
                  style={{
                    width: `Math.min(${
                      bagruPsyOnly[0].minAvgGrade * 30
                    }, 100)px`,
                    height: `Math.min(${
                      bagruPsyOnly[0].minAvgGrade * 30
                    }, 100)px`,
                  }}
                >
                  <div className="circle-text">
                    {Math.floor((bagruPsyOnly[0].minAvgGrade / total) * 100)}%
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Bagrut and Psychometric
                </div>
              </div>
            )}
            {bagruAcaPrepOnly.length > 0 &&
              bagruAcaPrepOnly[0].minAvgGrade > 0 && (
                <div className="circle-container2">
                  <div
                    className="circle5"
                    style={{
                      width: `Math.min(${
                        bagruAcaPrepOnly[0].minAvgGrade * 30
                      }, 100)px`,
                      height: `Math.min(${
                        bagruAcaPrepOnly[0].minAvgGrade * 30
                      }, 100)px`,
                    }}
                  >
                    <div className="circle-text">
                      {Math.floor(
                        (bagruAcaPrepOnly[0].minAvgGrade / total) * 100
                      )}
                      %
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Bagrut, Preparatory Courses, Academic Courses
                  </div>
                </div>
              )}
            {bagruAcaDegPrepOnly.length > 0 &&
              bagruAcaDegPrepOnly[0].minAvgGrade > 0 && (
                <div className="circle-container2">
                  <div
                    className="circle6"
                    style={{
                      width: `Math.min(${
                        bagruAcaDegPrepOnly[0].minAvgGrade * 30
                      }, 100)px`,
                      height: `Math.min(${
                        bagruAcaDegPrepOnly[0].minAvgGrade * 30
                      }, 100)px`,
                    }}
                  >
                    <div className="circle-text">
                      {Math.floor(
                        (bagruAcaDegPrepOnly[0].minAvgGrade / total) * 100
                      )}
                      %
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Bagrut, Preparatory Courses, Academic Courses, and Degree
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <div
        style={{
          height: `100%`,
          width: "80%",
          paddingLeft: "140px",
        }}
        id="graph"
      ></div>
    </div>
  );
};

export default SchoolDetails;
