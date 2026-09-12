export interface PedagogicalInput {
    subject: string;
    topic: string;
    grade: string;
    difficulty: string;
    objective: string;
}

export interface PedagogicalDecision {
    need: string;
    methodology: string;
    candidateExperiences: string[];
    experienceType: string;
    interaction: string;
    groupMode: string;
    activityDifficulty: string;
    reason: string;
}


export interface LessonPlan {
    title: string;
    objective: string;
    methodology: string;

    introduction: {
        duration: string;
        teacherAction: string;
        studentAction: string;
    };

    explanation: {
        duration: string;
        teacherAction: string;
        studentAction: string;
    };

    activity: {
        duration: string;
        experienceType: string;
        instructions: string;
        teacherAction: string;
        studentAction: string;
    };

    assessment: {
        duration: string;
        strategy: string;
    };

    closure: {
        duration: string;
        teacherAction: string;
        studentAction: string;
    };

    pedagogicalDecision: PedagogicalDecision;
}