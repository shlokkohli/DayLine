import { notificationScheduler } from "@/lib/notificationScheduler";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NotificationTime } from "@/generated/prisma";

export async function POST(request: Request) {

    const session = await getServerSession(authOptions)

    // if the user is not authenticated, send an error
    if(!session?.user.id){
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }

    try {

        const { notificationType } = await request.json();

        if(!notificationType){
            return NextResponse.json(
                { message: "Missing notification type" },
                { status: 400 }
            )
        }

        // take the user's notification type save it in the database if not already saved
        await prisma.notification.upsert({
            where: {
                ownerId: session.user.id
            },
            update: {
                NotificationTime: notificationType
            },
            create: {
                ownerId: session.user.id,
                NotificationTime: notificationType
            }
        })

        if(notificationType === 'SpecificTimes'){
            notificationScheduler();
        }

        return NextResponse.json(
            { message: "Notification preference udpated successfully" },
            { status: 200 }
        )
        
    } catch (error) {

        return NextResponse.json(
            { message: "Failed to updated notification preference" },
            { status: 500 }
        )
        
    }

}