import { NextResponse } from "next/server";
import {
  getReportsFromDb,
  createReportInDb,
  updateReportStatusInDb,
} from "@/lib/supabase-backend";

export async function GET() {
  try {
    const reports = await getReportsFromDb();
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.locationName || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: "Mohon lengkapi judul, lokasi, dan deskripsi kejadian.",
        },
        { status: 400 }
      );
    }

    const created = await createReportInDb({
      title: body.title,
      incidentType: body.incidentType || "Indikasi Asap",
      locationName: body.locationName,
      coordinates: body.coordinates,
      description: body.description,
      reporterName: body.reporterName || "Warga Rimba (Anonim)",
      reporterPhone: body.reporterPhone,
      photoUrl: body.photoUrl || "/hutan.jpg",
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
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
    const { reportId, status, officerNotes, verifiedBy } = body;

    if (!reportId || !status) {
      return NextResponse.json(
        { success: false, error: "ID laporan dan status baru wajib disertakan." },
        { status: 400 }
      );
    }

    const updated = await updateReportStatusInDb(
      reportId,
      status,
      officerNotes,
      verifiedBy
    );

    return NextResponse.json({ success: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

