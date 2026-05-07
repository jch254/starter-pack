import * as React from 'react';
import * as ga from 'react-ga';
import { useLocation } from 'react-router-dom';

interface GaTrackerProps {
  children?: React.ReactNode;
}

const GaTracker = ({ children }: GaTrackerProps) => {
  const location = useLocation();
  const initialized = React.useRef(false);

  React.useEffect(
    () => {
      if (process.env.NODE_ENV !== 'production' || process.env.GA_ID === undefined) {
        return;
      }

      if (!initialized.current) {
        ga.initialize(process.env.GA_ID as string);
        initialized.current = true;
      }

      ga.pageview(window.location.pathname);
    },
    [location.pathname],
  );

  return React.createElement(React.Fragment, null, children);
};

export default GaTracker;
