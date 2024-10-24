
import axios from 'axios';
import { GradeRequestData, IData } from './FormFields.interface';



// Function to call the Flask API
export const calculateGrade = (data: GradeRequestData) => {
    return axios.post('https://arunshijo.pythonanywhere.com/calculate_grade', data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const getPayload = (data: IData): GradeRequestData => {
    return {
        assignments: data.assignments,
        exams: data.exams,
        max_assignment: Number(data.assignmentsWeight),
        max_exam: Number(data.examsWeight),
        weights: {
            assignments: Number(data.maxAssignment),
            exams: Number(data.maxExam),
        }
    }
}

export const isPayloadValid = (data: IData) => {
    let isvalid = true
    data.assignments.forEach((item) => {
        if (item > data.assignmentsWeight) {
            isvalid = false
        }
    })
    data.exams.forEach((item) => {
        if (item > data.examsWeight) {
            isvalid = false
        }
    })
    return isvalid
}