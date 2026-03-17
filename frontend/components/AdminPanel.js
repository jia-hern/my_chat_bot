import { useEffect, useState } from "react";
import { getConfig, updateConfig } from "../services/api";

export default function AdminPanel() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    getConfig().then((res) => setConfig(res.data));
  }, []);

  const save = () => {
    updateConfig(config);
    alert("Saved!");
  };

  if (!config) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Admin Panel</h2>

      {/* Atome FAQ URL */}
      <label
        htmlFor="kbUrl"
        style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
      >
        Atome FAQ URL (update this url to the url of your knowledge base
        articles)
      </label>
      <input
        id="kbUrl"
        type="text"
        value={config.knowledgeBaseUrl}
        onChange={(e) =>
          setConfig({ ...config, knowledgeBaseUrl: e.target.value })
        }
        style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
      />

      {/* Add New Rule */}
      <label
        htmlFor="rules"
        style={{ display: "block", fontWeight: "bold", marginTop: "10px" }}
      >
        Add New Rule (each rule in new line, use format: "If [condition] →
        [action]")
      </label>
      <textarea
        id="rules"
        value={config.rules.join("\n")}
        onChange={(e) =>
          setConfig({ ...config, rules: e.target.value.split("\n") })
        }
        rows={5}
        style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
      />

      <button
        onClick={save}
        style={{ padding: "8px 16px", fontWeight: "bold" }}
      >
        Save
      </button>
    </div>
  );
}
