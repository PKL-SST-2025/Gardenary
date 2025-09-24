// src/components/AuthGuard.tsx
import { JSX, onMount, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

interface Props {
  children: JSX.Element;
}

export default function AuthGuard(props: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = createSignal(true);
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  onMount(() => {
    const token = localStorage.getItem("auth_token"); // perbaikan di sini
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  });

  if (isLoading()) {
    return <div class="flex items-center justify-center h-screen">Loading...</div>;
  }

  return isAuthenticated() ? props.children : null;
}
