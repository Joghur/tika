import PixiCanvas from '@/components/PixiCanvas';

export type Role = "editor" | "admin" | "user";

const App = () => {
  const role: Role = "editor";

  return (
    <>
      <div className="backdrop-blur-none">
        <PixiCanvas role={role}/>
      </div>
    </>
  );
};

export default App;
