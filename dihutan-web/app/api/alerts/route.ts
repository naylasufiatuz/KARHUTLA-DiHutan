import { NextResponse } from "next/server";
import { getAlertsFromDb, resolveAlertInDb } from "@/lib/supabase-backend";

export async function GET() {
  try {
    const alerts = await getAlertsFromDb();
    return NextResponse.json({ success: true, data: alerts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { alertId } = body;

    if (!alertId) {
      return NextResponse.json(
        { success: false, error: "ID alert wajib disertakan." },
        { status: 400 }
      );
    }

    const resolved = await resolveAlertInDb(alertId);
    return NextResponse.json({ success: resolved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

