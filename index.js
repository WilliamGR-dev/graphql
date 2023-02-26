import express from 'express';
import fs from 'fs';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { PrismaClient } from "@prisma/client";
import graphqlPrisma from  './graphqlPrisma.js'

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

let schema = buildSchema(graphqlPrisma)

let root = {
    getStudents: async () => {
        return await prisma.students.findMany({
            include: {
                grade: true,
                classes: true,
            }
        })
    },
    getStudentsById: async ({id}) => {

        return await prisma.students.findUnique({
            where: {
                id: id
            },
            include: {
                grade: true,
                classes: true,
            }
        });
    },
    addStudents: async ({name, classe_id}) => {
        return await prisma.students.create({
            data: {
                name,
                classes: {
                    connect: { id: classe_id }
                }
            },
            include: {grade: true,
                classes: true,}
        });
    },
    removeStudents: async ({id}) => {
        return await prisma.students.delete({
            where: {
                id: id
            },
            include: {
                grade: true,
                classes: true,
            }
        });
    },
    editStudents: async ({id, name, classe_id}) => {
        return await prisma.students.create({
            where: {
                id
            },
            data: {
                name,
                classes: {
                    connect: { id: classe_id }
                }
            },
            include: {grade: true,
                classes: true,}
        });
    },


    getGrade: async () => {
        return await prisma.grade.findMany({
            include: {
                students: true,
                matters: true,
            }
        })
    },
    getGradeById: async ({id}) => {

        return await prisma.grade.findUnique({
            where: {
                id: id
            },
            include: {
                students: true,
                matters: true,
            }
        });
    },
    addGrade: async ({name, student_id, matter_id}) => {
        return await prisma.grade.create({
            data: {
                name,
                students: {
                    connect: { id: student_id }
                },
                matters: {
                    connect: { id: matter_id }
                }
            },
            include: {students: true,
                matters: true,}
        });
    },
    removeGrade: async ({id}) => {
        return await prisma.grade.delete({
            where: {
                id: id
            },
            include: {
                students: true,
                matters: true,
            }
        });
    },
    editGrade: async ({id, name, student_id, matter_id}) => {
        return await prisma.grade.create({
            where: {
                id
            },
            data: {
                name,
                students: {
                    connect: { id: student_id }
                },
                matters: {
                    connect: { id: matter_id }
                }
            },
            include: {students: true,
                matters: true,}
        });
    },


    getJourney: async () => {
        return await prisma.journey.findMany({
            include: {
                matters: true,
            }
        })
    },
    getJourneyById: async ({id}) => {

        return await prisma.journey.findUnique({
            where: {
                id: id
            },
            include: {
                matters: true,
            }
        });
    },
    addJourney: async ({name}) => {
        return await prisma.journey.create({
            data: {
                name,
            },
            include: {
                matters: true,
            }
        });
    },
    removeJourney: async ({id}) => {
        return await prisma.journey.delete({
            where: {
                id: id
            },
            include: {
                matters: true,
            }
        });
    },
    editJourney: async ({id, name}) => {
        return await prisma.journey.create({
            where: {
                id
            },
            data: {
                name,
            },
            include: {
                matters: true,
            }
        });
    },

    getMatters: async () => {
        return await prisma.matters.findMany({
            include: {
                grade: true,
                journey: true,
                lesson: true,
            }
        })
    },
    getMattersById: async ({id}) => {
        return await prisma.matters.findUnique({
            where: {
                id: id
            },
            include: {
                grade: true,
                journey: true,
                lesson: true,
            }
        });
    },
    addMatter: async ({name, journey_id}) => {
        return await prisma.matters.create({
            data: {
                name,
                journey: {
                    connect: { id: journey_id }
                },
            },
            include: {
                grade: true,
                journey: true,
                lesson: true,
            }
        });
    },
    removeMatter: async ({id}) => {
        return await prisma.matters.delete({
            where: {
                id: id
            },
            include: {
                grade: true,
                journey: true,
                lesson: true,
            }
        });
    },
    editMatter: async ({id, name, start_at, end_at, journey_id}) => {
        return await prisma.matters.create({
            where: {
                id
            },
            data: {
                name,
                start_at,
                end_at,
                journey: {
                    connect: { id: journey_id }
                },
            },
            include: {
                grade: true,
                journey: true,
                lesson: true,
            }
        });
    },

    getLesson: async () => {
        return await prisma.lesson.findMany({
            include: {
                matters: true,
            }
        })
    },
    getLessonById: async ({id}) => {

        return await prisma.lesson.findUnique({
            where: {
                id: id
            },
            include: {
                matters: true,
            }
        });
    },
    addLesson: async ({name, start_at, end_at, matter_id}) => {
        return await prisma.lesson.create({
            data: {
                name,
                start_at,
                end_at,
                matters: {
                    connect: { id: matter_id }
                },
            },
            include: {
                matters: true,
            }
        });
    },
    removeLesson: async ({id}) => {
        return await prisma.lesson.delete({
            where: {
                id: id
            },
            include: {
                matters: true,
            }
        });
    },
    editLesson: async ({id, name, start_at, end_at, matter_id}) => {
        return await prisma.lesson.create({
            where: {
                id
            },
            data: {
                name,
                start_at,
                end_at,
                matters: {
                    connect: { id: matter_id }
                },
            },
            include: {
                matters: true,
            }
        });
    },

    getClasses: async () => {
        return await prisma.classes.findMany({
            include: {
                students: true,
            }
        })
    },
    getClassesById: async ({id}) => {

        return await prisma.classes.findUnique({
            where: {
                id: id
            },
            include: {
                students: true,
            }
        });
    },
    addClasses: async ({name}) => {
        return await prisma.classes.create({
            data: {
                name,
            },
            include: {
                students: true,
            }
        });
    },
    removeClasses: async ({id}) => {
        return await prisma.classes.delete({
            where: {
                id: id
            },
            include: {
                students: true,
            }
        });
    },
    editClasses: async ({id, name}) => {
        return await prisma.classes.create({
            where: {
                id
            },
            data: {
                name,
            },
            include: {
                students: true,
            }
        });
    },


    getTrainers: async () => {
        return await prisma.trainers.findMany({
        })
    },
    getTrainersById: async ({id}) => {

        return await prisma.trainers.findUnique({
            where: {
                id: id
            },
        });
    },
    addTrainers: async ({name, classes_id}) => {
        return await prisma.trainers.create({
            data: {
                name,
                classes: {
                    connect: { id: classes_id }
                },
            },
        });
    },
    removeTrainers: async ({id}) => {
        return await prisma.trainers.delete({
            where: {
                id: id
            },
        });
    },
    editTrainers: async ({id, name, classes_id}) => {
        return await prisma.trainers.create({
            where: {
                id
            },
            data: {
                name,
                classes: {
                    connect: { id: classes_id }
                },
            },
        });
    },
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
