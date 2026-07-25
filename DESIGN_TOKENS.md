# Hyontrax — Design Tokens & Component Reference

A complete reference for recreating this app in Figma. All values are extracted directly from `tailwind.config.js`, `global.css`, and the component source files.

---

## 1. Color Palette

### Blue Scale (Primary — Material Design)

| Token       | Hex       | Usage                                      |
|-------------|-----------|---------------------------------------------|
| `blue-50`   | `#E3F2FD` | Card backgrounds, badge fills, hover tints  |
| `blue-100`  | `#BBDEFB` | Border colors, input borders, dividers       |
| `blue-200`  | `#90CAF9` | Scrollbar thumb, disabled states             |
| `blue-300`  | `#64B5F6` | —                                           |
| `blue-400`  | `#42A5F5` | Gradient end point (light)                  |
| `blue-500`  | `#2196F3` | Gradient end point (hero)                   |
| `blue-600`  | `#1E88E5` | —                                           |
| `blue-700`  | `#1976D2` | Focus ring borders, gradient mid             |
| `blue-800`  | `#1565C0` | Primary text/icon color, gradient start      |
| `blue-900`  | `#0D47A1` | Hero gradient dark start, featured card     |

### Surface & Background

| Token       | Hex       | Usage                                        |
|-------------|-----------|----------------------------------------------|
| `app-bg`    | `#F0F7FF` | Page background, sidebar hover, nav bg       |
| `white`     | `#FFFFFF` | Card surfaces, inputs, modal backgrounds     |
| `#F8FBFF`   | `#F8FBFF` | Section header backgrounds, meta blocks      |
| `#EBF4FF`   | `#EBF4FF` | Selected list item background                |

### Slate Scale (Text & Borders)

| Tailwind Token  | Hex       | Usage                                     |
|-----------------|-----------|-------------------------------------------|
| `slate-800`     | `#1E293B` | Primary body text, headings               |
| `slate-700`     | `#334155` | Secondary headings, labels                |
| `slate-600`     | `#475569` | Body text in cards, descriptions          |
| `slate-500`     | `#64748B` | Placeholder, muted text, sidebar text     |
| `slate-400`     | `#94A3B8` | Timestamps, metadata, subtext             |
| `slate-200`     | `#E2E8F0` | Dividers, inactive borders                |
| `slate-100`     | `#F1F5F9` | Subtle row separators                     |

### Semantic Colors

| Purpose       | Hex       | Tailwind        | Usage                                     |
|---------------|-----------|-----------------|-------------------------------------------|
| Success bg    | `#D1FAE5` | `emerald-100`   | Resolved/approved badge backgrounds       |
| Success text  | `#065F46` | `emerald-900`   | Resolved/approved badge text              |
| Success mid   | `#10B981` | `emerald-500`   | "Verified" labels, resolved stat values   |
| Warning bg    | `#FEF3C7` | `amber-100`     | In-progress badge backgrounds             |
| Warning text  | `#92400E` | `amber-900`     | In-progress badge text                    |
| Warning mid   | `#F59E0B` | `amber-400`     | Star ratings, priority icons              |
| Danger bg     | `#FEE2E2` | `red-100`       | Critical/rejected badge backgrounds       |
| Danger text   | `#991B1B` | `red-800`       | Critical/rejected badge text              |
| Danger mid    | `#EF4444` | `red-500`       | Error states, delete buttons, unassigned  |
| Orange bg     | `#FED7AA` | `orange-200`    | High-priority badge background            |
| Orange text   | `#F97316` | `orange-500`    | High-priority badge text                  |
| Purple bg     | `#EDE9FE` | `violet-100`    | Mental Health category badge              |
| Purple text   | `#5B21B6` | `violet-800`    | Mental Health category text               |
| Pink bg       | `#FCE7F3` | —               | Women's Health category badge             |
| Pink text     | `#9D174D` | —               | Women's Health category text              |
| Teal bg       | `#CCFBF1` | `teal-100`      | Nutrition category badge                  |
| Teal text     | `#134E4A` | `teal-900`      | Nutrition category text                   |
| Yellow bg     | `#FEF3C7` | `amber-100`     | Diabetes category badge                   |
| Yellow text   | `#92400E` | `amber-900`     | Diabetes category text                    |

