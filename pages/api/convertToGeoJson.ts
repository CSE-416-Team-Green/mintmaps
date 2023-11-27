import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import xml2js from 'xml2js';
import shpjs from 'shpjs';
import tj from "@tmcw/togeojson";
// node doesn't have xml parsing or a dom. use xmldom


export const config = {
    api: {
        bodyParser: false,
    },
};

const convertToGeoJson = async (req: NextApiRequest, res: NextApiResponse) => {
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: 'Error parsing the file upload' });
            return;
        }

        try {
            const file = files.file[0];
            const fileType = file.originalFilename.split('.').pop()?.toLowerCase();
            if (fileType === 'kml') {
              const converter = require("@tmcw/togeojson")
               const DOMParser = require("xmldom").DOMParser;
               const kml = new DOMParser().parseFromString(fs.readFileSync(file.filepath, "utf8"));
               const converted = converter.kml(kml);
                //const kml = fs.readFileSync(file.filepath, 'utf-8');
                //const parser = new xml2js.Parser();
                //const result = await parser.parseStringPromise(kml);
                //const dataToWrite = JSON.stringify(result);
                // Convert KML to GeoJSON (implement this conversion based on KML and GeoJSON structure)
                 //const geoJson = convertKmlToGeoJson(result);
                 const test = JSON.stringify(converted)
                 console.log(test)
                res.status(200).json({ message: 'KML converted to GeoJSON', data: test });
            } else if (fileType === 'shp') {
                const shpBuffer = fs.readFileSync(file.filepath);
                const geoJson = await shpjs.parseZip(shpBuffer);
                
                res.status(200).json({ message: 'SHP converted to GeoJSON', data: geoJson });
            } else {
                res.status(400).json({ error: 'Unsupported file type' });
            }
        } catch (error) {
            console.error('Error during file conversion:', error);
            res.status(500).json({ error: 'Error during file conversion' });
        }
    });
};

export default convertToGeoJson;
