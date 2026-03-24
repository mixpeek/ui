/**
 * @mixpeek/ui — Mixpeek Component Library
 *
 * Full shadcn/ui primitives + API-bound components with autonomous feedback loops.
 * Each API-bound component emits structured feedback events that enable
 * deterministic incremental improvement of search quality and user experience.
 *
 * @example Quick start:
 * ```tsx
 * import { MxpProvider, SearchBox, SearchResults, ResultCard, ThumbsFeedback } from '@mixpeek/ui';
 * import '@mixpeek/ui/styles.css';
 *
 * function App() {
 *   const [results, setResults] = useState([]);
 *   return (
 *     <MxpProvider apiKey="mxp_sk_..." namespace="ns_abc" baseUrl="/_api">
 *       <SearchBox retrieverId="ret_xyz" onResults={setResults} />
 *       <SearchResults
 *         results={results}
 *         renderResult={(doc) => (
 *           <ResultCard document={doc} onClick={openDetail}>
 *             <ThumbsFeedback documentId={doc.document_id} />
 *           </ResultCard>
 *         )}
 *       />
 *     </MxpProvider>
 *   );
 * }
 * ```
 */

// ── Styles (import as side-effect) ─────────────────────────────
import './styles/globals.css';

// ── Provider ───────────────────────────────────────────────────
export { MxpProvider } from './provider/MxpProvider';
export { useMxpContext } from './provider/MxpContext';
export type { MxpConfig, MxpContextValue } from './provider/types';

// ── API Client ─────────────────────────────────────────────────
export { MxpApiClient } from './client/MxpApiClient';
export type {
  MxpDocument,
  RetrieverResult,
  StageEvent,
  ListResponse,
  PresignedUploadResponse,
  BatchStatus,
  TaxonomyNode,
  NamespaceInfo,
} from './client/types';

// ── Feedback System ────────────────────────────────────────────
export { useFeedback } from './feedback/useFeedback';
export { FeedbackCollector } from './feedback/FeedbackCollector';
export type { FeedbackEvent, FeedbackContext, FeedbackMeta } from './feedback/types';

// ── Primitives (shadcn/ui — full coverage) ──────────────────────
export {
  // Core
  Button, buttonVariants,
  Input,
  Textarea,
  Label,
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,
  Badge, badgeVariants,
  Separator,
  Skeleton,
  Progress,
  Avatar, AvatarImage, AvatarFallback,
  Slider,
  Switch,
  Checkbox,
  RadioGroup, RadioGroupItem,
  Toggle, toggleVariants,
  ToggleGroup, ToggleGroupItem,
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectSeparator,
  Tabs, TabsList, TabsTrigger, TabsContent,
  // Overlay / Dialog
  Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
  AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger,
  Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription,
  Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator,
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuGroup, ContextMenuPortal, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuRadioGroup,
  HoverCard, HoverCardTrigger, HoverCardContent,
  // Navigation
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
  Popover, PopoverTrigger, PopoverContent,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup,
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarPortal, MenubarSubContent, MenubarSubTrigger, MenubarGroup, MenubarSub, MenubarShortcut,
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, navigationMenuTriggerStyle,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
  // Layout
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  AspectRatio,
  ResizablePanelGroup, ResizablePanel, ResizableHandle,
  ScrollArea, ScrollBar,
  Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption,
  // Feedback / Alert
  Alert, AlertTitle, AlertDescription,
  // Form
  useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField,
  Calendar,
  // v4 primitives
  Spinner,
  Kbd, KbdGroup,
  NativeSelect, NativeSelectOption, NativeSelectOptGroup,
  Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent,
  Field, FieldSet, FieldLabel, FieldLegend, FieldDescription, FieldError, FieldGroup, FieldContent, FieldTitle, FieldSeparator,
  InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea,
  ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants,
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel,
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle, useChart,
  Combobox,
  Item, ItemMedia, ItemContent, ItemHeader, ItemTitle, ItemDescription, ItemFooter, ItemActions, ItemGroup, ItemSeparator, itemVariants,
  Toaster, toast,
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar,
} from './primitives';
export type { ButtonProps, BadgeProps, CalendarProps, CarouselApi, ChartConfig, ComboboxProps, ComboboxOption } from './primitives';

// ── API-Bound Components: Search ──────────────────────────────
export { SearchBox, SearchResults, ResultCard, FacetFilters } from './components/search';
export type { SearchBoxProps, SearchResultsProps, ResultCardProps, FacetFiltersProps, Facet, FacetOption } from './components/search';

// ── API-Bound Components: Upload ──────────────────────────────
export { FileUpload, DropZone, UploadProgress } from './components/upload';
export type { FileUploadProps, DropZoneProps, UploadProgressProps } from './components/upload';

// ── API-Bound Components: Media ───────────────────────────────
export { MediaPreview, ImageGallery, BboxOverlay, VideoPlayer, LazyImage, JsonViewer, MasonryGrid, MasonryItem } from './components/media';
export type { MediaPreviewProps, ImageGalleryProps, BboxOverlayProps, BoundingBox, VideoPlayerProps, LazyImageProps, JsonViewerProps, MasonryGridProps, MasonryItemProps } from './components/media';

// ── API-Bound Components: Documents ───────────────────────────
export { DocumentList, DocumentCard } from './components/documents';
export type { DocumentListProps, DocumentCardProps } from './components/documents';

// ── API-Bound Components: Feedback ────────────────────────────
export { ThumbsFeedback, RatingFeedback, TextFeedback } from './components/feedback';
export type { ThumbsFeedbackProps, RatingFeedbackProps, TextFeedbackProps } from './components/feedback';

// ── API-Bound Components: Taxonomy ────────────────────────────
export { TaxonomyTree, TaxonomyBadge } from './components/taxonomy';
export type { TaxonomyTreeProps, TaxonomyBadgeProps } from './components/taxonomy';

// ── API-Bound Components: Analytics ───────────────────────────
export { UsageMeter, ProcessingStatus } from './components/analytics';
export type { UsageMeterProps, ProcessingStatusProps } from './components/analytics';

// ── Hooks ──────────────────────────────────────────────────────
export {
  useClient,
  useRetriever,
  useDocuments,
  useBucketUpload,
  useBatchStatus,
  useTaxonomy,
  useNamespace,
} from './hooks';
export type {
  UseRetrieverOptions, UseRetrieverReturn,
  UseDocumentsOptions, UseDocumentsReturn,
  UseBucketUploadOptions, UseBucketUploadReturn,
  UseBatchStatusOptions, UseBatchStatusReturn,
  UseTaxonomyReturn,
  UseNamespaceReturn,
} from './hooks';

// ── Utilities ──────────────────────────────────────────────────
export { cn } from './lib/cn';
export { parseSSEStream } from './lib/sse';
export type { SSEEvent } from './lib/sse';
