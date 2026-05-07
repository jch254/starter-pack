import * as React from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children?: React.ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const location = useLocation();

  React.useEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [location.pathname, location.search],
  );

  return React.createElement(React.Fragment, null, children);
};

export default ScrollToTop;
