const courseInfo = {
    id: 451,
    name: "Assignment Group 1"
}

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

// Calculate the avg score for each learner in the AssignmentGroup
const getLearnerData = (courseInfo, AssignmentGroup, LearnerSubmissions) => {
    // Let's check if the AsssigmentGroup belongs to the course
    if (AssignmentGroup.course_id !== courseInfo.id) {
        throw new Error(`Assignment group does not belong to the course`)
    }
    // Start an array to hold the learner data
    const learnerData = []
    //Loop through each submission
    for (let i = 0; i < LearnerSubmissions.length; i++) {
        const submission = LearnerSubmissions[i]
        const learnerId = submission.learner_id
        const assignmentId = submission.assignment_id
        const submissionScore = submission.submission.score
        const submissionSubmittedAt = new Date(submission.submission.submitted_at)
        const assignment = AssignmentGroup.assignments.find((assignment) => assignment.id === assignmentId)

        // Collect the points possible and due date for the assignment
        const assignmentPointsPossible = assignment.points_possible
        const assignmentDueAt = new Date(assignment.due_at)

        // Lets check if the assignment datd is valid or not
        if (!assignmentPointsPossible || !assignmentDueAt) {
            throw new Error(`Invalid assignment data`)
        }

        // Cal the score percentage
        let scorePercentage = (submissionScore / assignmentPointsPossible) * 100
        // Applying a late penalty if its submitted late
        if (submissionSubmittedAt > assignmentDueAt) {
            scorePercentage -= assignmentPointsPossible * 0.1
        }

        //  Lets check if the learner is already  the array
        if (learnerData.some((learner) => learner.id === learnerId)) {
            // if so, update the data
            const learner = learnerData.find((learner) => learner.id === learnerId)
            learner.scores.push(scorePercentage) //add percentage to their list 
            learner.total_points_possible += assignmentPointsPossible // to add to their total
            learner.avg = // calculating their new avg score
                learner.scores.reduce((acc, val) => acc + val, 0) /
                learner.total_points_possible
        } else {
            // if not add them
            learnerData.push({
                id: learnerId,
                avg: scorePercentage,
                total_points_possible: assignmentPointsPossible,
                scores: [scorePercentage]
            })
        }
    }
    // return array
    return learnerData
}

// Call the function and log the result
try {
    console.log(getLearnerData(courseInfo, AssignmentGroup, LearnerSubmissions))
} catch (error) {
    console.error(error.message)
}
