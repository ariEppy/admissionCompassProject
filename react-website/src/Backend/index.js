import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ariela1993!",
    database: "admissioncompass"
});

app.get("/", (req, res) => {
    res.json("Hello this is the backend");
});
app.get('/resultsSQLAll/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = ` SELECT 
  COUNT(studentSubmission.id) AS minAvgGrade, 0 as maxAvgGrade
FROM 
  studentSubmission,
  bagrut,
  psychometric_scores,
  preparatorycourses,
  academiccoursesholder, 
  degreeholder  
WHERE 
bagrut.id = studentSubmission.bagrutId and
psychometric_scores.psychometric_id = studentSubmission.psychometricId and
preparatorycourses.id = studentSubmission.preparatoryId and
academiccoursesholder.id = studentSubmission.academicCoursesId and
degreeholder.id = studentSubmission.degreeholderId and
  (studentSubmission.acceptedInstitutionId1 = ? OR
   studentSubmission.acceptedInstitutionId2 = ? OR
   studentSubmission.acceptedInstitutionId3 = ?)
  AND (studentSubmission.degreeId1 = ? OR
       studentSubmission.degreeId2 = ? OR
       studentSubmission.degreeId3 = ?)
  AND (studentSubmission.Type1 = ? OR
       studentSubmission.Type2 = ? OR
       studentSubmission.Type3 = ?)
  AND (psychometric_scores.general_grade != 0 OR psychometric_scores.general_grade IS not NULL)
  AND (preparatorycourses.mathScore != 0 OR preparatorycourses.mathScore IS not NULL) 
  AND (preparatorycourses.physicsScore != 0 OR preparatorycourses.physicsScore IS not NULL)
  AND (preparatorycourses.englishScore != 0 OR preparatorycourses.englishScore IS not NULL) 
  AND (preparatorycourses.scientificWritingScore != 0 OR preparatorycourses.scientificWritingScore IS not NULL)
  AND (academiccoursesholder.grade1 != 0 OR academiccoursesholder.grade1 IS not NULL) 
  AND (academiccoursesholder.grade2 != 0 OR academiccoursesholder.grade2 IS not NULL) 
  AND (academiccoursesholder.grade3 != 0 OR academiccoursesholder.grade3 IS not NULL) 
  AND (academiccoursesholder.grade4 != 0 OR academiccoursesholder.grade4 IS not NULL)
  AND (academiccoursesholder.grade5 != 0 OR academiccoursesholder.grade5 IS not NULL) 
  AND (academiccoursesholder.grade6 != 0 OR academiccoursesholder.grade6 IS not NULL)
  AND (degreeholder.average != 0 OR degreeholder.average IS not NULL);

`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLBagAcaDegPrepOnly/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = ` SELECT 
  COUNT(studentSubmission.id) AS minAvgGrade, 0 as maxAvgGrade
FROM 
  studentSubmission,
  bagrut,
  psychometric_scores,
  preparatorycourses,
  academiccoursesholder, 
  degreeholder  
WHERE 
bagrut.id = studentSubmission.bagrutId and
psychometric_scores.psychometric_id = studentSubmission.psychometricId and
preparatorycourses.id = studentSubmission.preparatoryId and
academiccoursesholder.id = studentSubmission.academicCoursesId and
degreeholder.id = studentSubmission.degreeholderId and
  (studentSubmission.acceptedInstitutionId1 = ? OR
   studentSubmission.acceptedInstitutionId2 = ? OR
   studentSubmission.acceptedInstitutionId3 = ?)
  AND (studentSubmission.degreeId1 = ? OR
       studentSubmission.degreeId2 = ? OR
       studentSubmission.degreeId3 = ?)
  AND (studentSubmission.Type1 = ? OR
       studentSubmission.Type2 = ? OR
       studentSubmission.Type3 = ?)
  AND (psychometric_scores.general_grade = 0 OR psychometric_scores.general_grade IS NULL)
  AND (preparatorycourses.mathScore != 0 OR preparatorycourses.mathScore IS not NULL) 
  AND (preparatorycourses.physicsScore != 0 OR preparatorycourses.physicsScore IS not NULL)
  AND (preparatorycourses.englishScore != 0 OR preparatorycourses.englishScore IS not NULL) 
  AND (preparatorycourses.scientificWritingScore != 0 OR preparatorycourses.scientificWritingScore IS not NULL)
  AND (academiccoursesholder.grade1 != 0 OR academiccoursesholder.grade1 IS not NULL) 
  AND (academiccoursesholder.grade2 != 0 OR academiccoursesholder.grade2 IS not NULL) 
  AND (academiccoursesholder.grade3 != 0 OR academiccoursesholder.grade3 IS not NULL) 
  AND (academiccoursesholder.grade4 != 0 OR academiccoursesholder.grade4 IS not NULL)
  AND (academiccoursesholder.grade5 != 0 OR academiccoursesholder.grade5 IS not NULL) 
  AND (academiccoursesholder.grade6 != 0 OR academiccoursesholder.grade6 IS not NULL)
  AND (degreeholder.average != 0 OR degreeholder.average IS not NULL);

`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLBagAcaPrepOnly/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = ` SELECT 
  COUNT(studentSubmission.id) AS minAvgGrade, 0 as maxAvgGrade
  FROM 
  studentSubmission,
  bagrut,
  psychometric_scores,
  preparatorycourses,
  academiccoursesholder, 
  degreeholder  
WHERE 
bagrut.id = studentSubmission.bagrutId and
psychometric_scores.psychometric_id = studentSubmission.psychometricId and
preparatorycourses.id = studentSubmission.preparatoryId and
academiccoursesholder.id = studentSubmission.academicCoursesId and
degreeholder.id = studentSubmission.degreeholderId and
  (studentSubmission.acceptedInstitutionId1 = ? OR
   studentSubmission.acceptedInstitutionId2 = ? OR
   studentSubmission.acceptedInstitutionId3 = ?)
  AND (studentSubmission.degreeId1 = ? OR
       studentSubmission.degreeId2 = ? OR
       studentSubmission.degreeId3 = ?)
  AND (studentSubmission.Type1 = ? OR
       studentSubmission.Type2 = ? OR
       studentSubmission.Type3 = ?)
  AND (psychometric_scores.general_grade = 0 OR psychometric_scores.general_grade IS NULL)
  AND (preparatorycourses.mathScore != 0 OR preparatorycourses.mathScore IS not NULL) 
  AND (preparatorycourses.physicsScore != 0 OR preparatorycourses.physicsScore IS not NULL)
  AND (preparatorycourses.englishScore != 0 OR preparatorycourses.englishScore IS not NULL) 
  AND (preparatorycourses.scientificWritingScore != 0 OR preparatorycourses.scientificWritingScore IS not NULL)
  AND (academiccoursesholder.grade1 != 0 OR academiccoursesholder.grade1 IS not NULL) 
  AND (academiccoursesholder.grade2 != 0 OR academiccoursesholder.grade2 IS not NULL) 
  AND (academiccoursesholder.grade3 != 0 OR academiccoursesholder.grade3 IS not NULL) 
  AND (academiccoursesholder.grade4 != 0 OR academiccoursesholder.grade4 IS not NULL)
  AND (academiccoursesholder.grade5 != 0 OR academiccoursesholder.grade5 IS not NULL) 
  AND (academiccoursesholder.grade6 != 0 OR academiccoursesholder.grade6 IS not NULL)
  AND (degreeholder.average = 0 OR degreeholder.average IS NULL);

`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLBagPsyPrepOnly/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = ` SELECT 
  COUNT(studentSubmission.id) AS minAvgGrade, 0 as maxAvgGrade
  FROM 
  studentSubmission,
  bagrut,
  psychometric_scores,
  preparatorycourses,
  academiccoursesholder, 
  degreeholder  
WHERE 
bagrut.id = studentSubmission.bagrutId and
psychometric_scores.psychometric_id = studentSubmission.psychometricId and
preparatorycourses.id = studentSubmission.preparatoryId and
academiccoursesholder.id = studentSubmission.academicCoursesId and
degreeholder.id = studentSubmission.degreeholderId and
  (studentSubmission.acceptedInstitutionId1 = ? OR
   studentSubmission.acceptedInstitutionId2 = ? OR
   studentSubmission.acceptedInstitutionId3 = ?)
  AND (studentSubmission.degreeId1 = ? OR
       studentSubmission.degreeId2 = ? OR
       studentSubmission.degreeId3 = ?)
  AND (studentSubmission.Type1 = ? OR
       studentSubmission.Type2 = ? OR
       studentSubmission.Type3 = ?)
  AND (psychometric_scores.general_grade != 0 OR psychometric_scores.general_grade IS not NULL)
  AND (preparatorycourses.mathScore != 0 OR preparatorycourses.mathScore IS not NULL) 
  AND (preparatorycourses.physicsScore != 0 OR preparatorycourses.physicsScore IS not NULL)
  AND (preparatorycourses.englishScore != 0 OR preparatorycourses.englishScore IS not NULL) 
  AND (preparatorycourses.scientificWritingScore != 0 OR preparatorycourses.scientificWritingScore IS not NULL)
  AND (academiccoursesholder.grade1 = 0 OR academiccoursesholder.grade1 IS NULL) 
  AND (academiccoursesholder.grade2 = 0 OR academiccoursesholder.grade2 IS NULL) 
  AND (academiccoursesholder.grade3 = 0 OR academiccoursesholder.grade3 IS NULL) 
  AND (academiccoursesholder.grade4 = 0 OR academiccoursesholder.grade4 IS NULL)
  AND (academiccoursesholder.grade5 = 0 OR academiccoursesholder.grade5 IS NULL) 
  AND (academiccoursesholder.grade6 = 0 OR academiccoursesholder.grade6 IS NULL)
  AND (degreeholder.average = 0 OR degreeholder.average IS NULL);

`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLBagPsyOnly/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = ` SELECT 
  COUNT(studentSubmission.id) AS minAvgGrade, 0 as maxAvgGrade
  FROM 
  studentSubmission,
  bagrut,
  psychometric_scores,
  preparatorycourses,
  academiccoursesholder, 
  degreeholder  
WHERE 
bagrut.id = studentSubmission.bagrutId and
psychometric_scores.psychometric_id = studentSubmission.psychometricId and
preparatorycourses.id = studentSubmission.preparatoryId and
academiccoursesholder.id = studentSubmission.academicCoursesId and
degreeholder.id = studentSubmission.degreeholderId and
  (studentSubmission.acceptedInstitutionId1 = ? OR
   studentSubmission.acceptedInstitutionId2 = ? OR
   studentSubmission.acceptedInstitutionId3 = ?)
  AND (studentSubmission.degreeId1 = ? OR
       studentSubmission.degreeId2 = ? OR
       studentSubmission.degreeId3 = ?)
  AND (studentSubmission.Type1 = ? OR
       studentSubmission.Type2 = ? OR
       studentSubmission.Type3 = ?)
  AND (psychometric_scores.general_grade != 0 OR psychometric_scores.general_grade IS not NULL)
  AND (preparatorycourses.mathScore = 0 OR preparatorycourses.mathScore IS NULL) 
  AND (preparatorycourses.physicsScore = 0 OR preparatorycourses.physicsScore IS NULL)
  AND (preparatorycourses.englishScore = 0 OR preparatorycourses.englishScore IS NULL) 
  AND (preparatorycourses.scientificWritingScore = 0 OR preparatorycourses.scientificWritingScore IS NULL)
  AND (academiccoursesholder.grade1 = 0 OR academiccoursesholder.grade1 IS NULL) 
  AND (academiccoursesholder.grade2 = 0 OR academiccoursesholder.grade2 IS NULL) 
  AND (academiccoursesholder.grade3 = 0 OR academiccoursesholder.grade3 IS NULL) 
  AND (academiccoursesholder.grade4 = 0 OR academiccoursesholder.grade4 IS NULL)
  AND (academiccoursesholder.grade5 = 0 OR academiccoursesholder.grade5 IS NULL) 
  AND (academiccoursesholder.grade6 = 0 OR academiccoursesholder.grade6 IS NULL)
  AND (degreeholder.average = 0 OR degreeholder.average IS NULL);

`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLBagOnly/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = ` SELECT 
  COUNT(studentSubmission.id) AS minAvgGrade, 0 as maxAvgGrade
  FROM 
  studentSubmission,
  bagrut,
  psychometric_scores,
  preparatorycourses,
  academiccoursesholder, 
  degreeholder  
WHERE 
bagrut.id = studentSubmission.bagrutId and
psychometric_scores.psychometric_id = studentSubmission.psychometricId and
preparatorycourses.id = studentSubmission.preparatoryId and
academiccoursesholder.id = studentSubmission.academicCoursesId and
degreeholder.id = studentSubmission.degreeholderId and
  (studentSubmission.acceptedInstitutionId1 = ? OR
   studentSubmission.acceptedInstitutionId2 = ? OR
   studentSubmission.acceptedInstitutionId3 = ?)
  AND (studentSubmission.degreeId1 = ? OR
       studentSubmission.degreeId2 = ? OR
       studentSubmission.degreeId3 = ?)
  AND (studentSubmission.Type1 = ? OR
       studentSubmission.Type2 = ? OR
       studentSubmission.Type3 = ?)
  AND (psychometric_scores.general_grade = 0 OR psychometric_scores.general_grade IS NULL)
  AND (preparatorycourses.mathScore = 0 OR preparatorycourses.mathScore IS NULL) 
  AND (preparatorycourses.physicsScore = 0 OR preparatorycourses.physicsScore IS NULL)
  AND (preparatorycourses.englishScore = 0 OR preparatorycourses.englishScore IS NULL) 
  AND (preparatorycourses.scientificWritingScore = 0 OR preparatorycourses.scientificWritingScore IS NULL)
  AND (academiccoursesholder.grade1 = 0 OR academiccoursesholder.grade1 IS NULL) 
  AND (academiccoursesholder.grade2 = 0 OR academiccoursesholder.grade2 IS NULL) 
  AND (academiccoursesholder.grade3 = 0 OR academiccoursesholder.grade3 IS NULL) 
  AND (academiccoursesholder.grade4 = 0 OR academiccoursesholder.grade4 IS NULL)
  AND (academiccoursesholder.grade5 = 0 OR academiccoursesholder.grade5 IS NULL) 
  AND (academiccoursesholder.grade6 = 0 OR academiccoursesholder.grade6 IS NULL)
  AND (degreeholder.average = 0 OR degreeholder.average IS NULL);

`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLDe/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = ` SELECT 
  MIN(degreeholder.average) AS minAvgGrade,
  MAX(degreeholder.average) AS maxAvgGrade
FROM 
  studentSubmission
JOIN 
degreeholder ON degreeholder.id = studentSubmission.bagrutId
WHERE 
  (studentSubmission.acceptedInstitutionId1 = ?
  OR studentSubmission.acceptedInstitutionId2 = ? 
  OR studentSubmission.acceptedInstitutionId3 = ?)
  AND (studentSubmission.degreeId1 = ? 
  OR studentSubmission.degreeId2 = ? 
  OR studentSubmission.degreeId3 = ?)
  AND (studentSubmission.Type1 = ? 
  OR studentSubmission.Type2 = ? 
  OR studentSubmission.Type3 = ?)
  AND degreeholder.average != 0;`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLAc/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = `WITH GradeSums AS (
    SELECT 
        id,
        (academiccoursesholder.grade1 + academiccoursesholder.grade2 + academiccoursesholder.grade3 + academiccoursesholder.grade4 +
          academiccoursesholder.grade5 + academiccoursesholder.grade5
        )
        AS total_sum,
        (CASE WHEN academiccoursesholder.grade1 != 0 THEN 1 ELSE 0 END +
         CASE WHEN academiccoursesholder.grade2 != 0 THEN 1 ELSE 0 END +
         CASE WHEN academiccoursesholder.grade3 != 0 THEN 1 ELSE 0 END +
         CASE WHEN academiccoursesholder.grade4 != 0 THEN 1 ELSE 0 END+
         CASE WHEN academiccoursesholder.grade5 != 0 THEN 1 ELSE 0 END+
         CASE WHEN academiccoursesholder.grade6 != 0 THEN 1 ELSE 0 END) AS num_non_zero_grades
    FROM 
    academiccoursesholder
)
SELECT 
  ROUND(MIN(total_sum / NULLIF(num_non_zero_grades, 0)), 2) AS minAvgGrade,
  ROUND(MAX(total_sum / NULLIF(num_non_zero_grades, 0)), 2) AS maxAvgGrade
FROM 
    studentSubmission
JOIN 
    GradeSums ON studentSubmission.academicCoursesId = GradeSums.id
WHERE 
    (studentSubmission.acceptedInstitutionId1 = ?
    OR studentSubmission.acceptedInstitutionId2 = ? 
    OR studentSubmission.acceptedInstitutionId3 = ?)
    AND (studentSubmission.degreeId1 = ? OR studentSubmission.degreeId2 = ? OR studentSubmission.degreeId3 = ?)
    AND (studentSubmission.Type1 = ? OR studentSubmission.Type2 = ? OR studentSubmission.Type3 = ?);`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLPr/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = `WITH GradeSums AS (
    SELECT 
        id,
        (preparatorycourses.mathScore + preparatorycourses.physicsScore + preparatorycourses.englishScore + preparatorycourses.scientificWritingScore)
        AS total_sum,
        (CASE WHEN preparatorycourses.mathScore != 0 THEN 1 ELSE 0 END +
         CASE WHEN preparatorycourses.physicsScore != 0 THEN 1 ELSE 0 END +
         CASE WHEN preparatorycourses.englishScore != 0 THEN 1 ELSE 0 END +
         CASE WHEN preparatorycourses.scientificWritingScore != 0 THEN 1 ELSE 0 END) AS num_non_zero_grades
    FROM 
      preparatorycourses
)
SELECT 
  ROUND(MIN(total_sum / NULLIF(num_non_zero_grades, 0)), 2) AS minAvgGrade,
  ROUND(MAX(total_sum / NULLIF(num_non_zero_grades, 0)), 2) AS maxAvgGrade
FROM 
    studentSubmission
JOIN 
    GradeSums ON studentSubmission.preparatoryId = GradeSums.id
WHERE 
    (studentSubmission.acceptedInstitutionId1 = ?
    OR studentSubmission.acceptedInstitutionId2 = ? 
    OR studentSubmission.acceptedInstitutionId3 = ?)
    AND (studentSubmission.degreeId1 = ? OR studentSubmission.degreeId2 = ? OR studentSubmission.degreeId3 = ?)
    AND (studentSubmission.Type1 = ? OR studentSubmission.Type2 = ? OR studentSubmission.Type3 = ?);`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQLP/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = `
  SELECT 
      MIN(psychometric_scores.general_grade) AS minAvgGrade,
      MAX(psychometric_scores.general_grade) AS maxAvgGrade
  FROM 
      studentSubmission
  JOIN 
      psychometric_scores ON psychometric_scores.psychometric_id = studentSubmission.psychometricId
  WHERE 
      (studentSubmission.acceptedInstitutionId1 = ?
      OR studentSubmission.acceptedInstitutionId2 = ? 
      OR studentSubmission.acceptedInstitutionId3 = ?)
      AND (studentSubmission.degreeId1 = ? 
      OR studentSubmission.degreeId2 = ? 
      OR studentSubmission.degreeId3 = ?)
      AND (studentSubmission.Type1 = ? 
      OR studentSubmission.Type2 = ? 
      OR studentSubmission.Type3 = ?)
      AND psychometric_scores.general_grade != 0;`;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
app.get('/resultsSQL/:id/:type/:degree', (req, res) => {
  let schoolID = req.params.id;
  let Type = req.params.type;
  let degreeID = req.params.degree;

  let sql = `WITH GradeSums AS (
    SELECT 
        id,
        (bagrut.englishGrade + bagrut.literatureGrade + bagrut.mathGrade + bagrut.tanachGrade + bagrut.civicsGrade + 
         bagrut.hebrewGrade + bagrut.historyGrade + bagrut.hebrewForArabicSpeakersGrade + bagrut.arabicGrade + 
         bagrut.socialStudiesGrade + bagrut.druzeChristianHistoryGrade + bagrut.judaicThoughtGrade + 
         bagrut.elective1Grade + bagrut.elective2Grade + bagrut.elective3Grade + bagrut.elective4Grade + 
         bagrut.elective5Grade + bagrut.elective6Grade) AS total_sum,
        (CASE WHEN bagrut.englishGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.literatureGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.mathGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.tanachGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.civicsGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.hebrewGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.historyGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.hebrewForArabicSpeakersGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.arabicGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.socialStudiesGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.druzeChristianHistoryGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.judaicThoughtGrade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.elective1Grade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.elective2Grade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.elective3Grade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.elective4Grade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.elective5Grade != 0 THEN 1 ELSE 0 END +
         CASE WHEN bagrut.elective6Grade != 0 THEN 1 ELSE 0 END) AS num_non_zero_grades
    FROM 
        bagrut
)
SELECT 
  ROUND(MIN(total_sum / NULLIF(num_non_zero_grades, 0)), 2) AS minAvgGrade,
  ROUND(MAX(total_sum / NULLIF(num_non_zero_grades, 0)), 2) AS maxAvgGrade
FROM 
    studentSubmission
JOIN 
    GradeSums ON studentSubmission.bagrutId = GradeSums.id
WHERE 
    (studentSubmission.acceptedInstitutionId1 = ?
    OR studentSubmission.acceptedInstitutionId2 = ? 
    OR studentSubmission.acceptedInstitutionId3 = ?)
    AND (studentSubmission.degreeId1 = ? OR studentSubmission.degreeId2 = ? OR studentSubmission.degreeId3 = ?)
    AND (studentSubmission.Type1 = ? OR studentSubmission.Type2 = ? OR studentSubmission.Type3 = ?);
    `;
  db.query(sql, [schoolID, schoolID, schoolID, degreeID, degreeID, degreeID, Type, Type, Type], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

app.get('/results1/:id', (req, res) => {
  let schoolID = req.params.id;
  let sql = 'SELECT ID, Name FROM institution WHERE ID = ?';
  db.query(sql, [schoolID], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/results2/:id', (req, res) => {
  let TypeID = req.params.id;
  let sql = 'SELECT Distinct Type FROM degrees WHERE TypeId = ?';
  db.query(sql, [TypeID], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/results3/:id', (req, res) => {
  let degreeID = req.params.id;
  let sql = 'SELECT Distinct Name FROM degrees WHERE ID = ?';
  db.query(sql, [degreeID], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/results/:id/:TypeId', (req, res) => {
  let schoolID = req.params.id;
  let type = req.params.TypeId;
  let sql = 'SELECT * FROM degrees WHERE InstitutionID = ? AND TypeId = ?';
  db.query(sql, [schoolID, type], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/resultsSchools/:degreeid/:TypeId', (req, res) => {
  let degreeID = req.params.degreeid;
  let type = req.params.TypeId;
  let sql = `
  SELECT institution.*
  FROM institution, degrees 
  WHERE institution.ID = degrees.InstitutionID 
  AND degrees.ID = ? 
  AND degrees.TypeId = ?
`;
  db.query(sql, [degreeID, type], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

  
app.get('/institution', (req, res) => {
    let sql = 'SELECT ID, Name FROM institution';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  app.get('/degrees', (req, res) => {
    let sql = 'SELECT DISTINCT ID, Name FROM degrees';
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  app.get('/degrees/types', (req, res) => {
    let sqlType = 'SELECT DISTINCT TypeId, Type FROM degrees';
    db.query(sqlType, (err, types) => {
      if (err) throw err;
      res.json(types);
    });
  });

  app.get('/bagrutcourses', (req, res) => {
    let sqlType = 'SELECT ID, Name FROM bagrutelectives ORDER BY Name ASC, ID ASC';
    db.query(sqlType, (err, types) => {
      if (err) throw err;
      res.json(types);
    });
  });
  app.get('/academiccourses', (req, res) => {
    let sqlType = 'SELECT ID, Name FROM academiccourses ORDER BY Name ASC, ID ASC';
    db.query(sqlType, (err, types) => {
      if (err) throw err;
      res.json(types);
    });
  });

  app.post("/submission", (req, res) => {
    const {
      gradeEnglish, pointsEnglish, gradeLit, pointsLit, gradeMath, pointsMath, gradeTanach, pointsTanach,
      gradeCiv, pointsCiv, gradeHeb, pointsHeb, gradeHistory, pointsHistory, gradeHebAra, pointsHebAra,
      gradeArabic, pointsArabic, gradeSocial, pointsSocial, gradeHisDruze, pointsHisDruze, gradeHisArab,
      pointsHisArab, gradeJewish, pointsJewish, subjectElective1, gradeElectives1, pointsElectives1,
      subjectElective2, gradeElectives2, pointsElectives2, subjectElective3, gradeElectives3, pointsElectives3,
      subjectElective4, gradeElectives4, pointsElectives4, subjectElective5, gradeElectives5, pointsElectives5,
      subjectElective6, gradeElectives6, pointsElectives6, subjectAcademic1, gradeAcademic1, pointsAcademic1,
      subjectAcademic2, gradeAcademic2, pointsAcademic2, subjectAcademic3, gradeAcademic3, pointsAcademic3,
      subjectAcademic4, gradeAcademic4, pointsAcademic4, subjectAcademic5, gradeAcademic5, pointsAcademic5,
      subjectAcademic6, gradeAcademic6, pointsAcademic6, overall, verbal, english, quant, degreeCredits,
      degreeAverage, pmath, pphysics, penglish, pscience, email, rows
    } = req.body;
  
    db.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction:', err);
        return res.status(500).json({ error: "Failed to start database transaction" });
      }
  
      const bagrutQuery = `
        INSERT INTO bagrut (englishGrade, englishUnits, literatureGrade, literatureUnits, mathGrade, mathUnits, tanachGrade,
          tanachUnits, civicsGrade, civicsUnits, hebrewGrade, hebrewUnits, historyGrade, historyUnits, hebrewForArabicSpeakersGrade, 
          hebrewForArabicSpeakersUnits, arabicGrade, arabicUnits, socialStudiesGrade, socialStudiesUnits, druzeChristianHistoryGrade, 
          druzeChristianHistoryUnits, \`historyOfArabs&IslamGrade\`, \`historyOfArabs&IslamUnits\`, judaicThoughtGrade, judaicThoughtUnits,
          elective1Id, elective1Grade, elective1Units, elective2Id, elective2Grade, elective2Units, elective3Id, elective3Grade, 
          elective3Units, elective4Id, elective4Grade, elective4Units, elective5Id, elective5Grade, elective5Units, elective6Id,  
          elective6Grade, elective6Units
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    
      const bagrutValues = [
        gradeEnglish, pointsEnglish, gradeLit, pointsLit, gradeMath, pointsMath, gradeTanach, pointsTanach,
        gradeCiv, pointsCiv, gradeHeb, pointsHeb, gradeHistory, pointsHistory, gradeHebAra, pointsHebAra,
        gradeArabic, pointsArabic, gradeSocial, pointsSocial, gradeHisDruze, pointsHisDruze, gradeHisArab,
        pointsHisArab, gradeJewish, pointsJewish, subjectElective1, gradeElectives1, pointsElectives1,
        subjectElective2, gradeElectives2, pointsElectives2, subjectElective3, gradeElectives3, pointsElectives3,
        subjectElective4, gradeElectives4, pointsElectives4, subjectElective5, gradeElectives5, pointsElectives5,
        subjectElective6, gradeElectives6, pointsElectives6
      ];
  
      db.query(bagrutQuery, bagrutValues, (err, bagrutResult) => {
        if (err) {
          return db.rollback(() => {
            console.error('Error inserting data into bagrut table:', err);
            return res.status(500).json({ error: "Failed to insert data into bagrut table" });
          });
        }
  
        const bagrutId = bagrutResult.insertId;
  
        const academicCoursesQuery = `
          INSERT INTO academiccoursesholder (
            courseId1, grade1, points1, courseId2, grade2, points2, courseId3, grade3, points3, courseId4, grade4, points4,
            courseId5, grade5, points5, courseId6, grade6, points6
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        const academicCoursesValues = [
          subjectAcademic1, gradeAcademic1, pointsAcademic1, subjectAcademic2, gradeAcademic2, pointsAcademic2,
          subjectAcademic3, gradeAcademic3, pointsAcademic3, subjectAcademic4, gradeAcademic4, pointsAcademic4,
          subjectAcademic5, gradeAcademic5, pointsAcademic5, subjectAcademic6, gradeAcademic6, pointsAcademic6
        ];
  
        db.query(academicCoursesQuery, academicCoursesValues, (err, academicCoursesResult) => {
          if (err) {
            return db.rollback(() => {
              console.error('Error inserting data into academiccoursesholder table:', err);
              return res.status(500).json({ error: "Failed to insert data into academiccoursesholder table" });
            });
          }
  
          const academicCoursesId = academicCoursesResult.insertId;
  
          const pschQuery = `
            INSERT INTO psychometric_scores (general_grade, verbal_score, english_score, quantitative_score)
            VALUES (?, ?, ?, ?)
          `; 
    
          const pschValues = [overall, verbal, english, quant];
  
          db.query(pschQuery, pschValues, (err, pschResult) => {
            if (err) {
              return db.rollback(() => {
                console.error('Error inserting data into psychometric_scores table:', err);
                return res.status(500).json({ error: "Failed to insert data into psychometric_scores table" });
              });
            }
  
            const psychometricId = pschResult.insertId;
  
            const bachQuery = `
              INSERT INTO degreeholder (numberOfCredits, average)
              VALUES (?, ?)
            `; 
    
            const bachValues = [degreeCredits, degreeAverage];
  
            db.query(bachQuery, bachValues, (err, bachResult) => {
              if (err) {
                return db.rollback(() => {
                  console.error('Error inserting data into degreeholder table:', err);
                  return res.status(500).json({ error: "Failed to insert data into degreeholder table" });
                });
              }
  
              const degreeHolderId = bachResult.insertId;
  
              const prepQuery = `
                INSERT INTO preparatorycourses (mathScore, physicsScore, englishScore, scientificWritingScore)
                VALUES (?, ?, ?, ?)
              `; 
  
              const prepValues = [pmath, pphysics, penglish, pscience];
  
              db.query(prepQuery, prepValues, (err, prepResult) => {
                if (err) {
                  return db.rollback(() => {
                    console.error('Error inserting data into preparatorycourses table:', err);
                    return res.status(500).json({ error: "Failed to insert data into preparatorycourses table" });
                  });
                }
  
                const preparatoryCoursesId = prepResult.insertId;
  
                const subQuery = `
                  INSERT INTO studentsubmission (email, 
                    degreeId1, Type1, acceptedInstitutionId1, rejectedInstitutionId1, 
                    degreeId2, Type2, acceptedInstitutionId2, rejectedInstitutionId2, 
                    degreeId3, Type3, acceptedInstitutionId3, rejectedInstitutionId3,
                    bagrutId, psychometricId, degreeHolderId, preparatoryId,academicCoursesId)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)
                `;
  
                const subValues = [email];
  
                for (let i = 0; i < 3; i++) {
                  if (rows[i]) {
                    subValues.push(rows[i].degreeId || null);
                    subValues.push(rows[i].Type || null);
                    subValues.push(rows[i].acceptedInstitutionId || null);
                    subValues.push(rows[i].rejectedInstitutionId || null);
                  } else {
                    subValues.push(null,null, null, null);
                  }
                }
  
                subValues.push(bagrutId, psychometricId, degreeHolderId, preparatoryCoursesId, academicCoursesId);
  
                db.query(subQuery, subValues, (err, subResult) => {
                  if (err) {
                    return db.rollback(() => {
                      console.error('Error inserting data into studentsubmission table:', err);
                      return res.status(500).json({ error: "Failed to insert data into studentsubmission table" });
                    });
                  }
  
                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.error('Error committing transaction:', err);
                        return res.status(500).json({ error: "Failed to commit transaction" });
                      });
                    }
  
                    return res.status(200).json({
                      success: true,
                      data: {
                        bagrut: bagrutResult,
                        psych: pschResult,
                        academicCourses: academicCoursesResult,
                        bach: bachResult,
                        prep: prepResult,
                        sub: subResult
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  
  


app.delete("/institution/:id", (req, res) => {
    const id = req.params.id; // Extract ID from the URL parameters

    // Construct the DELETE query
    const q = "DELETE FROM institution WHERE ID = ?";
    
    // Execute the query with the specified ID
    db.query(q, [id], (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ error: "Failed to delete data from the database" });
        }
        
        // Check if any rows were affected by the deletion
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No matching entry found for deletion" });
        }
        
        // Return success response
        return res.status(200).json({ success: true });
    });
});


app.listen(8800, () => {
    console.log("Connected to backend!!!");
});
