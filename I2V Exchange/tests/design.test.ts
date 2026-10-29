import { expect, it } from 'vitest';
import { themes } from '@i2v/design';
function luminance(hex: string) { const rgb = hex.slice(1).match(/../g)!.map(c => parseInt(c, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4); return rgb[0]! * .2126 + rgb[1]! * .7152 + rgb[2]! * .0722; }
function contrast(a: string, b: string) { const x = luminance(a); const y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
for (const [name, colors] of Object.entries(themes)) it(`${name} theme keeps core text and button pairings above WCAG AA contrast`, () => { for (const [foreground, background] of [[colors.text, colors.background], [colors.muted, colors.surface], [colors.onPrimary, colors.primary], [colors.error, colors.surface]]) expect(contrast(foreground!, background!)).toBeGreaterThanOrEqual(4.5); });
