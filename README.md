# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


Folder stucture
erp-pos-frontend/
│
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── authApi.js
│   │   └── productApi.js
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       └── global.css
│   ├── components/
│   │   ├── common/
│   │   │   ├── CustomTable.jsx
│   │   │   ├── CustomModal.jsx
│   │   │   └── PageHeader.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── layouts/
│   │   ├── MainLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── modules/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── branches/
│   │   ├── warehouses/
│   │   ├── products/
│   │   ├── parties/
│   │   ├── sales/
│   │   │   ├── pages/
│   │   │   │   └── PosSalePage.jsx
│   │   │   └── components/
│   │   │       └── CartTable.jsx
│   │   ├── purchases/
│   │   ├── grn/
│   │   ├── expenses/
│   │   ├── accounts/
│   │   ├── payroll/
│   │   └── reports/
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   └── storage.js
│   ├── store/
│   │   └── authStore.js
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── vite.config.js