---

## 2. Gradients

| Name                  | CSS Value                                                                              | Usage                                          |
|-----------------------|----------------------------------------------------------------------------------------|------------------------------------------------|
| `gradient-primary`    | `linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)`                                   | Buttons (primary), active nav indicator, avatars |
| `gradient-hero`       | `linear-gradient(145deg, #0D47A1 0%, #1565C0 35%, #1976D2 65%, #2196F3 100%)`        | Auth page left panel, full-screen login bg     |
| `gradient-horizontal` | `linear-gradient(90deg, #1565C0, #42A5F5)`                                             | Progress bars, rating distribution bars        |
| Featured card         | `linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #42A5F5 100%)`                     | Expert feed featured article card              |
| Gradient text         | `linear-gradient(135deg, #1565C0, #42A5F5)` with `background-clip: text`             | Logo text, hero headlines                      |
| Success gradient      | `linear-gradient(to bottom-right, #D1FAE5, #A7F3D0)`                                  | Submission success states                      |

---

## 3. Typography

### Font Family
- **Primary:** Inter (Google Font)
- **Fallback stack:** `system-ui`, `-apple-system`, `sans-serif`

### Font Sizes

| px   | Tailwind Arbitrary       | Usage                                          |
|------|--------------------------|------------------------------------------------|
| 10px | `text-[10px]`            | Badge count labels in nav                      |
| 10.5px | `text-[10.5px]`        | Ticket priority/status badge text              |
| 11px | `text-[11px]`            | Timestamps, section labels, metadata           |
| 11.5px | `text-[11.5px]`        | Stat card labels, field labels, list subtitles |
| 12px | `text-xs`                | Tags, secondary timestamps, helper text        |
| 12.5px | `text-[12.5px]`        | Card metadata, conversation timestamps         |
| 13px | `text-[13px]`            | Body text, button labels, form labels          |
| 13.5px | `text-[13.5px]`        | Conversation text, description text            |
| 14px | `text-sm`                | Primary body text, table cells                 |
| 15px | `text-[15px]`            | Card subtitles, section headings               |
| 16px | `text-base`              | Ticket subject headings                        |
| 17px | `text-[17px]`            | Panel headings, review form titles             |
| 18px | `text-lg`                | Form section headers                           |
| 20px | `text-xl`                | Success state titles, modal headings           |
| 24px | `text-2xl`               | Featured article title                         |
| 26px | `text-[26px]`            | Stat card numbers                              |
| 28px | `text-[28px]`            | EventAdmin stat numbers                        |
| 32px | `text-[32px]`            | Rating stars in form                           |
| 44px | `text-[44px]`            | Empty state icons, success state emojis        |
| 52px | `text-[52px]`            | Admin moderation empty state icon              |
| 60px | `text-[60px]`            | Overall rating average number                  |

### Font Weights

| Weight | Tailwind         | Usage                                       |
|--------|------------------|---------------------------------------------|
| 400    | `font-normal`    | Body text, timestamps                       |
| 500    | `font-medium`    | Nav items, metadata labels                  |
| 600    | `font-semibold`  | Tags, section labels, secondary buttons     |
| 700    | `font-bold`      | Card headings, form labels, badge text      |
| 800    | `font-extrabold` | Stat numbers, page titles, hero text        |

### Line Heights

| Value | Tailwind          | Usage                              |
|-------|-------------------|------------------------------------|
| 1     | `leading-none`    | Large numbers (stat cards)         |
| 1.3   | `leading-[1.3]`   | Article titles, ticket subjects    |
| 1.35  | `leading-[1.35]`  | List item titles                   |
| 1.4   | `leading-[1.4]`   | Card headings                      |
| 1.5   | `leading-[1.5]`   | Short description text             |
| 1.55  | `leading-[1.55]`  | Policy/guideline text              |
| 1.6   | `leading-relaxed` | Textarea, description blocks       |
| 1.7   | `leading-[1.7]`   | Article excerpts, review text      |
| 1.75  | `leading-[1.75]`  | Review content, long descriptions  |

### Letter Spacing

