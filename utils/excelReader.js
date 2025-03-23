const xlsx = require("xlsx");
const path = require("path");
const { expect, $ } = require('@wdio/globals');

function getExcelData(sheetName) {
    const filePath = path.resolve(__dirname, "../testData/RetirementData.xlsx"); // Adjust path if needed
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];

    let jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Convert all data to string 
    jsonData = jsonData.map(row => {
        return Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, String(value)])
        );
    });

    return jsonData;
}

module.exports = { getExcelData };