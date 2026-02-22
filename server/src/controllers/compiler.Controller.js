const { Result } = require('express-validator')
const Question = require('../models/questionModel')

const compile = async (input, output, code , language) =>{

    return true
}


const runTestcases = async (req, res) =>{
    
    const {id, code, language} = req.body
    const question = await Question.findById(id)

    if (!question) {
        res.status(404).json({
            success : false,
            message : "Invalid Question"
        })
    }


    const obj = []
    question.testcases.map((testcase, index) => {
        
        let result = compile(testcase.input, testcase.output, "hello", "js");

        if (result) {
            obj.push({result , case: index +1})
        }
    })

    return res.status(200).json({
        success : true,
        data : obj
    })


}


module.exports = runTestcases;