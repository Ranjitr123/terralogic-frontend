import { getHomePage } from "@/lib/wordpress";

export default async function ApiDebugPage() {
  let data: unknown;
  let error: string | null = null;

  try {
    data = await getHomePage();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  const baseUrl = process.env.WORDPRESS_API_URL ?? "(not set)";

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>WordPress API Debug — Homepage</h1>
      <p>
        Endpoint:{" "}
        <code>POST {baseUrl}/wp-json/api/pages/home</code>
      </p>
      {error ? (
        <pre style={{ color: "crimson" }}>{error}</pre>
      ) : (
        <pre style={{ overflow: "auto", background: "#f4f4f4", padding: "1rem" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