| Value       | Tailwind                | Usage                             |
|-------------|-------------------------|-----------------------------------|
| `-3px`      | `tracking-[-3px]`       | Large rating average number       |
| `-1px`      | `tracking-[-1px]`       | EventAdmin stat numbers           |
| `-0.5px`    | `tracking-[-0.5px]`     | Stat card numbers, article titles |
| `-0.2px`    | `tracking-[-0.2px]`     | Article card headings             |
| `0.2px`     | `tracking-[0.2px]`      | Badge count in nav                |
| `0.4px`     | `tracking-[0.4px]`      | Section meta labels (uppercase)   |
| `0.5px`     | `tracking-[0.5px]`      | Featured badge, "FEATURED" label  |
| `1px`       | `tracking-[1px]`        | Ticket ID display                 |
| `1px`       | `tracking-widest` approx| Nav section labels (uppercase)    |

---

## 4. Spacing & Sizing

### Component Padding (frequently used)

| Pattern              | Tailwind                     | Usage                          |
|----------------------|------------------------------|--------------------------------|
| Card standard        | `px-5 py-[18px]`             | Stat cards                     |
| Card large           | `px-[22px] py-5`             | Sidebar detail panels          |
| Card form            | `px-8 py-7`                  | Form panels (RaiseTicket)      |
| Card compact         | `px-4 py-[14px]`             | Table rows, list items         |
| Panel header         | `px-[22px] py-[18px]`        | Detail panel headers           |
| Sidebar              | `px-3 py-4`                  | Nav area                       |
| Sidebar logo area    | `px-5 py-[22px]`             | Logo header block              |
| Button small         | `px-3 py-1.5`                | Table action buttons           |
| Button default       | `px-[14px] py-[7px]`         | Filter chips / category pills  |
| Button primary       | `px-5 py-2.5`                | Main action buttons            |
| Button large         | `px-[22px] py-[11px]`        | Form submit buttons            |
| Badge/tag            | `px-[9px] py-[3px]`          | Article tags                   |
| Input                | `px-[14px] py-3`             | Form inputs / textareas        |

### Fixed Dimensions

| Element                     | Size                         |
|-----------------------------|------------------------------|
| Sidebar width               | `w-64` (256px)               |
| Avatar small                | `w-8 h-8` (32px)             |
| Avatar medium               | `w-[34px] h-[34px]`          |
| Avatar standard             | `w-10 h-10` (40px)           |
| Avatar large                | `w-11 h-11` (44px)           |
| Stat card icon              | `w-[52px] h-[52px]`          |
| Nav item icon               | `w-[22px]` text-lg           |
| Active nav indicator        | `w-[3px] h-[18px]`           |
| Progress bar height         | `h-[6px]` / `h-1.5` / `h-1` |
| Scrollbar width             | `6px`                        |

---

## 5. Border Radius

| px    | Tailwind Class        | Usage                                          |
|-------|-----------------------|------------------------------------------------|
| 6px   | `rounded-[6px]`       | Logout button, small controls                  |
| 8px   | `rounded-lg`          | Tab filter buttons, small dropdowns            |
| 9px   | `rounded-[9px]`       | Moderation tab buttons                         |
| 10px  | `rounded-[10px]`      | Action buttons, form selects, tag badges       |
| 11px  | `rounded-[11px]`      | Form inputs in RaiseTicket/ReviewsRatings      |
| 12px  | `rounded-xl`          | Inputs (standard), conversation bubbles        |
| 14px  | `rounded-[14px]`      | Stat card icons, policy banner, attachment rows|
| 16px  | `rounded-2xl`         | Stat cards, filter bars                        |
| 18px  | `rounded-[18px]`      | Review cards, article cards                    |
| 20px  | `rounded-[20px]`      | Panel containers, main card areas              |
| 24px  | `rounded-3xl`         | Success confirmation cards, modals             |
| 9999px| `rounded-full`        | Pill badges, avatar circles, filter chips      |

---

## 6. Border Widths & Colors

| Width  | Tailwind            | Usage                                       |
|--------|---------------------|---------------------------------------------|
| 1px    | `border`            | Row separators, subtle dividers             |
| 1.5px  | `border-[1.5px]`    | All card borders, inputs, active nav        |
| 2px    | `border-2`          | Priority selector buttons (RaiseTicket)     |
| 3px    | `border-l-[3px]`    | Selected list item left accent              |

### Common Border Colors

