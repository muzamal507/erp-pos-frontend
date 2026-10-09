import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../modules/adminPanel/dashboard/pages/DashboardPage';

// Sales & POS
import PosSalePage from '../modules/adminPanel/sales/pages/PosSalePage';
import SaleListPage from '../modules/adminPanel/sales/pages/SaleListPage';
import SaleReturnListPage from '../modules/adminPanel/sales/pages/SaleReturnListPage';

// Products & Inventory
import ProductsPage from '../modules/adminPanel/products/pages/ProductsPage';
import CategoryPage from '../modules/adminPanel/categories/CategoryPage';
import BrandPage from '../modules/adminPanel/brands/BrandPage';
import AttributePage from '../modules/adminPanel/attribute/AttributePage';
import AttributeValuePage from '../modules/adminPanel/attribute/values/AttributeValuePage';
import WarehousePage from '../modules/adminPanel/warehouses/WarehousePage';
import CounterPage from '../modules/adminPanel/counters/CounterPage';

// Purchases & GRN
import PurchaseListPage from '../modules/adminPanel/purchases/PurchaseListPage';
import GrnListPage from '../modules/adminPanel/grn/GrnListPage';

// Parties & Expenses
import LocationPage from '../modules/adminPanel/parties/locations/LocationPage';
import PartyPage from '../modules/adminPanel/parties/PartyPage';
import ExpenseCategoryPage from '../modules/adminPanel/expenses/ExpenseCategoryPage';
import ExpensePage from '../modules/adminPanel/expenses/ExpensePage';

// Accounts & Finance Sub-modules
import AccountGroupsPage from '../modules/adminPanel/accounts/AccountGroupsPage';
import AccountPage from '../modules/adminPanel/accounts/AccountPage';
import VoucherTypesPage from '../modules/adminPanel/accounts/VoucherTypesPage';
import FiscalYearsPage from '../modules/adminPanel/accounts/FiscalYearsPage';
import JournalLedgerPage from '../modules/adminPanel/accounts/JournalLedgerPage';
import CustomerReceivePaymentPage from '../modules/adminPanel/accounts/CustomerReceivePaymentPage';
import SupplierPaymentPage from '../modules/adminPanel/accounts/SupplierPaymentPage';
import CashClosingPage from '../modules/adminPanel/accounts/CashClosingPage';

// Reports Hub
import ReportsPage from '../modules/adminPanel/reports/ReportsPage';

// Others
import BranchPage from '../modules/adminPanel/branches/BranchPage';
import PayrollPage from '../modules/adminPanel/payroll/PayrollPage';

import ErrorBoundary from '../components/ErrorBoundary';

const AppRoutes = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <MainLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Sales & POS */}
          <Route path="/pos" element={<PosSalePage />} />
          <Route path="/sales" element={<SaleListPage />} />
          <Route path="/sale-returns" element={<SaleReturnListPage />} />

          {/* Products & Inventory */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/brands" element={<BrandPage />} />
          <Route path="/attributes" element={<AttributePage />} />
          <Route path="/attribute-values" element={<AttributeValuePage />} />
          <Route path="/warehouses" element={<WarehousePage />} />
          <Route path="/counters" element={<CounterPage />} />

          {/* Purchases & GRN */}
          <Route path="/purchases" element={<PurchaseListPage />} />
          <Route path="/grns" element={<GrnListPage />} />

          {/* Parties & Expenses */}
          <Route path="/parties" element={<PartyPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/expenses" element={<ExpensePage />} />
          <Route path="/expenses-category" element={<ExpenseCategoryPage />} />

          {/* Account Sub-modules */}
          <Route path="/account-groups" element={<AccountGroupsPage />} />
          <Route path="/accounts" element={<AccountPage />} />
          <Route path="/voucher-types" element={<VoucherTypesPage />} />
          <Route path="/fiscal-years" element={<FiscalYearsPage />} />
          <Route path="/journal-ledger" element={<JournalLedgerPage />} />
          <Route path="/customer-receive-payment" element={<CustomerReceivePaymentPage />} />
          <Route path="/supplier-payment" element={<SupplierPaymentPage />} />
          <Route path="/cash-closings" element={<CashClosingPage />} />

          {/* Reports Hub */}
          <Route path="/reports/:type" element={<ReportsPage />} />

          {/* Management & HR */}
          <Route path="/branches" element={<BranchPage />} />
          <Route path="/payroll" element={<PayrollPage />} />

           {/* Unknown path ko dashboard par bhej do */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </MainLayout>
  );
};

export default AppRoutes;