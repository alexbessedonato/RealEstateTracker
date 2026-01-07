import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { MainLayout } from '../../shared/MainLayout/MainLayout';
import { Dashboard } from '../../features/Dashboard/Dashboard';

export const rootRoute = createRootRoute({
    component: MainLayout,
})

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
});

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({ routeTree });
