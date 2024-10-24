export interface FormFieldsProps {
    data: IData
    handleChange: (key: string, value: any) => void
}

export interface IData {
    assignmentsWeight: number,
    examsWeight: number,
    maxAssignment: number,
    maxExam: number,
    assignments: number[],
    exams: number[]
}

export interface GradeRequestData {
    assignments: number[];
    exams: number[];
    weights: {
        assignments: number;
        exams: number;
    };
    max_assignment: number;
    max_exam: number;
}

export interface GradeResponse {
    final_grade: number;
}