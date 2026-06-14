import { getHomePage } from "@/lib/wordpress";

/** Dev helper: view raw WordPress API JSON for the homepage */
export default async function ApiDebugPage() {
  let data: unknown;
  let error: string | null = null;

  try {
    data = await getHomePage();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>WordPress API Debug — Homepage</h1>
      <p>
        Endpoint: <code>/wp-json/terralogic/v1/homepage?acf_format=standard</code>
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
