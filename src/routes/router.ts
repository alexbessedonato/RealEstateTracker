import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { MainLayout } from "../components/layout/MainLayout";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { SignUpPage } from "@/features/auth/pages/SignUpPage";
import { AddManagerPage } from "@/features/managers/pages/AddManagerPage";
import { EditManagerPage } from "@/features/managers/pages/EditManagerPage";
import { AddPropertyPage } from "@/features/properties/pages/AddPropertyPage";
import { AddTenantPage } from "@/features/tenants/pages/AddTenantPage";
import { EditTenantPage } from "@/features/tenants/pages/EditTenantPage";
import { EditPropertyPage } from "@/features/properties/pages/EditPropertyPage";
import { LandingPage } from "@/pages/landing/LandingPage";
import { getAuthStatus } from "@/features/auth/store/authStore";
import { supabase } from "@/lib/supabaseClient";
import { PasswordResetPage } from "@/features/auth/pages/PasswordResetPage";
import { NewPasswordPage } from "@/features/auth/pages/NewPasswordPage";
import { PropertyDetail } from "@/features/properties/pages/PropertyDetail";

export const rootRoute = createRootRoute({
  component: MainLayout,
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) throw redirect({ to: "/dashboard" , replace: true });
  },
});

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
  beforeLoad: () => {
    if (getAuthStatus() === "unauthenticated") {
      throw redirect({ to: "/login" , replace: true });
    }
  },
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
  beforeLoad: () => {
    if (getAuthStatus() === "authenticated") {
      throw redirect({ to: "/dashboard" , replace: true });
    }
  },
});

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
  beforeLoad: () => {
    if (getAuthStatus() === "authenticated") {
      throw redirect({ to: "/dashboard" , replace: true });
    }
  },
});

export const addManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-manager",
  component: AddManagerPage,
  beforeLoad: () => {
    if (getAuthStatus() === "unauthenticated") {
      throw redirect({ to: "/login" , replace: true });
    }
  },
});

export const addPropertyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-property",
  component: AddPropertyPage,
  beforeLoad: () => {
    if (getAuthStatus() === "unauthenticated") {
      throw redirect({ to: "/login" , replace: true });
    }
  },
});

export const addTenantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/add-tenant",
  component: AddTenantPage,
  beforeLoad: () => {
    if (getAuthStatus() === "unauthenticated") {
      throw redirect({ to: "/login" , replace: true });
    }
  },
});

export const editPropertyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit-property/$propertyId",
  component: EditPropertyPage,
  beforeLoad: () => {
    if (getAuthStatus() === "unauthenticated") {
      throw redirect({ to: "/login" , replace: true });
    }
  },
});

export const editManagerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit-manager/$managerId",
  component: EditManagerPage,
  beforeLoad: () => {
    if (getAuthStatus() !== "authenticated") {
      throw redirect({ to: "/login" , replace: true });
    }
  },
});

export const editTenantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit-tenant/$tenantId",
  component: EditTenantPage,
  beforeLoad: () => {
    if (getAuthStatus() === "unauthenticated") {
      throw redirect({ to: "/login" , replace: true });
    }
  },
});

export const passwordResetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/password-reset",
  component: PasswordResetPage,
  beforeLoad: () => {
    if (getAuthStatus() === "authenticated") {
      throw redirect({ to: "/dashboard", replace: true})
    }
  }
})

export const newPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/confirm-new-password",
  component: NewPasswordPage
})

export const propertyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/property-detail/$propertyId",
  component: PropertyDetail,
  beforeLoad: () => {
    if (getAuthStatus() === "unauthenticated") {
      throw redirect({ to: "/login" , replace: true });
    }
  },
})

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  homeRoute,
  loginRoute,
  signUpRoute,
  addManagerRoute,
  addPropertyRoute,
  addTenantRoute,
  editPropertyRoute,
  editManagerRoute,
  editTenantRoute,
  passwordResetRoute,
  newPasswordRoute,
  propertyDetailRoute
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
