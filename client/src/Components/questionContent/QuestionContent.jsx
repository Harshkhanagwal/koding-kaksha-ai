import React from 'react'
import './QuestionContent.css'

const QuestionContent = ({ question }) => {
    return (
        <>
            <div className="question-content">
                <h4 className="question-topic"> #{question.topic}</h4>
                <h2 className='quesiton-title'>{question.title} <span className={`question-level question-level-${question.difficulty}`}>#{question.difficulty}</span></h2>
                <div
                    className="question-details"
                    dangerouslySetInnerHTML={{ __html: question.content }}
                />
            </div>

        </>
    )
}

export default QuestionContent