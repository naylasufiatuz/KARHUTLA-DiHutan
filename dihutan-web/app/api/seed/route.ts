import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  educationCategoriesData,
  iotDevicesDataset,
  monitoringLocationsData,
  initialReportsData,
  recentAlertsData,
} from "@/lib/dashboard-data";

/**
 * Health & Seed Route Handler
 * Menguji keterhubungan Supabase dan melakukan seed data awal ke tabel
 * jika tabel belum memiliki data.
 */
export async function GET() {
  const statusReport: Record<string, unknown> = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    timestamp: new Date().toISOString(),
    tables: {},
  };

  try {
    const supabase = await createClient();

    // Check categories
    const { error: catErr } = await supabase
      .from("education_categories")
      .select("count");
    statusReport.tables = {
      ...((statusReport.tables as Record<string, unknown>) || {}),
      education_categories: catErr ? `Error: ${catErr.message}` : "Connected",
    };

    // Check iot_devices
    const { error: devErr } = await supabase.from("iot_devices").select("count");
    statusReport.tables = {
      ...((statusReport.tables as Record<string, unknown>) || {}),
      iot_devices: devErr ? `Error: ${devErr.message}` : "Connected",
    };

    // Check monitoring_locations
    const { error: locErr } = await supabase
      .from("monitoring_locations")
      .select("count");
    statusReport.tables = {
      ...((statusReport.tables as Record<string, unknown>) || {}),
      monitoring_locations: locErr ? `Error: ${locErr.message}` : "Connected",
    };

    // Check reports
    const { error: repErr } = await supabase.from("reports").select("count");
    statusReport.tables = {
      ...((statusReport.tables as Record<string, unknown>) || {}),
      reports: repErr ? `Error: ${repErr.message}` : "Connected",
    };

    return NextResponse.json({
      success: true,
      message: "Pemeriksaan backend Supabase selesai.",
      report: statusReport,
      dataAvailable: {
        categories: educationCategoriesData.length,
        devices: iotDevicesDataset.length,
        locations: monitoringLocationsData.length,
        reports: initialReportsData.length,
        alerts: recentAlertsData.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
        report: statusReport,
      },
      { status: 500 }
    );
  }
}