| Context                     | Color Token         | Hex         |
|-----------------------------|---------------------|-------------|
| Card default border         | `blue-100/50`       | `#BBDEFB80` |
| Input default border        | `blue-100`          | `#BBDEFB`   |
| Input focus border          | `blue-700`          | `#1976D2`   |
| Section dividers            | `blue-50`           | `#E3F2FD`   |
| Row separators              | `slate-100`         | `#F1F5F9`   |
| Inactive nav border         | `blue-50`           | `#E3F2FD`   |
| Active list item accent     | `blue-800`          | `#1565C0`   |
| Success border              | `emerald-300`       | `#6EE7B7`   |

---

## 7. Shadows

| Token        | CSS Value                                   | Usage                                    |
|--------------|---------------------------------------------|------------------------------------------|
| `shadow-blue-sm` | `0 1px 3px rgba(21,101,192,0.06)`       | Sidebar                                  |
| `shadow-blue-md` | `0 4px 20px rgba(21,101,192,0.08)`      | Cards, panels, filter bars (default)     |
| `shadow-blue-lg` | `0 8px 32px rgba(21,101,192,0.12)`      | Hovered cards, success confirmation      |
| `shadow-blue-xl` | `0 20px 60px rgba(21,101,192,0.18)`     | Login card                               |
| `shadow-blue`    | `0 8px 28px rgba(21,101,192,0.38)`      | Hovered primary buttons                  |
| Modal shadow     | `0 32px 80px rgba(0,0,0,0.25)`          | Create event modal                       |

---

## 8. Motion & Animation

| Name          | Duration | Easing  | From → To                                      |
|---------------|----------|---------|------------------------------------------------|
| `fadeIn`      | 400ms    | ease    | `opacity:0, translateY(12px)` → `opacity:1, translateY(0)` |
| `slideIn`     | 350ms    | ease    | `opacity:0, translateX(-16px)` → `opacity:1, translateX(0)` |
| `scaleIn`     | 300ms    | ease    | `opacity:0, scale(0.95)` → `opacity:1, scale(1)` |

**Applied as:**
- `.animate-scale-in` — modals, success cards, auth login card
- `.animate-fade-in` — page transitions
- `.animate-slide-in` — sidebar slide entries

**Hover transitions:**
- Buttons: `hover:-translate-y-px hover:shadow-blue` (primary buttons)
- Cards: `hover:-translate-y-[3px] hover:shadow-blue-lg` (article cards, event cards)
- Duration: `duration-150` (buttons, nav items) / `duration-200` (cards)

---

## 9. Layout

### Page Layout
- **Outer shell:** `flex min-h-screen bg-app-bg`
- **Sidebar:** `w-64 min-h-screen bg-white border-r-[1.5px] border-blue-50`
- **Main area:** `flex-1 px-8 py-7 overflow-y-auto bg-app-bg`

### Grid Patterns

| Page / Section            | Grid Template                             |
|---------------------------|-------------------------------------------|
| Stat cards (4-col)        | `grid grid-cols-4 gap-[14px]`             |
| Stat cards (3-col)        | `grid grid-cols-3 gap-4`                  |
| Split panel (list + detail) — Support | `grid grid-cols-[360px_1fr] gap-5` |
| Split panel — Track Tickets | `grid grid-cols-[380px_1fr] gap-5`      |
| Split panel — Moderation  | `grid grid-cols-[400px_1fr] gap-5`        |
| Reviews layout            | `grid grid-cols-[1fr_360px] gap-6`        |
| Event details             | `grid grid-cols-[1fr_360px] gap-8`        |
| Raise ticket              | `grid grid-cols-[1fr_320px] gap-6`        |
| Featured article          | `grid grid-cols-[1fr_280px] gap-8`        |
| Article grid              | `grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5` |
| Assignment meta           | `grid grid-cols-2 gap-3`                  |
| Action buttons (3-col)    | `grid grid-cols-3 gap-2.5`               |
| Priority selector         | `grid grid-cols-2 gap-2.5`               |

### Sticky Sidebars
- `sticky top-5` — sidebar panels in Reviews, RaiseTicket, EventDetails

### Scrollable List Panels
- Max height: `max-h-[520px]` (AdminSupport) / `max-h-[560px]` (TrackTickets) / `max-h-[580px]` (AdminModeration)
- Overflow: `overflow-y-auto`

