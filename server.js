const express = require("express")
const app = express()
const csv = require('csvtojson')
const { default: axios } = require("axios")
const { v4: uuidv4 } = require('uuid');
const RegexParser = require("regex-parser")

//MIDDLEWARE - Bodyparser
app.use(express.json())



//ROUTE
app.post("/", (req, res) => {
    //Destructured the url and select_fields from the request.body object
    const { url, select_fields } = req.body.csv
    //Checks if user provided the select_fields options/parameter
    if(select_fields && select_fields.length > 0) {
        //make request to get CSV file
        axios.get(url)
        .then((data) => {
            //parsed the array of strings from the select_fields variable to make it a valid regular expression
            let pattern = "/("
            for(i=0;i < select_fields.length; i++){
                pattern+=`${select_fields[i].charAt(0).toUpperCase() + select_fields[i].slice(1)}|`
            }
            let parsed_string = pattern.slice(0, -1)
            parsed_string+=")/"
            //used the csvtojson package to parsed the CSV data
            csv({ includeColumns: RegexParser(parsed_string)})
                .fromString(data.data)
                .then((csv) => {
                    //returns the csv as JSON on success
                    res.status(200).json({
                        conversion_key: uuidv4(),
                        json: csv
                    })
                })
            })
        .catch(err => {
            res.status(500).json({
                message: "failed. Something went wrong"
            })
        })
    } else {
        axios.get(url)
        .then((data) => {
            csv()
                .fromString(data.data)
                .then((csv) => {
                    res.status(200).json({
                        conversion_key: uuidv4(),
                        json: csv
                    })
                })
            })
        .catch(err => {
            res.status(500).json({
                message: "failed. Something went wrong"
            })
        })
    }
})




const port = 4050
app.listen(port, () => console.log(`Listening on port ${port}`))