import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { createTRPCReact } from "@trpc/react-query";
import { createTRPCClient, httpLink, loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import SuperJSON from "superjson";
import type { AppRouter } from "~/server/api/root";
import { render, RenderOptions } from "@testing-library/react";
import { TRPCReactProvider } from "~/trpc/react";
import { setupServer } from 'msw/node';
import { createTRPCMsw } from 'msw-trpc';
import fetch from 'cross-fetch';

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

const mockedTRPC = createTRPCReact<AppRouter>();

const mockedTRPCClient = mockedTRPC.createClient({
  // @ts-expect-error idk
  transformer: SuperJSON,
  // @ts-expect-error idk
  links: [httpLink({ url: "http://localhost:3000/api/trpc", fetch })],
});

const mockedQueryClient = new QueryClient();

export const MockedTRPCProvider = (props: { children: React.ReactNode }) => {
  return (
    <mockedTRPC.Provider
      client={mockedTRPCClient}
      queryClient={mockedQueryClient}
    >
      <QueryClientProvider client={mockedQueryClient}>
        {props.children}
      </QueryClientProvider>
    </mockedTRPC.Provider>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, {
    wrapper: (props) => <MockedTRPCProvider {...props} />,
    ...options,
  });
};

export const trpcMsw = createTRPCMsw<AppRouter>({
  transformer: { input: SuperJSON, output: SuperJSON },
});

// export const testApi = createTRPCReact<AppRouter>();

// const mockTrpcClient = testApi.createClient({
//   links: [
//     loggerLink({
//       enabled: (op) =>
//         process.env.NODE_ENV === "development" ||
//         (op.direction === "down" && op.result instanceof Error),
//     }),
//     unstable_httpBatchStreamLink({
//       transformer: SuperJSON,
//       url: getBaseUrl() + "/api/trpc",
//       headers: () => {
//         const headers = new Headers();
//         headers.set("x-trpc-source", "nextjs-react");
//         return headers;
//       },
//     }),
//   ],
// });

// const queryClient = new QueryClient();

// export function TRPCTestClientProvider(props: {
//   children: React.ReactNode;
// }) {
//   return (
//     <testApi.Provider client={mockTrpcClient} queryClient={queryClient}>
//       <QueryClientProvider client={queryClient}>
//         {props.children}
//       </QueryClientProvider>
//     </testApi.Provider>
//   );
// }
// export const AllTheProviders: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   return (
//     <TRPCTestClientProvider>
//       {children}
//     </TRPCTestClientProvider>
//   );
// };

// const customRender = (
//   ui: React.ReactElement,
//   options?: Omit<RenderOptions, "wrapper">
// ) => {
//   return render(ui, {
//     wrapper: (props) => <AllTheProviders {...props}/>,
//     ...options,
//   });
// };

// export const hookWrapper = () =>
//   function wrapperOptions(props: { children: React.ReactNode }) {
//     return <AllTheProviders {...props} />;
//   };

// export * from "@testing-library/react";
// export { customRender as render };

// const trpcMsw = createTRPCMsw<AppRouter>({
//   baseUrl: 'http://localhost:3000/api/trpc',
//   transformer: {
//     input: SuperJSON,
//     output: SuperJSON,
//   }
// });

// console.log({trpcMsw});

// export const api = createTRPCReact<AppRouter>();

// export function TestWrapper(props: {
//   children: React.ReactNode,
// }) {
//   const queryClient = new QueryClient();
//   const mockTrpcClient = createTRPCClient({
//     queries: {
//       product: {
//         getProduct: {

//         }
//       }
//     },
//     mutations: {
//       cart: {
//         addToCart: {
//           useMutation: vi.fn().mockReturnValue({
//             mutate: vi.fn(),
//             isLoading: false,
//             error: null,
//             data: null,
//           })
//         }
//       }
//     }
//   })

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TRPCReactProvider client={api}>
//         {props.children}
//       </TRPCReactProvider>
//       {/* <testApi.Provider client={testTrpcClient} queryClient={queryClient}>
//         {props.children}
//       </testApi.Provider> */}
//     </QueryClientProvider>
//   );
// };

// export const renderWithWrapper = (children: React.ReactNode) => {
//   return render(<TestWrapper>{children}</TestWrapper>);
// };

// vi.mock("src/trpc/server.ts", () => {
//   return ({
//     api: mockTrpcClient,
//   });
// });