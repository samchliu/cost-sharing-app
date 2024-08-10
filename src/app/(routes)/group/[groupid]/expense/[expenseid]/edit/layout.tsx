
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
          <main className="h-dvh min-h-screen w-full bg-neutrals-10">
            {children}
          </main>
    </>
  );
}
