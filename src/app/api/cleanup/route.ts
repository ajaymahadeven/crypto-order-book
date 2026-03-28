import { type NextRequest, NextResponse } from 'next/server';

import { db } from '~/server/db';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // In production, require the secret. In development, allow unauthenticated.
    if (
        process.env.NODE_ENV === 'production' &&
        authHeader !== `Bearer ${cronSecret}`
    ) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count } = await db.orderBookData.deleteMany({
        where: {
            createdAt: {
                lt: sevenDaysAgo,
            },
        },
    });

    console.log(`[cleanup] Deleted ${count} records older than 7 days`);

    return NextResponse.json({
        deleted: count,
        cutoff: sevenDaysAgo.toISOString(),
    });
}
