# Accessibility Plan

This is the set of accessibility decisions made for the Student Finance Tracker, and the reasoning behind each one.

## Semantic structure

- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` are used instead of generic `<div>`s, so screen reader users get a real landmark structure to navigate by (most screen readers let you jump directly between landmarks)
- Each section has exactly one `<h2>`, and the page has exactly one `<h1>` — keeps the heading hierarchy predictable for anyone navigating by headings

## Keyboard access

- Every interactive element (links, buttons, inputs, the select dropdown) is a real native HTML element, so keyboard `Tab` order works automatically without needing custom `tabindex` handling
- A skip-to-content link is the first focusable thing on the page, letting keyboard users jump straight past the header/nav into the main content instead of tabbing through every nav link first
- All focusable elements get a visible focus outline (`outline: 3px solid #2563eb`), so a keyboard user always knows where they are on the page

## Forms and errors

- Every input has a real `<label>` bound to it via `for`/`id` — never just placeholder text standing in for a label
- Each form field has its own dedicated error message element (`<span class="field-error" role="alert">`), positioned directly after the input it belongs to
- When a field fails validation, `aria-invalid="true"` is set on that input and the matching error span is filled in — this means a screen reader announces the specific problem with the specific field, not just a generic "form invalid" message

## Live updates

- Two status regions exist: `#status-message` (`aria-live="polite"`) for general confirmations like "Transaction added," and `#budget-status` which switches between `aria-live="polite"` (within budget) and `aria-live="assertive"` (over budget) — so a budget overage interrupts and announces immediately, while routine confirmations don't
- Budget status is also color-coded (green when under, red when over) so sighted users get the same signal visually, not just through assistive tech

## Color and contrast

- Text colors were chosen to stay readable against every section background tested, including the darker tints used for visual section separation
- Error states use red text on a light red background (not red text alone), and success/confirmation states use green similarly — relying on both color and a clear background shape, not color alone, to convey state

## Responsive and motion

- Layout is mobile-first, tested and confirmed correct at ~360–430px, 768px, and 1024px+
- `prefers-reduced-motion: reduce` disables all transitions and animations for users who've set that system preference, so hover effects and chart bar transitions don't run for anyone who's opted out of motion
