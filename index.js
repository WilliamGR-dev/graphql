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
            inc
        })
    },
    getStudentsById: async ({id}) => {

        return await prisma.students.findUnique({
            where: {
                id: id
            },
        });
    },
    addStudents: async ({name}) => {
        return await prisma.students.create({
            data: {
                name,
            },
            include: {grade: true}
        });
    },
    removeStudents: async ({id}) => {
        return await prisma.students.delete({
            where: {
                id: id
            },
        });
    },
    editStudents: async ({id, name}) => {
        return await prisma.students.create({
            where: {
                id
            },
            data: {
                name,
            },
            include: {grade: true}
        });
    },


    getGrade: async () => {
        return await prisma.grade.findMany({
            inc
        })
    },
    getGradeById: async ({id}) => {

        return await prisma.grade.findUnique({
            where: {
                id: id
            },
        });
    },
    addGrade: async ({name, student_id}) => {
        return await prisma.grade.create({
            data: {
                name,
                student_id,
            },
            include: {students: true}
        });
    },
    removeGrade: async ({id}) => {
        return await prisma.grade.delete({
            where: {
                id: id
            },
        });
    },
    editGrade: async ({id, name, student_id}) => {
        return await prisma.grade.create({
            where: {
                id
            },
            data: {
                name,
                student_id,
            },
            include: {students: true}
        });
    },


    getJourney: async () => {
        return await prisma.journey.findMany({
            inc
        })
    },
    getJourneyById: async ({id}) => {

        return await prisma.journey.findUnique({
            where: {
                id: id
            },
        });
    },
    addJourney: async ({name}) => {
        return await prisma.journey.create({
            data: {
                name,
            },
            include: {matters: true}
        });
    },
    removeJourney: async ({id}) => {
        return await prisma.journey.delete({
            where: {
                id: id
            },
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
            include: {matters: true}
        });
    },

    getMatters: async () => {
        return await prisma.matters.findMany({
            inc
        })
    },
    getMattersById: async ({id}) => {
        return await prisma.matters.findUnique({
            where: {
                id: id
            },
        });
    },
    addMatter: async ({name, journey_id}) => {
        return await prisma.matters.create({
            where: {
                id
            },
            data: {
                name,
                journey_id: journey_id
            },
            include: {journey: true}
        });
    },
    removeMatter: async ({id}) => {
        return await prisma.matters.delete({
            where: {
                id: id
            },
        });
    },
    editMatter: async ({id, name}) => {
        return await prisma.matters.create({
            where: {
                id
            },
            data: {
                name,
                journey_id: journey_id
            },
            include: {journey: true}
        });
    },

    getLesson: async () => {
        return await prisma.lesson.findMany({
            inc
        })
    },
    getLessonById: async ({id}) => {

        return await prisma.lesson.findUnique({
            where: {
                id: id
            },
        });
    },
    addLesson: async ({name, start_at, end_at}) => {
        return await prisma.lesson.create({
            data: {
                name,
                start_at,
                end_at,
            },
        });
    },
    removeLesson: async ({id}) => {
        return await prisma.lesson.delete({
            where: {
                id: id
            },
        });
    },
    editLesson: async ({id, name, start_at, end_at,}) => {
        return await prisma.lesson.create({
            where: {
                id
            },
            data: {
                name,
                start_at,
                end_at,
            },
        });
    },

    getClasses: async () => {
        return await prisma.classes.findMany({
            inc
        })
    },
    getClassesById: async ({id}) => {

        return await prisma.classes.findUnique({
            where: {
                id: id
            },
        });
    },
    addClasses: async ({name}) => {
        return await prisma.classes.create({
            data: {
                name,
            },
            include: {students: true}
        });
    },
    removeClasses: async ({id}) => {
        return await prisma.classes.delete({
            where: {
                id: id
            },
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
            include: {students: true}
        });
    },


    getTrainers: async () => {
        return await prisma.trainers.findMany({
            inc
        })
    },
    getTrainersById: async ({id}) => {

        return await prisma.trainers.findUnique({
            where: {
                id: id
            },
        });
    },
    addTrainers: async ({name}) => {
        return await prisma.trainers.create({
            data: {
                name,
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
    editTrainers: async ({id, name}) => {
        return await prisma.trainers.create({
            where: {
                id
            },
            data: {
                name,
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
