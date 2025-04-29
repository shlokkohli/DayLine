import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const session = await getServerSession(authOptions)

    try {
            const { notificationPreference, summaryPreference } = await request.json();
        
            // first update the notification preference
            await prisma.notification.update({
                where: {
                    ownerId: session?.user.id
                },
                data: {
                    NotificationTime: notificationPreference
                }
            })
        
            // then update the summary preference
            await prisma.summary.update({
                where: {
                    ownerId: session?.user.id
                },
                data: {
                    SummaryFormat: summaryPreference
                }
            })

            return NextResponse.json(
                { message : "Preferences updated successfully"},
                { status: 200 }
            )

    } catch (error) {

        return NextResponse.json(
            { message : "Error updating notification preference"},
            { status: 500 }
        )
        
    }

}