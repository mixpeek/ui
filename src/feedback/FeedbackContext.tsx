import React, { createContext, useContext } from 'react';
import type { FeedbackCollector } from './FeedbackCollector';

export const FeedbackCtx = createContext<FeedbackCollector | null>(null);

/** Access the FeedbackCollector. Returns null if feedback is disabled. */
export function useFeedbackCollector(): FeedbackCollector | null {
  return useContext(FeedbackCtx);
}

export const FeedbackProvider: React.FC<{
  collector: FeedbackCollector | null;
  children: React.ReactNode;
}> = ({ collector, children }) => {
  return React.createElement(FeedbackCtx.Provider, { value: collector }, children);
};
