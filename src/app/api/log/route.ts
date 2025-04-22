import { NextResponse } from "next/server";

// in this page, the user will visit the log page and log their current mood
export async function POST(request: Request){

    try {

        const { logEntry } = await request.json();

        
        
    } catch (error) {
        
    }

}