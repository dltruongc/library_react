import React, { useState, useContext, useEffect } from 'react';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { Tabs, Tab } from 'react-bootstrap';
// import { AuthContext } from '../hooks/AuthProvider';
import BookDashboard from './dashboard/book';
import BookCopyDashboard from './dashboard/book-copy';
import MemberDashboard from './dashboard/member';
import StaffDashboard from './dashboard/staff';
import BookBorrowingTimeDashboard from './dashboard/book-borrow-time';
import BorrowCardDashboard from './dashboard/borrow-cards';
import StatisticDashboard from './dashboard/statistic';

export default function Dashboard() {
  const [key, setKey] = useState('home');

  return (
    <>
      <MainNav />
      <Tabs
        mountOnEnter
        unmountOnExit
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="home" title="Tổng quan">
          <>
            <StatisticDashboard />
          </>
        </Tab>
        <Tab eventKey="book" title="Sách">
          <BookDashboard />
        </Tab>
        <Tab eventKey="book-copy" title="Đầu sách">
          <BookCopyDashboard />
        </Tab>
        <Tab eventKey="member" title="Độc giả">
          <MemberDashboard />
        </Tab>
        <Tab eventKey="staff" title="Quản thư">
          <StaffDashboard />
        </Tab>
        <Tab eventKey="borrow-time" title="Hạn mượn sách">
          <BookBorrowingTimeDashboard />
        </Tab>
        <Tab eventKey="borrow-card" title="Phiếu mượn sách">
          <BorrowCardDashboard />
        </Tab>

      </Tabs>
      <Footer />
    </>
  );
}
