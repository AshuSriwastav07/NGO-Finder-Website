import React, { useState, useCallback } from 'react';
import Footer from "./components/Footer"
import Body from "./components/Body"
import Header from "./components/Header"
import Main from "./components/main"
import { ScrollToTop } from "./components/ui"
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Scroll handlers to pass to Header
  const handleScrollToNGOs = useCallback(() => {
    window.scrollToNGOs?.();
  }, []);

  const handleScrollToRegister = useCallback(() => {
    window.scrollToRegister?.();
  }, []);

  const handleScrollToAbout = useCallback(() => {
    window.scrollToAbout?.();
  }, []);

  // Category filter handler - scrolls to NGO list and filters
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    // Small delay to ensure state is updated before scrolling
    setTimeout(() => {
      window.scrollToNGOs?.();
    }, 100);
  }, []);

  const clearCategoryFilter = useCallback(() => {
    setSelectedCategory('');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onScrollToNGOs={handleScrollToNGOs}
        onScrollToRegister={handleScrollToRegister}
        onScrollToAbout={handleScrollToAbout}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <Body 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        onClearCategory={clearCategoryFilter}
      />
      <Footer onCategorySelect={handleCategorySelect} />
      <ScrollToTop />
      <Main />
      <Analytics />
    </div>
  )
}

export default App
