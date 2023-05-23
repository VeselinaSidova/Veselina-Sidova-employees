# Employee Work History

Employee Work History is an React.JS application that helps identify the pair of employees who have worked together on common projects for the longest period of time. It takes input data from a CSV file and displays the common projects and the duration of the longest working pair.


## Features

  1. Upload a CSV file with employee work history data.
  2. Identify the pair of employees with the longest duration of working together.
  3. Filter and display only the projects of the longest working pair.
    
## Usage

  1. Clone the repository to your local machine.
  2. Install the dependencies by running the following command:

    npm install

 3. Start the application by running the following command:

    npm start

  4. Access the application in your browser at http://localhost:3000.
  5. Click on the "Choose File" button to select a CSV file with employee work history data.
  6. The common projects of the longest working pair will be displayed in a table.

## CSV File Format

The CSV file should have the following columns: EmpID, ProjectID, DateFrom, DateTo. Each row represents a project worked on by an employee.

   * EmpID: Employee ID.
   * ProjectID: Project ID.
   * DateFrom: Start date of the project (format: DD-MM-YYYY).
   * DateTo: End date of the project. Use NULL if the project is ongoing or the end date is not known (format: DD-MM-YYYY).

## Dependencies

The application uses the following libraries:

   * React: JavaScript library for building user interfaces.
   * Papa Parse: CSV parsing library for JavaScript.
