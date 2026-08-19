import PasswordForm from "./password-form";

export default async function EnterPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-stone-50 text-stone-800">
      <div className="max-w-sm w-full text-center">
        <h1 className="text-2xl font-serif uppercase tracking-[0.2em] text-stone-900 mb-6">
          Rita & Wesley
        </h1>
        <div className="w-12 h-[1px] bg-emerald-800 mx-auto mb-6"></div>
        <p className="text-sm opacity-70 mb-8">
          This site is private. Please enter the password from your invitation to continue.
        </p>
        <PasswordForm redirectTo={redirect || "/"} />
      </div>
    </main>
  );
}
