import './App.css';
import { useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [parsedData, setParsedData] = useState([]);
  const [commonProjects, setCommonProjects] = useState([]);
  const [longestWorkingPair, setLongestWorkingPair] = useState(null);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data;
        const commonProjectsArray = [];
        let longestDuration = 0;
        let durationSum = 0;

        for (let i = 0; i < data.length; i++) {
          for (let j = i + 1; j < data.length; j++) {
            // Get employee and project data
            const employee1 = data[i].EmpID;
            const employee2 = data[j].EmpID;
            const projectId1 = data[i].ProjectID;
            const projectId2 = data[j].ProjectID;

            if (employee1 === employee2 || projectId1 !== projectId2) {
              continue;
            }

            // Convert dates
            const dateFrom1 = new Date(data[i].DateFrom).toISOString().split('T')[0];
            const dateFrom2 = new Date(data[j].DateFrom).toISOString().split('T')[0];
            const dateTo1 = data[i].DateTo === 'NULL' ? new Date().toISOString().split('T')[0] : new Date(data[i].DateTo).toISOString().split('T')[0];
            const dateTo2 = data[j].DateTo === 'NULL' ? new Date().toISOString().split('T')[0] : new Date(data[j].DateTo).toISOString().split('T')[0];

            // Calculate overlaps
            const overlapStart = new Date(Math.max(new Date(dateFrom1), new Date(dateFrom2))).toISOString().split('T')[0];
            const overlapEnd = new Date(Math.min(new Date(dateTo1), new Date(dateTo2))).toISOString().split('T')[0];

            const overlapPeriod = Math.ceil((new Date(overlapEnd) - new Date(overlapStart)) / (1000 * 60 * 60 * 24));
            const daysWorked = overlapPeriod < 0 ? 0 : overlapPeriod;

            commonProjectsArray.push({
              employee1,
              employee2,
              projectId: projectId1,
              daysWorked,
            });

            // Find longest duration
            durationSum += daysWorked;

            if (durationSum > longestDuration) {
              longestDuration = durationSum;
              setLongestWorkingPair({
                employee1,
                employee2,
                duration: longestDuration,
              });
            }
          }
        }

        setParsedData(results.data);
        setCommonProjects(commonProjectsArray);
      },
    });
  };

  return (
    <div>
      {/* File Uploader */}
      <section className='file-uploader'>
        <input
          className='file-input'
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", margin: "10px auto" }}
        />
      </section>
      {/* Results */}
      {commonProjects.length > 0 && (
        <section className='common-projects-table'>
          <h2>Common Projects of Longest Working Pair</h2>
          <table>
            <thead>
              <tr>
                <th>Employee ID #1</th>
                <th>Employee ID #2</th>
                <th>Project ID</th>
                <th>Days Worked</th>
              </tr>
            </thead>
            <tbody>
              {commonProjects
                .filter(
                  (project) =>
                    (project.employee1 === longestWorkingPair?.employee1 || project.employee1 === longestWorkingPair?.employee2) &&
                    (project.employee2 === longestWorkingPair?.employee1 || project.employee2 === longestWorkingPair?.employee2)
                )
                .map((project, index) => (
                  <tr key={index}>
                    <td>{project.employee1}</td>
                    <td>{project.employee2}</td>
                    <td>{project.projectId}</td>
                    <td>{project.daysWorked}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default App;