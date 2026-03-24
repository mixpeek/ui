# @mixpeek/ui

React component library for building multimodal search applications with [Mixpeek](https://mixpeek.com).

- **58 shadcn/ui primitives** — Button, Card, Dialog, Tabs, Table, and more
- **8 API hooks** — useRetriever, useDocuments, useBucketUpload, useBatchStatus, useTaxonomy, useNamespace, useFeedback, useClient
- **24 API-bound components** — SearchBox, DocumentList, FileUpload, BboxOverlay, VideoPlayer, TaxonomyTree, and more
- **Autonomous feedback loops** — every interaction emits structured events for retriever tuning
- **Zero-config provider** — wrap your app in `<MxpProvider>` and components connect to your data

## Install

```bash
npm install @mixpeek/ui
```

## Quick Start

```tsx
import { MxpProvider, SearchBox, SearchResults, ResultCard, ThumbsFeedback } from '@mixpeek/ui';
import '@mixpeek/ui/styles.css';

function App() {
  const [results, setResults] = useState([]);
  return (
    <MxpProvider apiKey="mxp_sk_..." namespace="ns_abc">
      <SearchBox retrieverId="ret_xyz" onResults={setResults} />
      <SearchResults
        results={results}
        renderResult={(doc) => (
          <ResultCard document={doc}>
            <ThumbsFeedback documentId={doc.document_id} />
          </ResultCard>
        )}
      />
    </MxpProvider>
  );
}
```

## Components

### Hooks

| Hook | API Endpoint | Returns |
|---|---|---|
| `useRetriever` | `POST /v1/retrievers/{id}/execute` | `{ results, isLoading, error, stages, execute, cancel }` |
| `useDocuments` | `POST /v1/collections/{id}/documents` | `{ documents, total, page, isLoading, fetchPage, refresh }` |
| `useBucketUpload` | `POST /v1/buckets/{id}/upload/presigned` | `{ upload, progress, isUploading, objectId, reset }` |
| `useBatchStatus` | `GET /v1/batches/{id}` | `{ status, isPolling, error, refresh }` |
| `useTaxonomy` | `GET /v1/taxonomies` | `{ taxonomies, isLoading, error }` |
| `useNamespace` | `GET /v1/namespaces` | `{ namespace, isLoading, error }` |
| `useFeedback` | `POST /v1/feedback/events` | `{ emitFeedback }` |
| `useClient` | — | `MxpApiClient` instance |

### Primitives

All [shadcn/ui](https://ui.shadcn.com) components with `mxp-` Tailwind prefix: Button, Card, Dialog, Tabs, Table, Badge, Input, Select, Accordion, ScrollArea, Sheet, Tooltip, Popover, DropdownMenu, Command, Carousel, and 40+ more.

### API-Bound Components

| Category | Components |
|---|---|
| **Search** | SearchBox, SearchResults, ResultCard, FacetFilters |
| **Documents** | DocumentList, DocumentCard |
| **Upload** | FileUpload, DropZone, UploadProgress |
| **Media** | MediaPreview, ImageGallery, BboxOverlay, VideoPlayer, LazyImage, MasonryGrid, JsonViewer |
| **Taxonomy** | TaxonomyTree, TaxonomyBadge |
| **Feedback** | ThumbsFeedback, RatingFeedback, TextFeedback |
| **Analytics** | UsageMeter, ProcessingStatus |

## Styling

Components use Tailwind CSS with the `mxp-` prefix. Import the stylesheet:

```tsx
import '@mixpeek/ui/styles.css';
```

Override theme variables:

```css
:root {
  --mxp-primary: 220 90% 56%;
  --mxp-background: 0 0% 100%;
  --mxp-foreground: 240 10% 4%;
}
```

## License

MIT
