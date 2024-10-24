
import React, { useState } from 'react'
import { notification, Modal, Button } from 'antd';

import './FormFields.css'
import { FormFieldsProps } from './FormFields.interface'
import { calculateGrade, getPayload, isPayloadValid } from './FromField.helper';

export const FormFields: React.FC<FormFieldsProps> = (props) => {
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false)
    const calculate = () => {
        const validate = isPayloadValid(props.data)
        if (validate) {

            const payload = getPayload(props.data)
            setLoading(true)
            calculateGrade(payload).then((response) => {
                setLoading(false)
                Modal.success({
                    content: 'Total grade is ' + response.data.final_grade,
                })
            }).catch(() => {
                setLoading(false)
                api.error({
                    message: 'Opps! Something went wrong please try again '
                })
            })
        }
    }

    return (
        <div className='formFieldsWrapper'>
            {contextHolder}
            <div className='homeHeader'>
                <h1>Mark calculator</h1>
                <Button loading={loading} onClick={calculate} className='calculateButton'>
                    Calculate
                </Button>
            </div>
            <div className='formFieldItemSection'>
                <div className="formFieldItem">
                    <label>Assignment weight</label>
                    <input type="number" min={0} value={props.data.assignmentsWeight} onChange={(event) => props.handleChange('assignmentsWeight', event.target.value)} />
                </div>
                <div className="formFieldItem">
                    <label>Exam weight</label>
                    <input type="number" min={0} value={props.data.examsWeight} onChange={(event) => props.handleChange('examsWeight', event.target.value)} />
                </div>
                <div className="formFieldItem">
                    <label>Assignment Percentage</label>
                    <input type="number" min={0} value={props.data.maxAssignment} onChange={(event) => props.handleChange('maxAssignment', event.target.value)} />
                </div>
                <div className="formFieldItem">
                    <label>Exam Percentage</label>
                    <input type="number" min={0} value={props.data.maxExam} onChange={(event) => props.handleChange('maxExam', event.target.value)} />
                </div>
            </div>
        </div>
    )
}