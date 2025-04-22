import { ai } from "@/lib/gemini";
import { systemInstruction } from "@/lib/promptSumarize";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";

export async function POST(){

    const session = await getServerSession(authOptions);
    if(!session?.user.id){
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    try {

        // i want that when we fetch the user data, it should be in this format, [time] [content]

        // first fetch the current user's logs
        const logs = await prisma.log.findMany({
            where: {
                ownerId: session.user.id
            },
            orderBy: { createdAt: "asc" }
        })

        if(logs.length === 0){
            return NextResponse.json(
                { message: "No logs for today" },
                { status: 404 }
            )
        }

        const formattedLogs = logs.map((eachLog) => {
            const time = eachLog.createdAt.toLocaleString().split(",")[0].trim()
            return `${time} ${eachLog.content}`
        }).join('\n')

        const customLogs = `User's journal entries:
        ${formattedLogs}
        Generate a summary of the user's day in the "Segmented Summary" format.`

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: customLogs,
            config: {
                systemInstruction: systemInstruction
            }
        })

        const output = response.candidates?.[0].content?.parts?.[0]

        return NextResponse.json(
            { message: "Summary generated", output },
            { status: 200 }
        )
        
    } catch (error) {

        return NextResponse.json(
            { message: "Error occured while generating summary", error },
            { status: 500 }
        )
        
    }

}