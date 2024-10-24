
import React, { useState } from 'react'
import { FormFields } from './FormFields'
import './Home.css'
import { MarkList } from './MarkList'
export const Home: React.FC = () => {
    const [data, setData] = useState({
        assignmentsWeight: 10,
        examsWeight: 100,
        maxAssignment: 40,
        maxExam: 60,
        assignments: [],
        exams: []
    })
    const handleDataChange = (key: string, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <div className={'homeWrapper'}>

            <FormFields data={data} handleChange={handleDataChange} />
            <div className='homeMarkListSection'>
                <MarkList title='Assignments' maxMark={data.assignmentsWeight} handleDataChange={(value) => handleDataChange('assignments', value)} />
                <MarkList title='Exams' maxMark={data.examsWeight} handleDataChange={(value) => handleDataChange('exams', value)} />
            </div>
        </div>
    )
}