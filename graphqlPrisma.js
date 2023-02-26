const prisma = `
    type Students {
        id: ID!
        name: String!
        grade: Grade
    }
    
    type Grade {
        id: Int
        student_id: Int
        name: String
        students: Students
    }
    
    type Journey {
        id: Int
        name: String
        matters: [Matters]
    }
    
    type Matters {
        id: Int
        name: String
        journey_id: Int
        journey: Journey
    }
    
    type Lesson {
        id: Int
        name: String
    }

    type Classes {
        id: Int
        name: String
        students: [Students]
    }

    type Trainers {
        id: Int
        name: String
    }

    type Query{
    
        getStudents: [Students]
        getStudentsById(id : Int): Students
        
        getGrade: [Grade]
        getGradesById(id : Int): Grade
        
        getJourney: [Journey]
        getJourneyById(id : Int): Journey
        
        getMatter: [Matters]
        getMatterById(id : Int): Matters
        
        getLesson: [Lesson]
        getLessonById(id : Int): Lesson
        
        getClasses: [Classes]
        getClassesById(id : Int): Classes
        
        getTrainers: [Trainers]
        getTrainersById(id : Int): Trainers
    }

    type Mutation {
        addStudents(name: String): [Students]
        removeStudents(id: Int): [Students]
        editStudents(id: Int, name: String): [Students]

        addGrade(name: String, student_id: Int): [Grade]
        removeGrade(id: Int): [Grade]
        editGrade(id: Int, name: String, student_id: Int): [Grade]
        
        
        addJourney(name: String): [Journey]
        removeJourney(id: Int): [Journey]
        editJourney(id: Int, name: String): [Journey]
        
        addMatter(name: String): [Matters]
        removeMatter(id: Int): [Matters]
        editMatter(id: Int, name: String): [Matters]
        
        addLesson(name: String, start_at: String, end_at: String): [Lesson]
        removeLesson(id: Int): [Lesson]
        editLesson(id: Int, name: String, start_at: String, end_at: String): [Lesson]
        
        addClasses(name: String): [Classes]
        removeClasses(id: Int): [Classes]
        editClasses(id: Int, name: String): [Classes]
        
        addTrainers(name: String): [Trainers]
        removeTrainers(id: Int): [Trainers]
        editTrainers(id: Int, name: String): [Trainers]
    }
`

export default prisma
