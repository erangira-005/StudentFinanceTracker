DESKTOP / TABLET LAYOUT (768px+)
┌──────────────────────────────────────────────────┐
│              STUDENT FINANCE TRACKER              │  ← sticky header
│   About   Dashboard   Add   Records   Settings    │  ← nav (pill links)
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  ABOUT                                            │
│  Purpose paragraph...                             │
│  Email: ...   GitHub: ...                         │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  DASHBOARD                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Total   │ │  Total   │ │   Top    │          │  ← 3-col grid
│  │  Trans.  │ │  Spend   │ │ Category │          │     at 1024px+
│  └──────────┘ └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────────────────┐           │
│  │  Budget  │ │   7-Day Trend Chart  │           │
│  │   Cap    │ │   (bar rows)         │           │
│  └──────────┘ └──────────────────────┘           │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  ADD TRANSACTION                                  │
│  [Description input]                              │
│  [Amount input]                                    │
│  [Category input]                                  │
│  [Date input]                                      │
│  [ Add Transaction ]  [ Cancel Edit (hidden) ]    │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  RECORDS                                          │
│  [ Search Pattern input ]  ☐ Case Insensitive     │
│  [ Sort: Date ▾ ]                                 │
│  ┌────────────────────────────────────────────┐   │
│  │ Desc │ Amount │ Category │ Date │ Actions  │   │
│  ├────────────────────────────────────────────┤   │
│  │ ...row...                  [Edit] [Delete] │   │
│  └────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  SETTINGS                                         │
│  Currency [USD ▾]  EUR rate [__]  RWF rate [__]   │
│  [ Export JSON ]  [ Choose file ] [ Import JSON ] │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│         Student Finance Tracker © 2026            │  ← footer
└──────────────────────────────────────────────────┘


MOBILE LAYOUT (~360-430px)
- Same vertical order, top to bottom
- Header nav links wrap to 2 rows instead of 1
- Dashboard cards stack to 1 column instead of 3
- Form inputs and buttons go full-width
- Table scrolls horizontally inside its own box if needed,
  rest of the page stays put (no full-page sideways scroll)
