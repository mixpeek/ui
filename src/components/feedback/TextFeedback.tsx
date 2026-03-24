import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Textarea } from '../../primitives/textarea';
import { Button } from '../../primitives/button';
import { useFeedback } from '../../feedback/useFeedback';
import { cn } from '../../lib/cn';

export interface TextFeedbackProps {
  /** Document ID this feedback is about. */
  documentId?: string;
  /** Retriever context. */
  retrieverId?: string;
  /** Placeholder text. */
  placeholder?: string;
  /** Called when user submits feedback. */
  onSubmit?: (text: string) => void;
  /** Additional CSS classes. */
  className?: string;
}

/**
 * Free-text feedback input. Emits structured events for qualitative feedback.
 *
 * @example
 * ```tsx
 * <TextFeedback documentId={doc.document_id} placeholder="What could be better?" />
 * ```
 */
export const TextFeedback: React.FC<TextFeedbackProps> = ({
  documentId,
  retrieverId,
  placeholder = 'Share your feedback...',
  onSubmit,
  className,
}) => {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { emitFeedback } = useFeedback();

  const handleSubmit = () => {
    if (!text.trim()) return;
    emitFeedback(
      'TextFeedback',
      'text_feedback',
      { documentId, text: text.trim() },
      { retrieverId, documentId }
    );
    onSubmit?.(text.trim());
    setText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className={cn('mxp-space-y-2', className)}>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="mxp-min-h-[60px] mxp-text-sm"
      />
      <div className="mxp-flex mxp-justify-end">
        {submitted ? (
          <span className="mxp-text-xs mxp-text-green-600">Thanks for your feedback!</span>
        ) : (
          <Button size="sm" onClick={handleSubmit} disabled={!text.trim()}>
            <Send className="mxp-h-3 mxp-w-3" />
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
