import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

// Define the Feedback interface (assuming it's from constants.ts)
interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
    toneAndStyle: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
    content: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
    structure: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
    skills: {
        score: number;
        tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
}

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600'
        : score > 49 ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback | null }) => {
    // Provide default values if feedback is null or properties are missing
    const safeFeedback = feedback || {
        overallScore: 0,
        toneAndStyle: { score: 0, tips: [] },
        content: { score: 0, tips: [] },
        structure: { score: 0, tips: [] },
        skills: { score: 0, tips: [] },
        ATS: { score: 0, tips: [] },
    };

    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={safeFeedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <Category title="Tone & Style" score={safeFeedback.toneAndStyle?.score || 0} />
            <Category title="Content" score={safeFeedback.content?.score || 0} />
            <Category title="Structure" score={safeFeedback.structure?.score || 0} />
            <Category title="Skills" score={safeFeedback.skills?.score || 0} />
        </div>
    );
};
export default Summary;