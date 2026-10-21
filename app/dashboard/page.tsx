import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const token = cookies().get("deriv_access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Você está autenticado.</p>
      <p>Token: {token.slice(0, 20)}...</p>
    </main>
  );
}
