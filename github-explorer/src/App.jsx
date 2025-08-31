import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Bookmarks } from './pages/Bookmarks';
import { RepositoryDetail } from './pages/RepositoryDetail';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import './styles/index.css';

function App() {
  return (
    <ErrorBoundary>
      <BookmarkProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/repo/:owner/:name" element={<RepositoryDetail />} />
            </Routes>
          </Layout>
        </Router>
      </BookmarkProvider>
    </ErrorBoundary>
  );
}

export default App;
