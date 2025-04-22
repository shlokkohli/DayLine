import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";

export async function GET() {

    const session = await getServerSession(authOptions)
    if(!session?.user.id){
        return NextResponse.json(
            { message: "Unauthorize" },
            { status: 401 }
        )
    }

    // hit the db, and check the user's preferred notification type
    try {

        const userNotification = await prisma.notification.findUnique({
            where: {
                ownerId: session.user.id
            }
        })

        const userPreference = userNotification?.NotificationTime;

        return NextResponse.json(
            { message: userPreference },
            { status: 200 }
        )
        
    } catch (error) {

        return NextResponse.json(
            { message: "Error getting user notification type" },
            { status: 500 }
        )
        
    }

}