import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
  isLoading,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <Input
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <Input
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="password"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
