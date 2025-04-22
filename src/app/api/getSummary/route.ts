import { ai } from "@/lib/gemini";
import { prompt, systemInstruction } from "@/lib/promptSumarize";
import { NextResponse } from "next/server";

export async function GET(){

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
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