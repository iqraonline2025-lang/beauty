import AuthForm from "../components/AuthForm";

export default function SignupPage() {
  // By default, your AuthForm probably starts as Login.
  // We can pass a "mode" if you want, or just let the user toggle.
  return (
    <main>
      <AuthForm initialMode="signup" />
    </main>
  );
}