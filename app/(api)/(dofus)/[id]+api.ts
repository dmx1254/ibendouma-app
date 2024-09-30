export async function GET(request: Request, { id }: { id: string }) {
  try {
    const body = await request.json();
    return Response.json(body);
  } catch (error) {
    console.error("Error fetching recent data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
