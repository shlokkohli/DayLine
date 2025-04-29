import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {

    const session = await getServerSession(authOptions)

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

}