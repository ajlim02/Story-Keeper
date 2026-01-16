# Design Guidelines: Car Sales Radar Dashboard

## Design Approach

**Selected System:** Material Design 3
**Rationale:** Data-heavy analytics dashboard requiring clear hierarchy, excellent readability, and proven patterns for displaying metrics and comparisons.

## Core Design Principles

1. **Data Clarity First:** Metrics should be scannable at a glance
2. **Efficient Navigation:** Quick toggle between domestic/import views
3. **Contextual Depth:** Show trends without overwhelming
4. **Trust Through Transparency:** Clear attribution to source data

---

## Typography

**Font Stack:** 
- Primary: Noto Sans KR (via Google Fonts CDN)
- Fallback: -apple-system, system-ui

**Hierarchy:**
- Page Title: 32px/Bold
- Section Headers: 24px/Semibold
- Card Titles (Model Names): 18px/Bold
- Metrics/Numbers: 20px/Bold (for emphasis)
- Labels: 14px/Medium
- Body Text: 16px/Regular
- Captions: 12px/Regular

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 8, 12, and 16
- Tight spacing: p-2, gap-2
- Standard spacing: p-4, gap-4, m-4
- Section spacing: p-8, py-12
- Card padding: p-4 to p-6
- Container margins: mx-4 md:mx-8

**Grid Structure:**
- Desktop: 3-column card grid (grid-cols-3)
- Tablet: 2-column (md:grid-cols-2)
- Mobile: 1-column (grid-cols-1)
- Container: max-w-7xl mx-auto

---

## Component Library

### 1. Top Control Bar
- Month selector dropdown (left)
- Domestic/Import toggle switch (center)
- Filter icon button (right)
- Sticky position with subtle shadow on scroll
- Height: h-16
- Background: Elevated surface treatment

### 2. Stats Summary Bar
- 4-metric horizontal display below controls
- Shows: Total Models Tracked, Average Growth, Top Gainer, Data Update Date
- Icons + Numbers + Small labels
- Grid: grid-cols-2 md:grid-cols-4

### 3. Model Rank Cards (Primary Component)
**Structure per card:**
- Rank badge (top-left corner, circular)
- Model name (bold, larger)
- Manufacturer (smaller, muted)
- Sales volume (prominent number with "대" unit)
- Change indicators row:
  - Month-over-month: Badge with +/- number and percentage
  - Rank change: Arrow icon + change number
- "View on Danawa" text link (bottom-right)
- Card elevation: shadow-md, hover:shadow-lg transition

**Visual Treatment:**
- Rounded corners (rounded-lg)
- White background with border
- Hover: subtle lift + border accent
- Spacing: p-6 with gap-4 between elements

### 4. Filter Drawer/Panel
**Trigger:** Floating action button or top-right filter icon

**Contents:**
- Minimum sales threshold slider (with live value display)
- "Include new entries" checkbox
- "Apply Filters" button
- Reset filters link

**Behavior:** Slide-in from right (desktop) or bottom sheet (mobile)

### 5. Empty States
- Icon + "No rising models for selected criteria"
- Suggestion to adjust filters
- Centered, muted styling

### 6. Loading States
- Skeleton screens for cards (shimmer effect)
- Loading spinner for filters/month changes

---

## Data Visualization Elements

**Change Indicators:**
- Positive changes: Upward arrow icon + green accent
- Negative changes: Downward arrow icon + red accent  
- No change: Dash + neutral gray
- Use filled badges for emphasis (rounded-full, px-3, py-1)

**Rank Badges:**
- Circular, absolute positioned top-left of card
- Top 3: Special treatment (gold/silver/bronze undertone)
- Others: Neutral with rank number

**Number Formatting:**
- Thousands separator for sales (e.g., "1,234")
- Percentage with 1 decimal (e.g., "+12.5%")
- Plus/minus prefix for changes

---

## Navigation & Information Architecture

**Header:**
- Logo/Title: "Car Sales Radar" (left)
- Navigation: Single-page dashboard (no complex nav needed)
- Info icon: Links to data methodology/source attribution
- Height: h-16 with px-4 md:px-8

**Footer:**
- Data source attribution: "Based on KAMA/KAIDA official data via Danawa"
- Update schedule information
- Last updated timestamp
- Link to Danawa terms
- Minimal height: py-8

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px (base)
- Tablet: 768px - 1024px (md:)
- Desktop: > 1024px (lg:)

**Adaptations:**
- Control bar: Stack vertically on mobile
- Cards: Full-width mobile, 2-col tablet, 3-col desktop
- Stats bar: 2-col mobile, 4-col desktop
- Filter: Bottom sheet mobile, side panel desktop

---

## Images

**No hero image needed** - This is a data dashboard prioritizing immediate access to information.

**Icons Required:**
- Arrow up/down (trend indicators)
- Calendar (month selector)
- Filter/sliders (filter trigger)
- External link (Danawa links)
- Rank badges (numbers 1-20)

Use **Material Icons** via CDN for consistency.

---

## Accessibility

- All interactive elements: min height 44px
- Color alone never conveys information (icons + text for changes)
- Proper ARIA labels for toggles, filters, and cards
- Keyboard navigation: Tab through cards, filters
- Focus indicators: 2px outline with offset

---

## Key Interactions

- Toggle switch: Smooth transition between domestic/import with data fade-in
- Card hover: Subtle elevation increase
- Month selector: Dropdown with smooth list appearance
- Filter application: Loading state → fade-in results
- External link: Clear visual indicator it leaves site