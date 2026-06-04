export async function GET() {
  const res = await fetch(
    "https://remotive.com/api/remote-jobs?search=frontend"
  );

  if (!res.ok) {
    return Response.json([], { status: 500 });
  }

  const data = await res.json();
  return Response.json(data.jobs);
}