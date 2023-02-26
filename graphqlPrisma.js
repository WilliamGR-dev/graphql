const prisma = `
    type Students {
        id: ID!
        name: String!
        grade: [Grade]
        classe_id: Int
        classes: Classes!
    }
    
    type Grade {
        id: Int
        student_id: Int
        name: String
        students: Students
        matters_id: Int
        matters: Matters
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
        journey: Journey!
        grade: [Grade]
        lesson: [Lesson]
    }
    
    type Lesson {
        id: Int
        name: String
        start_at: String
        end_at: String
        matter_id: Int
        matter: Matters!
    }

    type Classes {
        id: Int
        name: String
        students: [Students]
        trainers: [Trainers]
    }

    type Trainers {
        id: Int
        name: String
        classe_id: Int
        classes: [Classes]
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
        addStudents(name: String,classe_id: ID!): [Students]
        removeStudents(id: Int): [Students]
        editStudents(id: Int, name: String,classe_id: ID!): [Students]

        addGrade(name: String, student_id: Int, classe_id: Int): [Grade]
        removeGrade(id: Int): [Grade]
        editGrade(id: Int, name: String, student_id: Int, classe_id: Int): [Grade]
        
        
        addJourney(name: String): [Journey]
        removeJourney(id: Int): [Journey]
        editJourney(id: Int, name: String): [Journey]
        
        addMatter(name: String, journey_id: Int): [Matters]
        removeMatter(id: Int): [Matters]
        editMatter(id: Int, name: String, journey_id: Int): [Matters]
        
        addLesson(name: String, start_at: String, end_at: String, matter_id: Int): [Lesson]
        removeLesson(id: Int): [Lesson]
        editLesson(id: Int, name: String, start_at: String, end_at: String, matter_id: Int): [Lesson]
        
        addClasses(name: String): [Classes]
        removeClasses(id: Int): [Classes]
        editClasses(id: Int, name: String): [Classes]
        
        addTrainers(name: String, classe_id: Int): [Trainers]
        removeTrainers(id: Int): [Trainers]
        editTrainers(id: Int, name: String, classe_id: Int): [Trainers]
    }
`

export default prisma
