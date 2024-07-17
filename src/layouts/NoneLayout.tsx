export default function NoneLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {
  return (
    <main className="flex min-h-screen justify-center items-center">
      {children}
    </main>
  );
}
