import Chat from "../components/Chat";
import AdminPanel from "../components/AdminPanel";

export default function Home() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Chat at the top */}
      <Chat />

      {/* Admin Panel in the middle */}
      <AdminPanel />

      {/* MistakesPanel is now inside Chat and will appear below it */}
      {/* No need to add MistakesPanel here to avoid duplication */}
    </div>
  );
}
