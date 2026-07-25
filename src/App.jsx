import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/global.css";

import Layout from "./components/Layout/Layout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";
import Homepage from "./pages/home/Homepage";
import ComingSoon from "./pages/common/ComingSoon";
import BrowseEvents from "./pages/events/BrowseEvents";
import EventDetails from "./pages/events/EventDetails";
import RegisterAttendee from "./pages/events/RegisterAttendee";
import PublishEvent from "./pages/events/PublishEvent";
import MyEvents from "./pages/events/MyEvents";
import ExpertOpinion from "./pages/expert/ExpertOpinion";
import ExpertOpinionDetail from "./pages/expert/ExpertOpinionDetail";
import HealthShorts from "./pages/shorts/HealthShorts";
import HealthShortDetail from "./pages/shorts/HealthShortDetail";
import PatientTestimony from "./pages/testimony/PatientTestimony";
import UserProfile from "./pages/profile/UserProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContent from "./pages/admin/AdminContent";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminRegistrations from "./pages/admin/AdminRegistrations";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminUsers from "./pages/superadmin/SuperAdminUsers";
import SuperAdminApprovals from "./pages/superadmin/SuperAdminApprovals";
import SuperAdminAuditLog from "./pages/superadmin/SuperAdminAuditLog";
import TermsAndConditions from "./pages/account/TermsAndConditions";
import PrivacyPolicy from "./pages/account/PrivacyPolicy";
import AboutUs from "./pages/account/AboutUs";
import ContactUs from "./pages/account/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Homepage />} />
          <Route path="coming-soon" element={<ComingSoon />} />

          <Route path="events" element={<BrowseEvents />} />
          <Route path="events/publish" element={<PublishEvent />} />
          <Route path="events/my" element={<MyEvents />} />
          <Route path="events/:id/edit" element={<PublishEvent />} />
          <Route path="events/:id" element={<EventDetails />} />
          <Route path="events/:id/register" element={<RegisterAttendee />} />

          <Route path="expert" element={<ExpertOpinion />} />
          <Route path="expert/:id" element={<ExpertOpinionDetail />} />

          <Route path="shorts" element={<HealthShorts />} />
          <Route path="shorts/:id" element={<HealthShortDetail />} />

          <Route path="testimony" element={<PatientTestimony />} />

          <Route path="profile" element={<UserProfile />} />

          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/content" element={<AdminContent />} />
          <Route path="admin/events" element={<AdminEvents />} />
          <Route path="admin/registrations" element={<AdminRegistrations />} />

          <Route path="superadmin" element={<SuperAdminDashboard />} />
          <Route path="superadmin/users" element={<SuperAdminUsers />} />
          <Route path="superadmin/approvals" element={<SuperAdminApprovals />} />
          <Route path="superadmin/audit" element={<SuperAdminAuditLog />} />

          <Route path="account/terms" element={<TermsAndConditions />} />
          <Route path="account/privacy" element={<PrivacyPolicy />} />
          <Route path="account/about" element={<AboutUs />} />
          <Route path="account/contact" element={<ContactUs />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
