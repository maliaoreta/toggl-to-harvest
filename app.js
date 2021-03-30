const fs = require('fs').promises;
const parse = require('csv-parse/lib/sync');

const togglCsv = 'toggl.csv';
const outputCsv = 'harvest.csv';

// Wrap in double quotes to escape special characters
const harvestHeaders = `"Date","Client","Project","Task","Notes","Hours","First name","Last name"`;
const harvestValues = {
  client: `"HarvestClient"`,
  project: `"HarvestProject"`,
  task: `"HarvestTask"`,
  firstName: `"First Name"`,
  lastName: `"Last Name"`,
};

// Convert time to decimal format
function timeToDecimal(t) {
  const arr = t.split(':');

  const hours = parseInt(arr[0]);
  const minutes = parseInt(arr[1]);
  const seconds = parseInt(arr[2]);
  // console.log('hours :', hours);
  // console.log('minutes :', minutes);
  // console.log('seconds :', seconds);

  const duration = hours + minutes / 60 + seconds / 3600;
  return parseFloat(duration);
}

// // Uncomment to test timeToDecimal
// //  2.0958 hours
// console.log('timeToDecimal("2:5:45") :', timeToDecimal("2:5:45"));
// console.log('timeToDecimal("02:05:45") :', timeToDecimal("02:05:45"));
// // 41.5644 hours
// console.log('timeToDecimal("41:33:52") :', timeToDecimal("41:33:52"));



// Convert Toggl CSV to Harvest format
(async function () {
  // Read the content
  const csvFile = await fs.readFile(togglCsv);
  // Parse the CSV file
  const records = parse(csvFile);

  // Write a file with one JSON per line for each record
  const newFile = records
    .reduce((lines, record, i) => {
      // rewrite headers
      if (i === 0) {
        return [harvestHeaders];
      }

      // toggl headers format:
      // User,Email,Client,Project,Task,Description,Billable,Start date,Start time,End date,End time,Duration,Tags,Amount ()
      const hours = timeToDecimal(record[11]);

      const info = {
        date: record[7],
        client: harvestValues.client,
        project: harvestValues.project,
        task: harvestValues.task,
        notes: `"${record[5]}"`,
        hours: hours.toFixed(2),
        firstName: harvestValues.firstName,
        lastName: harvestValues.lastName,
      };

      const line = Object.keys(info).map((key) => info[key]);

      return [...lines, line];
    }, [])
    .join('\n');

  fs.writeFile(outputCsv, newFile);
})();