---

## 10. Component Patterns

### Primary Button
```
bg-gradient-primary text-white border-none rounded-xl
px-5 py-2.5 text-[13px] font-bold cursor-pointer
hover:-translate-y-px hover:shadow-blue transition-all
```

### Secondary Button
```
bg-white text-blue-800 border-[1.5px] border-blue-100 rounded-xl
px-[18px] py-2.5 text-[13px] font-semibold cursor-pointer
```

### Danger Button
```
bg-red-50 text-red-500 border-[1.5px] border-red-200 rounded-lg
px-3 py-1.5 text-xs font-semibold cursor-pointer
```

### Filter Chip (active)
```
bg-gradient-primary text-white border-transparent rounded-full
px-[14px] py-[7px] text-[12.5px] font-semibold
```

### Filter Chip (inactive)
```
bg-white text-slate-500 border-[1.5px] border-blue-100 rounded-full
px-[14px] py-[7px] text-[12.5px] font-semibold
hover:bg-gradient-primary hover:text-white hover:border-transparent
```

### Card (standard)
```
bg-white rounded-[20px] shadow-blue-md border-[1.5px] border-blue-100/50
```

### Input Field
```
w-full px-[14px] py-3 border-[1.5px] border-blue-100 rounded-xl
text-sm text-slate-800 outline-none
focus:border-blue-700 focus:ring focus:ring-blue-700/10 transition-all
```

### Badge / Pill (dynamic color)
```
text-[10px–11.5px] font-bold px-[7–9px] py-[2–3px] rounded-full
background + color set inline from status/priority config map
```

### Avatar Circle
```
w-10 h-10 rounded-full bg-gradient-primary
flex items-center justify-center text-white font-bold text-sm
```

### Section Label (uppercase)
```
text-[10–11px] font-bold text-slate-400 uppercase tracking-[0.4–1px]
```

### List Item (selectable)
```
border-l-[3px] transition-all duration-150
selected: bg-[#EBF4FF] border-l-blue-800
default:  bg-white border-l-transparent hover:bg-[#F8FBFF]
```

### Progress Bar
```
h-[6px] bg-blue-50 rounded-full overflow-hidden    ← track
h-full bg-gradient-horizontal rounded-full         ← fill (width set inline)
```

### Modal Overlay
```
fixed inset-0 bg-slate-900/50 backdrop-blur-sm
flex items-center justify-center z-[1000] p-6
```

### Modal Card
```
bg-white rounded-3xl p-9 max-w-[520px] w-full
shadow-[0_32px_80px_rgba(0,0,0,0.25)] animate-scale-in
```

---

## 11. Scrollbar Styling

```css
::-webkit-scrollbar        { width: 6px; height: 6px; }
::-webkit-scrollbar-track  { background: #F0F7FF; }
::-webkit-scrollbar-thumb  { background: #90CAF9; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #42A5F5; }
```

---

## 12. Pages & Screens

| Route                    | Component             | Layout Pattern                    |
|--------------------------|-----------------------|-----------------------------------|
| `/login`                 | Login                 | Two-panel: gradient left + form right |
| `/signup`                | Signup                | Two-panel: gradient left + form right |
| `/reset-password`        | ResetPassword         | Full-screen hero gradient + centered card |
| `/app/events`            | BrowseEvents          | Filter bar + auto-fill card grid  |
| `/app/events/:id`        | EventDetails          | `[1fr_360px]` split              |
| `/app/events/register/:id` | RegisterAttendee    | Multi-step form + sidebar         |
| `/app/events/admin`      | EventAdmin            | Stats + capacity chart + table    |
| `/app/expert`            | ExpertFeed            | Featured card + `[auto-fill]` grid |
| `/app/reviews`           | ReviewsRatings        | `[1fr_360px]` split              |
| `/app/reviews/admin`     | AdminModeration       | Stats + `[400px_1fr]` split      |
| `/app/support/raise`     | RaiseTicket           | `[1fr_320px]` form + sticky sidebar |
| `/app/support/track`     | TrackTickets          | Stats + `[380px_1fr]` split      |
| `/app/support/admin`     | AdminSupport          | Stats + `[360px_1fr]` split      |
