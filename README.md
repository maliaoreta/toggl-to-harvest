# toggl-to-harvest

Converts a CSV of exported Toggl hours to a Harvest CSV import for a single project

## Usage

1. Download a Toggl CSV export from the **Detailed** Reports view
   <img width="1671" alt="Screen Shot 2021-03-30 at 12 15 20 PM" src="https://user-images.githubusercontent.com/16835553/113063837-a1ed6400-9151-11eb-859f-ae9d84d9ecc0.png">

2. Save it to the root directory at `./toggl.csv`

3. Update the Project values to use for Harvest in `app.js`:

   ```
   const harvestValues = {
     client: `"HarvestClient"`,
     project: `"HarvestProject"`,
     task: `"HarvestTask"`,
     firstName: `"First Name"`,
     lastName: `"Last Name"`,
   };
   ```

4. Run the app

   ```
   node app.js
   ```

5. Review the `harvest.csv` output

6. [Import the CSV to Harvest](https://support.getharvest.com/hc/en-us/articles/360048685111-Importing-and-Exporting-Data)  
   NOTE: Requires Admin permissions
