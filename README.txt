## To run our site-

1. Download the admissioncompassdatabase sql file. Open up mysql workbench, and start a new connection. This will start a localhost for our database. Next, press file and click on "open sql script" and click on our admissioncompassdatabase file. Next, press "Execute the selected portion...". Click refresh under the schema list on the left hand panel and now we have our database ready to use with data.

2. Download the react-website file, and open it in Visual Studio Code. In order to start the project ensure that you change the password in the Index.js file in the Backend folder. Then open a new terminal, and write cd src/Backend (enter), next, write python .\model.py (enter), then write python app.py (enter). Now a localhost should appear for your Machine Learning models.

3. Next, open another terminal and write cd src/Backend (enter), then write npm start (enter). Now the database should be connected as well and we have another localhost for our database.

4. Next, open another terminal and and write npm install (enter), then, write npm run dev (enter), and now a localhost should appear with a link to your frontend website.

5. Click on the link that just appeared and start exploring our website!

## More Info

Our site is seperated into 2 sections - Backend and Components/App.

We included in the documents folder any files that we uploaded to moodle throughout the semester and our final book.

We also included our initial jupyter notebook where we generated our fake data needed for running our site, and where we experimented with different model architectures, and laid the groundwork for shap value computation.